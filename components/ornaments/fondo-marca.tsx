import { Corazon, Hoja } from "@/components/sedes-dalizas/decoraciones"
import { cn } from "@/lib/utils"

/*
 * Fondo de identidad Daliza para secciones claras (mismo lenguaje que "Nuestras sedes"):
 * manchas crema, curvas doradas, formas vino, corazones y hojas. Todo SVG en línea.
 *
 * Regla: las líneas y las formas vino viven SOLO en dos franjas de alto fijo pegadas al borde superior
 * e inferior de la sección (40/32 px en móvil y tablet, 56/48 px en escritorio), que caben dentro del
 * padding de las secciones. Así nunca
 * pasan por encima de un texto, sin importar el alto de la sección ni el tamaño de pantalla.
 * Lo único que ocupa toda la sección son manchas crema muy suaves.
 *
 * Uso: la sección debe tener `relative isolate overflow-hidden`; este fondo va como primer hijo.
 *  - "arriba":  curvas y forma vino en el borde superior.
 *  - "abajo":   curvas y forma vino en el borde inferior.
 *  - "lateral": curvas arriba y forma vino abajo a la derecha.
 *  - "suave":   solo una línea tenue en cada borde (páginas con mucho texto).
 */

export type VarianteFondo = "arriba" | "abajo" | "lateral" | "suave"

const DORADO = "#C9A96E"
const DORADO_CLARO = "#D9B77D"
const VINO = "#7A2028"
const VINO_PROFUNDO = "#711D26"

/** Las líneas conservan su grosor aunque el SVG se estire (preserveAspectRatio="none"). */
const LINEA = { fill: "none", vectorEffect: "non-scaling-stroke" as const, strokeLinecap: "round" as const }

/* ── Manchas crema (toda la sección; sin líneas) ── */

function Manchas({ variante }: { variante: VarianteFondo }) {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1920 900" preserveAspectRatio="none" focusable="false">
      {variante === "abajo" ? (
        <path d="M1960 0 H1180 C1260 70,1420 120,1600 112 C1760 105,1860 70,1960 92 Z" fill="#F3EAE2" opacity="0.7" />
      ) : (
        <path d="M0 0 H1920 V120 C1650 170,1470 70,1210 112 C960 156,780 60,510 116 C300 160,140 112,0 140 Z" fill="#F3EAE2" opacity={variante === "suave" ? 0.5 : 0.7} />
      )}
      {variante !== "suave" ? (
        <path d="M-40 640 C260 580,520 690,820 640 C1080 596,1300 680,1560 640 C1720 615,1840 640,1960 625 L1960 900 L-40 900 Z" fill="#FBF6F0" opacity="0.75" />
      ) : null}
    </svg>
  )
}

/* ── Franja superior (56 px) ── */

function FranjaArriba({ variante }: { variante: VarianteFondo }) {
  const tenue = variante === "suave" || variante === "abajo"
  return (
    <svg className="absolute inset-x-0 top-0 h-10 w-full lg:h-14" viewBox="0 0 1920 100" preserveAspectRatio="none" focusable="false">
      <path d="M-80 34 C300 6,620 66,960 38 C1300 10,1600 62,1990 30" {...LINEA} stroke={DORADO} strokeWidth={tenue ? 1.1 : 1.6} opacity={tenue ? 0.4 : 0.8} />
      {!tenue ? <path d="M-80 50 C302 22,624 82,966 54 C1306 26,1606 78,1990 46" {...LINEA} stroke={DORADO_CLARO} strokeWidth="1" opacity="0.55" /> : null}
      {variante === "arriba" ? (
        <>
          <path d="M1660 -10 C1720 46,1810 70,1960 62 L1960 -10 Z" fill={VINO_PROFUNDO} />
          <path d="M1610 -10 C1680 58,1790 86,1960 80" {...LINEA} stroke={DORADO} strokeWidth="1.6" />
        </>
      ) : null}
    </svg>
  )
}

/* ── Franja inferior (64 px) ── */

function FranjaAbajo({ variante }: { variante: VarianteFondo }) {
  const tenue = variante === "suave" || variante === "arriba"
  return (
    <svg className="absolute inset-x-0 bottom-0 h-8 w-full lg:h-12" viewBox="0 0 1920 100" preserveAspectRatio="none" focusable="false">
      <path d="M-80 62 C300 92,620 30,960 58 C1300 86,1620 32,1990 64" {...LINEA} stroke={DORADO} strokeWidth={tenue ? 1.1 : 1.6} opacity={tenue ? 0.4 : 0.8} />
      {!tenue ? <path d="M-80 46 C302 76,624 14,966 42 C1306 70,1626 16,1990 48" {...LINEA} stroke={DORADO_CLARO} strokeWidth="1" opacity="0.55" /> : null}
      {variante === "abajo" ? (
        <>
          <path d="M-40 110 L-40 48 C90 36,200 66,330 110 Z" fill={VINO} />
          <path d="M-40 34 C96 22,212 56,352 110" {...LINEA} stroke={DORADO} strokeWidth="1.6" />
        </>
      ) : null}
      {variante === "lateral" ? (
        <>
          <path d="M1960 110 L1960 44 C1830 34,1720 64,1590 110 Z" fill={VINO_PROFUNDO} />
          <path d="M1960 30 C1822 20,1706 52,1566 110" {...LINEA} stroke={DORADO} strokeWidth="1.6" />
        </>
      ) : null}
    </svg>
  )
}

export function FondoMarca({ variante = "suave", className }: { variante?: VarianteFondo; className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <Manchas variante={variante} />
      <FranjaArriba variante={variante} />
      <FranjaAbajo variante={variante} />

      {/* Adornos a mano alzada, también dentro de las franjas de los bordes */}
      {variante === "arriba" ? <Hoja className="absolute left-[4%] top-2 hidden w-6 -rotate-[8deg] opacity-70 lg:block" /> : null}
      {variante === "abajo" ? <Corazon className="absolute bottom-3 right-[7%] hidden w-9 -rotate-[10deg] opacity-75 md:block" /> : null}
      {variante === "lateral" ? <Corazon className="absolute left-[5%] top-2 hidden w-9 rotate-[12deg] opacity-70 md:block" /> : null}
    </div>
  )
}
