import { ProductForm } from "@/components/admin/product-form"
import { BackLink } from "@/components/admin/back-link"
import { getLocations } from "@/lib/data/locations"
import { getProductos } from "@/lib/data/productos"
import { categoriasExistentes } from "@/lib/data/productos-helpers"

export default async function NuevoProductoPage() {
  const [locations, productos] = await Promise.all([getLocations(), getProductos()])
  return (
    <div className="max-w-5xl">
      <BackLink href="/admin/productos" label="Productos" />
      <h1 className="font-serif text-3xl font-normal text-heading">Nuevo producto</h1>
      <p className="mt-1 text-muted-foreground">Completa la ficha y elige en qué sucursales aparece.</p>
      <div className="mt-8">
        <ProductForm locations={locations} categorias={categoriasExistentes(productos)} />
      </div>
    </div>
  )
}
