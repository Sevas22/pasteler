import type { Metadata } from "next"
import { LayoutShell } from "@/components/layout-shell"
import { CoursesPageHeader } from "@/components/courses-page-header"
import { Courses } from "@/components/courses"

export const metadata: Metadata = {
  title: "Cursos de pastelería | Dalizas Pastelería Fina",
  description:
    "Cursos de pastelería en Bogotá: básico, decoración avanzada y especialidades francesas. Dalizas Pastelería Fina.",
}

export default function CursosPage() {
  return (
    <LayoutShell>
      <CoursesPageHeader />
      <Courses
        sectionId="lista-cursos"
        showSectionIntro={false}
        showViewAllLink={false}
        className="border-t border-brand-gold/15 pt-12 pb-16 sm:pt-14 sm:pb-20 md:pb-24"
      />
    </LayoutShell>
  )
}
