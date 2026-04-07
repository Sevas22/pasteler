import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BRANDING } from "@/lib/branding"
import { MEDIA } from "@/lib/media"

const wine = "#630F0F"
const serif = 'var(--font-hero-title), ui-serif, Georgia, "Times New Roman", serif'
const sans = "var(--font-sans), system-ui, sans-serif"

/**
 * Banner /cursos — layout como pieza gráfica: texto + CTA a la izquierda, foto a la derecha.
 * Tipografía: Playfair (títulos), Montserrat (botón). Colores alineados con la referencia (#630F0F).
 */
export function CoursesHeroBanner() {
  return (
    <section
      className="relative border-b border-brand-gold/25 bg-background pt-28 pb-10 md:pb-14"
      aria-labelledby="cursos-hero-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[28px] border border-brand-gold/40 shadow-[0_28px_64px_-16px_rgba(43,31,28,0.45)] ring-1 ring-black/5">
          <div className="grid min-h-[min(72vh,620px)] grid-cols-1 md:grid-cols-2 md:min-h-[440px] lg:min-h-[480px]">
            {/* Columna izquierda — tipografía y CTA (como el mock) */}
            <div
              className="relative z-10 flex flex-col justify-center bg-gradient-to-br from-[#FDFAF7] via-[#F8F2EA] to-[#EDE4D8] px-8 py-12 md:px-10 md:py-14 lg:px-14 lg:py-16"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse 80% 50% at 20% 15%, rgba(201,169,110,0.12), transparent 55%), radial-gradient(ellipse 60% 40% at 80% 90%, rgba(201,169,110,0.08), transparent 50%)",
              }}
            >
              <h1
                id="cursos-hero-heading"
                className="sr-only"
              >
                Próximamente curso de pastelería — Daliza Pastelería Fina
              </h1>

              <Link
                href="#lista-cursos"
                className="group flex flex-col items-start gap-5 md:gap-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#630F0F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F2EA]"
              >
                <span
                  className="block text-2xl font-medium uppercase leading-tight tracking-[0.08em] sm:text-3xl md:text-4xl lg:text-[2.65rem]"
                  style={{ fontFamily: serif, color: wine }}
                >
                  Próximamente
                </span>

                <div className="flex w-full max-w-md items-center gap-3 md:gap-4">
                  <span className="h-px min-w-[1.5rem] flex-1 bg-[#630F0F] opacity-85 md:min-w-[2.5rem]" aria-hidden />
                  <span
                    className="shrink-0 text-xs font-medium uppercase tracking-[0.28em] md:text-sm"
                    style={{ fontFamily: serif, color: wine }}
                  >
                    Curso de
                  </span>
                  <span className="h-px min-w-[1.5rem] flex-1 bg-[#630F0F] opacity-85 md:min-w-[2.5rem]" aria-hidden />
                </div>

                <span
                  className="block text-4xl font-semibold uppercase leading-[1.05] tracking-[0.06em] sm:text-5xl md:text-6xl lg:text-[4.25rem]"
                  style={{ fontFamily: serif, color: wine }}
                >
                  Pastelería
                </span>

                <span
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-gradient-to-b from-[#7a1f1f] via-[#630F0F] to-[#4a0b0b] px-10 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-[0_10px_28px_rgba(99,15,15,0.35)] transition group-hover:brightness-105 group-hover:shadow-[0_12px_32px_rgba(99,15,15,0.42)] md:px-12 md:py-4 md:text-sm"
                  style={{ fontFamily: sans }}
                >
                  Descubre más
                </span>
              </Link>

              <Link
                href="/"
                className="relative z-20 mt-8 inline-flex max-w-[220px] shrink-0 transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F2EA] md:mt-10 md:max-w-[260px]"
                aria-label="Ir al inicio — Daliza"
              >
                <Image
                  src={BRANDING.logoPrincipal}
                  alt={BRANDING.logoAlt}
                  width={260}
                  height={100}
                  className="h-auto w-full object-contain object-left drop-shadow-sm"
                  priority
                />
              </Link>
            </div>

            {/* Columna derecha — fotografía (recorte hacia la zona del mixer y postre) */}
            <Link
              href="#lista-cursos"
              className="relative block min-h-[280px] md:min-h-full"
              aria-label="Descubre más: ver listado de cursos"
            >
              <Image
                src={MEDIA.cursosHeroPromo}
                alt=""
                fill
                className="object-cover object-[72%_center] sm:object-[68%_center] md:object-right"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#F8F2EA]/90 via-transparent to-transparent md:from-[#F8F2EA]/40"
                aria-hidden
              />
            </Link>
          </div>
        </div>

        <p className="sr-only">
          El bloque superior enlaza al catálogo de cursos. El logotipo enlaza a la página de inicio.
        </p>

        <div className="mt-8 flex justify-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="relative z-10 min-h-[48px] border-primary/35 text-primary hover:bg-muted/60"
          >
            <Link href="/contacto">Consultar inscripción</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
