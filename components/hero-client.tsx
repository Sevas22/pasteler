"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import {
  ArrowRight,
  Cake,
  Cherry,
  Heart,
  Leaf,
  Play,
  Star,
  UtensilsCrossed,
} from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { HERO_YOUTUBE_ID } from "@/lib/branding-video"

type HeroClientProps = {
  bannerSrc: string
  bannerAlt: string
}

const stats = [
  { icon: Cake, label: "+150", line: "Recetas únicas" },
  { icon: Heart, label: "+8K", line: "Clientes felices" },
  { icon: Star, label: "100%", line: "Pasión y calidad" },
] as const

const featureBar = [
  { icon: Leaf, text: "Ingredientes seleccionados" },
  { icon: UtensilsCrossed, text: "Técnicas artesanales" },
  { icon: Heart, text: "Resultados que enamoran" },
] as const

const heroVideoEmbedSrc = `https://www.youtube.com/embed/${HERO_YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1`

/** Paleta referencia banner (ajustada a fondo oscuro: cremas = texto principal) */
const H = {
  rojo: "#8B3232",
  crema: "#F5EFE6",
  cremaSuave: "#EDE6DF",
  /** Taupe referencia (#6B5B55) aclarado para leer sobre foto */
  textoSecundario: "#C9B8B0",
} as const

