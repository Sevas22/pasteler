"use client"

import { useState } from "react"
import Image from "next/image"
import { ImagenMiniatura } from "@/components/imagen-miniatura"
import Link from "next/link"
import { Clock, ImageIcon, MapPin, MessageCircle, Navigation, Phone, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Horario } from "@/components/horario"
import { WhatsAppCTA } from "@/components/whatsapp-cta"
import { CatalogoProductos, type ServicioFiltro } from "@/components/catalogo-productos"
import type { Location } from "@/lib/data/locations"
import type { Producto } from "@/lib/types/producto"
import { Reveal } from "@/components/motion/reveal"
import { FlourishDivider } from "@/components/ornaments/flourish-divider"
import { FondoMarca } from "@/components/ornaments/fondo-marca"

type TiendaDetailViewProps = {
  location: Location
  productos: Producto[]
  qrDataUrl: string
  heroImage: string
}

export function TiendaDetailView({ location, productos, qrDataUrl, heroImage }: TiendaDetailViewProps) {
  // Igual que el catálogo general: abre en Pastelería si la sede la tiene
  const [servicio, setServicio] = useState<ServicioFiltro>(
    productos.some((p) => p.servicio === "pasteleria") ? "pasteleria" : "todos",
  )

  return (
    <article>
      {/* Hero fotográfico — mismo lenguaje que la ficha de producto/curso */}
      <div className="relative min-h-[30rem] w-full overflow-hidden bg-muted sm:aspect-[21/9] sm:min-h-[260px] md:aspect-[2.4/1] md:min-h-[360px]">
        <ImagenMiniatura
          src={heroImage}
          ancho={1280}
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/50 to-black/10"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
          {location.isPrincipal && (
            <span className="inline-flex rounded-full bg-primary px-3 py-1 text-xs font-bold tracking-wide text-primary-foreground">
              SEDE PRINCIPAL
            </span>
          )}
          <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-[#C9A96E]">
            Pastelería fina · {location.type}
          </p>
          <h1 className="mt-2 font-serif text-3xl font-normal tracking-normal text-balance text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.65)] md:text-5xl">
            {location.name}
          </h1>
          <div className="mt-3 h-0.5 w-14 rounded-full bg-brand-gold md:w-16" aria-hidden />

          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/90">
            <span className="flex items-center gap-2">
              <Navigation className="h-4 w-4 text-[#C9A96E]" />
              {location.address}
            </span>
            {location.hours ? (
              <span className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 text-[#C9A96E]" />
                <span>
                  <Horario texto={location.hours} />
                </span>
              </span>
            ) : null}
            {location.phone ? (
              <a
                href={`tel:+57${location.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 py-1.5 hover:underline"
              >
                <Phone className="h-4 w-4 text-[#C9A96E]" />
                {location.phone}
              </a>
            ) : null}
          </div>
        </div>
      </div>

      {/* Barra de acciones — WhatsApp, cómo llegar, QR */}
      <section className="border-b border-brand-gold/20 bg-[#f8f5f2]">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-8 sm:px-6 md:flex-row md:justify-between lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {location.whatsapp ? (
              <WhatsAppCTA
                mensaje={`Hola, quiero hacer un pedido en la sede ${location.name}`}
                ruta={`/tiendas/${location.slug}`}
                sedesSlugs={[location.slug]}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                <MessageCircle className="h-5 w-5" />
                Pedir por WhatsApp
              </WhatsAppCTA>
            ) : null}
            {location.mapsUrl ? (
              <Button asChild size="lg" variant="outline" className="border-primary/30 text-primary">
                <a href={location.mapsUrl} target="_blank" rel="noopener noreferrer">
                  <MapPin className="mr-2 h-5 w-5" />
                  Cómo llegar
                </a>
              </Button>
            ) : null}
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-brand-gold/40 bg-white px-5 py-4 shadow-sm">
            <Image src={qrDataUrl} alt={`Código QR de ${location.name}`} width={72} height={72} unoptimized />
            <div className="text-left">
              <p className="flex items-center gap-1.5 text-sm font-semibold text-heading">
                <QrCode className="h-4 w-4 text-primary" />
                QR de esta sede
              </p>
              <p className="mt-0.5 max-w-[11rem] text-xs text-muted-foreground">
                Para imprimir en mostrador o compartir
              </p>
              <a
                href={qrDataUrl}
                download={`qr-daliza-${location.slug}.png`}
                className="mt-1 inline-block py-1.5 text-xs font-semibold text-primary underline-offset-2 hover:underline"
              >
                Descargar
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-background py-16 sm:py-20 md:py-24">
        <FondoMarca variante="suave" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mx-auto max-w-2xl px-1 text-center sm:px-0">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Disponible en esta sede</p>
              <h2 className="mt-2 text-balance font-serif text-3xl font-normal text-heading sm:text-4xl">
                Catálogo de {location.name}
              </h2>
              <FlourishDivider className="mt-4" />
            </div>
          </Reveal>

          {productos.length === 0 ? (
            <div className="mt-14 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card py-20 text-center">
              <ImageIcon className="h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">
                Aún no hay productos configurados para esta sede. Pronto verás el catálogo completo aquí.
              </p>
              <Button asChild className="mt-6">
                <Link href="/productos">Ver catálogo general</Link>
              </Button>
            </div>
          ) : (
            <div className="mx-auto mt-10 max-w-6xl sm:mt-12">
              <CatalogoProductos productos={productos} servicio={servicio} onServicioChange={setServicio} />
            </div>
          )}
        </div>
      </section>

    </article>
  )
}
