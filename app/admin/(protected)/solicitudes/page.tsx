import Link from "next/link"
import { AlertTriangle, CalendarClock, Download, Inbox, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { InsigniaEstado, InsigniaTipo, formatoFecha, formatoFechaHora, resumenSolicitud } from "@/components/admin/solicitudes-ui"
import { getSolicitudes, hoyBogota } from "@/lib/data/solicitudes"
import { ESTADOS_SOLICITUD, ETIQUETA_ESTADO, ETIQUETA_TIPO, TIPOS_SOLICITUD } from "@/lib/solicitudes"
import { cn } from "@/lib/utils"

export const metadata = { title: "Solicitudes" }

type Props = { searchParams: Promise<Record<string, string | undefined>> }

export default async function AdminSolicitudesPage({ searchParams }: Props) {
  const filtros = await searchParams
  const { tipo, estado, q, agenda } = filtros
  const [{ solicitudes, disponible }, { solicitudes: todas }] = await Promise.all([
    getSolicitudes({ tipo, estado, q, agenda }),
    getSolicitudes({}, 2000),
  ])

  const hoy = hoyBogota()
  const conteoTipo = (t?: string) => todas.filter((s) => !t || s.tipo === t).length
  const nuevas = todas.filter((s) => s.estado === "nuevo").length
  const vencidas = todas.filter(
    (s) => s.proximo_contacto && s.proximo_contacto <= hoy && s.estado !== "cerrado" && s.estado !== "descartado",
  ).length

  /** Enlace que conserva los demás filtros y cambia uno. */
  const conFiltro = (cambios: Record<string, string | undefined>) => {
    const p = new URLSearchParams()
    for (const [k, v] of Object.entries({ tipo, estado, q, agenda, ...cambios })) if (v) p.set(k, v)
    const s = p.toString()
    return s ? `/admin/solicitudes?${s}` : "/admin/solicitudes"
  }
  const exportar = conFiltro({}).replace("/admin/solicitudes", "/admin/solicitudes/exportar")

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-normal text-heading">Solicitudes</h1>
          <p className="mt-1 text-muted-foreground">
            Lo que dejan los clientes en los formularios del sitio: cotizaciones, cursos y PQRS.
          </p>
        </div>
        <Button asChild variant="outline">
          <a href={exportar}>
            <Download className="mr-2 h-4 w-4" />
            Exportar a Excel (CSV)
          </a>
        </Button>
      </div>

      {!disponible && (
        <div className="mt-6 flex gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          <AlertTriangle className="h-5 w-5 shrink-0" aria-hidden />
          <p>
            La tabla de solicitudes todavía no existe en la base de datos. Ejecuta el archivo{" "}
            <code className="rounded bg-amber-100 px-1">supabase/migrations/20261017000000_solicitudes.sql</code> en
            el SQL Editor de Supabase.
          </p>
        </div>
      )}

      {/* Resumen rápido */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Link
          href={conFiltro({ estado: "nuevo", agenda: undefined })}
          className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
        >
          <Inbox className="h-5 w-5 text-primary" aria-hidden />
          <span className="text-sm text-foreground">
            <strong className="text-lg text-heading">{nuevas}</strong> nuevas sin atender
          </span>
        </Link>
        <Link
          href={conFiltro({ agenda: "hoy", estado: undefined })}
          className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
        >
          <CalendarClock className="h-5 w-5 text-primary" aria-hidden />
          <span className="text-sm text-foreground">
            <strong className="text-lg text-heading">{vencidas}</strong> por recontactar hoy o atrasadas
          </span>
        </Link>
      </div>

      {/* Fuente */}
      <div className="mt-6 flex flex-wrap gap-2" aria-label="Filtrar por formulario">
        {[undefined, ...TIPOS_SOLICITUD].map((t) => (
          <Link
            key={t ?? "todas"}
            href={conFiltro({ tipo: t })}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              tipo === t || (!tipo && !t)
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:border-primary/40",
            )}
          >
            {t ? ETIQUETA_TIPO[t] : "Todas"} <span className="opacity-70">({conteoTipo(t)})</span>
          </Link>
        ))}
      </div>

      {/* Estado y búsqueda */}
      <form className="mt-4 flex flex-wrap items-center gap-2" action="/admin/solicitudes">
        {tipo && <input type="hidden" name="tipo" value={tipo} />}
        {agenda && <input type="hidden" name="agenda" value={agenda} />}
        <select
          name="estado"
          defaultValue={estado ?? ""}
          className="h-10 rounded-md border border-border bg-card px-3 text-sm"
          aria-label="Estado"
        >
          <option value="">Todos los estados</option>
          {ESTADOS_SOLICITUD.map((e) => (
            <option key={e} value={e}>
              {ETIQUETA_ESTADO[e]}
            </option>
          ))}
        </select>
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <input
            name="q"
            defaultValue={q ?? ""}
            placeholder="Buscar por nombre, teléfono, correo o mensaje"
            className="h-10 w-full rounded-md border border-border bg-card pl-9 pr-3 text-sm"
          />
        </div>
        <Button type="submit">Filtrar</Button>
        {(estado || q || agenda || tipo) && (
          <Button asChild variant="ghost">
            <Link href="/admin/solicitudes">Limpiar</Link>
          </Button>
        )}
      </form>
      {agenda === "hoy" && (
        <p className="mt-3 text-sm text-muted-foreground">Mostrando solo las que toca recontactar hoy o están atrasadas.</p>
      )}

      {/* Lista */}
      <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
        {solicitudes.length === 0 ? (
          <p className="p-10 text-center text-sm text-muted-foreground">
            {disponible ? "No hay solicitudes con estos filtros." : "Sin datos todavía."}
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {solicitudes.map((s) => {
              const atrasada =
                s.proximo_contacto && s.proximo_contacto <= hoy && s.estado !== "cerrado" && s.estado !== "descartado"
              return (
                <li key={s.id}>
                  <Link
                    href={`/admin/solicitudes/${s.id}`}
                    className={cn(
                      "grid gap-2 px-4 py-3.5 transition-colors hover:bg-secondary sm:grid-cols-[110px_1fr_auto] sm:items-center sm:gap-4",
                      s.estado === "nuevo" && "bg-primary/[0.03]",
                    )}
                  >
                    <div className="flex items-center gap-2 sm:flex-col sm:items-start sm:gap-1">
                      <InsigniaTipo tipo={s.tipo} />
                      <span className="text-xs text-muted-foreground">{formatoFechaHora(s.created_at)}</span>
                    </div>
                    <div className="min-w-0">
                      <p className={cn("truncate text-sm text-foreground", s.estado === "nuevo" && "font-semibold")}>
                        {s.nombre} <span className="font-normal text-muted-foreground">· {s.telefono}</span>
                      </p>
                      <p className="truncate text-sm text-muted-foreground">{resumenSolicitud(s)}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                      {s.proximo_contacto && s.estado !== "cerrado" && s.estado !== "descartado" && (
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 text-xs",
                            atrasada ? "font-semibold text-destructive" : "text-muted-foreground",
                          )}
                        >
                          <CalendarClock className="h-3.5 w-3.5" aria-hidden />
                          {formatoFecha(s.proximo_contacto)}
                        </span>
                      )}
                      <InsigniaEstado estado={s.estado} />
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>
      {solicitudes.length >= 500 && (
        <p className="mt-3 text-xs text-muted-foreground">Se muestran las 500 más recientes. Usa los filtros o exporta para ver más.</p>
      )}
    </div>
  )
}
