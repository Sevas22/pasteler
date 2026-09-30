import { ProductForm } from "@/components/admin/product-form"
import { BackLink } from "@/components/admin/back-link"
import { getLocations } from "@/lib/data/locations"

export default async function NuevoProductoPage() {
  const locations = await getLocations()
  return (
    <div className="max-w-5xl">
      <BackLink href="/admin/productos" label="Productos" />
      <h1 className="font-serif text-3xl font-normal text-heading">Nuevo producto</h1>
      <p className="mt-1 text-muted-foreground">Completa la ficha y elige en qué sucursales aparece.</p>
      <div className="mt-8">
        <ProductForm locations={locations} />
      </div>
    </div>
  )
}
