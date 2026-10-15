import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Clock, Users } from "lucide-react"
import type { Course } from "@/lib/data/courses"
import { SoftCircle } from "@/components/ornaments/soft-circle"

const SERIF = { fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }

type CursosTeaserBandaProps = {
  courses: Course[]
}

/** Cursos: tres tarjetas con foto propia, nivel, duración y cupo. */
export function CursosTeaserBanda({ courses }: CursosTeaserBandaProps) {
  const lista = courses.filter((c) => c.active).slice(0, 3)
  if (lista.length === 0) return null

  return (
    <section
      data-no-section-divider
      className="relative flex items-center overflow-hidden bg-background px-5 py-20 sm:min-h-[calc(100svh-4rem)] sm:px-8 sm:py-12 lg:px-12"
    >
      <SoftCircle color="wine" size={300} className="-right-20 top-0" />
      <SoftCircle color="gold" size={260} className="-left-20 bottom-0" />

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.22em] text-primary">
              <span className="h-px w-8 bg-primary/50" aria-hidden />
              Cursos de pastelería
            </p>
            <p
              className="mt-3 max-w-2xl text-balance text-4xl font-normal leading-[1.08] text-heading sm:text-5xl"
              style={SERIF}
            >
              Aprende el oficio, <span className="italic text-primary">con las manos en la masa.</span>
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Grupos reducidos y práctica guiada en nuestras sedes de Bosa.
            </p>
          </div>
          <Link
            href="/cursos"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 self-start rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover sm:self-auto"
          >
            Ver todos los cursos
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {lista.map((curso) => (
            <li key={curso.id}>
              <Link
                href={`/cursos/${curso.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[0_24px_50px_-30px_rgba(58,38,32,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/60 hover:shadow-[0_30px_60px_-28px_rgba(58,38,32,0.6)]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                  <Image
                    src={curso.image}
                    alt={curso.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    sizes="(max-width: 768px) 100vw, 360px"
                  />
                  {curso.level ? (
                    <span className="absolute left-4 top-4 rounded-full bg-[#F8F5F2]/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary shadow-sm">
                      {curso.level}
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p
                    className="text-xl font-normal leading-snug text-heading transition-colors group-hover:text-primary"
                    style={SERIF}
                  >
                    {curso.title}
                  </p>
                  {curso.topics.length > 0 ? (
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {curso.topics.slice(0, 3).join(" · ")}
                    </p>
                  ) : null}

                  <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                    <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      {curso.duration ? (
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-[#B08A4A]" aria-hidden />
                          {curso.duration}
                        </span>
                      ) : null}
                      {curso.students ? (
                        <span className="inline-flex items-center gap-1.5">
                          <Users className="h-3.5 w-3.5 text-[#B08A4A]" aria-hidden />
                          {curso.students}
                        </span>
                      ) : null}
                    </p>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/30 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
