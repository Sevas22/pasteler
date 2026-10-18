import { NextResponse, type NextRequest } from "next/server"
import { getAdminSession } from "@/lib/supabase/admin-guard"
import { getSolicitudes } from "@/lib/data/solicitudes"
import { ETIQUETA_DETALLE, ETIQUETA_ESTADO, ETIQUETA_TIPO, valorDetalle } from "@/lib/solicitudes"

/** Descarga las solicitudes (con los filtros de la bandeja) en CSV que Excel abre con tildes y columnas. */
export async function GET(request: NextRequest) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

  const p = request.nextUrl.searchParams
  const { solicitudes } = await getSolicitudes(
    { tipo: p.get("tipo") ?? undefined, estado: p.get("estado") ?? undefined, q: p.get("q") ?? undefined, agenda: p.get("agenda") ?? undefined },
    10000,
  )

  const clavesDetalle = Object.keys(ETIQUETA_DETALLE)
  const encabezados = [
    "Fecha",
    "Formulario",
    "Estado",
    "Nombre",
    "Teléfono",
    "Correo",
    "Sede",
    ...clavesDetalle.map((c) => ETIQUETA_DETALLE[c]),
    "Mensaje",
    "Próximo contacto",
    "Notas",
    "Página",
  ]

  const fecha = (iso: string) =>
    new Intl.DateTimeFormat("es-CO", { timeZone: "America/Bogota", dateStyle: "short", timeStyle: "short" }).format(new Date(iso))

  const filas = solicitudes.map((s) => [
    fecha(s.created_at),
    ETIQUETA_TIPO[s.tipo],
    ETIQUETA_ESTADO[s.estado],
    s.nombre,
    s.telefono,
    s.email ?? "",
    s.sede_slug ?? "",
    ...clavesDetalle.map((c) => (s.detalles?.[c] != null ? valorDetalle(c, s.detalles[c]) : "")),
    s.mensaje ?? "",
    s.proximo_contacto ?? "",
    s.notas ?? "",
    s.pagina ?? "",
  ])

  const celda = (v: string) => {
    // Evita que Excel interprete fórmulas en datos escritos por clientes
    const seguro = /^[=+\-@\t\r]/.test(v) ? `'${v}` : v
    return `"${seguro.replace(/"/g, '""')}"`
  }
  // Excel en español usa ";" como separador; el BOM hace que lea bien las tildes
  const csv = "﻿" + [encabezados, ...filas].map((fila) => fila.map((v) => celda(String(v))).join(";")).join("\r\n")

  const hoy = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Bogota" }).format(new Date())
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="solicitudes-dalizas-${hoy}.csv"`,
      "Cache-Control": "no-store",
    },
  })
}
