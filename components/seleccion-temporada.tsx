"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { formatCategoriaLabel } from "@/lib/data/productos-helpers"
import { DRIP_CLIP_STYLE } from "@/components/ornaments/drip"
import type { Producto } from "@/lib/types/producto"

type SeleccionTemporadaProps = {
  productos: Producto[]
}

const MAX_POR_CATEGORIA = 6

/** Agrupa los productos reales por categoría, en el orden en que ya vienen ordenados (sort_order). */
function agruparPorCategoria(productos: Producto[]) {
  const grupos: { categoria: string; items: Producto[] }[] = []
  for (const producto of productos) {
    let grupo = grupos.find((g) => g.categoria === producto.categoria)
    if (!grupo) {
      grupo = { categoria: producto.categoria, items: [] }
      grupos.push(grupo)
    }
    if (grupo.items.length < MAX_POR_CATEGORIA) grupo.items.push(producto)
  }
  return grupos
}

export function SeleccionTemporada({ productos }: SeleccionTemporadaProps) {
  const grupos = useMemo(() => agruparPorCategoria(productos.filter((p) => p.active)), [productos])
  const [activa, setActiva] = useState(0)

  if (grupos.length === 0) return null
  const grupo = grupos[activa]

  return (
    <section data-no-section-divider className="bg-background px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="relative aspect-[4/5] w-full max-w-sm" style={DRIP_CLIP_STYLE}>
            <Image
              src="/images/hero-banner-principal.png"
              alt="Pastelería Daliza — creaciones hechas a mano"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 420px"
            />
          </div>
          <p
            className="mt-6 max-w-sm text-3xl font-normal leading-tight text-heading sm:text-4xl"
            style={{ fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }}
          >
            Selección de temporada
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Una carta viva: cada pieza que ves aquí se hornea y se decora a mano en nuestro obrador de Bosa.
          </p>
          <Link
            href="/productos"
            className="mt-4 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Ver todo el catálogo
          </Link>
        </div>

        <div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Categorías">
            {grupos.map((g, i) => (
              <button
                key={g.categoria}
                type="button"
                role="tab"
                aria-selected={i === activa}
                onClick={() => setActiva(i)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  i === activa
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {formatCategoriaLabel(g.categoria)}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.ul
              key={grupo.categoria}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 divide-y divide-border/70 border-t border-border/70"
            >
              {grupo.items.map((producto) => (
                <li key={producto.slug}>
                  <Link
                    href={`/productos/${producto.slug}`}
                    className="group flex items-start justify-between gap-6 py-4 transition-[padding] duration-200 hover:pl-2"
                  >
                    <span>
                      <span className="flex flex-wrap items-center gap-2.5">
                        <span className="text-base font-medium text-foreground transition-colors group-hover:text-primary sm:text-lg">
                          {producto.nombre}
                        </span>
                        {producto.highlights.some((h) => h.toLowerCase().includes("por pedido")) ? (
                          <span className="inline-flex items-center rounded-full bg-[#D64545] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                            Por pedido
                          </span>
                        ) : null}
                      </span>
                      {producto.descripcion ? (
                        <span className="mt-1 block max-w-md text-sm leading-relaxed text-muted-foreground">
                          {producto.descripcion}
                        </span>
                      ) : null}
                    </span>
                    {producto.precio ? (
                      <span className="mt-0.5 shrink-0 text-sm text-muted-foreground">
                        ${producto.precio.toLocaleString("es-CO")}
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
