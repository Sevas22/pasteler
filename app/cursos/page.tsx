import type { Metadata } from "next"
import { LayoutShell } from "@/components/layout-shell"
import { CursosLista } from "@/components/cursos-lista"
import { CtaContactStrip } from "@/components/cta-contact-strip"
import { PageHero } from "@/components/page-hero"
import { getCourses } from "@/lib/data/courses"
import { BANNERS } from "@/lib/media"

export const metadata: Metadata = {
  title: "Cursos de pastelería | Dalizas Pastelería Fina",
  description:
    "Cursos de pastelería en Bogotá: básico, decoración avanzada y especialidades francesas. Dalizas Pastelería Fina.",
}

export default async function CursosPage() {
  const courses = await getCourses()
  return (
    <LayoutShell>
      <PageHero
        src={BANNERS.paginas.cursos}
        alt="Rebanadas y postres de pastelería fina Daliza"
        priority
        title={
          <>
            Aprende el <span className="italic text-[#E3C98F]">oficio.</span>
          </>
        }
        description="Cursos presenciales en grupos reducidos, en nuestras sedes de Bosa. Desde lo básico hasta especialidades avanzadas."
      />

      <CursosLista courses={courses} />
      <CtaContactStrip />
    </LayoutShell>
  )
}
