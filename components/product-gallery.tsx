"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { SERVICIOS_PRODUCTO, formatCategoriaLabel } from "@/lib/data/productos-helpers"
import type { Producto, ServicioProducto } from "@/lib/types/producto"
import { ProductQuickView } from "@/components/product-quick-view"
import { ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type ProductGalleryProps = {
  productos: Producto[]
  initialServicio?: ServicioProducto | "todos"
  className?: string
}

const SERVICIO_PILLS = [{ slug: "todos" as const, label: "Todos" }, ...SERVICIOS_PRODUCTO]

export function ProductGallery({
  productos,
  initialServicio = "todos",
  className,
}: ProductGalleryProps) {
  const [servicio, setServicio] = useState<ServicioProducto | "todos">(initialServicio)
  const [filter, setFilter] = useState<string>("todas")
  const [quickView, setQuickView] = useState<Producto | null>(null)

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
    <section data-no-section-divider className={cn("bg-background px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:px-12", className)}>
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 sm:grid-cols-[1.3fr_1fr] sm:items-end sm:gap-10">
          <h1
            className="text-balance text-5xl font-normal leading-[1.05] text-heading sm:text-6xl"
            style={{ fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }}
          >
            Nuestros <span className="italic text-primary">productos.</span>
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            {productos.length} creaciones hechas a mano. Filtra por servicio o categoría para encontrar lo que
            buscas.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {SERVICIO_PILLS.map((s) => (
            <button
              key={s.slug}
              type="button"
              onClick={() => {
                setServicio(s.slug)
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

        {categorias.length > 1 ? (
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
              className="mt-10 grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3 lg:grid-cols-4"
            >
              {visible.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setQuickView(p)}
                  className="group flex flex-col text-left"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted">
                    <Image
                      src={p.imagen}
                      alt={p.nombre}
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                  <p className="mt-3 text-sm font-medium text-foreground transition-colors group-hover:text-primary sm:text-base">
                    {p.nombre}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{formatCategoriaLabel(p.categoria)}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {p.precio ? `$${p.precio.toLocaleString("es-CO")}` : "Consultar"}
                  </p>
                </button>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <ProductQuickView producto={quickView} onOpenChange={(open) => !open && setQuickView(null)} />
    </section>
  )
}
