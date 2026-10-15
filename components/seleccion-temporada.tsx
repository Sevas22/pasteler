"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SERVICIOS_PRODUCTO, formatCategoriaLabel } from "@/lib/data/productos-helpers"
import { SoftCircle } from "@/components/ornaments/soft-circle"
import type { Producto, ServicioProducto } from "@/lib/types/producto"
import { cn } from "@/lib/utils"

type SeleccionTemporadaProps = {
  productos: Producto[]
}

const SERIF = { fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }
const POR_SERVICIO = 4

/** Productos destacados por servicio (si falta alguno se completa con otros que tengan foto). */
const DESTACADOS: Record<ServicioProducto, string[]> = {
  pasteleria: [
    "torta-con-cheesecake-de-maracuya",
    "torta-de-amapola",
    "torta-con-cheesecake-de-mora",
    "torta-con-cheesecake-de-oreo",
  ],
  reposteria: ["cheesecake-de-maracuya", "milhojas", "brazo-de-reina", "tartaleta-de-frutas"],
  panaderia: ["roscon-de-coco", "corazones", "hojaldre-de-bocadillo-y-queso", "pan-de-breva"],
}

const tieneFoto = (p: Producto) => !p.imagen.includes("logo-dalizas")

function seleccionar(productos: Producto[], servicio: ServicioProducto): Producto[] {
  const delServicio = productos.filter((p) => p.active && p.servicio === servicio && tieneFoto(p))
  const elegidos = DESTACADOS[servicio]
    .map((slug) => delServicio.find((p) => p.slug === slug))
    .filter((p): p is Producto => Boolean(p))
  for (const p of delServicio) {
    if (elegidos.length >= POR_SERVICIO) break
    if (!elegidos.includes(p)) elegidos.push(p)
  }
  return elegidos.slice(0, POR_SERVICIO)
}

export function SeleccionTemporada({ productos }: SeleccionTemporadaProps) {
  const pestanas = useMemo(
    () =>
      SERVICIOS_PRODUCTO.map((s) => ({ ...s, items: seleccionar(productos, s.slug) })).filter(
        (s) => s.items.length > 0,
      ),
    [productos],
  )
  const [activa, setActiva] = useState(() => Math.max(0, pestanas.findIndex((p) => p.slug === "pasteleria")))

  if (pestanas.length === 0) return null
  const actual = pestanas[Math.min(activa, pestanas.length - 1)]

  return (
    <section
      data-no-section-divider
      className="relative flex items-center overflow-hidden bg-background px-5 py-20 sm:min-h-[calc(100svh-4rem)] sm:px-8 sm:py-12 lg:px-12"
    >
      <SoftCircle color="gold" size={320} className="-right-20 -top-16" />
      <SoftCircle color="cherry" size={240} className="-left-16 bottom-0" />

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="text-center">
          <p className="flex items-center justify-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-primary">
            <span className="h-px w-8 bg-primary/50" aria-hidden />
            Selección de temporada
            <span className="h-px w-8 bg-primary/50" aria-hidden />
          </p>
          <p className="mt-4 text-balance text-4xl font-normal leading-[1.08] text-heading sm:text-5xl" style={SERIF}>
            Hecho a mano, <span className="italic text-primary">cada día.</span>
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Algunas de las piezas que se hornean y se decoran en nuestro obrador de Bosa.
          </p>

          <div className="mt-8 inline-flex rounded-full border border-border bg-card p-1 shadow-sm" role="tablist" aria-label="Servicios">
            {pestanas.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                role="tab"
                aria-selected={p.slug === actual.slug}
                onClick={() => setActiva(i)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-colors sm:px-7",
                  p.slug === actual.slug
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <ul key={actual.slug} className="hero-text-in mt-10 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-x-6">
          {actual.items.map((producto) => (
            <li key={producto.slug}>
              <Link href={`/productos/${producto.slug}`} className="group block">
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-muted shadow-[0_24px_50px_-28px_rgba(58,38,32,0.55)]">
                  <Image
                    src={producto.imagen}
                    alt={producto.nombre}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    sizes="(max-width: 1024px) 50vw, 280px"
                  />
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden
                  />
                  {producto.highlights.some((h) => h.toLowerCase().includes("por pedido")) ? (
                    <span className="absolute left-3 top-3 rounded-full bg-[#D64545] px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm">
                      Por pedido
                    </span>
                  ) : null}
                </div>
                <p className="mt-4 text-lg font-normal leading-snug text-heading transition-colors group-hover:text-primary" style={SERIF}>
                  {producto.nombre}
                </p>
                <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.14em] text-[#B08A4A]">
                  {formatCategoriaLabel(producto.categoria)}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center">
          <Link
            href={`/productos?servicio=${actual.slug}`}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            Ver toda la {actual.label.toLowerCase()}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
