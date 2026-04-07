import Image from "next/image"
import Link from "next/link"
import { BRANDING } from "@/lib/branding"
import { cn } from "@/lib/utils"

/** Sombra — variante texto superpuesto sobre la imagen */
const shellClassOverlay =
  "group relative isolate block w-full overflow-hidden rounded-2xl border border-black/[0.22] bg-neutral-950 text-left shadow-[0_1px_3px_rgba(0,0,0,0.22),0_4px_16px_rgba(0,0,0,0.18),0_12px_36px_rgba(42,26,26,0.28),0_28px_56px_rgba(42,26,26,0.26)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_2px_8px_rgba(0,0,0,0.26),0_8px_28px_rgba(0,0,0,0.2),0_22px_52px_rgba(42,26,26,0.32),0_40px_80px_rgba(42,26,26,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background aspect-[4/3] min-h-[220px] sm:aspect-[16/10] sm:min-h-[240px] md:min-h-[260px]"

/** Imagen arriba + panel inferior — sin min-height agresivo (evita fichas “alargadas”) */
const shellClassSplit =
  "group relative isolate flex min-h-0 w-full flex-col overflow-hidden rounded-2xl border border-black/[0.18] bg-card text-left shadow-[0_1px_3px_rgba(0,0,0,0.12),0_4px_16px_rgba(0,0,0,0.1),0_12px_32px_rgba(42,26,26,0.14)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(0,0,0,0.12),0_12px_40px_rgba(42,26,26,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background h-full"

/** Ficha split seleccionada (botón) — sombra más suave que overlay */
const selectedSplitRing =
  "ring-2 ring-primary ring-offset-2 ring-offset-background shadow-[0_2px_8px_rgba(0,0,0,0.15),0_8px_24px_rgba(139,46,46,0.22),0_16px_40px_rgba(42,26,26,0.12)]"

type FichaVisualProps = {
  imageSrc: string
  imageAlt: string
  title: string
  pillLeft: string
  pillRight: string
  /** Resumen corto (p. ej. qué aprenderás) — se muestra bajo el título */
  preview?: string
  /** Hasta ~4 ítems; se muestran unidos con · bajo el preview */
  previewHighlights?: readonly string[]
  /** `overlay`: texto sobre imagen (catálogo). `split`: imagen arriba y contenido abajo (cursos). */
  contentLayout?: "overlay" | "split"
  /** En `split`, mostrar logo Daliza sobre la foto (p. ej. cursos). `false` = foto limpia (categorías producto). */
  showBrandLogoOnImage?: boolean
  /** En `split`: `contain` = foto completa sin recorte (bandas si el ratio no coincide). `cover` = rellena el recuadro. */
  imageFit?: "cover" | "contain"
  sizes?: string
  priority?: boolean
  className?: string
}

