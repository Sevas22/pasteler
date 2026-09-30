import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { LayoutShell } from "@/components/layout-shell"
import { TiendaDetailView } from "@/components/tienda-detail-view"
import { getLocationBySlug } from "@/lib/data/locations"
import { getProductosByLocationSlugPublic } from "@/lib/data/productos"
import { generateQrDataUrl, getLocationUrl } from "@/lib/qr"
import { MEDIA } from "@/lib/media"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const location = await getLocationBySlug(slug)
  if (!location) {
    return { title: "Sede | Dalizas" }
  }
  return {
    title: `${location.name} | Dalizas Pastelería Fina`,
    description: `Catálogo disponible en la sede ${location.name} — ${location.address}, Bogotá.`,
  }
}

export default async function TiendaDetallePage({ params }: Props) {
  const { slug } = await params
  const location = await getLocationBySlug(slug)
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
      <TiendaDetailView location={location} productos={productos} qrDataUrl={qrDataUrl} heroImage={heroImage} />
    </LayoutShell>
  )
}
