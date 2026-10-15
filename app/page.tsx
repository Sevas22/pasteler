import { LayoutShell } from "@/components/layout-shell"
import { Hero } from "@/components/hero"
import { ExploraCategorias } from "@/components/explora-categorias"
import { Manifiesto } from "@/components/manifiesto"
import { BannerServicios } from "@/components/banner-servicios"
import { NuestraHistoria } from "@/components/nuestra-historia"
import { OficioPilares } from "@/components/oficio-pilares"
import { SeleccionTemporada } from "@/components/seleccion-temporada"
import { TortasPersonalizadas } from "@/components/tortas-personalizadas"
import { SedesBanda } from "@/components/sedes-banda"
import { CursosTeaserBanda } from "@/components/cursos-teaser-banda"
import { ProveedoresCarrusel } from "@/components/proveedores-carrusel"
import { FaqSection } from "@/components/faq-section"
import { CtaContactStrip } from "@/components/cta-contact-strip"
import { getCourses } from "@/lib/data/courses"
import { getLocations } from "@/lib/data/locations"
import { getProductosPublic } from "@/lib/data/productos"

export default async function HomePage() {
  const [courses, locations, productos] = await Promise.all([getCourses(), getLocations(), getProductosPublic()])

  return (
    <LayoutShell>
      <Hero />
      <ExploraCategorias />
      <Manifiesto />
      <BannerServicios />
      <NuestraHistoria />
      <OficioPilares />
      <SeleccionTemporada productos={productos} />
      <TortasPersonalizadas />
      <SedesBanda locations={locations} />
      <CursosTeaserBanda courses={courses} />
      <ProveedoresCarrusel />
      <FaqSection />
      <CtaContactStrip />
    </LayoutShell>
  )
}