function ContentBlock({
  title,
  preview,
  highlights,
  pillLeft,
  pillRight,
  variant,
}: {
  title: string
  preview?: string
  highlights: string[]
  pillLeft: string
  pillRight: string
  variant: "overlay" | "split"
}) {
  const hasPreview = Boolean(preview?.trim()) || highlights.length > 0

  if (variant === "split") {
    return (
      <div className="flex flex-1 flex-col border-t border-brand-gold/25 bg-card px-4 py-4 sm:px-5 sm:py-5">
        <h2 className="border-l-[3px] border-primary pl-3 text-balance font-serif text-xl font-normal leading-snug tracking-wide text-heading sm:text-2xl">
          {title}
        </h2>
        {preview?.trim() ? (
          <p className="font-sans mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3 sm:line-clamp-4">
            {preview.trim()}
          </p>
        ) : null}
        {highlights.length > 0 ? (
          <p className="font-sans mt-2 text-[11px] leading-snug text-muted-foreground line-clamp-3 sm:text-xs" title={highlights.join(" · ")}>
            <span className="font-semibold text-primary">Temas: </span>
            {highlights.join(" · ")}
          </p>
        ) : null}
        <div className={cn("mt-auto flex flex-wrap items-center gap-2 pt-4", hasPreview ? "" : "pt-2")}>
          <span className="inline-flex rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-primary-foreground shadow-sm sm:text-xs">
            {pillLeft}
          </span>
          <span className="inline-flex rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold text-secondary-foreground shadow-sm ring-1 ring-border/80 sm:text-xs">
            {pillRight}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 z-10 flex flex-col justify-end p-5 sm:p-6 md:p-7">
      <div className="relative">
        <h2 className="max-w-[95%] font-serif text-2xl font-normal leading-[1.15] tracking-wide text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.75),0_3px_14px_rgba(0,0,0,0.5),0_6px_24px_rgba(0,0,0,0.35)] sm:text-3xl md:text-[2.1rem]">
          {title}
        </h2>
        {preview?.trim() ? (
          <p className="font-sans mt-2 max-w-[98%] text-sm font-medium leading-snug text-white/92 line-clamp-2 [text-shadow:0_1px_3px_rgba(0,0,0,0.85),0_2px_12px_rgba(0,0,0,0.45)] sm:mt-2.5 sm:text-[0.9375rem] sm:leading-relaxed">
            {preview.trim()}
          </p>
        ) : null}
        {highlights.length > 0 ? (
          <p
            className="font-sans mt-2 max-w-[98%] text-[11px] font-normal leading-snug text-white/78 line-clamp-2 [text-shadow:0_1px_2px_rgba(0,0,0,0.9)] sm:text-xs sm:text-white/80"
            title={highlights.join(" · ")}
          >
            <span className="font-semibold text-[#C9A96E]">Temas: </span>
            {highlights.join(" · ")}
          </p>
        ) : null}
        <div className={cn("flex flex-wrap items-center gap-2", hasPreview ? "mt-3.5 sm:mt-4" : "mt-4")}>
          <span className="inline-flex rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-primary-foreground shadow-sm sm:text-xs">
            {pillLeft}
          </span>
          <span className="inline-flex rounded-full bg-white/92 px-3 py-1 text-[11px] font-semibold text-neutral-800 shadow-sm ring-1 ring-black/5 sm:text-xs">
            {pillRight}
          </span>
        </div>
      </div>
    </div>
  )
}

function FichaVisual({
  imageSrc,
  imageAlt,
  title,
  pillLeft,
  pillRight,
  preview,
  previewHighlights,
  contentLayout = "overlay",
  showBrandLogoOnImage = true,
  imageFit = "cover",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priority,
}: FichaVisualProps) {
  const highlights = previewHighlights?.filter(Boolean).slice(0, 4) ?? []
  const hasPreview = Boolean(preview?.trim()) || highlights.length > 0
  const fitContain = contentLayout === "split" && imageFit === "contain"

  if (contentLayout === "split") {
    return (
      <>
        <div
          className={cn(
            "relative w-full shrink-0 overflow-hidden bg-neutral-950",
            fitContain
              ? "aspect-[3/2] min-h-[168px] bg-[#f4f0eb] sm:min-h-[188px] md:aspect-[5/3] md:min-h-[212px]"
              : "h-[200px] sm:h-[220px] md:h-[240px]",
          )}
        >
          <div
            className={cn(
              "absolute inset-0",
              fitContain && "p-3 sm:p-4 md:p-5",
            )}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className={cn(
                "transition-transform duration-500 ease-out",
                fitContain ? "object-contain object-center group-hover:scale-[1.02]" : "object-cover object-center group-hover:scale-[1.03]",
              )}
              sizes={sizes}
              priority={priority}
            />
          </div>
          {showBrandLogoOnImage ? (
            <>
              <div
                className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-90"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute top-2.5 right-2.5 z-[15] rounded-lg bg-neutral-950 p-2 shadow-[0_2px_12px_rgba(0,0,0,0.45)] ring-1 ring-white/15 sm:top-3 sm:right-3 sm:p-2.5"
                aria-hidden
              >
                <Image
                  src={BRANDING.logoPrincipal}
                  alt=""
                  width={200}
                  height={72}
                  className="h-8 w-auto max-w-[5.75rem] object-contain object-center opacity-[0.98] sm:h-9 sm:max-w-[6.25rem]"
                />
              </div>
            </>
          ) : null}
        </div>
        <ContentBlock
          variant="split"
          title={title}
          preview={preview}
          highlights={highlights}
          pillLeft={pillLeft}
          pillRight={pillRight}
        />
      </>
    )
  }

  return (
    <>
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        sizes={sizes}
        priority={priority}
      />

      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-opacity duration-300",
          hasPreview && "via-black/45",
        )}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute top-1.5 right-1.5 z-[15] sm:top-2 sm:right-2 md:top-2.5 md:right-2.5"
        aria-hidden
      >
        <Image
          src={BRANDING.logoPrincipal}
          alt=""
          width={220}
          height={308}
          className="h-14 w-auto max-h-16 max-w-[7.25rem] object-contain object-right object-top opacity-[0.94] drop-shadow-[0_1px_5px_rgba(0,0,0,0.72),0_5px_22px_rgba(0,0,0,0.55)] sm:h-16 sm:max-h-[4.75rem] sm:max-w-[8.25rem] md:h-[4.75rem] md:max-h-20 md:max-w-[9rem]"
        />
      </div>

      <ContentBlock
        variant="overlay"
        title={title}
        preview={preview}
        highlights={highlights}
        pillLeft={pillLeft}
        pillRight={pillRight}
      />
    </>
  )
}

export type CatalogFichaLinkProps = FichaVisualProps & { href: string }

export function CatalogFichaLink({ href, className, contentLayout = "overlay", ...visual }: CatalogFichaLinkProps) {
  const shell = contentLayout === "split" ? shellClassSplit : shellClassOverlay
  return (
    <Link href={href} className={cn(shell, className)}>
      <FichaVisual {...visual} contentLayout={contentLayout} />
    </Link>
  )
}

export type CatalogFichaButtonProps = FichaVisualProps & {
  onClick: () => void
  selected?: boolean
}

export function CatalogFichaButton({
  onClick,
  selected,
  className,
  contentLayout = "overlay",
  ...visual
}: CatalogFichaButtonProps) {
  const shell = contentLayout === "split" ? shellClassSplit : shellClassOverlay
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        shell,
        "cursor-pointer",
        selected &&
          (contentLayout === "split"
            ? selectedSplitRing
            : "ring-2 ring-primary ring-offset-2 ring-offset-background shadow-[0_2px_8px_rgba(0,0,0,0.26),0_10px_30px_rgba(0,0,0,0.2),0_24px_56px_rgba(42,26,26,0.3),0_34px_68px_rgba(139,46,46,0.38)]"),
        className,
      )}
    >
      <FichaVisual {...visual} contentLayout={contentLayout} />
    </button>
  )
}
