import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { LayoutShell } from "@/components/layout-shell"
import { ProductDetailView } from "@/components/product-detail-view"
import { PRODUCTOS, getProductoBySlug } from "@/lib/data/productos"

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return PRODUCTOS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const producto = getProductoBySlug(slug)
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
  const producto = getProductoBySlug(slug)
  if (!producto) {
    notFound()
  }

  return (
    <LayoutShell>
      <div className="h-20" aria-hidden />
      <nav className="mx-auto max-w-7xl px-4 pt-4 text-sm text-muted-foreground sm:px-6 lg:px-8">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="transition-colors hover:text-primary">
              Inicio
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/productos" className="transition-colors hover:text-primary">
              Productos
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="font-medium text-foreground">{producto.nombre}</li>
        </ol>
      </nav>
      <ProductDetailView producto={producto} />
    </LayoutShell>
  )
}
