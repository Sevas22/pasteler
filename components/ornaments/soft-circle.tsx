import { cn } from "@/lib/utils"

type SoftCircleProps = {
  color: "gold" | "cherry" | "wine"
  size: number
  className?: string
}

const COLOR_MAP = {
  gold: "#C9A96E",
  cherry: "#D64545",
  wine: "#8B2E2E",
} as const

/** Círculo difuminado de textura — motivo decorativo recurrente, siempre discreto (opacidad baja, blur). */
export function SoftCircle({ color, size, className }: SoftCircleProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute rounded-full blur-3xl", className)}
      style={{
        width: size,
        height: size,
        background: COLOR_MAP[color],
        opacity: 0.14,
      }}
    />
  )
}
