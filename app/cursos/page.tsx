import type { Metadata } from "next"
import { LayoutShell } from "@/components/layout-shell"
import { CursosLista } from "@/components/cursos-lista"
import { CtaContactStrip } from "@/components/cta-contact-strip"
import { getCourses } from "@/lib/data/courses"

export const metadata: Metadata = {
  title: "Cursos de pastelería | Dalizas Pastelería Fina",
  description:
    "Cursos de pastelería en Bogotá: básico, decoración avanzada y especialidades francesas. Dalizas Pastelería Fina.",
}

export default async function CursosPage() {
  const courses = await getCourses()
  return (
    <LayoutShell>
      <section data-no-section-divider className="bg-background px-5 pb-6 pt-28 sm:px-8 sm:pt-32 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-[1.3fr_1fr] sm:items-end sm:gap-10">
          <h1
            className="text-balance text-5xl font-normal leading-[1.05] text-heading sm:text-6xl"
            style={{ fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }}
          >
            Aprende el <span className="italic text-primary">oficio.</span>
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Cursos presenciales en grupos reducidos, en nuestras sedes de Bosa. Desde lo básico hasta
            especialidades avanzadas.
          </p>
        </div>
      </section>

      <CursosLista courses={courses} />
      <CtaContactStrip />
    </LayoutShell>
  )
}
