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

/** Banner borde a borde con el título encima. */
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
        "relative isolate flex w-full overflow-hidden",
        // Media pantalla: arranca debajo del menú fijo (64 px) para que la foto se vea completa
        medio ? "mt-16 h-[50svh] min-h-[360px] items-center lg:min-h-[420px]" : "h-[100svh] min-h-[560px] items-end",
        claro ? "bg-[#F3EAE2]" : "bg-[#2a1210]",
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
            className={cn("object-cover", !claro && "saturate-[1.1] contrast-[1.05]", focus)}
          />
        ) : null)}

      {claro ? (
        // Velo crema del lado del texto: la foto clara se conserva intacta del lado del producto
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#F8F2EA]/95 via-[#F8F2EA]/70 via-[38%] to-transparent to-[62%] max-sm:bg-gradient-to-t max-sm:from-[#F8F2EA]/95 max-sm:via-[#F8F2EA]/70 max-sm:via-[45%] max-sm:to-transparent max-sm:to-[80%]"
          aria-hidden
        />
      ) : (
        <>
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
        </>
      )}

      <div
        className={cn(
          "relative mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12",
          // Media pantalla: el texto va centrado (en móvil, abajo sobre el velo crema)
          medio ? "py-8 max-sm:self-end" : "pb-28 sm:pb-32",
        )}
      >
        <div className={cn("mb-5 h-px w-14", claro ? "bg-[#C9A96E]" : "bg-[#E3C98F]/80")} aria-hidden />
        <h1
          className={cn(
            "text-balance font-normal leading-[1.05]",
            // En media pantalla el título va más angosto para no llegar a la foto del producto
            medio ? "max-w-md text-4xl sm:text-5xl lg:max-w-lg lg:text-6xl" : "max-w-3xl text-5xl sm:text-6xl lg:text-7xl",
            claro ? "text-[#5A2E2E] [&_.italic]:!text-[#8B2E2E]" : "text-[#F7EFE4] drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)]",
          )}
          style={SERIF}
        >
          {title}
        </h1>
        {description ? (
          <p
            className={cn(
              "mt-5 max-w-md text-[15px] leading-relaxed sm:text-base",
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
