import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { ArrowRight } from "lucide-react"
import { WhatsAppCTA } from "@/components/whatsapp-cta"
import { FondoMarca } from "@/components/ornaments/fondo-marca"
import { Corazon } from "@/components/sedes-dalizas/decoraciones"
import { RevealItem, RevealStagger } from "@/components/motion/reveal"
import { Celular, Destello, Flor, Libreta } from "./ilustraciones"

const SERIF = { fontFamily: "var(--font-serif), 'Playfair Display', Georgia, serif" }

/** Foto del paso 1 (polaroid): una de las tortas personalizadas reales. */
const FOTO_INSPIRACION = { src: "/images/galeria/tortas/torta-11.webp", alt: "Torta personalizada Daliza con rosas rojas" }

function IconoWhatsApp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden>
      <path d="M16.04 3C8.86 3 3.02 8.83 3.02 16c0 2.3.6 4.53 1.74 6.5L3 29l6.68-1.75A13 13 0 0 0 16.04 29C23.2 29 29.04 23.17 29.04 16S23.2 3 16.04 3Zm0 23.67c-2 0-3.95-.54-5.65-1.55l-.4-.24-3.96 1.04 1.06-3.86-.26-.4a10.62 10.62 0 0 1-1.63-5.66c0-5.88 4.79-10.66 10.68-10.66 5.88 0 10.67 4.78 10.67 10.66 0 5.89-4.79 10.67-10.51 10.67Zm5.85-7.98c-.32-.16-1.89-.93-2.18-1.04-.3-.11-.5-.16-.72.16-.21.32-.83 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.6-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.72-1.73-.99-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66 0 1.57 1.14 3.08 1.3 3.3.16.21 2.25 3.43 5.45 4.81.76.33 1.36.53 1.82.67.77.24 1.46.21 2.01.13.61-.09 1.89-.77 2.15-1.52.27-.74.27-1.38.19-1.52-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  )
}

function Polaroid() {
  return (
    <div className="relative">
      <div className="-rotate-6 rounded-sm bg-white p-2.5 pb-8 shadow-[0_18px_34px_-16px_rgba(58,38,32,0.45)] transition-transform duration-500 group-hover:-rotate-3">
        <div className="relative aspect-square w-32 overflow-hidden sm:w-36">
          <Image src={FOTO_INSPIRACION.src} alt={FOTO_INSPIRACION.alt} fill sizes="150px" className="object-cover" />
        </div>
      </div>
      <Corazon className="absolute -right-5 -top-4 w-9 rotate-12" />
      <Destello className="absolute -bottom-3 -left-4 w-8 rotate-180" />
    </div>
  )
}

type Paso = {
  numero: number
  titulo: ReactNode
  texto: string
  ilustracion: ReactNode
  extra?: ReactNode
}

const PASOS: Paso[] = [
  {
    numero: 1,
    titulo: "Inspírate",
    texto: "Busca una imagen de referencia de la torta de tus sueños.",
    ilustracion: <Polaroid />,
    extra: (
      <Link
        href="/galeria"
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#8B2E2E] underline-offset-4 hover:underline"
      >
        Mira ideas en nuestra galería
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    ),
  },
  {
    numero: 2,
    titulo: (
      <>
        Cuéntanos
        <br />
        los detalles
      </>
    ),
    texto: "Indícanos fecha de entrega y cantidad de porciones.",
    ilustracion: (
      <div className="relative">
        <Libreta className="w-40 transition-transform duration-500 group-hover:-rotate-2 sm:w-44" />
        <Destello className="absolute -right-2 -top-3 w-9" />
      </div>
    ),
  },
  {
    numero: 3,
    titulo: (
      <>
        Envíanos
        <br />
        tu solicitud
      </>
    ),
    texto: "Compártenos la imagen y la información por WhatsApp.",
    ilustracion: (
      <div className="relative">
        <Celular className="w-28 transition-transform duration-500 group-hover:rotate-2 sm:w-32" />
        <Destello className="absolute -right-3 top-6 w-8" />
        <Corazon className="absolute -left-6 bottom-6 w-9 -rotate-12" />
      </div>
    ),
    extra: (
      <WhatsAppCTA
        mensaje="Hola, quiero cotizar una torta personalizada"
        className="mt-5 inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-[#25A244] px-6 text-sm font-bold uppercase tracking-wide text-white shadow-[0_12px_24px_-10px_rgba(37,162,68,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1F8F3B] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25A244]"
      >
        <IconoWhatsApp className="h-6 w-6" />
        Pide por WhatsApp
      </WhatsAppCTA>
    ),
  },
]

