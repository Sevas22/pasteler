import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { LayoutShell } from "@/components/layout-shell"
import { ProductGallery } from "@/components/product-gallery"
import {
  SERVICIOS_PRODUCTO,
  getServicioLabel,
  isServicioProducto,
} from "@/lib/data/productos"

type Props = {
  params: Promise<{ servicio: string }>
}

export function generateStaticParams() {
  return SERVICIOS_PRODUCTO.map((s) => ({ servicio: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { servicio } = await params
  if (!isServicioProducto(servicio)) {
    return { title: "Servicio | Dalizas" }
  }
  const title = `${getServicioLabel(servicio)} | Ecommerce Dalizas`
  return {
    title,
    description: `Catálogo de ${getServicioLabel(servicio).toLowerCase()} con categorías y productos Dalizas.`,
  }
}

export default async function ServicioEcommercePage({ params }: Props) {
  const { servicio } = await params
  if (!isServicioProducto(servicio)) {
    notFound()
  }

  return (
    <LayoutShell>
      <div className="mx-auto max-w-7xl px-6 pt-28 pb-2 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-primary">
          Ecommerce de {getServicioLabel(servicio)}
        </p>
      </div>
      <ProductGallery initialServicio={servicio} lockServicio className="pt-6" />
    </LayoutShell>
  )
}
