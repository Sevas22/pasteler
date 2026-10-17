"use client"

import Image from "next/image"
import { useState } from "react"
import { HeroCarouselBackground } from "@/components/hero-carousel-background"
import { TORTAS_PERSONALIZADAS } from "@/lib/media"

const SLIDES = TORTAS_PERSONALIZADAS.map(({ src, alt }) => ({ src, alt }))

/** Carrusel automático de tortas personalizadas; la miniatura muestra la siguiente torta. */
export function TortasCarrusel() {
  const [index, setIndex] = useState(0)
  const siguiente = (index + 1) % SLIDES.length

  return (
    <>
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-[0_30px_70px_-25px_rgba(0,0,0,0.8)]">
        <HeroCarouselBackground
          slides={SLIDES}
          intervalMs={3500}
          index={index}
          onIndexChange={setIndex}
          ariaLabel="Tortas personalizadas hechas por Daliza"
          sizes="(max-width: 1024px) 90vw, 440px"
          dotsContainerClassName="bottom-4 left-4 max-w-[50%] translate-x-0 justify-start gap-1.5 px-0"
        />
      </div>
      <button
        type="button"
        onClick={() => setIndex(siguiente)}
        aria-label={`Ver siguiente: ${SLIDES[siguiente].alt}`}
        className="absolute -bottom-8 -right-4 z-10 w-[46%] overflow-hidden rounded-2xl border-4 border-[#2a1210] shadow-[0_24px_50px_-20px_rgba(0,0,0,0.8)] sm:-right-8"
      >
        <div className="relative aspect-square w-full">
          <Image
            key={SLIDES[siguiente].src}
            src={SLIDES[siguiente].src}
            alt=""
            fill
            className="object-cover animate-in fade-in duration-700"
            sizes="(max-width: 1024px) 40vw, 200px"
          />
        </div>
      </button>
    </>
  )
}
