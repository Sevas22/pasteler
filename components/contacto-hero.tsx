"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { locations } from "@/lib/data/locations"

function getAllLocationsEmbedUrl() {
  const query = locations.map((l) => `${l.name}, ${l.address}, Bogotá`).join(" | ")
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`
}

export function ContactoHero() {
  const [selected, setSelected] = useState<string>("todas")

  const mapSrc = useMemo(() => {
    if (selected === "todas") return getAllLocationsEmbedUrl()
    const loc = locations.find((l) => l.name === selected)
    if (!loc) return getAllLocationsEmbedUrl()
    const url = new URL(loc.mapsUrl)
    const query = url.searchParams.get("query") ?? `${loc.name}, ${loc.address}, Bogotá`
    return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`
  }, [selected])

  return (
    <section className="relative overflow-hidden border-b border-brand-gold/25 bg-gradient-to-br from-brand-chocolate via-[#4a2828] to-[#2a1a1a] pt-24 pb-12 text-primary-foreground sm:pt-28 sm:pb-16">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/30 opacity-40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-brand-gold/20 opacity-35 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl px-1 text-center sm:px-0">
          <h1 className="text-balance font-serif text-3xl font-normal leading-snug tracking-normal sm:text-4xl md:text-5xl lg:text-6xl">
            Visítanos o escríbenos
          </h1>
          <p className="mt-4 text-lg text-white/80 md:text-xl">
            Elige la sede más cercana. Cada ubicación tiene su propio contacto para pedidos y
            consultas de cursos.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3">
            <Button
              asChild
              size="lg"
              className="w-full min-h-[48px] bg-primary text-primary-foreground hover:bg-primary-hover sm:w-auto sm:min-h-10"
            >
              <Link href="#contacto">Ir al formulario</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full min-h-[48px] border-brand-gold/50 bg-white/5 text-white hover:bg-white/10 sm:w-auto sm:min-h-10"
            >
              <a href="https://wa.me/573108336425" target="_blank" rel="noopener noreferrer">
                WhatsApp principal
              </a>
            </Button>
          </div>
        </div>

        <div id="mapa-contacto" className="mt-12 sm:mt-16">
          <div className="relative overflow-hidden rounded-xl border border-brand-gold/35 shadow-xl sm:rounded-2xl">
            <iframe
              title="Mapa con todas las sedes Dalizas"
              src={mapSrc}
              className="h-[min(70vh,440px)] min-h-[280px] w-full sm:h-[440px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setSelected("todas")}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                selected === "todas"
                  ? "border-brand-gold bg-brand-gold/20 text-white"
                  : "border-brand-gold/45 bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <MapPin className="h-4 w-4 text-brand-gold" />
              Todas las sedes
            </button>
            {locations.map((loc) => (
              <button
                key={loc.name}
                type="button"
                onClick={() => setSelected(loc.name)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  selected === loc.name
                    ? "border-brand-gold bg-brand-gold/20 text-white"
                    : "border-brand-gold/45 bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                <MapPin className="h-4 w-4 text-brand-gold" />
                {loc.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
