import Link from "next/link"
import { Clock, MapPin, MessageCircle } from "lucide-react"
import type { Location } from "@/lib/data/locations"
import { generateQrDataUrl, getLocationUrl } from "@/lib/qr"
import { Horario } from "@/components/horario"
import { WhatsAppCTA } from "@/components/whatsapp-cta"

const SERIF = { fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }

type SedesBandaProps = {
  locations: Location[]
}

/** Sedes: tarjetas con el QR de cada una justo debajo del nombre. */
export async function SedesBanda({ locations }: SedesBandaProps) {
  const sedes = await Promise.all(
    locations.map(async (location) => ({
      location,
      qr: await generateQrDataUrl(getLocationUrl(location.slug)),
    })),
  )

  return (
    <section
      data-no-section-divider
      className="relative flex items-center overflow-hidden bg-[#3A2620] px-5 pb-16 pt-24 text-[#F3E9DC] sm:min-h-[calc(100svh-4rem)] sm:px-8 sm:pb-16 sm:pt-28 lg:px-12"
    >
      <div className="relative mx-auto w-full max-w-7xl">
        <div className="text-center">
          <p className="flex items-center justify-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-[#E3C98F]">
            <span className="h-px w-8 bg-[#E3C98F]/60" aria-hidden />
            Visítanos
            <span className="h-px w-8 bg-[#E3C98F]/60" aria-hidden />
          </p>
          <p className="mt-4 text-balance text-4xl font-normal leading-tight sm:text-5xl" style={SERIF}>
            Nuestras sedes <span className="italic text-[#E3C98F]">en Bosa.</span>
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#D8C7B8] sm:text-base">
            Escanea el QR de tu sede para ver su catálogo, o escríbenos por WhatsApp.
          </p>
        </div>

        <ul className={`mt-12 grid gap-5 sm:grid-cols-2 ${sedes.length >= 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"}`}>
          {sedes.map(({ location, qr }) => (
            <li
              key={location.id}
              className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center lg:p-5 xl:p-6 shadow-[0_20px_40px_-25px_rgba(0,0,0,0.7)] transition-colors hover:border-[#E3C98F]/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-xl font-normal text-[#F7EFE4]" style={SERIF}>
                {location.name}
              </h3>

              <Link
                href={`/tiendas/${location.slug}`}
                aria-label={`Ver la sede ${location.name}`}
                className="mt-5 block rounded-xl bg-[#F8F5F2] p-2 shadow-[0_12px_28px_-12px_rgba(0,0,0,0.6)] transition-transform hover:scale-[1.04]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={qr} alt={`Código QR de ${location.name}`} width={128} height={128} className="h-32 w-32" />
              </Link>

              <p className="mt-5 flex items-start gap-2 text-sm text-[#D8C7B8]">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#E3C98F]" aria-hidden />
                <span>{location.address}</span>
              </p>
              {location.hours ? (
                <p className="mt-1.5 flex items-start gap-2 text-sm text-[#D8C7B8]/80">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#E3C98F]" aria-hidden />
                  <span>
                    <Horario texto={location.hours} />
                  </span>
                </p>
              ) : null}

              {location.whatsapp ? (
                <WhatsAppCTA
                  mensaje={`Hola, quiero información de la sede ${location.name}`}
                  ruta={`/tiendas/${location.slug}`}
                  sedesSlugs={[location.slug]}
                  className="mt-5 inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-[#E3C98F]/60 px-5 text-sm font-medium text-[#E3C98F] transition-colors hover:bg-[#E3C98F] hover:text-[#2a1210]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  Escribir por WhatsApp
                </WhatsAppCTA>
              ) : (
                <Link
                  href={`/tiendas/${location.slug}`}
                  className="mt-5 inline-flex min-h-10 items-center justify-center rounded-full border border-[#E3C98F]/60 px-5 text-sm font-medium text-[#E3C98F] transition-colors hover:bg-[#E3C98F] hover:text-[#2a1210]"
                >
                  Ver esta sede
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
