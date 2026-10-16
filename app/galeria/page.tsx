import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { LayoutShell } from "@/components/layout-shell"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { BANNERS, TORTAS_PERSONALIZADAS, buildGalleryItems } from "@/lib/media"
import { PageHero } from "@/components/page-hero"
import { getProductosPublic } from "@/lib/data/productos"
import { cn } from "@/lib/utils"
import { RevealStagger, RevealItem, Reveal } from "@/components/motion/reveal"

export const metadata: Metadata = {
  title: "Galería de tortas personalizadas, postres y pan",
  description:
    "Mira tortas personalizadas con papel de azúcar, cheesecakes, postres y pan artesanal de Daliza Pastelería Fina en Bogotá. Toca una foto para ver el producto.",
  alternates: { canonical: "/galeria" },
}

export default async function GaleriaPage() {
  const productos = await getProductosPublic()
  const GALLERY_ITEMS = buildGalleryItems(productos.filter((p) => !p.imagen.includes("logo-dalizas")))

  return (
    <LayoutShell>
      <PageHero
        src={BANNERS.paginas.galeria}
        alt="Panadería artesanal Daliza"
        priority
        title={
          <>
            Arte dulce en <span className="italic text-[#E3C98F]">cada detalle.</span>
          </>
        }
        description="Nuestras tortas personalizadas y un recorrido por el catálogo. Las fotos del catálogo enlazan a la ficha de cada producto."
      />

      <section data-no-section-divider className="bg-background pb-16 pt-10 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
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
          </Reveal>

          <div className="mt-14 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Tortas personalizadas</p>
            <p
              className="mx-auto mt-3 max-w-2xl text-balance text-3xl font-normal leading-tight text-heading sm:text-4xl"
              style={{ fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }}
            >
              Tu celebración, <span className="italic text-primary">hecha torta.</span>
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Cumpleaños, comuniones, bautizos y aniversarios. Cuéntanos tu idea y la diseñamos contigo.
            </p>
          </div>

          <RevealStagger className="mt-8 grid auto-rows-[150px] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[200px] md:auto-rows-[240px] md:grid-cols-4 md:gap-4">
            {TORTAS_PERSONALIZADAS.map((t) => (
              <RevealItem key={t.src} className={t.size}>
                <div className="relative h-full overflow-hidden rounded-xl border border-border/80 bg-muted shadow-sm sm:rounded-2xl">
                  <Image
                    src={t.src}
                    alt={t.alt}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </RevealItem>
            ))}
          </RevealStagger>

          <div className="mt-8 flex justify-center">
            <Button asChild className="min-h-[48px]">
              <Link href="/contacto">
                Quiero mi torta personalizada
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-20 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">Del catálogo</p>
            <p
              className="mx-auto mt-3 max-w-2xl text-balance text-3xl font-normal leading-tight text-heading sm:text-4xl"
              style={{ fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }}
            >
              Pan, postres y <span className="italic text-primary">más.</span>
            </p>
          </div>

          <RevealStagger className="mt-8 grid auto-rows-[200px] grid-flow-dense grid-cols-2 gap-4 md:auto-rows-[240px] md:grid-cols-4">
            {GALLERY_ITEMS.map((img) => (
              <RevealItem key={img.id} className={img.size}>
                <Link
                  href={`/productos/${img.productSlug}`}
                  aria-label={`Ver producto: ${img.nombre}`}
                  className={cn(
                    "group relative block h-full min-h-[160px] overflow-hidden rounded-xl border border-border/80 shadow-sm outline-offset-2 transition-shadow duration-300 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-primary sm:min-h-[200px] sm:rounded-2xl",
                    img.contain ? "bg-[#F8F5F2]" : "bg-muted",
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
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>
    </LayoutShell>
  )
}