/** Tortas personalizadas explicadas en tres pasos: inspírate, cuéntanos y envíanos por WhatsApp. */
export function PasosTorta() {
  return (
    <section data-no-section-divider aria-labelledby="pasos-titulo" className="relative overflow-hidden bg-[#F8F2EA]">
      {/* Franja vino con el título */}
      {/* pt-14: el adorno queda por debajo de la "barriguita" central del menú fijo */}
      <div className="relative bg-gradient-to-r from-[#6E1424] via-[#7A1A2A] to-[#8B2E2E] px-5 pb-9 pt-14 text-center sm:px-8 sm:pb-10">
        <Flor className="mx-auto w-24 sm:w-28" />
        <div className="mt-1 flex items-center justify-center gap-6">
          <span className="hidden h-px flex-1 max-w-56 bg-[#C9A96E]/80 lg:block" aria-hidden />
          <h2 id="pasos-titulo" className="text-balance text-3xl font-normal leading-tight text-[#FBF6F0] sm:text-4xl lg:text-5xl" style={SERIF}>
            Diseña tu torta personalizada en <span className="whitespace-nowrap italic text-[#E3C98F]">3 pasos</span>
          </h2>
          <span className="hidden h-px flex-1 max-w-56 bg-[#C9A96E]/80 lg:block" aria-hidden />
        </div>
      </div>

      {/* Pasos */}
      <div className="relative isolate px-5 pb-20 pt-16 sm:px-8 lg:px-12">
        <FondoMarca variante="lateral" />

        <RevealStagger className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-3 lg:gap-8">
          {PASOS.map((paso) => (
            <RevealItem key={paso.numero} className="flex">
              <article className="group relative flex w-full flex-col items-center gap-6 rounded-[28px] border border-[#C9A96E]/40 bg-[#FBF6F0]/90 px-6 pb-8 pt-14 text-center shadow-[0_22px_45px_-30px_rgba(92,49,39,0.45)] backdrop-blur-[2px] transition-transform duration-500 hover:-translate-y-1 2xl:flex-row 2xl:items-center 2xl:gap-7 2xl:px-8 2xl:text-left">
                <span
                  className="absolute -top-7 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border-[3px] border-[#C9A96E] bg-[#7A1A2A] text-2xl text-[#FBF6F0] shadow-[0_8px_18px_-8px_rgba(122,26,42,0.8)]"
                  style={SERIF}
                  aria-hidden
                >
                  {paso.numero}
                </span>

                <div className="flex h-44 shrink-0 items-center justify-center 2xl:w-40">{paso.ilustracion}</div>

                <div className="flex flex-col items-center 2xl:items-start">
                  <p className="sr-only">Paso {paso.numero}:</p>
                  <h3 className="text-[1.75rem] font-semibold leading-tight text-[#7A1A2A] sm:text-3xl" style={SERIF}>
                    {paso.titulo}
                  </h3>
                  <span className="my-4 block h-[2px] w-12 bg-[#C9A96E]" aria-hidden />
                  <p className="max-w-xs text-[15px] leading-relaxed text-[#57473F] sm:text-base">{paso.texto}</p>
                  {paso.extra}
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  )
}
