import type { Metadata } from "next"
import { LayoutShell } from "@/components/layout-shell"
import { ProductGallery } from "@/components/product-gallery"
import { getProductosPublic } from "@/lib/data/productos"
import { isServicioProducto } from "@/lib/data/productos-helpers"

export const metadata: Metadata = {
  title: "Productos | Dalizas Pastelería Fina",
  description:
    "Galería de tortas, cupcakes, postres y más. Pastelería fina en Bogotá — Dalizas Pastelería Fina.",
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
