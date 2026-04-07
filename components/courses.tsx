import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { CatalogFichaLink } from "@/components/catalog-ficha-card"
import { courses } from "@/lib/data/courses"
import { cn } from "@/lib/utils"

type CoursesProps = {
  showSectionIntro?: boolean
  showViewAllLink?: boolean
  /** Por defecto `cursos` (ancla home); en /cursos usar p. ej. `lista-cursos` para mantener el divisor entre secciones. */
  sectionId?: string
  /** Clases extra en el `<section>` (p. ej. ritmo tras cabecera de página). */
  className?: string
}

export function Courses({
  showSectionIntro = true,
  showViewAllLink = true,
  sectionId = "cursos",
  className,
}: CoursesProps) {
  return (
    <section id={sectionId} className={cn("bg-white py-16 sm:py-20 md:py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {showSectionIntro && (
          <div className="mx-auto max-w-2xl px-1 text-center sm:px-0">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Nuestros cursos
            </p>
            <h2 className="mt-3 font-serif text-4xl font-normal leading-tight text-heading text-balance md:text-5xl">
              Aprende el arte de la pastelería
            </h2>
            <div
              className="mx-auto mt-5 h-px w-20 bg-gradient-to-r from-transparent via-brand-gold/80 to-transparent md:mt-6 md:w-24"
              aria-hidden
            />
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Programas para distintos niveles. Clases prácticas y grupos reducidos.
            </p>
          </div>
        )}

        <div
          className={`mx-auto grid items-stretch gap-6 sm:gap-7 md:grid-cols-2 md:gap-8 lg:grid-cols-3 ${showSectionIntro ? "mt-12 sm:mt-14 md:mt-16" : "mt-0"}`}
        >
          {courses.map((course) => (
            <CatalogFichaLink
              key={course.slug}
              href={`/cursos/${course.slug}`}
              contentLayout="split"
              showBrandLogoOnImage
              imageSrc={course.image}
              imageAlt={course.title}
              title={course.title}
              pillLeft={course.level}
              pillRight={course.duration}
              preview={course.description}
              previewHighlights={course.topics}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ))}
        </div>

        {showViewAllLink && (
          <div className="mt-10 text-center sm:mt-12">
            <Button asChild variant="outline" size="lg" className="border-primary text-primary">
              <Link href="/cursos">
                Ver página completa de cursos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
