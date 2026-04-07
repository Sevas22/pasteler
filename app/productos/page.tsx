import type { Metadata } from "next"
import { LayoutShell } from "@/components/layout-shell"
import { ProductGallery } from "@/components/product-gallery"

export const metadata: Metadata = {
  title: "Productos | Dalizas Pastelería Fina",
  description:
    "Galería de tortas, cupcakes, postres y más. Pastelería fina en Bogotá — Dalizas Pastelería Fina.",
}

export default function ProductosPage() {
  return (
    <LayoutShell>
      <ProductGallery />
    </LayoutShell>
  )
}
