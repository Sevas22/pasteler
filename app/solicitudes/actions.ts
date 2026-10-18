"use server"

import { createPublicClient } from "@/lib/supabase/public"
import { CAMPOS_BASE, esquemaSolicitud } from "@/lib/solicitudes"

export type EstadoEnvio =
  | { ok: true; nombre: string }
  | { ok: false; error?: string; errores?: Record<string, string> }
  | null

/** Guarda una solicitud del sitio (PQRS, cotización o curso). RLS solo permite insertar, nunca leer. */
export async function enviarSolicitudAction(_prev: EstadoEnvio, formData: FormData): Promise<EstadoEnvio> {
  // Trampa para bots: campo oculto que una persona nunca llena. Se finge éxito para no dar pistas.
  if (String(formData.get("empresa") ?? "").trim()) return { ok: true, nombre: "" }

  const datos: Record<string, string> = {}
  for (const [clave, valor] of formData.entries()) {
    if (typeof valor === "string" && !clave.startsWith("$")) datos[clave] = valor
  }

  const resultado = esquemaSolicitud.safeParse(datos)
  if (!resultado.success) {
    const errores: Record<string, string> = {}
    for (const issue of resultado.error.issues) {
      const campo = String(issue.path[0] ?? "")
      if (campo && !errores[campo]) errores[campo] = issue.message
    }
    return { ok: false, error: "Revisa los campos marcados.", errores }
  }

  const valido = resultado.data as Record<string, unknown>
  const detalles: Record<string, unknown> = {}
  for (const [clave, valor] of Object.entries(valido)) {
    if (!(CAMPOS_BASE as readonly string[]).includes(clave) && valor !== undefined && valor !== "") detalles[clave] = valor
  }

  const supabase = createPublicClient()
  const { error } = await supabase.from("solicitudes").insert({
    tipo: valido.tipo,
    nombre: valido.nombre,
    telefono: valido.telefono,
    email: valido.email ?? null,
    sede_slug: valido.sede_slug ?? null,
    mensaje: valido.mensaje ?? null,
    pagina: valido.pagina ?? null,
    acepta_datos: true,
    detalles,
  })

  if (error) {
    console.error("[solicitudes] insert", error.message)
    return { ok: false, error: "No pudimos enviar tu solicitud. Intenta de nuevo o escríbenos por WhatsApp." }
  }

  return { ok: true, nombre: String(valido.nombre).split(" ")[0] }
}
