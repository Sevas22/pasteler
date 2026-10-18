import type { Metadata } from "next"
import { LayoutShell } from "@/components/layout-shell"
import { SedesDalizas } from "@/components/sedes-dalizas/sedes-dalizas"
import { JsonLd } from "@/components/json-ld"
import { getLocationsPublic } from "@/lib/data/locations"
import { grafo, migasSchema, sedeSchema } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Sedes en Bosa y Ciudadela Colsubsidio, Bogotá",
  description:
    "Encuentra tu pastelería Daliza en Bogotá: sedes Carbonell, Naranjos y Piamonte en Bosa y Ciudadela Colsubsidio. Dirección, horarios, WhatsApp y el QR del catálogo de cada sede.",
  alternates: { canonical: "/tiendas" },
}

/** Página de sucursales: el diseño "El mismo sabor, diferentes historias" con foto, QR, horario y WhatsApp por sede. */
export default async function TiendasPage() {
  const locations = await getLocationsPublic()

  return (
    <LayoutShell>
      <JsonLd
        data={grafo(
          migasSchema([
            { nombre: "Inicio", ruta: "/" },
            { nombre: "Sedes", ruta: "/tiendas" },
          ]),
          ...locations.map(sedeSchema),
        )}
      />
      <SedesDalizas locations={locations} esPagina />
    </LayoutShell>
  )
}
