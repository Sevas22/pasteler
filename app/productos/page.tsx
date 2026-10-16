import type { Metadata } from "next"
import { LayoutShell } from "@/components/layout-shell"
import { ProductGallery } from "@/components/product-gallery"
import { getProductosPublic } from "@/lib/data/productos"
import { isServicioProducto } from "@/lib/data/productos-helpers"

export const metadata: Metadata = {
  title: "Tortas, postres, repostería y panadería en Bogotá",
  description:
    "Catálogo Daliza: tortas, cheesecakes, postres, repostería y pan artesanal (almojábanas, hojaldres, resobados y más). Cotiza por WhatsApp en Bosa, Bogotá.",
  alternates: { canonical: "/productos" },
}

type ProductosPageProps = {
  searchParams: Promise<{ servicio?: string }>
}

export default async function ProductosPage({ searchParams }: ProductosPageProps) {
  const [productos, params] = await Promise.all([getProductosPublic(), searchParams])
  const servicioValido = isServicioProducto(params.servicio ?? "")
  const initialServicio = servicioValido ? (params.servicio as never) : "todos"
  return (
    <LayoutShell>
      <ProductGallery productos={productos} initialServicio={initialServicio} />
    </LayoutShell>
  )
}
