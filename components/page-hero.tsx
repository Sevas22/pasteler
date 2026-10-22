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
  /** "completo": pantalla completa (por defecto). "medio": media pantalla, ideal para fotos panorámicas. */
  alto?: "completo" | "medio"
  /** "oscuro": foto oscurecida con texto claro (por defecto). "claro": para fotos claras, texto oscuro sobre velo crema. */
  tono?: "oscuro" | "claro"
}

const SERIF = { fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }

/**
 * Banner con el título.
 * - Escritorio (desde 1024 px): foto a todo el fondo, borde a borde, con el título encima.
 * - Celular y tableta: las fotos son panorámicas y en una pantalla vertical se verían como una franja muy
 *   ampliada con el texto tapando el producto. Por eso la foto va arriba, completa, y el título debajo.
 */
export function PageHero({
  src,
  alt = "",
  background,
  title,
  description,
  priority,
  focus,
  className,
  alto = "completo",
  tono = "oscuro",
}: PageHeroProps) {
  const claro = tono === "claro"
  const medio = alto === "medio"

  return (
    <section
      data-no-section-divider
      data-snap-hero
      className={cn(
        "relative isolate w-full overflow-hidden",
        // Celular y tableta: la foto arranca debajo de la barra del menú (64 px). Escritorio: foto de fondo.
        "max-lg:pt-16 lg:flex",
        medio ? "lg:mt-16 lg:h-[50svh] lg:min-h-[420px] lg:items-center" : "lg:h-[100svh] lg:min-h-[560px] lg:items-end",
        claro ? "bg-[#F3EAE2]" : "bg-[#2a1210]",
        className,
      )}
    >
      {/* Foto: bloque 4:3 (16:9 en tableta) arriba en celular; fondo de toda la sección en escritorio */}
      <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/9] lg:absolute lg:inset-0 lg:aspect-auto">
        {background ??
          (src ? (
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              sizes="100vw"
              className={cn("object-cover", !claro && "saturate-[1.1] contrast-[1.05]", focus)}
            />
          ) : null)}

        {/* Celular y tableta: la foto se funde suavemente con el color de la sección donde empieza el título */}
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t to-transparent lg:hidden",
            claro ? "from-[#F3EAE2]" : "from-[#2a1210]",
          )}
          aria-hidden
        />

        {claro ? (
          // Velo crema del lado del texto: la foto clara se conserva intacta del lado del producto
          <div
            className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-[#F8F2EA]/95 via-[#F8F2EA]/70 via-[38%] to-transparent to-[62%] lg:block"
            aria-hidden
          />
        ) : (
          <>
            <div
              className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-[#1c100e]/85 via-[#1c100e]/25 to-[#1c100e]/10 lg:block"
              aria-hidden
            />
            {/* Apaga el brillo/velo claro que traen algunas fotos en las esquinas superiores */}
            <div
              className="pointer-events-none absolute inset-0 hidden bg-gradient-to-br from-[#1c100e]/60 via-[#1c100e]/15 via-[40%] to-transparent to-[65%] lg:block"
              aria-hidden
            />
            {/* Franja oscura a la izquierda: da lectura al título sin tapar el producto */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 hidden w-full bg-gradient-to-r from-[#1c100e]/70 via-[#1c100e]/25 via-[45%] to-transparent to-[75%] lg:block"
              aria-hidden
            />
          </>
        )}
      </div>

      <div
        className={cn(
          "relative mx-auto w-full max-w-6xl px-5 pb-12 pt-2 sm:px-8 lg:px-12",
          // Escritorio: el título va sobre la foto (abajo en pantalla completa, centrado en media pantalla)
          medio ? "lg:py-8" : "lg:pb-32 lg:pt-0",
        )}
      >
        <div className={cn("mb-5 h-px w-14", claro ? "bg-[#C9A96E]" : "bg-[#E3C98F]/80")} aria-hidden />
        <h1
          className={cn(
            "text-balance font-normal leading-[1.05]",
            // En media pantalla el título va más angosto para no llegar a la foto del producto
            medio ? "max-w-md text-4xl sm:text-5xl lg:max-w-lg lg:text-6xl" : "max-w-3xl text-4xl sm:text-6xl lg:text-7xl",
            claro ? "text-[#5A2E2E] [&_.italic]:!text-[#8B2E2E]" : "text-[#F7EFE4] drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)]",
          )}
          style={SERIF}
        >
          {title}
        </h1>
        {description ? (
          <p
            className={cn(
              "mt-4 max-w-md text-[15px] leading-relaxed sm:text-base lg:mt-5",
              claro ? "text-[#57473F]" : "text-[#F1E6D8] drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
    </section>
  )
}
