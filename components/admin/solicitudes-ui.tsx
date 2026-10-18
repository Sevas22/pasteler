import { ClipboardList, GraduationCap, MessageSquareWarning } from "lucide-react"
import { ETIQUETA_ESTADO, ETIQUETA_TIPO, valorDetalle, type EstadoSolicitud, type Solicitud, type TipoSolicitud } from "@/lib/solicitudes"
import { cn } from "@/lib/utils"

const ESTILO_TIPO: Record<TipoSolicitud, { clase: string; Icono: typeof ClipboardList }> = {
  cotizacion: { clase: "bg-amber-100 text-amber-900 border-amber-200", Icono: ClipboardList },
  curso: { clase: "bg-sky-100 text-sky-900 border-sky-200", Icono: GraduationCap },
  pqrs: { clase: "bg-rose-100 text-rose-900 border-rose-200", Icono: MessageSquareWarning },
}

const ESTILO_ESTADO: Record<EstadoSolicitud, string> = {
  nuevo: "bg-primary text-primary-foreground border-primary",
  en_proceso: "bg-amber-50 text-amber-900 border-amber-300",
  por_recontactar: "bg-violet-50 text-violet-900 border-violet-300",
  cerrado: "bg-emerald-50 text-emerald-900 border-emerald-300",
  descartado: "bg-muted text-muted-foreground border-border",
}

export function InsigniaTipo({ tipo, className }: { tipo: TipoSolicitud; className?: string }) {
  const { clase, Icono } = ESTILO_TIPO[tipo]
  return (
    <span className={cn("inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2 py-0.5 text-xs font-medium", clase, className)}>
      <Icono className="h-3.5 w-3.5" aria-hidden />
      {ETIQUETA_TIPO[tipo]}
    </span>
  )
}

export function InsigniaEstado({ estado, className }: { estado: EstadoSolicitud; className?: string }) {
  return (
    <span className={cn("inline-flex whitespace-nowrap rounded-full border px-2 py-0.5 text-xs font-medium", ESTILO_ESTADO[estado], className)}>
      {ETIQUETA_ESTADO[estado]}
    </span>
  )
}

/** Una línea que resume qué pidió el cliente, según el formulario. */
export function resumenSolicitud(s: Solicitud): string {
  const d = s.detalles ?? {}
  const partes: string[] = []
  if (s.tipo === "pqrs") {
    if (d.tipo_pqrs) partes.push(valorDetalle("tipo_pqrs", d.tipo_pqrs))
    if (d.asunto) partes.push(String(d.asunto))
  } else if (s.tipo === "cotizacion") {
    if (d.categoria) partes.push(valorDetalle("categoria", d.categoria))
    if (d.producto) partes.push(String(d.producto))
    if (d.porciones) partes.push(`${d.porciones} porciones`)
    if (d.fecha_evento) partes.push(`para el ${formatoFecha(String(d.fecha_evento))}`)
  } else if (s.tipo === "curso") {
    if (d.curso) partes.push(String(d.curso))
    if (d.horario) partes.push(valorDetalle("horario", d.horario))
  }
  return partes.join(" · ") || s.mensaje?.slice(0, 80) || "—"
}

/** "2026-10-17" → "17 oct 2026" (sin desfase de zona horaria). */
export function formatoFecha(iso: string): string {
  const [a, m, d] = iso.slice(0, 10).split("-").map(Number)
  if (!a || !m || !d) return iso
  return new Intl.DateTimeFormat("es-CO", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(a, m - 1, d)),
  )
}

export function formatoFechaHora(iso: string): string {
  return new Intl.DateTimeFormat("es-CO", {
    timeZone: "America/Bogota",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso))
}

/** Número en formato internacional para wa.me / tel: (asume Colombia si viene sin indicativo). */
export function telefonoInternacional(telefono: string): string {
  const digitos = telefono.replace(/\D/g, "")
  if (digitos.length === 10 && digitos.startsWith("3")) return `57${digitos}`
  return digitos
}
