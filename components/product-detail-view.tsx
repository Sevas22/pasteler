"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Check, MapPin, MessageCircle } from "lucide-react"
import type { Producto } from "@/lib/types/producto"
import { formatCategoriaLabel, getServicioLabel } from "@/lib/data/productos-helpers"
import { ProductQuickView } from "@/components/product-quick-view"

type ProductDetailViewProps = {
  producto: Producto
  relacionados: Producto[]
}

export function ProductDetailView({ producto, relacionados }: ProductDetailViewProps) {
  const [quickView, setQuickView] = useState<Producto | null>(null)
  const contactHref = `/contacto?servicio=${encodeURIComponent(producto.nombre)}`
  const waHref = `https://wa.me/573108336425?text=${encodeURIComponent(
    `Hola, me interesa información sobre: ${producto.nombre}`,
  )}`

  return (
    <article className="bg-background px-5 pb-20 pt-24 sm:px-8 sm:pt-28 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <nav className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-primary">Inicio</Link>
          <span aria-hidden>/</span>
          <Link href="/productos" className="transition-colors hover:text-primary">Productos</Link>
          <span aria-hidden>/</span>
          <span className="text-foreground">{producto.nombre}</span>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-[0_25px_55px_-25px_rgba(58,38,32,0.4)]">
              <Image src={producto.imagen} alt={producto.nombre} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 560px" />
            </div>

            {producto.imagenesExtra && producto.imagenesExtra.length > 0 ? (
              <div className="mt-4 grid grid-cols-3 gap-3">
                {producto.imagenesExtra.map((src, i) => (
                  <div key={src} className="relative aspect-square overflow-hidden rounded-lg">
                    <Image
                      src={src}
                      alt={`${producto.nombre} — imagen ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="180px"
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-primary/80">
              <span>{formatCategoriaLabel(producto.categoria)}</span>
              <span className="h-1 w-1 rounded-full bg-primary/50" aria-hidden />
              <span>{getServicioLabel(producto.servicio)}</span>
            </p>

            <h1
              className="mt-3 text-balance text-4xl font-normal leading-tight text-heading sm:text-5xl"
              style={{ fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }}
            >
              {producto.nombre}
            </h1>

            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              {producto.descripcionLarga || producto.descripcion}
            </p>

            {producto.sedes.length > 0 ? (
              <Link
                href="/tiendas"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                <MapPin className="h-3.5 w-3.5" aria-hidden />
                Disponible en {producto.sedes.length} sede{producto.sedes.length > 1 ? "s" : ""}
              </Link>
            ) : null}

            {producto.highlights.length > 0 ? (
              <ul className="mt-6 flex flex-col gap-2 border-t border-border/70 pt-6">
                {producto.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                    {h}
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-8 rounded-2xl border border-border bg-card p-6">
              {producto.precio ? (
                <p
                  className="text-3xl font-normal text-heading"
                  style={{ fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }}
                >
                  ${producto.precio.toLocaleString("es-CO")}
                </p>
              ) : (
                <p
                  className="text-xl italic font-normal text-heading"
                  style={{ fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }}
                >
                  Precio a consultar
                </p>
              )}
              <div className="mt-5 flex flex-col gap-3">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  Pedir por WhatsApp
                </a>
                <Link
                  href={contactHref}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-border px-7 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  Solicitar cotización
                </Link>
              </div>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                Indica fecha, porciones y esta referencia — te confirmamos disponibilidad y valor.
              </p>
            </div>
          </div>
        </div>

        {relacionados.length > 0 ? (
          <section className="mt-20 border-t border-border/70 pt-14">
            <p
              className="text-2xl font-normal text-heading"
              style={{ fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }}
            >
              También te puede gustar
            </p>
            <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-9 sm:grid-cols-3">
              {relacionados.map((p) => (
                <button
                  key={p.slug}
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
                      sizes="(max-width: 640px) 50vw, 33vw"
                    />
                  </div>
                  <p className="mt-3 text-sm font-medium text-foreground transition-colors group-hover:text-primary sm:text-base">
                    {p.nombre}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{formatCategoriaLabel(p.categoria)}</p>
                </button>
              ))}
            </div>
          </section>
        ) : null}
      </div>

      <ProductQuickView producto={quickView} onOpenChange={(open) => !open && setQuickView(null)} />
    </article>
  )
}
