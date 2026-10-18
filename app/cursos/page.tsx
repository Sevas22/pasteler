import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, GraduationCap, MessageCircle } from "lucide-react"
import { LayoutShell } from "@/components/layout-shell"
import { PageHero } from "@/components/page-hero"
import { HandStamp } from "@/components/ornaments/hand-stamp"
import { SoftCircle } from "@/components/ornaments/soft-circle"
import { FondoMarca } from "@/components/ornaments/fondo-marca"
import { WhatsAppCTA } from "@/components/whatsapp-cta"
import { BANNERS } from "@/lib/media"

export const metadata: Metadata = {
  title: "Cursos de pastelería, muy pronto",
  description:
    "Estamos preparando nuestros cursos de pastelería en Bogotá. Escríbenos y te avisamos primero cuando abramos inscripciones.",
  alternates: { canonical: "/cursos" },
}

const SERIF = { fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }

export default function CursosPage() {
  return (
    <LayoutShell>
      <PageHero
        src={BANNERS.paginas.cursos}
        alt="Rebanadas y postres de pastelería fina Daliza"
        priority
        title={
          <>
            Cursos de pastelería, <span className="italic text-[#E3C98F]">muy pronto.</span>
          </>
        }
        description="Estamos preparando una nueva experiencia para aprender el oficio con nosotros."
      />

      <section
        data-no-section-divider
        className="relative isolate flex items-center overflow-hidden bg-background px-5 py-20 sm:min-h-[calc(100svh-4rem)] sm:px-8 sm:py-14 lg:px-12"
      >
        <FondoMarca variante="abajo" />
        <SoftCircle color="wine" size={320} className="-right-24 top-0" />
        <SoftCircle color="gold" size={280} className="-left-24 bottom-0" />

        <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <div className="relative">
            <HandStamp icon={GraduationCap} text="PRÓXIMAMENTE • DALIZA •" className="h-28 w-28" />
          </div>

          <p className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-brand-gold/60 bg-card px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" aria-hidden />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" aria-hidden />
            </span>
            Próximamente
          </p>

          <p
            className="mt-6 text-balance text-4xl font-normal leading-[1.08] text-heading sm:text-5xl lg:text-6xl"
            style={SERIF}
          >
            Estamos preparando <span className="italic text-primary">algo especial.</span>
          </p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Muy pronto compartiremos aquí nuestros cursos, con sus fechas y cupos. Escríbenos y serás de las primeras
            personas en enterarte.
          </p>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:gap-5">
            <WhatsAppCTA
              mensaje="Hola, quiero que me avisen cuando estén listos los cursos de pastelería"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              Quiero que me avisen
            </WhatsAppCTA>
            <Link
              href="/productos"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Mientras tanto, mira nuestros productos
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </LayoutShell>
  )
}
