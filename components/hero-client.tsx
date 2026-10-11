"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowRight, Cherry, Play } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { HERO_YOUTUBE_ID } from "@/lib/branding-video"
import { SERVICIOS_PRODUCTO } from "@/lib/data/productos-helpers"
import { BANNERS } from "@/lib/media"
import { cn } from "@/lib/utils"

const heroVideoEmbedSrc = `https://www.youtube.com/embed/${HERO_YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1`

const SERVICIO_PILLS = [{ slug: "todos", label: "Todos" }, ...SERVICIOS_PRODUCTO] as const

const INDICE = [
  { n: "01", label: "Tortas", href: "/productos?servicio=pasteleria" },
  { n: "02", label: "Postres", href: "/productos?servicio=reposteria" },
  { n: "03", label: "Cursos", href: "/cursos" },
] as const

const SLIDE_MS = 6500

/** Texto que acompaña a cada banner (mismo orden que BANNERS.hero). */
const SLIDES_TEXTO = [
  {
    eyebrow: "Pastelería fina en Bosa, Bogotá",
    titulo: "Un antojo para",
    italica: "cada momento.",
    texto: "Tortas, postres y especialidades de autor, horneados cada día en nuestras cuatro sedes.",
    cta: "Explorar catálogo",
    href: "/productos",
  },
  {
    eyebrow: "Cheesecakes y tortas",
    titulo: "Sabores que se",
    italica: "quedan contigo.",
    texto: "Caramelo, frutos rojos, chocolate y crema: porciones generosas para compartir (o no).",
    cta: "Ver pastelería",
    href: "/productos?servicio=pasteleria",
  },
  {
    eyebrow: "Hecho a mano",
    titulo: "Cada rebanada,",
    italica: "un pequeño lujo.",
    texto: "Cuéntanos qué celebras y personalizamos tu pedido con el detalle que lo hace especial.",
    cta: "Personalizar mi pedido",
    href: "/contacto",
  },
] as const

const SERIF = { fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }

export function HeroClient() {
  const [videoOpen, setVideoOpen] = useState(false)
  const [slide, setSlide] = useState(0)
  const texto = SLIDES_TEXTO[slide]

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = window.setInterval(() => setSlide((s) => (s + 1) % BANNERS.hero.length), SLIDE_MS)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section
      id="inicio"
      data-no-section-divider
      className="relative isolate flex flex-col overflow-hidden bg-[#1c100e] lg:h-[100svh] lg:min-h-[700px]"
    >
      {/* Banners: en desktop son el fondo a todo el ancho; en móvil van como bloque bajo el texto */}
      <div className="relative order-last mx-5 mb-12 mt-10 aspect-[16/10] overflow-hidden rounded-2xl shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)] sm:mx-8 lg:absolute lg:inset-0 lg:z-0 lg:order-none lg:m-0 lg:aspect-auto lg:rounded-none lg:shadow-none">
        {BANNERS.hero.map((b, i) => (
          <Image
            key={b.src}
            src={b.src}
            alt={b.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className={cn(
              "object-cover saturate-[1.1] contrast-[1.04] transition-opacity duration-[1400ms] ease-in-out lg:object-[75%_center]",
              i === slide ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
        {/* Degradados chocolate: dan lectura al texto sin lavar el color del producto */}
        <div
          className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-[#1c100e]/95 via-[#2a1210]/60 via-[38%] to-transparent to-[68%] lg:block"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-40 bg-gradient-to-t from-[#1c100e]/80 to-transparent lg:block"
          aria-hidden
        />

        <div className="absolute bottom-4 right-4 flex gap-2 lg:bottom-10 lg:right-12" role="tablist" aria-label="Banners">
          {BANNERS.hero.map((b, i) => (
            <button
              key={b.src}
              type="button"
              role="tab"
              aria-selected={i === slide}
              aria-label={`Ver banner ${i + 1}`}
              onClick={() => setSlide(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === slide ? "w-8 bg-[#E3C98F]" : "w-3 bg-white/50 hover:bg-white/80",
              )}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 gap-10 px-5 pt-28 sm:px-8 sm:pt-32 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:px-12 lg:pb-16 lg:pt-32">
        <div>
          <div key={slide} className="hero-text-in min-h-[19rem] sm:min-h-[22rem] lg:min-h-[24rem]">
              <p className="flex items-center gap-2.5 text-sm font-medium text-[#EADBCB]">
                <span className="h-px w-8 bg-[#E3C98F]/70" aria-hidden />
                <Cherry className="h-3.5 w-3.5 shrink-0 text-[#E3C98F]" strokeWidth={1.85} aria-hidden />
                {texto.eyebrow}
              </p>

              <h1
                className="mt-4 text-balance text-[2.75rem] font-normal leading-[1.05] text-[#F7EFE4] drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)] sm:text-6xl lg:text-[4.5rem]"
                style={SERIF}
              >
                {texto.titulo} <span className="italic text-[#E3C98F]">{texto.italica}</span>
              </h1>

              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#EADBCB] sm:text-base">{texto.texto}</p>
          </div>

          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Servicios">
            {SERVICIO_PILLS.map((s) => (
              <Link
                key={s.slug}
                href={s.slug === "todos" ? "/productos" : `/productos?servicio=${s.slug}`}
                className="rounded-full border border-white/35 bg-white/10 px-4 py-2 text-sm font-medium text-[#F7EFE4] backdrop-blur-sm transition-colors hover:border-[#E3C98F] hover:bg-white/20 hover:text-[#E3C98F]"
              >
                {s.label}
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link
              href={texto.href}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D64545] px-7 text-sm font-semibold text-white shadow-[0_12px_30px_-10px_rgba(214,69,69,0.8)] transition-colors hover:bg-[#E35252]"
            >
              {texto.cta}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <button
              type="button"
              onClick={() => setVideoOpen(true)}
              className="inline-flex items-center gap-2.5 text-sm font-medium text-[#F7EFE4] underline-offset-4 transition hover:underline"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/50 bg-white/10 text-[#F7EFE4]">
                <Play className="h-3 w-3 fill-current" aria-hidden />
              </span>
              Ver video
            </button>
          </div>
        </div>

        <div className="hidden lg:-mb-6 lg:block lg:self-end lg:justify-self-end">
          <div className="rounded-2xl border border-white/20 bg-[#1c100e]/60 p-6 shadow-[0_25px_50px_-25px_rgba(0,0,0,0.7)] backdrop-blur-md lg:w-80">
            <p className="text-2xl font-normal leading-tight text-[#F7EFE4]" style={SERIF}>
              Frescura <span className="italic text-[#E3C98F]">que enamora.</span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#D8C7B8]">
              Descubre nuestra selección de tortas, postres y cursos.
            </p>
            <ul className="mt-5 flex flex-col divide-y divide-white/15 border-t border-white/15">
              {INDICE.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="group flex items-center justify-between gap-4 py-3 text-[#F7EFE4]">
                    <span className="flex items-baseline gap-3">
                      <span className="text-xs italic text-[#E3C98F]">{item.n}</span>
                      <span
                        className="text-lg font-normal transition-colors group-hover:text-[#E3C98F]"
                        style={SERIF}
                      >
                        {item.label}
                      </span>
                    </span>
                    <ArrowRight
                      className="h-4 w-4 text-[#E3C98F] transition-transform group-hover:translate-x-1"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
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
