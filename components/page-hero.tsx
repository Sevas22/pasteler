import type { ReactNode } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

type PageHeroProps = {
  /** Foto del banner. Si se pasa `background`, se ignora. */
  src?: string
  alt?: string
  /** Capa de fondo personalizada (p. ej. varias fotos con fundido) */
  background?: ReactNode
  title: ReactNode
  description?: string
  priority?: boolean
  /** Enfoque de la foto (clase object-position de Tailwind) */
  focus?: string
  className?: string
}

/** Banner a pantalla completa (borde a borde) con el título encima. */
export function PageHero({ src, alt = "", background, title, description, priority, focus, className }: PageHeroProps) {
  return (
    <section
      data-no-section-divider
      data-snap-hero
      className={cn(
        "relative isolate flex h-[100svh] min-h-[560px] w-full items-end overflow-hidden bg-[#2a1210]",
        className,
      )}
    >
      {background ??
        (src ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="100vw"
            className={cn("object-cover saturate-[1.1] contrast-[1.05]", focus)}
          />
        ) : null)}

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1c100e]/85 via-[#1c100e]/25 to-[#1c100e]/10"
        aria-hidden
      />
      {/* Apaga el brillo/velo claro que traen algunas fotos en las esquinas superiores */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#1c100e]/60 via-[#1c100e]/15 via-[40%] to-transparent to-[65%]"
        aria-hidden
      />

      {/* Franja oscura a la izquierda: da lectura al título sin tapar el producto */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#1c100e]/70 via-[#1c100e]/25 via-[45%] to-transparent to-[75%]"
        aria-hidden
      />

      {/* pb alto: la barra fija inferior (sede + pedido) mide ~64 px y no debe tapar el texto */}
      <div className="relative mx-auto w-full max-w-6xl px-5 pb-28 sm:px-8 sm:pb-32 lg:px-12">
        <div className="mb-5 h-px w-14 bg-[#E3C98F]/80" aria-hidden />
        <h1
          className="max-w-3xl text-balance text-5xl font-normal leading-[1.05] text-[#F7EFE4] drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)] sm:text-6xl lg:text-7xl"
          style={{ fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }}
        >
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#F1E6D8] drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)] sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  )
}
