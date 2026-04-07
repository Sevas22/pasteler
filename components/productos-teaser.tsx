import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { MEDIA } from "@/lib/media"
import { cn } from "@/lib/utils"

const preview = [
  {
    id: "torta",
    src: MEDIA.productos.torta,
    alt: "Torta de chocolate con ganache y fresas",
    label: "Pastelería",
    href: "/productos/servicios/pasteleria",
    gridClass:
      "col-span-1 min-h-[220px] sm:col-span-2 sm:row-span-2 sm:min-h-[300px] md:min-h-0",
  },
  {
    id: "mousse",
    src: MEDIA.productos.cupcakes,
    alt: "Mousse de fresa con decoración elegante",
    label: "Repostería",
    href: "/productos/servicios/reposteria",
    gridClass: "col-span-1 min-h-[170px] sm:col-span-2 sm:min-h-[160px] md:min-h-0",
  },
  {
    id: "cheesecake",
    src: MEDIA.productos.postre,
    alt: "Cheesecake de maracuyá",
    label: "Postres",
    href: "/productos/servicios/reposteria",
    gridClass: "col-span-1 min-h-[150px] sm:min-h-[160px] md:min-h-0",
  },
  {
    id: "tartas",
    src: MEDIA.productos.galletas,
    alt: "Tartas de fruta fresca",
    label: "Tartas",
    href: "/productos/servicios/reposteria",
    gridClass: "col-span-1 min-h-[150px] sm:min-h-[160px] md:min-h-0",
  },
  {
    id: "brazo",
    src: "/images/producto-brazo-gitano-daliza.png",
    alt: "Brazo de reina Daliza",
    label: "Panadería",
    href: "/productos/servicios/panaderia",
    gridClass: "col-span-1 min-h-[150px] sm:min-h-[160px] md:min-h-0",
  },
  {
    id: "tiramisu",
    src: "/images/producto-pastel-tiramisu-daliza.png",
    alt: "Pastel estilo tiramisú Daliza",
    label: "Pastelería",
    href: "/productos/servicios/pasteleria",
    gridClass: "col-span-1 min-h-[150px] sm:min-h-[160px] md:min-h-0",
  },
] as const

export function ProductosTeaser() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-end md:justify-between md:text-left">
          <div className="max-w-xl px-1 sm:px-0">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Productos
            </p>
            <h2 className="mt-2 text-balance font-serif text-3xl font-normal text-heading sm:text-4xl md:text-5xl">
              Dulces hechos con dedicación
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Tortas, cupcakes, postres y más. Explora la galería completa y descubre lo que podemos
              crear para ti.
            </p>
          </div>
          <Button asChild size="lg" className="w-full shrink-0 sm:w-auto">
            <Link href="/galeria">
              Ver galería
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div
          className={cn(
            "mt-10 grid grid-cols-1 gap-3.5 sm:mt-12 sm:grid-cols-2 sm:gap-4 sm:auto-rows-[minmax(140px,auto)]",
            "md:auto-rows-[180px] md:grid-cols-4 md:gap-4",
          )}
        >
          {preview.map((p) => (
            <Link
              key={p.id}
              href={p.href}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-border/80 bg-muted shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg",
                p.gridClass,
              )}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute left-3 top-3 rounded-full bg-primary/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                {p.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
