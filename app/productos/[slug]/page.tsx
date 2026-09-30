import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { LayoutShell } from "@/components/layout-shell"
import { ProductDetailView } from "@/components/product-detail-view"
import { getProductoBySlugPublic, getOtrosProductosPublic } from "@/lib/data/productos"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const producto = await getProductoBySlugPublic(slug)
  if (!producto) {
    return { title: "Producto | Dalizas" }
  }
  return {
    title: `${producto.nombre} | Dalizas Pastelería Fina`,
    description: producto.descripcion,
    openGraph: {
      title: `${producto.nombre} | Dalizas`,
      description: producto.descripcion,
      images: [{ url: producto.imagen, alt: producto.nombre }],
    },
  }
}

export default async function ProductoDetallePage({ params }: Props) {
  const { slug } = await params
  const producto = await getProductoBySlugPublic(slug)
  if (!producto) {
    notFound()
  }
  const relacionados = await getOtrosProductosPublic(producto.slug, 3)

  return (
    <LayoutShell>
      <ProductDetailView producto={producto} relacionados={relacionados} />
    </LayoutShell>
  )
}
