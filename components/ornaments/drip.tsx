/**
 * Firma visual del rediseño: el goteo de ganache que se ve en las fotos reales de producto
 * (torta-chocolate-ganache). Se usa como máscara de imagen (DripClipDefs + DRIP_CLIP_STYLE)
 * y como borde que "conecta" una foto a sangre completa con la sección siguiente (DripEdge).
 */
import type { CSSProperties } from "react"

const DRIP_PATH =
  "M0,0 H1 V0.78 C0.97,0.78 0.97,0.94 0.92,1.00 C0.88,1.00 0.87,0.84 0.84,0.80 C0.80,0.76 0.78,0.90 0.74,0.94 C0.70,0.90 0.69,0.80 0.65,0.78 C0.60,0.76 0.58,0.96 0.55,1.00 C0.52,1.00 0.47,0.84 0.44,0.82 C0.40,0.80 0.37,0.88 0.34,0.90 C0.31,0.88 0.28,0.80 0.24,0.78 C0.20,0.76 0.16,0.93 0.13,0.97 C0.10,0.94 0.08,0.82 0.05,0.80 C0.03,0.79 0.01,0.78 0,0.78 Z"

/** Renderizar una sola vez (p. ej. en el hero) para habilitar `DRIP_CLIP_STYLE` en cualquier imagen. */
export function DripClipDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden>
      <defs>
        <clipPath id="drip-clip" clipPathUnits="objectBoundingBox">
          <path d={DRIP_PATH} />
        </clipPath>
      </defs>
    </svg>
  )
}

export const DRIP_CLIP_STYLE: CSSProperties = { clipPath: "url(#drip-clip)" }

type DripEdgeProps = {
  className?: string
  /** Color de relleno del goteo — normalmente el fondo de la sección siguiente. */
  fill?: string
}

/** Borde de goteo visible: se coloca al pie de una foto a sangre completa para "gotear" hacia la sección de abajo. */
export function DripEdge({ className, fill = "currentColor" }: DripEdgeProps) {
  return (
    <svg
      viewBox="0 0 1 1"
      preserveAspectRatio="none"
      className={className}
      style={{ color: fill }}
      aria-hidden
    >
      <path d={DRIP_PATH} fill="currentColor" />
    </svg>
  )
}
