"use client"

import { useMemo, useState } from "react"
import {
  PRODUCTOS,
  SERVICIOS_PRODUCTO,
  formatCategoriaLabel,
  getServicioLabel,
  type ServicioProducto,
} from "@/lib/data/productos"
import { CatalogFichaButton, CatalogFichaLink } from "@/components/catalog-ficha-card"
import { MEDIA } from "@/lib/media"
import { Button } from "@/components/ui/button"
import { Filter, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type ProductGalleryProps = {
  initialServicio?: ServicioProducto | "todos"
  lockServicio?: boolean
  className?: string
}

export function ProductGallery({ initialServicio = "todos", lockServicio = false, className }: ProductGalleryProps) {
  const items = PRODUCTOS
  const [servicio, setServicio] = useState<ServicioProducto | "todos" | null>(
    lockServicio ? initialServicio : null,
  )
  const [filter, setFilter] = useState<string>("todas")
  const servicioMeta: Record<ServicioProducto | "todos", { label: string; desc: string; image: string }> = {
    todos: {
      label: "Todos nuestros productos",
      desc: "Explora todo el catálogo Daliza en una sola vista.",
      image: MEDIA.servicioBanners.todos,
    },
    panaderia: {
      label: "Panadería",
      desc: "Panes artesanales, masa madre y viennoiserie horneada al día.",
      image: MEDIA.servicioBanners.panaderia,
    },
    pasteleria: {
      label: "Pastelería",
      desc: "Tortas de celebración y diseños elegantes para eventos especiales.",
      image: MEDIA.servicioBanners.pasteleria,
    },
    reposteria: {
      label: "Repostería",
      desc: "Cupcakes, galletas y postres para mesas dulces y regalos.",
      image: MEDIA.servicioBanners.reposteria,
    },
  }

  const itemsByServicio = useMemo(() => {
    if (!servicio) return []
    if (servicio === "todos") return items
    return items.filter((p) => p.servicio === servicio)
  }, [items, servicio])

  const categorias = useMemo(() => {
    const s = new Set(itemsByServicio.map((p) => p.categoria))
    return ["todas", ...Array.from(s)]
  }, [itemsByServicio])

  const visible = useMemo(() => {
    if (filter === "todas") return itemsByServicio
    return itemsByServicio.filter((p) => p.categoria === filter)
  }, [itemsByServicio, filter])

  return (
    <section className={cn("bg-background pt-24 pb-16 sm:pt-28 sm:pb-20 md:pb-24", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl px-1 text-center sm:px-0">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Nuestros productos
          </p>
          <h1 className="mt-2 text-balance font-serif text-3xl font-normal text-heading sm:text-4xl md:text-5xl">
            Nuestros productos
          </h1>
        </div>

        {!lockServicio && !servicio ? (
          <div className="mx-auto mt-8 max-w-2xl rounded-[1.25rem] border border-border/60 bg-white px-5 py-7 text-center shadow-sm sm:mt-10 sm:px-10 sm:py-10">
            <p className="font-serif text-2xl font-normal text-heading md:text-3xl">Selecciona una ficha de servicio</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
              Elige Panadería, Pastelería, Repostería o Todos nuestros productos para ver el catálogo.
            </p>
          </div>
        ) : null}

        {!lockServicio && (
          <div className={cn(!servicio ? "mt-6 sm:mt-8" : "mt-8 sm:mt-10")}>
            <div className="grid items-stretch gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
              {(["todos", ...SERVICIOS_PRODUCTO.map((s) => s.slug)] as const).map((s) => {
                const pillPair =
                  s === "todos"
                    ? { left: "Daliza", right: "Todo el catálogo" }
                    : s === "panaderia"
                      ? { left: "Panadería", right: "Catálogo" }
                      : s === "pasteleria"
                        ? { left: "Pastelería", right: "Catálogo" }
                        : { left: "Repostería", right: "Catálogo" }
                return (
                  <CatalogFichaButton
                    key={s}
                    contentLayout="split"
                    showBrandLogoOnImage={false}
                    imageFit="contain"
                    selected={servicio === s}
                    imageSrc={servicioMeta[s].image}
                    imageAlt={servicioMeta[s].label}
                    title={servicioMeta[s].label}
                    preview={servicioMeta[s].desc}
                    pillLeft={pillPair.left}
                    pillRight={pillPair.right}
                    sizes="(max-width: 768px) 100vw, 25vw"
                    onClick={() => {
                      setServicio(s)
                      setFilter("todas")
                    }}
                  />
                )
              })}
            </div>

            {servicio && servicio !== "todos" && (
              <div className="mt-4 text-center">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-primary/30 text-primary"
                  onClick={() => {
                    setServicio("todos")
                    setFilter("todas")
                  }}
                >
                  Ver todos los servicios
                </Button>
              </div>
            )}
          </div>
        )}

        {servicio && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:mt-12">
            <span className="mr-2 flex items-center gap-1 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              Categoría:
            </span>
            {categorias.map((c) => (
              <Button
                key={c}
                type="button"
                variant={filter === c ? "default" : "outline"}
                size="sm"
                className={
                  filter === c
                    ? "bg-primary text-primary-foreground"
                    : "border-primary/30 text-primary"
                }
                onClick={() => setFilter(c)}
              >
                {c === "todas" ? "Todas" : c}
              </Button>
            ))}
          </div>
        )}

        {servicio && visible.length === 0 ? (
          <div className="mt-16 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card py-20 text-center">
            <ImageIcon className="h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">No hay productos en esta categoría.</p>
          </div>
        ) : servicio ? (
          <div className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
            {visible.map((p) => (
              <CatalogFichaLink
                key={p.id}
                href={`/productos/${p.slug}`}
                imageSrc={p.imagen}
                imageAlt={p.nombre}
                title={p.nombre}
                pillLeft={formatCategoriaLabel(p.categoria)}
                pillRight={getServicioLabel(p.servicio)}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
