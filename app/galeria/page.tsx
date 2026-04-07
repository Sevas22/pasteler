import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { LayoutShell } from "@/components/layout-shell"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { GALLERY_ITEMS } from "@/lib/media"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Galería | Dalizas Pastelería Fina",
  description:
    "Galería de pastelería fina Daliza: tortas, postres, pan y viennoiserie. Toca una foto para ver la ficha del producto.",
}

export default function GaleriaPage() {
  return (
    <LayoutShell>
      <section className="bg-background pt-24 pb-16 sm:pt-28 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl px-1 text-center sm:px-0">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Galería Daliza</p>
            <h1 className="mt-2 text-balance font-serif text-3xl font-normal text-heading sm:text-4xl md:text-5xl">
              Arte dulce en cada detalle
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
              Un adelanto de nuestro catálogo. Cada imagen enlaza a la ficha del producto con precios y detalles
              del pedido.
            </p>
            <div className="mx-auto mt-8 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3">
              <Button asChild className="w-full min-h-[48px] sm:w-auto sm:min-h-10">
                <Link href="/productos">
                  Ver productos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full min-h-[48px] border-primary/30 text-primary sm:w-auto sm:min-h-10">
                <Link href="/contacto">Pedir cotización</Link>
              </Button>
            </div>
          </div>

          <div className="mt-14 grid auto-rows-[200px] grid-cols-2 gap-4 md:auto-rows-[240px] md:grid-cols-4">
            {GALLERY_ITEMS.map((img) => (
              <Link
                key={img.id}
                href={`/productos/${img.productSlug}`}
                aria-label={`Ver producto: ${img.nombre}`}
                className={cn(
                  "group relative block min-h-[160px] overflow-hidden rounded-xl border border-border/80 shadow-sm outline-offset-2 transition-shadow duration-300 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-primary sm:min-h-[200px] sm:rounded-2xl",
                  img.contain ? "bg-[#F8F5F2]" : "bg-muted",
                  img.size,
                )}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className={cn(
                    "transition-transform duration-500",
                    img.contain
                      ? "object-contain p-4 md:p-6 group-hover:scale-[1.02]"
                      : "object-cover group-hover:scale-105",
                  )}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent",
                    img.contain
                      ? "from-black/35 via-black/5"
                      : "from-black/55 via-black/10",
                  )}
                />
                <span className="absolute left-3 top-3 rounded-full bg-primary/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow-sm">
                  {img.tag}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </LayoutShell>
  )
}
