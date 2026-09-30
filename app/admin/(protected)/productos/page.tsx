import Link from "next/link"
import { Suspense } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductList } from "@/components/admin/product-list"
import { ToastOnParam } from "@/components/admin/toast-on-param"
import { getProductos } from "@/lib/data/productos"
import { getLocations } from "@/lib/data/locations"

export default async function AdminProductosPage() {
  const [productos, locations] = await Promise.all([getProductos(), getLocations()])
  const locationNameBySlug = Object.fromEntries(locations.map((l) => [l.slug, l.name]))

  return (
    <div>
      <Suspense>
        <ToastOnParam
          messages={{ created: "Producto creado con éxito.", updated: "Producto actualizado con éxito." }}
        />
      </Suspense>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-normal text-heading">Productos</h1>
          <p className="mt-1 text-muted-foreground">{productos.length} productos en el catálogo.</p>
        </div>
        <Button asChild>
          <Link href="/admin/productos/nuevo">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo producto
          </Link>
        </Button>
      </div>

      <div className="mt-8">
        <ProductList productos={productos} locationNameBySlug={locationNameBySlug} />
      </div>
    </div>
  )
}
