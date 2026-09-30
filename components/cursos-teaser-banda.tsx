import Image from "next/image"
import Link from "next/link"
import type { Course } from "@/lib/data/courses"

type CursosTeaserBandaProps = {
  courses: Course[]
}

export function CursosTeaserBanda({ courses }: CursosTeaserBandaProps) {
  const destacado = courses[0]
  if (!destacado) return null

  return (
    <section data-no-section-divider className="bg-background px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <p
            className="text-3xl font-normal leading-tight text-heading sm:text-4xl"
            style={{ fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }}
          >
            Aprende con nosotros
          </p>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
            Cursos de pastelería en grupos reducidos, en nuestras sedes de Bosa.
          </p>
          <Link
            href="/cursos"
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-[3px] border border-primary/40 px-6 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
          >
            Ver cursos
          </Link>
        </div>
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm">
          <Image
            src={destacado.image}
            alt={destacado.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 560px"
          />
        </div>
      </div>
    </section>
  )
}