function HeroFlourish({ mirror }: { mirror?: boolean }) {
  return (
    <svg
      className={`h-4 w-10 shrink-0 text-[#C9A96E] opacity-95 sm:h-[18px] sm:w-11 ${mirror ? "scale-x-[-1]" : ""}`}
      viewBox="0 0 40 12"
      fill="none"
      aria-hidden
    >
      <path
        d="M0 6 C6 1 14 1 20 6 S32 11 38 6"
        stroke="currentColor"
        strokeWidth={0.9}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Banner principal a pantalla completa + copy y barra inferior. */
export function HeroClient({ bannerSrc, bannerAlt }: HeroClientProps) {
  const [videoOpen, setVideoOpen] = useState(false)

  return (
    <section
      id="inicio"
      className="relative flex min-h-svh w-full flex-col pt-[max(4.5rem,env(safe-area-inset-top))] pb-[calc(7.25rem+env(safe-area-inset-bottom,0px))] md:pb-[calc(7.5rem+env(safe-area-inset-bottom,0px))]"
    >
      <div className="absolute inset-0 z-0 bg-[#2b1f1c]" aria-hidden />

      {/* Cover + leve zoom; recorte controlado con object-position (postre al centro-vertical) */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <Image
          src={bannerSrc}
          alt={bannerAlt}
          fill
          priority
          className="origin-center scale-[1.07] object-cover object-[50%_42%] motion-reduce:scale-100"
          sizes="100vw"
        />
      </div>

      {/* Velos suaves: menos negro para que brille el banner */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/36 via-black/14 to-transparent max-lg:from-black/40 max-lg:via-black/18"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/28 via-transparent to-black/10"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col justify-start px-4 sm:px-6 lg:justify-center lg:px-8">
        <div className="grid grid-cols-1 items-start gap-5 py-4 text-center sm:gap-7 sm:py-6 sm:text-left lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-5 [@media(max-height:720px)]:gap-4 [@media(max-height:720px)]:py-3">
          <div className="mx-auto w-full max-w-xl self-start sm:mx-0 lg:col-span-6 lg:self-center xl:col-span-5">
            <p
              className="font-sans text-[10px] font-bold uppercase tracking-[0.28em] sm:text-[11px] sm:tracking-[0.26em] md:text-xs"
              style={{
                color: H.rojo,
                textShadow:
                  "0 0 1px rgba(245,239,230,0.35), 0 0 16px rgba(139,50,50,0.55), 0 2px 8px rgba(0,0,0,0.45)",
              }}
            >
              Pastelería fina • Bogotá
            </p>

            <h1
              className="mt-3 text-balance text-[2rem] font-medium leading-[1.12] tracking-[-0.02em] min-[380px]:text-[2.35rem] min-[380px]:leading-[1.1] sm:mt-4 sm:text-left sm:text-5xl sm:leading-[1.08] md:text-6xl md:leading-[1.06] lg:text-7xl lg:leading-[1.05] xl:text-[4.85rem] xl:leading-[1.04] [@media(max-height:720px)]:mt-2 [@media(max-height:720px)]:text-[1.65rem] [@media(max-height:720px)]:min-[380px]:text-[1.85rem] [@media(max-height:720px)]:sm:text-4xl"
              style={{ fontFamily: "var(--font-hero-title), ui-serif, Georgia, serif" }}
            >
              <span
                className="block"
                style={{
                  color: H.crema,
                  textShadow: "0 2px 16px rgba(0,0,0,0.5), 0 1px 0 rgba(43,27,23,0.2)",
                }}
              >
                Donde el arte
              </span>
              <span className="mt-1 block sm:mt-1.5">
                <span
                  style={{
                    color: H.crema,
                    textShadow: "0 2px 16px rgba(0,0,0,0.5), 0 1px 0 rgba(43,27,23,0.2)",
                  }}
                >
                  se vuelve{" "}
                </span>
                <span
                  className="[text-shadow:0_0_28px_rgba(232,110,110,0.75),0_2px_12px_rgba(0,0,0,0.4)]"
                  style={{ color: H.rojo }}
                >
                  sabor
                </span>
              </span>
            </h1>

            <div className="mt-4 flex items-center justify-center gap-1.5 sm:mt-5 sm:justify-start sm:gap-2 [@media(max-height:720px)]:mt-3" aria-hidden>
              <HeroFlourish />
              <Cherry className="h-7 w-7 shrink-0 drop-shadow-md sm:h-8 sm:w-8" strokeWidth={1.85} style={{ color: H.rojo }} />
              <HeroFlourish mirror />
            </div>

            <div
              className="font-sans mx-auto mt-4 max-w-md text-pretty sm:mx-0 sm:mt-5 [@media(max-height:720px)]:mt-3"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.35)" }}
            >
              <p className="text-[0.9375rem] font-medium leading-relaxed sm:text-base" style={{ color: H.textoSecundario }}>
                Creamos momentos dulces que se recuerdan.
              </p>
              <p className="mt-2 text-sm font-normal leading-relaxed text-white/88 sm:text-[0.9375rem]">
                Pasteles, postres y cursos para los verdaderos amantes de la repostería.
              </p>
            </div>

            <div className="mt-5 flex w-full flex-col items-stretch gap-2.5 sm:mt-6 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-start sm:gap-3 lg:mt-7 [@media(max-height:720px)]:mt-4">
              <Link
                href="/productos"
                className="font-sans inline-flex w-full min-h-[48px] items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(139,50,50,0.45),0_2px_8px_rgba(0,0,0,0.2)] transition-all duration-300 ease-out hover:scale-[1.03] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:w-auto sm:min-h-0 sm:px-9 sm:py-4 sm:text-base"
                style={{ backgroundColor: H.rojo }}
              >
                Explorar dulzura
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="font-sans inline-flex w-full min-h-[48px] items-center justify-center gap-2.5 rounded-full border-2 px-6 py-3.5 text-sm font-semibold shadow-md backdrop-blur-sm transition-all duration-300 ease-out hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:w-auto sm:min-h-0 sm:px-8 sm:py-4 sm:text-base"
                style={{
                  borderColor: `${H.rojo}cc`,
                  backgroundColor: "rgba(245,239,230,0.12)",
                  color: H.cremaSuave,
                  textShadow: "0 1px 6px rgba(0,0,0,0.35)",
                }}
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${H.rojo}33`, color: H.crema }}
                >
                  <Play className="h-4 w-4 fill-current" aria-hidden />
                </span>
                Ver video
              </button>
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

            <ul className="mt-5 flex flex-wrap justify-center gap-3 border-t border-white/25 pt-5 sm:mt-6 sm:justify-start sm:gap-5 sm:pt-6 lg:hidden [@media(max-height:720px)]:mt-4 [@media(max-height:720px)]:gap-3 [@media(max-height:720px)]:pt-4">
              {stats.map(({ icon: Icon, label, line }) => (
                <li key={line} className="flex min-w-[8.5rem] max-w-[100%] items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#C9A96E]/80 bg-white/15 text-[#C9A96E] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] backdrop-blur-md">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="text-[10px] font-bold uppercase leading-tight tracking-wide text-white">
                    <span className="block text-sm font-semibold normal-case tracking-normal text-[#C9A96E]">
                      {label}
                    </span>
                    {line}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden lg:col-span-5 lg:col-start-8 xl:col-span-4 xl:col-start-9 lg:flex lg:flex-col lg:items-end lg:gap-9">
            {stats.map(({ icon: Icon, label, line }) => (
              <div
                key={line}
                className="flex w-full max-w-[17rem] items-center gap-5 rounded-2xl border border-white/25 bg-white/12 px-4 py-3 shadow-[0_8px_32px_rgba(42,26,26,0.12)] backdrop-blur-xl xl:max-w-xs"
              >
                <span className="flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center rounded-full border-2 border-[#C9A96E]/90 bg-white/15 text-[#C9A96E] shadow-[0_2px_12px_rgba(201,169,110,0.2)]">
                  <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
                </span>
                <p className="text-left text-[11px] font-bold uppercase leading-snug tracking-[0.12em] text-white">
                  <span className="mb-0.5 block text-lg font-semibold normal-case tracking-normal text-[#C9A96E]">
                    {label}
                  </span>
                  {line}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 border-t border-white/30 bg-gradient-to-t from-black/22 to-white/5 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-xl supports-[backdrop-filter]:bg-white/12 md:px-10 md:py-5 md:pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <div className="pointer-events-auto mx-auto flex max-w-6xl flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-10 sm:gap-y-3 lg:justify-between">
          {featureBar.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center justify-center gap-3 text-sm font-medium text-white/95 sm:justify-start"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#C9A96E]/50 bg-[#C9A96E]/15 text-[#C9A96E]">
                <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
              </span>
              <span className="text-center sm:text-left">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
