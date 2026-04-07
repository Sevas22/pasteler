"use client"

import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export type HeroCarouselSlide = {
  src: string
  alt: string
}

type HeroCarouselBackgroundProps = {
  slides: readonly HeroCarouselSlide[]
  /** Intervalo de autoplay en ms (solo si hay más de una imagen) */
  intervalMs?: number
  className?: string
  /** Clases extra en cada imagen (p. ej. object-position) */
  imageClassName?: string
  /** Posición del contenedor de puntos (p. ej. encima de una barra inferior) */
  dotsContainerClassName?: string
}

/**
 * Carrusel de imágenes a pantalla completa con fundido, puntos y flechas (pausa al pasar el mouse).
 */
export function HeroCarouselBackground({
  slides,
  intervalMs = 6500,
  className,
  imageClassName,
  dotsContainerClassName,
}: HeroCarouselBackgroundProps) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), [slides.length])
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + slides.length) % slides.length),
    [slides.length],
  )

  useEffect(() => {
    if (paused || slides.length <= 1) return
    const t = window.setInterval(next, intervalMs)
    return () => window.clearInterval(t)
  }, [paused, intervalMs, next, slides.length])

  if (slides.length === 0) return null

  const current = slides[index]

  return (
    <div
      className={cn("absolute inset-0 z-0 overflow-hidden", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-roledescription="carrusel"
      aria-label="Imágenes destacadas de pastelería"
    >
      <p className="sr-only" aria-live="polite">
        {current?.alt}
      </p>

      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className={cn(
            "absolute inset-0 transition-opacity duration-[800ms] ease-out",
            i === index ? "z-[1] opacity-100" : "z-0 opacity-0",
          )}
          aria-hidden={i !== index}
        >
          <Image
            src={slide.src}
            alt=""
            fill
            className={cn("object-cover object-center", imageClassName)}
            sizes="100vw"
            priority={i === 0}
          />
        </div>
      ))}

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            className="absolute left-2 top-1/2 z-[30] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-white/15 text-white shadow-sm backdrop-blur-sm transition duration-200 hover:bg-white/30 md:left-4 md:h-11 md:w-11"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
            className="absolute right-2 top-1/2 z-[30] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-white/15 text-white shadow-sm backdrop-blur-sm transition duration-200 hover:bg-white/30 md:right-4 md:h-11 md:w-11"
            aria-label="Imagen siguiente"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          <div
            className={cn(
              "absolute bottom-5 left-1/2 z-[30] flex max-w-[90vw] -translate-x-1/2 flex-wrap justify-center gap-2 px-2",
              dotsContainerClassName,
            )}
            aria-label="Seleccionar imagen"
          >
            {slides.map((_, i) => (
              <button
                key={`carousel-dot-${i}`}
                type="button"
                aria-selected={i === index}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === index ? "w-8 bg-white shadow-sm" : "w-2 bg-white/50 hover:bg-white/80",
                )}
                aria-label={`Imagen ${i + 1} de ${slides.length}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
