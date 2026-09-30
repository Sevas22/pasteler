import Link from "next/link"
import { MessageCircle } from "lucide-react"
import type { Location } from "@/lib/data/locations"

type SedesBandaProps = {
  locations: Location[]
}

/** Bloque de color sólido, sin tarjetas idénticas ni cifras — solo las 4 sedes reales. */
export function SedesBanda({ locations }: SedesBandaProps) {
  return (
    <section data-no-section-divider className="bg-[#3A2620] px-5 py-16 text-[#F3E9DC] sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <p
          className="text-3xl font-normal sm:text-4xl"
          style={{ fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }}
        >
          Nuestras sedes en Bosa
        </p>

        <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {locations.map((location) => (
            <div key={location.id} className="border-t border-white/15 pt-5">
              <h3 className="text-lg font-medium text-[#F7EFE4]">
                {location.name}
                {location.isPrincipal ? (
                  <span className="ml-2 text-xs font-normal uppercase tracking-wide text-[#C9A96E]">
                    Sede principal
                  </span>
                ) : null}
              </h3>
              <p className="mt-1.5 text-sm text-[#D8C7B8]">{location.address}</p>
              {location.hours ? <p className="mt-0.5 text-sm text-[#D8C7B8]/80">{location.hours}</p> : null}
              {location.whatsapp ? (
                <a
                  href={`https://wa.me/57${location.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[#C9A96E] underline-offset-4 hover:underline"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  Escribir por WhatsApp
                </a>
              ) : (
                <Link
                  href={`/tiendas/${location.slug}`}
                  className="mt-3 inline-block text-sm font-medium text-[#C9A96E] underline-offset-4 hover:underline"
                >
                  Ver esta sede
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
