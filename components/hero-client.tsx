"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowRight, Cherry } from "lucide-react"
import { SERVICIOS_PRODUCTO } from "@/lib/data/productos-helpers"
import { BANNERS } from "@/lib/media"
import { cn } from "@/lib/utils"

const SERVICIO_PILLS = [...SERVICIOS_PRODUCTO, { slug: "todos", label: "Todos" }] as const

const SLIDE_MS = 6500

/** Texto que acompaña a cada banner (mismo orden que BANNERS.hero). */
const SLIDES_TEXTO = [
  {
    eyebrow: "Pastelería fina en Bosa, Bogotá",
    titulo: "Un antojo para",
    italica: "cada momento.",
    texto: "Tortas, cheesecakes y postres hechos a mano en nuestras sedes de Bosa y Ciudadela Colsubsidio.",
    cta: "Explorar catálogo",
    href: "/productos",
  },
  {
    eyebrow: "Tortas de la casa",
    titulo: "Sabores que se",
    italica: "quedan contigo.",
    texto: "Amapola, frutos rojos, chocolate y crema: tortas para compartir en cada celebración.",
    cta: "Ver pastelería",
    href: "/productos?servicio=pasteleria",
  },
  {
    eyebrow: "Tortas con cheesecake",
    titulo: "Cada porción,",
    italica: "un pequeño lujo.",
    texto: "Nuestra torta con cheesecake de maracuyá: cremosa, fresca y lista para tu próxima celebración.",
    cta: "Ver esta torta",
    href: "/productos/torta-con-cheesecake-de-maracuya",
  },
] as const

const SERIF = { fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }

