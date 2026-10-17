import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { LayoutShell } from "@/components/layout-shell"
import { ProductDetailView } from "@/components/product-detail-view"
import { JsonLd } from "@/components/json-ld"
import { grafo, migasSchema, productoSchema } from "@/lib/seo"
import { getProductoBySlugPublic, getOtrosProductosPublic, getProductosPublic } from "@/lib/data/productos"

type Props = {
  params: Promise<{ slug: string }>
}

/** Fichas pre-generadas (servidas desde caché). Un producto nuevo se genera en su primera visita. */
export async function generateStaticParams() {
  return (await getProductosPublic()).filter((p) => p.active).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const producto = await getProductoBySlugPublic(slug)
  if (!producto) {
    return { title: "Producto" }
  }
  const descripcion = `${producto.nombre} en Daliza Pastelería Fina, Bosa, Bogotá. ${producto.descripcion}`.slice(0, 300)
  return {
    title: `${producto.nombre} en Bogotá`,
    description: descripcion,
    alternates: { canonical: `/productos/${producto.slug}` },
    openGraph: {
      type: "website",
      title: `${producto.nombre} | Daliza Pastelería Fina`,
      description: producto.descripcion,
      url: `/productos/${producto.slug}`,
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
      <JsonLd
        data={grafo(
          productoSchema(producto),
          migasSchema([
            { nombre: "Inicio", ruta: "/" },
            { nombre: "Productos", ruta: "/productos" },
            { nombre: producto.nombre, ruta: `/productos/${producto.slug}` },
          ]),
        )}
      />
      <ProductDetailView producto={producto} relacionados={relacionados} />
    </LayoutShell>
  )
}
