import type { Metadata } from "next"
import { LayoutShell } from "@/components/layout-shell"
import { TiendasGrid } from "@/components/tiendas-grid"
import { getLocations } from "@/lib/data/locations"
import { getProductosByLocationSlugPublic } from "@/lib/data/productos"
import { generateQrDataUrl, getLocationUrl } from "@/lib/qr"
import { BANNERS, MEDIA } from "@/lib/media"
import { PageHero } from "@/components/page-hero"

export const metadata: Metadata = {
  title: "Nuestras tiendas | Dalizas Pastelería Fina",
  description:
    "Encuentra tu sede Daliza en Bogotá, escanea el QR en el local y descubre el catálogo disponible en cada punto.",
}

export default async function TiendasPage() {
  const locations = await getLocations()

  const enriched = await Promise.all(
    locations.map(async (l) => {
      const [qr, productos] = await Promise.all([
        generateQrDataUrl(getLocationUrl(l.slug)),
        getProductosByLocationSlugPublic(l.slug),
      ])
      const conFoto = productos.find((p) => !p.imagen.includes("logo-dalizas"))
      return {
        location: l,
        qr,
        heroImage: conFoto?.imagen ?? MEDIA.heroBannerPrincipal,
        productCount: productos.length,
      }
    }),
  )

  return (
    <LayoutShell>
      <PageHero
        src={BANNERS.paginas.tiendas}
        alt="Panadería artesanal recién horneada Daliza"
        priority
        title={
          <>
            Nuestras <span className="italic text-[#E3C98F]">tiendas.</span>
          </>
        }
        description="Cuatro sedes en Bosa y Ciudadela Colsubsidio. Escanea el QR en el mostrador o elige tu sede aquí para ver solo lo disponible en ese punto."
      />

      <TiendasGrid items={enriched} />
    </LayoutShell>
  )
}
