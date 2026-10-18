import Link from "next/link"
import { notFound } from "next/navigation"
import { CalendarClock, Mail, MessageCircle, Phone } from "lucide-react"
import { BackLink } from "@/components/admin/back-link"
import { EliminarSolicitud, SeguimientoSolicitud } from "@/components/admin/seguimiento-solicitud"
import {
  InsigniaEstado,
  InsigniaTipo,
  formatoFecha,
  formatoFechaHora,
  resumenSolicitud,
  telefonoInternacional,
} from "@/components/admin/solicitudes-ui"
import { getHistorialCliente, getSolicitud } from "@/lib/data/solicitudes"
import { getLocations } from "@/lib/data/locations"
import { ETIQUETA_DETALLE, ETIQUETA_TIPO, valorDetalle } from "@/lib/solicitudes"
import { waLink } from "@/lib/whatsapp"

export const metadata = { title: "Solicitud" }

export default async function AdminSolicitudPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const solicitud = await getSolicitud(id)
  if (!solicitud) notFound()

  const [historial, locations] = await Promise.all([
    getHistorialCliente(solicitud.telefono, solicitud.id),
    getLocations(),
  ])
  const sede = locations.find((l) => l.slug === solicitud.sede_slug)
  const nombreCorto = solicitud.nombre.split(" ")[0]
  const tel = telefonoInternacional(solicitud.telefono)
  const mensajeWa = `Hola ${nombreCorto}, te escribimos de Daliza Pastelería Fina por tu solicitud de ${ETIQUETA_TIPO[
    solicitud.tipo
  ].toLowerCase()}: ${resumenSolicitud(solicitud)}.`

  const detalles = Object.entries(solicitud.detalles ?? {}).filter(([, v]) => v !== null && v !== "")

  return (
    <div className="max-w-5xl">
      <BackLink href="/admin/solicitudes" label="Volver a solicitudes" />

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <InsigniaTipo tipo={solicitud.tipo} />
            <InsigniaEstado estado={solicitud.estado} />
          </div>
          <h1 className="mt-3 font-serif text-3xl font-normal text-heading">{solicitud.nombre}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Recibida el {formatoFechaHora(solicitud.created_at)}
            {solicitud.pagina ? ` desde ${solicitud.pagina.split("?")[0]}` : ""}
          </p>
        </div>
        <EliminarSolicitud id={solicitud.id} nombre={solicitud.nombre} />
      </div>

      {/* Contacto rápido */}
      <div className="mt-6 flex flex-wrap gap-2">
        <a
          href={waLink(tel, mensajeWa)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#25D366] px-5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          WhatsApp
        </a>
        <a
          href={`tel:+${tel}`}
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-border bg-card px-5 text-sm font-medium text-foreground transition-colors hover:border-primary/40"
        >
          <Phone className="h-4 w-4" aria-hidden />
          Llamar {solicitud.telefono}
        </a>
        {solicitud.email && (
          <a
            href={`mailto:${solicitud.email}?subject=${encodeURIComponent(`Tu solicitud en Daliza Pastelería Fina`)}`}
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-border bg-card px-5 text-sm font-medium text-foreground transition-colors hover:border-primary/40"
          >
            <Mail className="h-4 w-4" aria-hidden />
            {solicitud.email}
          </a>
        )}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-medium text-heading">Lo que pidió</h2>
            <dl className="mt-4 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
              <Dato etiqueta="Teléfono" valor={solicitud.telefono} />
              {solicitud.email && <Dato etiqueta="Correo" valor={solicitud.email} />}
              <Dato etiqueta="Sede de preferencia" valor={sede?.name ?? (solicitud.sede_slug || "Cualquiera")} />
              {detalles.map(([clave, valor]) => (
                <Dato
                  key={clave}
                  etiqueta={ETIQUETA_DETALLE[clave] ?? clave}
                  valor={clave === "fecha_evento" ? formatoFecha(String(valor)) : valorDetalle(clave, valor)}
                />
              ))}
            </dl>
            {solicitud.mensaje && (
              <div className="mt-5 border-t border-border pt-4">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Mensaje</p>
                <p className="mt-1.5 whitespace-pre-wrap text-sm text-foreground">{solicitud.mensaje}</p>
              </div>
            )}
          </section>

          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-medium text-heading">Notas de seguimiento</h2>
            {solicitud.notas ? (
              <div className="mt-3 space-y-3">
                {solicitud.notas.split(/\n\n(?=\[)/).map((nota, i) => {
                  const [cabecera, ...cuerpo] = nota.split("\n")
                  return (
                    <div key={i} className="rounded-lg bg-secondary/60 px-4 py-3">
                      <p className="text-xs text-muted-foreground">{cabecera.replace(/^\[|\]$/g, "")}</p>
                      <p className="mt-1 whitespace-pre-wrap text-sm text-foreground">{cuerpo.join("\n")}</p>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">Aún no hay notas. Agrega la primera al contactar al cliente.</p>
            )}
          </section>

          {historial.length > 0 && (
            <section className="rounded-xl border border-border bg-card p-5">
              <h2 className="font-medium text-heading">Otras solicitudes de este cliente</h2>
              <ul className="mt-3 divide-y divide-border">
                {historial.map((h) => (
                  <li key={h.id}>
                    <Link href={`/admin/solicitudes/${h.id}`} className="flex flex-wrap items-center gap-2 py-2.5 text-sm hover:text-primary">
                      <InsigniaTipo tipo={h.tipo} />
                      <span className="text-muted-foreground">{formatoFechaHora(h.created_at)}</span>
                      <span className="min-w-0 flex-1 truncate">{resumenSolicitud(h)}</span>
                      <InsigniaEstado estado={h.estado} />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="h-fit rounded-xl border border-border bg-card p-5 lg:sticky lg:top-6">
          <h2 className="flex items-center gap-2 font-medium text-heading">
            <CalendarClock className="h-4 w-4 text-primary" aria-hidden />
            Seguimiento
          </h2>
          <div className="mt-4">
            <SeguimientoSolicitud
              id={solicitud.id}
              estado={solicitud.estado}
              proximoContacto={solicitud.proximo_contacto}
            />
          </div>
        </aside>
      </div>
    </div>
  )
}

function Dato({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{etiqueta}</dt>
      <dd className="mt-0.5 text-foreground">{valor}</dd>
    </div>
  )
}