export function HeroClient() {
  const [slide, setSlide] = useState(0)
  // El zoom del primer banner arranca tras el primer pintado (si no, ya vendría ampliado desde el servidor)
  const [montado, setMontado] = useState(false)
  const texto = SLIDES_TEXTO[slide]
  const lado = BANNERS.hero[slide].lado

  // Banners 2 y 3: se cargan cuando la página ya terminó (el primero cambia a los 6,5 s, hay tiempo de sobra)
  const [bannersExtra, setBannersExtra] = useState(false)

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setMontado(true))
    return () => window.cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    let t = 0
    const cargar = () => {
      t = window.setTimeout(() => setBannersExtra(true), 800)
    }
    if (document.readyState === "complete") cargar()
    else window.addEventListener("load", cargar, { once: true })
    return () => {
      window.removeEventListener("load", cargar)
      window.clearTimeout(t)
    }
  }, [])

  // Un temporizador por banner: al elegir uno a mano, la cuenta (y la barra de progreso) vuelve a empezar
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = window.setTimeout(() => setSlide((s) => (s + 1) % BANNERS.hero.length), SLIDE_MS)
    return () => window.clearTimeout(id)
  }, [slide])

  return (
    <section
      id="inicio"
      data-no-section-divider
      className="relative isolate flex flex-col overflow-hidden bg-[#F7EFE4] lg:h-[100svh] lg:min-h-[700px]"
    >
      {/* Banners: en desktop son el fondo a todo el ancho; en celular y tableta van arriba, antes del texto */}
      <div className="relative mx-4 mt-[6.5rem] aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-[0_30px_60px_-30px_rgba(58,38,32,0.45)] sm:mx-8 sm:mt-28 sm:aspect-[16/9] lg:absolute lg:inset-x-0 lg:bottom-0 lg:top-16 lg:z-0 lg:m-0 lg:aspect-auto lg:rounded-none lg:shadow-none">
        {BANNERS.hero.map((b, i) => (
          // Solo el primer banner viaja con la página; los demás se piden después de que esta termina de cargar
          (i === 0 || bannersExtra) && (
          <Image
            key={b.src}
            src={b.src}
            alt={b.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            // En celular se encuadra en las tortas (punto del zoom); en desktop, el encuadre que deja espacio al texto
            style={{ "--pos-movil": b.zoom, "--pos-desk": b.encuadre, transformOrigin: b.zoom } as React.CSSProperties}
            className={cn(
              "object-cover [object-position:var(--pos-movil)] motion-reduce:!scale-100 lg:[object-position:var(--pos-desk)]",
              // Zoom lento hacia la torta mientras el banner está activo; al salir vuelve a 1 cuando ya se desvaneció
              i === slide
                ? "opacity-100 [transition:opacity_1400ms_ease-in-out,scale_9s_ease-out]"
                : "opacity-0 [transition:opacity_1400ms_ease-in-out,scale_0s_1400ms]",
              i === slide && montado ? "scale-[1.08]" : "scale-100",
            )}
          />
          )
        ))}
        {/* Velo crema del lado libre de la foto: da lectura al texto sin tapar las tortas */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-[#F7EFE4]/95 via-[#F7EFE4]/65 via-[30%] to-transparent to-[48%] transition-opacity duration-[1400ms] lg:block",
            lado === "izquierda" ? "opacity-100" : "opacity-0",
          )}
          aria-hidden
        />
        <div
          className={cn(
            "pointer-events-none absolute inset-0 hidden bg-gradient-to-l from-[#F7EFE4]/95 via-[#F7EFE4]/65 via-[30%] to-transparent to-[48%] transition-opacity duration-[1400ms] lg:block",
            lado === "derecha" ? "opacity-100" : "opacity-0",
          )}
          aria-hidden
        />

        {/* lg:right-32: deja libre la esquina del botón flotante de WhatsApp */}
        <div className="absolute bottom-4 right-4 flex gap-2 lg:bottom-10 lg:right-32" role="tablist" aria-label="Banners">
          {BANNERS.hero.map((b, i) => (
            <button
              key={b.src}
              type="button"
              role="tab"
              aria-selected={i === slide}
              aria-label={`Ver banner ${i + 1}`}
              onClick={() => setSlide(i)}
              // Zona táctil alta (py-3) alrededor de una barra fina: fácil de tocar con el dedo
              className="group/punto -my-3 py-3"
            >
              <span
                className={cn(
                  "relative block h-1.5 overflow-hidden rounded-full shadow-sm transition-all duration-300",
                  i === slide ? "w-12 bg-white/80" : "w-6 bg-white/80 group-hover/punto:bg-white sm:w-3",
                )}
              >
                {/* Barra que se llena mientras dura el banner */}
                {i === slide ? (
                  <span
                    key={slide}
                    className="hero-progreso absolute inset-y-0 left-0 rounded-full bg-primary"
                    style={{ animationDuration: `${SLIDE_MS}ms` }}
                    aria-hidden
                  />
                ) : null}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* En desktop el texto se pega al borde libre de cada foto (no al centro), para no montarse sobre las tortas */}
      <div className="relative z-10 flex w-full flex-1 px-5 pb-12 pt-8 sm:px-8 sm:pt-10 lg:items-center lg:px-14 lg:pb-16 lg:pt-24 xl:px-16 2xl:px-24">
        <div
          key={slide}
          className={cn(
            "max-w-xl lg:max-w-[26rem] 2xl:max-w-[30rem]",
            lado === "derecha" ? "hero-entra-derecha lg:ml-auto" : "hero-entra-izquierda",
          )}
        >
          <h1 className="sr-only">Daliza Pastelería Fina: tortas personalizadas, postres y panadería en Bosa, Bogotá</h1>
          <div className="min-h-[17rem] sm:min-h-[20rem] lg:min-h-[20rem]">
            <p className="hero-paso flex items-center gap-2.5 text-sm font-medium text-primary" style={{ animationDelay: "0ms" }}>
              <span className="hero-linea h-px w-8 bg-primary/50" aria-hidden />
              <Cherry className="h-3.5 w-3.5 shrink-0" strokeWidth={1.85} aria-hidden />
              {texto.eyebrow}
            </p>

            <h2
              className="hero-paso mt-4 text-balance text-[2.75rem] font-normal leading-[1.05] text-heading sm:text-6xl lg:text-[3.4rem] xl:text-[3.6rem] 2xl:text-[4rem]"
              style={{ ...SERIF, animationDelay: "90ms" }}
            >
              {texto.titulo} <span className="italic text-primary">{texto.italica}</span>
            </h2>

            <p
              className="hero-paso mt-5 max-w-md text-[15px] leading-relaxed text-foreground/80 sm:text-base"
              style={{ animationDelay: "180ms" }}
            >
              {texto.texto}
            </p>
          </div>

          <div className="hero-paso flex flex-wrap gap-2" style={{ animationDelay: "270ms" }} role="tablist" aria-label="Servicios">
            {SERVICIO_PILLS.map((s) => (
              <Link
                key={s.slug}
                href={`/productos?servicio=${s.slug}`}
                className="rounded-full border border-primary/25 bg-white/70 px-4 py-2 text-sm font-medium text-heading backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
              >
                {s.label}
              </Link>
            ))}
          </div>

          <div className="hero-paso mt-8 flex flex-wrap items-center gap-5" style={{ animationDelay: "360ms" }}>
            <Link
              href={texto.href}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground shadow-[0_12px_30px_-12px_rgba(120,30,30,0.6)] transition-colors hover:bg-primary-hover"
            >
              {texto.cta}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
