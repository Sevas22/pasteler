import { createClient } from "@/lib/supabase/server"
import {
  ESTADOS_SOLICITUD,
  TIPOS_SOLICITUD,
  type EstadoSolicitud,
  type Solicitud,
  type TipoSolicitud,
} from "@/lib/solicitudes"

/** Lecturas de la bandeja de solicitudes (solo admin: RLS devuelve vacío a cualquier otro). */

export type FiltrosSolicitudes = {
  tipo?: string
  estado?: string
  q?: string
  /** "hoy": solo las que tienen recontacto programado para hoy o antes. */
  agenda?: string
}

export type ResultadoSolicitudes = {
  solicitudes: Solicitud[]
  /** false si la tabla aún no existe (migración sin correr) u otro error de lectura. */
  disponible: boolean
}

export function hoyBogota(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Bogota" }).format(new Date())
}

export async function getSolicitudes(filtros: FiltrosSolicitudes = {}, limite = 500): Promise<ResultadoSolicitudes> {
  const supabase = await createClient()
  let query = supabase.from("solicitudes").select("*").order("created_at", { ascending: false }).limit(limite)

  if (TIPOS_SOLICITUD.includes(filtros.tipo as TipoSolicitud)) query = query.eq("tipo", filtros.tipo!)
  if (ESTADOS_SOLICITUD.includes(filtros.estado as EstadoSolicitud)) query = query.eq("estado", filtros.estado!)
  if (filtros.agenda === "hoy") {
    query = query.lte("proximo_contacto", hoyBogota()).not("estado", "in", "(cerrado,descartado)")
  }

  const q = filtros.q?.trim().replace(/[%,()]/g, " ")
  if (q) query = query.or(`nombre.ilike.%${q}%,telefono.ilike.%${q}%,email.ilike.%${q}%,mensaje.ilike.%${q}%`)

  const { data, error } = await query
  if (error) {
    console.error("[solicitudes] lista", error.message)
    return { solicitudes: [], disponible: false }
  }
  return { solicitudes: (data ?? []) as Solicitud[], disponible: true }
}

export async function getSolicitud(id: string): Promise<Solicitud | null> {
  const supabase = await createClient()
  const { data, error } = await supabase.from("solicitudes").select("*").eq("id", id).maybeSingle()
  if (error) {
    console.error("[solicitudes] detalle", error.message)
    return null
  }
  return data as Solicitud | null
}

/** Otras solicitudes del mismo teléfono: sirve para ver el historial del cliente al prospectarlo. */
export async function getHistorialCliente(telefono: string, excluirId: string): Promise<Solicitud[]> {
  const digitos = telefono.replace(/\D/g, "").slice(-10)
  if (digitos.length < 7) return []
  const supabase = await createClient()
  const { data } = await supabase
    .from("solicitudes")
    .select("*")
    .ilike("telefono", `%${digitos.slice(-7)}%`)
    .neq("id", excluirId)
    .order("created_at", { ascending: false })
    .limit(20)
  return ((data ?? []) as Solicitud[]).filter((s) => s.telefono.replace(/\D/g, "").endsWith(digitos))
}

/** Resumen para el panel: nuevas sin atender y recontactos vencidos. */
export async function getResumenSolicitudes() {
  const supabase = await createClient()
  const [nuevas, agenda] = await Promise.all([
    supabase.from("solicitudes").select("id", { count: "exact", head: true }).eq("estado", "nuevo"),
    supabase
      .from("solicitudes")
      .select("id", { count: "exact", head: true })
      .lte("proximo_contacto", hoyBogota())
      .not("estado", "in", "(cerrado,descartado)"),
  ])
  return {
    disponible: !nuevas.error,
    nuevas: nuevas.count ?? 0,
    porRecontactarHoy: agenda.count ?? 0,
  }
}
