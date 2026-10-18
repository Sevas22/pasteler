import { LayoutShell } from "@/components/layout-shell"
import { Hero } from "@/components/hero"
import { Manifiesto } from "@/components/manifiesto"
import { NuestraHistoria } from "@/components/nuestra-historia"
import { OficioPilares } from "@/components/oficio-pilares"
import { MisionVision } from "@/components/mision-vision"
import { SeleccionTemporada } from "@/components/seleccion-temporada"
import { PasosTorta } from "@/components/pasos-torta/pasos-torta"
import { ProveedoresCarrusel } from "@/components/proveedores-carrusel"
import { JsonLd } from "@/components/json-ld"
import { grafo, sedeSchema } from "@/lib/seo"
import { getLocationsPublic } from "@/lib/data/locations"
import { getProductosPublic } from "@/lib/data/productos"
import { productosSeleccion } from "@/lib/data/seleccion-temporada"

export default async function HomePage() {
  const [locations, productos] = await Promise.all([getLocationsPublic(), getProductosPublic()])

  return (
    <LayoutShell>
      <JsonLd data={grafo(...locations.map(sedeSchema))} />
      <Hero />
      <Manifiesto />
      <NuestraHistoria />
      <MisionVision />
      <OficioPilares />
      <SeleccionTemporada productos={productosSeleccion(productos)} />
      <PasosTorta />
      <ProveedoresCarrusel />
    </LayoutShell>
  )
}
