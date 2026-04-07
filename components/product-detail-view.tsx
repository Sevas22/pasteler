import Image from "next/image"
import Link from "next/link"
import { Check, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Producto } from "@/lib/types/producto"
import { getOtrosProductos, getServicioLabel } from "@/lib/data/productos"
import { cn } from "@/lib/utils"

type ProductDetailViewProps = {
  producto: Producto
}

export function ProductDetailView({ producto }: ProductDetailViewProps) {
  const relacionados = getOtrosProductos(producto.slug, 3)
  const contactHref = `/contacto?servicio=${encodeURIComponent(producto.nombre)}`
  const waHref = `https://wa.me/573108336425?text=${encodeURIComponent(
    `Hola, me interesa información sobre: ${producto.nombre}`,
  )}`

  return (
    <article>
      <div className="relative aspect-[5/4] min-h-[240px] w-full overflow-hidden bg-muted sm:aspect-[21/9] sm:min-h-[220px] md:aspect-[2.4/1] md:min-h-[320px]">
        <Image
          src={producto.imagen}
          alt=""
          fill
          priority
          className="object-contain object-center sm:object-cover sm:object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent md:via-black/25"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A96E]">
            Pastelería fina · Bogotá
          </p>
          <h1 className="mt-2 font-serif text-3xl font-normal tracking-normal text-balance text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.65)] md:text-5xl">
            {producto.nombre}
          </h1>
          <div
            className="mt-3 h-0.5 w-14 rounded-full bg-brand-gold md:w-16"
            aria-hidden
          />
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <p className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-medium capitalize text-primary-foreground shadow-sm">
              {producto.categoria}
            </p>
            <p className="inline-block rounded-full border border-white/35 bg-white/90 px-3 py-1 text-xs font-semibold text-primary shadow-sm">
              {getServicioLabel(producto.servicio)}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-16 lg:items-start">
          <div className="min-w-0 space-y-8">
            <div>
              <h2 className="font-serif text-xl font-normal text-heading md:text-2xl">Sobre este servicio</h2>
              <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                {producto.descripcionLarga}
              </p>
            </div>

            <div className="rounded-2xl border border-brand-gold/25 bg-card/80 p-6 shadow-sm ring-1 ring-brand-gold/10">
              <h3 className="font-serif text-lg font-normal text-heading">Incluye / opciones</h3>
              <ul className="mt-4 space-y-3">
                {producto.highlights.map((line) => (
                  <li key={line} className="flex gap-3 text-sm text-muted-foreground md:text-base">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            {producto.imagenesExtra && producto.imagenesExtra.length > 0 && (
              <div>
                <h3 className="font-serif text-lg font-normal text-heading">Galería</h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {producto.imagenesExtra.map((src, i) => (
                    <div
                      key={src}
                      className={cn(
                        "relative aspect-[4/3] overflow-hidden rounded-xl bg-muted shadow-inner",
                        producto.imagenesExtra!.length === 1 && "sm:col-span-2",
                      )}
                    >
                      <Image
                        src={src}
                        alt={`${producto.nombre} — imagen ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-28">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-md">
              <p className="text-sm text-muted-foreground leading-relaxed">{producto.descripcion}</p>
              <div className="mt-6 flex flex-col gap-3">
                <Button asChild className="w-full rounded-full py-6 text-base font-semibold" size="lg">
                  <Link href={contactHref}>
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Pedir cotización
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full rounded-full border-primary/30">
                  <Link href={waHref} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </Link>
                </Button>
              </div>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                Responde el formulario con fecha, porciones y referencia de este producto.
              </p>
            </div>
          </aside>
        </div>

        {relacionados.length > 0 && (
          <section className="mt-20 border-t border-brand-leaf/20 pt-16">
            <h2 className="font-serif text-2xl font-normal text-heading md:text-3xl">Otros productos</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relacionados.map((p) => (
                <Link
                  key={p.slug}
                  href={`/productos/${p.slug}`}
                  className="group overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <Image
                      src={p.imagen}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-primary">{p.categoria}</p>
                    <p className="mt-1 font-serif text-lg font-normal text-heading group-hover:text-primary transition-colors">
                      {p.nombre}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  )
}
