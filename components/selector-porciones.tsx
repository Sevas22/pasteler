"use client"

import Link from "next/link"
import type { Producto } from "@/lib/types/producto"
import { cn } from "@/lib/utils"

/** Tamaños que se piden directo (personas). Más de 30 personas se cotiza aparte. */
export const PORCIONES = [10, 20, 30] as const
export type Porciones = (typeof PORCIONES)[number]

/** Toda la línea Pastelería se puede pedir por porciones. */
export function vendePorPorciones(producto: Pick<Producto, "servicio">) {
  return producto.servicio === "pasteleria"
}

/** Texto para WhatsApp/cotización: "Torta Ópera para 20 personas". */
export function nombreConPorciones(nombre: string, porciones: number | null) {
  return porciones ? `${nombre} para ${porciones} personas` : nombre
}

/** Torta vista desde arriba con sus cortes: más porciones, torta más grande y más cortes. */
function TortaCortada({ porciones, activa }: { porciones: number; activa: boolean }) {
  const r = 10 + (Math.min(porciones, 40) / 40) * 8 // radio 12 → 18
  const borde = (r + 1.6).toFixed(2)
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9 sm:h-10 sm:w-10" aria-hidden>
      <circle cx="20" cy="20" r={borde} fill="none" stroke="#C9A96E" strokeWidth="0.9" />
      <circle cx="20" cy="20" r={r} fill={activa ? "#FBE9EC" : "#FFF9F3"} />
      {Array.from({ length: porciones }, (_, i) => {
        const a = (i / porciones) * Math.PI * 2
        return (
          <line
            key={i}
            x1="20"
            y1="20"
            // Redondeado: evita diferencias de decimales entre servidor y navegador
            x2={(20 + Math.cos(a) * r).toFixed(2)}
            y2={(20 + Math.sin(a) * r).toFixed(2)}
            stroke="#B0283F"
            strokeWidth={porciones > 30 ? 0.45 : 0.6}
            opacity={activa ? 0.95 : 0.7}
          />
        )
      })}
      <circle cx="20" cy="20" r="1.1" fill="#8B1C32" />
    </svg>
  )
}

/** Botones para elegir el tamaño de la torta. Se puede dejar sin elegir (se define al cotizar). */
export function SelectorPorciones({
  valor,
  onChange,
  cotizarHref,
  className,
}: {
  valor: number | null
  onChange: (porciones: number | null) => void
  /** Enlace al cotizador para pedidos de más de 30 personas */
  cotizarHref: string
  className?: string
}) {
  return (
    <fieldset className={cn("min-w-0", className)}>
      <legend className="text-sm font-medium text-foreground">¿Para cuántas personas?</legend>
      <div className="mt-2.5 grid grid-cols-4 gap-1.5 sm:gap-2" role="group" aria-label="Porciones">
        {PORCIONES.map((n) => {
          const activa = valor === n
          return (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={activa}
              onClick={() => onChange(activa ? null : n)}
              className={cn(
                "flex flex-col items-center gap-1 rounded-xl border px-1 py-2 transition-all",
                activa
                  ? "border-primary bg-primary/[0.06] shadow-[0_8px_18px_-12px_rgba(139,28,50,0.6)]"
                  : "border-border bg-card hover:border-primary/40",
              )}
            >
              <TortaCortada porciones={n} activa={activa} />
              <span className={cn("text-base font-semibold leading-none", activa ? "text-primary" : "text-heading")}>{n}</span>
              <span className="text-[10px] uppercase tracking-wide text-muted-foreground">personas</span>
            </button>
          )
        })}
        {/* Más de 30 personas: se cotiza (tamaño y valor a la medida) */}
        <Link
          href={cotizarHref}
          className="flex flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-[#C9A96E] bg-[#FBF6EF] px-1 py-2 text-center transition-colors hover:border-primary hover:bg-primary/[0.05]"
        >
          <TortaCortada porciones={40} activa={false} />
          <span className="text-base font-semibold leading-none text-heading">+30</span>
          <span className="text-[10px] font-semibold uppercase tracking-wide text-primary">Cotizar</span>
        </Link>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        {valor
          ? `Elegiste torta para ${valor} personas. El valor se confirma al cotizar.`
          : "Elige el tamaño. Para más de 30 porciones, haz tu cotización."}
      </p>
    </fieldset>
  )
}
