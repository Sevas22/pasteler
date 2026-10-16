import Image from "next/image"
import Link from "next/link"
import { Heart, MessageCircle } from "lucide-react"
import { HandStamp } from "@/components/ornaments/hand-stamp"
import { BANNERS } from "@/lib/media"
import { WhatsAppCTA } from "@/components/whatsapp-cta"

export function CtaContactStrip() {
  return (
    <section data-no-section-divider className="relative isolate flex items-center overflow-hidden py-28 sm:min-h-[calc(100svh-4rem)] sm:py-24">
      <Image
        src={BANNERS.celebracion}
        alt="Tartaletas de fruta y rollos de crema sobre terciopelo vino"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1c100e]/85 via-[#2a1210]/60 to-[#2a1210]/45" aria-hidden />

      <HandStamp
        tone="cream"
        icon={Heart}
        text="EL ARTE DE CELEBRAR • DALIZA •"
        className="absolute bottom-6 left-6 hidden sm:flex"
      />

      <div className="relative mx-auto w-full max-w-2xl px-5 text-center sm:px-8">
        <p
          className="text-balance text-4xl font-normal leading-tight text-[#F7EFE4] sm:text-5xl"
          style={{ fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }}
        >
          Hacemos inolvidable <span className="italic text-[#C9A96E]">lo especial.</span>
        </p>
        <p className="mt-4 text-sm text-[#D8C7B8] sm:text-base">El arte de celebrar con Daliza.</p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <WhatsAppCTA
            mensaje="Hola, quiero información para una celebración"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover sm:w-auto"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            Escribir por WhatsApp
          </WhatsAppCTA>
          <Link
            href="/contacto"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-white/40 px-7 text-sm font-medium text-white transition-colors hover:bg-white/10 sm:w-auto"
          >
            Ver formulario de contacto
          </Link>
        </div>
      </div>
    </section>
  )
}
