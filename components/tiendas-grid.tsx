import Image from "next/image"
import Link from "next/link"
import { MessageCircle } from "lucide-react"
import type { Location } from "@/lib/data/locations"
import { RevealStagger, RevealItem } from "@/components/motion/reveal"

type TiendaItem = {
  location: Location
  qr: string
  heroImage: string
  productCount: number
}

type TiendasGridProps = {
  items: TiendaItem[]
}

export function TiendasGrid({ items }: TiendasGridProps) {
  return (
    <section data-no-section-divider className="bg-background px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary/80">Bogotá</p>
        <div className="mt-2 h-px w-full bg-border" aria-hidden />

        <RevealStagger className="mt-8 grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {items.map(({ location, qr, heroImage, productCount }) => (
            <RevealItem key={location.id} className="group flex flex-col">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                <Image
                  src={heroImage}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {location.isPrincipal ? (
                  <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary-foreground">
                    Sede principal
                  </span>
                ) : null}
                <div className="absolute bottom-3 right-3 overflow-hidden rounded-lg border-2 border-white bg-white p-0.5 shadow-md">
                  <Image src={qr} alt={`Código QR — ${location.name}`} width={48} height={48} unoptimized />
                </div>
              </div>

              <h2
                className="mt-4 text-xl font-normal text-heading"
                style={{ fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }}
              >
                {location.name}
              </h2>
              <p className="mt-1 text-sm text-foreground">{location.address}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{location.hours}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {productCount === 0
                  ? "Catálogo por confirmar"
                  : `${productCount} producto${productCount > 1 ? "s" : ""} disponible${productCount > 1 ? "s" : ""}`}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                <Link
                  href={`/tiendas/${location.slug}`}
                  className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  Ver catálogo de esta sede
                </Link>
                {location.whatsapp ? (
                  <a
                    href={`https://wa.me/${location.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    <MessageCircle className="h-3.5 w-3.5" aria-hidden />
                    WhatsApp
                  </a>
                ) : null}
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  )
}
