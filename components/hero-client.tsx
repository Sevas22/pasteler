"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ArrowRight, Cherry, Play } from "lucide-react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { HERO_YOUTUBE_ID } from "@/lib/branding-video"
import { DripClipDefs } from "@/components/ornaments/drip"
import { GoldSwirl } from "@/components/ornaments/gold-swirl"
import { SoftCircle } from "@/components/ornaments/soft-circle"
import { SERVICIOS_PRODUCTO } from "@/lib/data/productos-helpers"

type HeroClientProps = {
  bannerSrc: string
  bannerAlt: string
}

const heroVideoEmbedSrc = `https://www.youtube.com/embed/${HERO_YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1`

const SERVICIO_PILLS = [{ slug: "todos", label: "Todos" }, ...SERVICIOS_PRODUCTO] as const

const INDICE = [
  { n: "01", label: "Tortas", href: "/productos?servicio=pasteleria" },
  { n: "02", label: "Postres", href: "/productos?servicio=reposteria" },
  { n: "03", label: "Cursos", href: "/cursos" },
] as const

export function HeroClient({ bannerSrc: _bannerSrc, bannerAlt: _bannerAlt }: HeroClientProps) {
  const [videoOpen, setVideoOpen] = useState(false)

  return (
    <section
      id="inicio"
      data-no-section-divider
      className="relative overflow-hidden bg-background pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24"
    >
      <DripClipDefs />
      <SoftCircle color="gold" size={320} className="-right-16 -top-24" />
      <SoftCircle color="cherry" size={220} className="-left-20 top-1/3" />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-10 lg:px-12">
        <div>
          <p className="flex items-center gap-2.5 text-sm font-medium text-muted-foreground">
            <span className="h-px w-8 bg-primary/60" aria-hidden />
            <Cherry className="h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={1.85} aria-hidden />
            Pastelería fina en Bosa, Bogotá
          </p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 text-balance text-[2.75rem] font-normal leading-[1.05] text-heading sm:text-6xl lg:text-[4.25rem]"
            style={{ fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }}
          >
            Un antojo para <span className="italic text-primary">cada momento.</span>
          </motion.h1>

          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            Tortas, postres y especialidades de autor, horneados cada día en nuestras cuatro sedes.
          </p>

          <div className="mt-7 flex flex-wrap gap-2" role="tablist" aria-label="Servicios">
            {SERVICIO_PILLS.map((s) => (
              <Link
                key={s.slug}
                href={s.slug === "todos" ? "/productos" : `/productos?servicio=${s.slug}`}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                {s.label}
              </Link>
            ))}
          </div>

          <div className="relative mx-auto mt-10 max-w-lg lg:mx-0">
            <GoldSwirl className="pointer-events-none absolute -inset-x-10 -inset-y-12 h-[140%] w-[140%]" />

            <div className="relative flex items-end gap-4">
              <div className="relative aspect-[4/5] w-[58%] -rotate-2 overflow-hidden rounded-2xl shadow-[0_30px_60px_-25px_rgba(58,38,32,0.45)]">
                <Image
                  src="/images/producto-pastel-tiramisu-daliza.png"
                  alt="Pastel estilo tiramisú Daliza"
                  fill
                  priority
                  className="object-cover object-[center_30%]"
                  sizes="(max-width: 1024px) 55vw, 320px"
                />
              </div>
              <div className="relative aspect-[4/5] w-[42%] translate-y-6 rotate-3 overflow-hidden rounded-2xl shadow-[0_24px_50px_-20px_rgba(58,38,32,0.4)]">
                <Image
                  src="/images/producto-cheesecake-maracuya-daliza.png"
                  alt="Cheesecake de maracuyá Daliza"
                  fill
                  className="object-cover object-[center_25%]"
                  sizes="(max-width: 1024px) 40vw, 240px"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:pl-6">
          <div className="h-px w-14 bg-primary/50" aria-hidden />
          <p
            className="mt-4 text-3xl font-normal leading-tight text-heading sm:text-4xl"
            style={{ fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }}
          >
            Frescura <span className="italic text-primary">que enamora.</span>
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Descubre nuestra selección de tortas, postres y cursos.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-5">
            <Link
              href="/productos"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              Explorar catálogo
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <button
              type="button"
              onClick={() => setVideoOpen(true)}
              className="inline-flex items-center gap-2.5 text-sm font-medium text-heading underline-offset-4 transition hover:underline"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/40 text-primary">
                <Play className="h-3 w-3 fill-current" aria-hidden />
              </span>
              Ver video
            </button>
          </div>

          <ul className="mt-10 flex flex-col divide-y divide-border/70 border-t border-border/70">
            {INDICE.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="group flex items-center justify-between gap-4 py-3.5 text-heading"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="text-xs italic text-primary">{item.n}</span>
                    <span
                      className="text-lg font-normal transition-colors group-hover:text-primary"
                      style={{ fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }}
                    >
                      {item.label}
                    </span>
                  </span>
                  <ArrowRight
                    className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent
          className="w-[calc(100%-1.5rem)] max-w-4xl gap-0 overflow-hidden border-0 bg-black p-0 sm:w-full [&_button[data-slot=dialog-close]]:text-white [&_button[data-slot=dialog-close]]:hover:bg-white/15 [&_button[data-slot=dialog-close]]:hover:opacity-100"
          showCloseButton
        >
          <DialogTitle className="sr-only">Video Daliza Pastelería Fina</DialogTitle>
          {videoOpen ? (
            <div className="aspect-video w-full bg-black">
              <iframe
                title="YouTube — Daliza"
                src={heroVideoEmbedSrc}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  )
}
