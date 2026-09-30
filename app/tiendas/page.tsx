import type { Metadata } from "next"
import { LayoutShell } from "@/components/layout-shell"
import { TiendasGrid } from "@/components/tiendas-grid"
import { getLocations } from "@/lib/data/locations"
import { getProductosByLocationSlugPublic } from "@/lib/data/productos"
import { generateQrDataUrl, getLocationUrl } from "@/lib/qr"
import { MEDIA } from "@/lib/media"

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
      <section data-no-section-divider className="bg-background px-5 pb-10 pt-28 sm:px-8 sm:pt-32 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-[1.3fr_1fr] sm:items-end sm:gap-10">
          <h1
            className="text-balance text-5xl font-normal leading-[1.05] text-heading sm:text-6xl"
            style={{ fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }}
          >
            Nuestras <span className="italic text-primary">tiendas.</span>
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Cuatro sedes en Bosa y Ciudadela Colsubsidio. Escanea el QR en el mostrador o elige tu sede aquí para
            ver solo lo disponible en ese punto.
          </p>
        </div>
      </section>

      <TiendasGrid items={enriched} />
    </LayoutShell>
  )
}
