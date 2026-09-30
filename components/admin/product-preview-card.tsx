import Image from "next/image"
import { Eye } from "lucide-react"
import { formatCategoriaLabel, getServicioLabel } from "@/lib/data/productos-helpers"
import type { ServicioProducto } from "@/lib/types/producto"

type ProductPreviewCardProps = {
  nombre: string
  categoria: string
  servicio: ServicioProducto
  imagen: string
  precio: string
}

/** Así se ve la ficha en el catálogo público — se actualiza mientras editas. */
export function ProductPreviewCard({ nombre, categoria, servicio, imagen, precio }: ProductPreviewCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <Eye className="h-3.5 w-3.5" />
        Así se ve en el sitio
      </div>
      <div className="group relative isolate flex w-full flex-col overflow-hidden rounded-xl border border-black/10 bg-neutral-950 shadow-md">
        <div className="relative h-40 w-full overflow-hidden bg-muted">
          {imagen ? (
            <Image src={imagen} alt="" fill className="object-cover" unoptimized />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-white/40">Sin imagen</div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4">
            <p className="truncate font-serif text-lg font-normal text-white">{nombre || "Nombre del producto"}</p>
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <span className="inline-flex rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold text-primary-foreground">
                {categoria ? formatCategoriaLabel(categoria) : "Categoría"}
              </span>
              <span className="inline-flex rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-semibold text-neutral-800">
                {getServicioLabel(servicio)}
              </span>
            </div>
          </div>
        </div>
      </div>
      {precio ? (
        <p className="mt-3 text-sm text-muted-foreground">
          Precio: <span className="font-semibold text-foreground">${Number(precio).toLocaleString("es-CO")}</span>
        </p>
      ) : null}
    </div>
  )
}
