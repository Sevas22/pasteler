"use client"

import { useMemo, useState } from "react"
import { MapPin } from "lucide-react"
import type { Location } from "@/lib/data/locations"

type ContactoHeroProps = {
  locations: Location[]
}

export function ContactoHero({ locations }: ContactoHeroProps) {
  const [selected, setSelected] = useState<string>("todas")

  const getAllLocationsEmbedUrl = () => {
    const query = locations.map((l) => `${l.name}, ${l.address}, Bogotá`).join(" | ")
    return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`
  }

  const mapSrc = useMemo(() => {
    if (selected === "todas") return getAllLocationsEmbedUrl()
    const loc = locations.find((l) => l.name === selected)
    if (!loc || !loc.mapsUrl) return getAllLocationsEmbedUrl()
    const url = new URL(loc.mapsUrl)
    const query = url.searchParams.get("query") ?? `${loc.name}, ${loc.address}, Bogotá`
    return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, locations])

  return (
    <section data-no-section-divider className="bg-background px-5 pb-10 pt-28 sm:px-8 sm:pt-32 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 sm:grid-cols-[1.3fr_1fr] sm:items-end sm:gap-10">
          <h1
            className="text-balance text-5xl font-normal leading-[1.05] text-heading sm:text-6xl"
            style={{ fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }}
          >
            Visítanos o <span className="italic text-primary">escríbenos.</span>
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Elige la sede más cercana. Cada ubicación tiene su propio contacto para pedidos y consultas de
            cursos.
          </p>
        </div>

        <div id="mapa-contacto" className="mt-10">
          <div className="relative overflow-hidden rounded-2xl">
            <iframe
              title="Mapa con todas las sedes Dalizas"
              src={mapSrc}
              className="h-[min(70vh,440px)] min-h-[280px] w-full sm:h-[440px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelected("todas")}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                selected === "todas"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:border-primary/50 hover:text-primary"
              }`}
            >
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              Todas las sedes
            </button>
            {locations.map((loc) => (
              <button
                key={loc.name}
                type="button"
                onClick={() => setSelected(loc.name)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  selected === loc.name
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:border-primary/50 hover:text-primary"
                }`}
              >
                <MapPin className="h-3.5 w-3.5" aria-hidden />
                {loc.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
