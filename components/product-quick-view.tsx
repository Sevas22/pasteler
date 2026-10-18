"use client"

import Link from "next/link"
import { ArrowRight, X } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { formatCategoriaLabel, getServicioLabel } from "@/lib/data/productos-helpers"
import type { Producto } from "@/lib/types/producto"
import { WhatsAppCTA } from "@/components/whatsapp-cta"
import { HeroCarouselBackground, type HeroCarouselSlide } from "@/components/hero-carousel-background"

type ProductQuickViewProps = {
  producto: Producto | null
  onOpenChange: (open: boolean) => void
}

/** Foto principal + extras, en orden y sin repetir. */
function slidesDe(producto: Producto): HeroCarouselSlide[] {
  const fotos = [...new Set([producto.imagen, ...(producto.imagenesExtra ?? [])])].filter(Boolean)
  // Todas las fotos completas, tal como se ven en la ficha (sin recortar a una sola porción)
  return fotos.map((src) => ({ src, alt: producto.nombre }))
}

/** Vista rápida de un producto en modal — sin salir del catálogo. */
export function ProductQuickView({ producto, onOpenChange }: ProductQuickViewProps) {
  return (
    <Dialog open={Boolean(producto)} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="grid w-[calc(100%-1.5rem)] max-w-4xl grid-cols-1 gap-0 overflow-hidden rounded-2xl border-brand-gold/30 bg-card p-0 sm:max-w-[calc(100%-2rem)] sm:grid-cols-2 md:max-w-4xl"
      >
        {producto ? (
          <>
            <DialogTitle className="sr-only">{producto.nombre}</DialogTitle>

            <div className="relative h-56 w-full overflow-hidden sm:h-full">
              <HeroCarouselBackground
                key={producto.slug}
                slides={slidesDe(producto)}
                intervalMs={3500}
                ariaLabel={`Fotos de ${producto.nombre}`}
                sizes="(max-width: 640px) 100vw, 50vw"
                dotsContainerClassName="bottom-3"
              />
            </div>

            <div className="relative flex flex-col justify-center p-6 sm:p-10">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-brand-gold/50 text-heading transition-colors hover:bg-secondary sm:right-6 sm:top-6"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Cerrar</span>
              </button>

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Una creación Daliza</p>
              <h2 className="mt-3 text-balance font-serif text-3xl font-normal leading-tight text-heading sm:text-4xl">
                {producto.nombre}
              </h2>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#C9A96E]">
                {formatCategoriaLabel(producto.categoria)} · {getServicioLabel(producto.servicio)}
              </p>

              <p className="mt-4 border-t border-border pt-4 text-base leading-relaxed text-foreground">
                {producto.descripcion}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Consulta el tamaño, el valor y la disponibilidad para tu fecha. Si tienes alguna alergia,
                confirma los ingredientes con la tienda.
              </p>

              <div className="mt-6 flex flex-col items-start gap-3">
                <WhatsAppCTA
                  mensaje={`Hola, quiero cotizar: ${producto.nombre}`}
                  ruta={`/productos/${producto.slug}`}
                  sedesSlugs={producto.sedes}
                  className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary-hover sm:w-auto"
                >
                  Consultar esta creación
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </WhatsAppCTA>
                <Link
                  href={`/productos/${producto.slug}`}
                  className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  Ver ficha completa
                </Link>
              </div>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
