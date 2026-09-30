import { notFound } from "next/navigation"
import { ProductForm } from "@/components/admin/product-form"
import { BackLink } from "@/components/admin/back-link"
import { getProductoById } from "@/lib/data/productos"
import { getLocations } from "@/lib/data/locations"

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditarProductoPage({ params }: Props) {
  const { id } = await params
  const [producto, locations] = await Promise.all([getProductoById(id), getLocations()])
  if (!producto) notFound()

  return (
    <div className="max-w-5xl">
      <BackLink href="/admin/productos" label="Productos" />
      <h1 className="font-serif text-3xl font-normal text-heading">Editar producto</h1>
      <p className="mt-1 text-muted-foreground">{producto.nombre}</p>
      <div className="mt-8">
        <ProductForm producto={producto} locations={locations} />
      </div>
    </div>
  )
}
