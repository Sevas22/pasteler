import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { LayoutShell } from "@/components/layout-shell"
import { TiendaDetailView } from "@/components/tienda-detail-view"
import { getLocationBySlugPublic, getLocationsPublic } from "@/lib/data/locations"
import { getProductosByLocationSlugPublic } from "@/lib/data/productos"
import { generateQrDataUrl, getLocationUrl } from "@/lib/qr"
import { MEDIA } from "@/lib/media"
import { JsonLd } from "@/components/json-ld"
import { grafo, migasSchema, sedeSchema } from "@/lib/seo"

type Props = {
  params: Promise<{ slug: string }>
}

/** Páginas de sede pre-generadas: abren al instante al escanear el QR. Una sede nueva se genera en su primera visita. */
export async function generateStaticParams() {
  return (await getLocationsPublic()).map((l) => ({ slug: l.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const location = await getLocationBySlugPublic(slug)
  if (!location) {
    return { title: "Sede" }
  }
  const esPanaderia = location.slug === "panaderia-carbonell"
  return {
    title: `${location.name}: dirección, horario y WhatsApp`,
    description: `${esPanaderia ? "Panadería" : "Pastelería"} Daliza ${esPanaderia ? "" : `sede ${location.name} `}en ${location.address}, Bogotá. Horario: ${location.hours.replace(/\s*·\s*/g, "; ")}. Pide por WhatsApp.`.replace(/\s+/g, " ").slice(0, 300),
    alternates: { canonical: `/tiendas/${location.slug}` },
    openGraph: { type: "website", url: `/tiendas/${location.slug}` },
  }
}

export default async function TiendaDetallePage({ params }: Props) {
  const { slug } = await params
  const location = await getLocationBySlugPublic(slug)
  if (!location) {
    notFound()
  }

  const [productos, qrDataUrl] = await Promise.all([
    getProductosByLocationSlugPublic(slug),
    generateQrDataUrl(getLocationUrl(slug)),
  ])

  const heroImage = productos[0]?.imagen ?? MEDIA.heroBannerPrincipal

  return (
    <LayoutShell>
      <JsonLd
        data={grafo(
          sedeSchema(location),
          migasSchema([
            { nombre: "Inicio", ruta: "/" },
            { nombre: "Sedes", ruta: "/tiendas" },
            { nombre: location.name, ruta: `/tiendas/${location.slug}` },
          ]),
        )}
      />
      <TiendaDetailView location={location} productos={productos} qrDataUrl={qrDataUrl} heroImage={heroImage} />
    </LayoutShell>
  )
}
