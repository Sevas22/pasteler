import Link from "next/link"
import { CalendarDays, FileText, Mail, MapPin, Phone } from "lucide-react"
import { PageHero } from "@/components/page-hero"
import { FondoMarca } from "@/components/ornaments/fondo-marca"
import { NEGOCIO } from "@/lib/seo"
import type { Location } from "@/lib/data/locations"

const SERIF = { fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }

export type SeccionLegal = { id: string; titulo: string; contenido: React.ReactNode }

/** Fecha desde la que rigen los documentos legales (actualízala al cambiar su contenido). */
export const FECHA_LEGAL = "17 de octubre de 2026"

/** Plantilla común de las páginas legales: banner, índice lateral y secciones numeradas. */
export function DocumentoLegal({
  titulo,
  tituloDestacado,
  descripcion,
  imagen,
  secciones,
  relacionado,
  principal,
}: {
  titulo: string
  tituloDestacado: string
  descripcion: string
  imagen: string
  secciones: SeccionLegal[]
  relacionado: { href: string; label: string }
  principal?: Location
}) {
  return (
    <>
      <PageHero
        src={imagen}
        alt=""
        priority
        alto="medio"
        title={
          <>
            {titulo} <span className="italic text-[#E3C98F]">{tituloDestacado}</span>
          </>
        }
        description={descripcion}
      />

      <section data-no-section-divider className="relative isolate overflow-hidden bg-background px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <FondoMarca variante="suave" />

        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[260px_1fr] lg:gap-14">
          {/* Índice */}
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-2xl border border-[#C9A96E]/30 bg-white/80 p-5 shadow-sm backdrop-blur-sm">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <FileText className="h-4 w-4" aria-hidden />
                Contenido
              </p>
              {/* Celular: tira deslizable; computador: lista vertical */}
              <ol className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-1 text-sm [scrollbar-width:none] lg:mx-0 lg:block lg:space-y-1.5 lg:overflow-visible lg:px-0 lg:pb-0">
                {secciones.map((s, i) => (
                  <li key={s.id} className="shrink-0">
                    <a
                      href={`#${s.id}`}
                      className="flex min-h-10 items-center gap-2 whitespace-nowrap rounded-full border border-border px-3.5 py-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-primary lg:min-h-0 lg:items-start lg:whitespace-normal lg:rounded-md lg:border-0 lg:px-2 lg:py-1.5"
                    >
                      <span className="w-5 shrink-0 text-right font-medium text-[#C9A96E]">{i + 1}.</span>
                      {s.titulo}
                    </a>
                  </li>
                ))}
              </ol>
              <p className="mt-4 flex items-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground lg:mt-5">
                <CalendarDays className="h-3.5 w-3.5 text-[#C9A96E]" aria-hidden />
                Vigente desde el {FECHA_LEGAL}
              </p>
            </div>
          </aside>

          {/* Documento */}
          <article className="min-w-0">
            <div className="space-y-10">
              {secciones.map((s, i) => (
                <section key={s.id} id={s.id} className="scroll-mt-28">
                  <h2 className="flex items-baseline gap-3 text-2xl font-normal text-[#7A1A2A] sm:text-[1.7rem]" style={SERIF}>
                    <span className="text-lg text-[#C9A96E]">{String(i + 1).padStart(2, "0")}</span>
                    {s.titulo}
                  </h2>
                  <div className="legal-texto mt-3 space-y-3 text-[15px] leading-relaxed text-foreground/85">{s.contenido}</div>
                </section>
              ))}
            </div>

            {/* Contacto del responsable */}
            <div className="mt-12 rounded-2xl border border-[#C9A96E]/30 bg-[#FBF6EF] p-6">
              <p className="text-lg text-[#7A1A2A]" style={SERIF}>
                ¿Dudas sobre tus datos?
              </p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#C9A96E]" aria-hidden />
                  <a href={`mailto:${NEGOCIO.email}`} className="text-primary underline-offset-2 hover:underline">
                    {NEGOCIO.email}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#C9A96E]" aria-hidden />
                  {principal?.phone || NEGOCIO.telefonoPrincipal}
                </li>
                {principal?.address ? (
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#C9A96E]" aria-hidden />
                    {principal.address}, Bogotá
                  </li>
                ) : null}
              </ul>
              <p className="mt-4 text-sm">
                También puedes leer nuestra{" "}
                <Link href={relacionado.href} className="font-medium text-primary underline-offset-2 hover:underline">
                  {relacionado.label}
                </Link>
                .
              </p>
            </div>
          </article>
        </div>
      </section>
    </>
  )
}

/** Datos de identificación del responsable (razón social y NIT se muestran solo si están en lib/seo.ts). */
export function DatosResponsable({ principal }: { principal?: Location }) {
  return (
    <ul className="space-y-1 rounded-xl border border-border bg-card p-4 text-sm">
      <li>
        <strong className="font-medium text-foreground">Responsable:</strong>{" "}
        {NEGOCIO.razonSocial || NEGOCIO.nombre}
      </li>
      {NEGOCIO.nit ? (
        <li>
          <strong className="font-medium text-foreground">NIT:</strong> {NEGOCIO.nit}
        </li>
      ) : null}
      {principal?.address ? (
        <li>
          <strong className="font-medium text-foreground">Domicilio:</strong> {principal.address}, Bogotá D.C., Colombia
        </li>
      ) : null}
      <li>
        <strong className="font-medium text-foreground">Correo:</strong> {NEGOCIO.email}
      </li>
      <li>
        <strong className="font-medium text-foreground">Teléfono / WhatsApp:</strong>{" "}
        {principal?.phone || NEGOCIO.telefonoPrincipal}
      </li>
      <li>
        <strong className="font-medium text-foreground">Sitio web:</strong> www.dalizas.com
      </li>
    </ul>
  )
}
