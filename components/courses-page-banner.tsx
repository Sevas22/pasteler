import Image from "next/image"
import Link from "next/link"
import { MEDIA } from "@/lib/media"

/**
 * Cabecera /cursos al estilo página de productos: título centrado + franja visual con imagen (sin hero full-bleed).
 */
export function CoursesPageBanner() {
  return (
    <section className="bg-background pt-24 pb-8 sm:pt-28 sm:pb-10" aria-labelledby="cursos-page-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl px-1 text-center sm:px-0">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Formación Daliza</p>
          <h1
            id="cursos-page-heading"
            className="mt-2 text-balance font-serif text-3xl font-normal text-heading sm:text-4xl md:text-5xl"
          >
            Cursos de pastelería
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Programas para distintos niveles. Clases prácticas y grupos reducidos.
          </p>
        </div>

        <div className="relative mx-auto mt-10 max-w-5xl overflow-hidden rounded-2xl border border-brand-gold/25 bg-muted shadow-[0_20px_50px_-12px_rgba(92,46,46,0.18)] sm:mt-12 sm:rounded-3xl">
          <div className="relative aspect-[4/3] w-full sm:aspect-[21/10] md:aspect-[2.2/1] md:min-h-[220px]">
            <Image
              src={MEDIA.cursosBannerFondo}
              alt="Próximamente curso de pastelería Daliza — taller y postres"
              fill
              priority
              className="object-cover object-[42%_48%] sm:object-[32%_48%] md:object-[40%_46%] lg:object-center"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"
              aria-hidden
            />
          </div>
        </div>

        <p className="mt-8 text-center">
          <Link
            href="#lista-cursos"
            className="inline-flex items-center justify-center rounded-full border border-primary/35 bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/92"
          >
            Ver cursos disponibles
          </Link>
        </p>
      </div>
    </section>
  )
}
