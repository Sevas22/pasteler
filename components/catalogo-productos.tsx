"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { ImageIcon } from "lucide-react"
import { SERVICIOS_PRODUCTO, formatCategoriaLabel } from "@/lib/data/productos-helpers"
import type { Producto, ServicioProducto } from "@/lib/types/producto"
import { ProductQuickView } from "@/components/product-quick-view"
import { cn } from "@/lib/utils"

export type ServicioFiltro = ServicioProducto | "todos"

type Props = {
  productos: Producto[]
  servicio: ServicioFiltro
  onServicioChange: (servicio: ServicioFiltro) => void
}

/** Filtros por servicio y categoría + cuadrícula de productos (catálogo general y página de cada sede). */
export function CatalogoProductos({ productos, servicio, onServicioChange }: Props) {
  const [filter, setFilter] = useState<string>("todas")
  const [quickView, setQuickView] = useState<Producto | null>(null)

  // Solo los servicios que tienen productos (una sede puede no tener panadería, por ejemplo)
  const pills = useMemo(
    () => [
      ...SERVICIOS_PRODUCTO.filter((s) => productos.some((p) => p.servicio === s.slug)),
      { slug: "todos" as const, label: "Todos" },
    ],
    [productos],
  )

  const itemsByServicio = useMemo(() => {
    if (servicio === "todos") return productos
    return productos.filter((p) => p.servicio === servicio)
  }, [productos, servicio])

  const categorias = useMemo(() => {
    const s = new Set(itemsByServicio.map((p) => p.categoria))
    return ["todas", ...Array.from(s)]
  }, [itemsByServicio])

  const visible = useMemo(() => {
    if (filter === "todas") return itemsByServicio
    return itemsByServicio.filter((p) => p.categoria === filter)
  }, [itemsByServicio, filter])

  return (
    <>
      {pills.length > 2 ? (
        <div className="flex flex-wrap gap-2">
          {pills.map((s) => (
            <button
              key={s.slug}
              type="button"
              onClick={() => {
                onServicioChange(s.slug)
                setFilter("todas")
              }}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                servicio === s.slug
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      ) : null}

      {categorias.length > 2 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {categorias.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                filter === c
                  ? "border-primary text-primary"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-primary",
              )}
            >
              {c === "todas" ? "Todas las categorías" : formatCategoriaLabel(c)}
            </button>
          ))}
        </div>
      ) : null}

      {visible.length === 0 ? (
        <div className="mt-16 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-20 text-center">
          <ImageIcon className="h-10 w-10 text-muted-foreground" aria-hidden />
          <p className="mt-4 text-muted-foreground">No hay productos en esta categoría.</p>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={`${servicio}-${filter}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3"
          >
            {visible.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setQuickView(p)}
                className="group flex h-full flex-col text-left"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted">
                  <Image
                    src={p.imagen}
                    alt={p.nombre}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <p className="mt-3 line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-primary sm:min-h-[3rem] sm:text-base">
                    {p.nombre}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">{formatCategoriaLabel(p.categoria)}</p>
                  <p className="mt-auto pt-1.5 text-sm font-medium text-primary">
                    {p.precio ? `$${p.precio.toLocaleString("es-CO")}` : "Consultar"}
                  </p>
                </div>
              </button>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      <ProductQuickView producto={quickView} onOpenChange={(open) => !open && setQuickView(null)} />
    </>
  )
}
