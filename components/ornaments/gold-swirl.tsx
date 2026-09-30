import { cn } from "@/lib/utils"

type GoldSwirlProps = {
  className?: string
}

/** Lazo dorado suelto + un par de destellos — el acento "editorial" detrás del collage de fotos del hero. */
export function GoldSwirl({ className }: GoldSwirlProps) {
  return (
    <svg
      viewBox="0 0 420 320"
      fill="none"
      className={cn("pointer-events-none text-[#C9A96E]", className)}
      aria-hidden
    >
      <path
        d="M18 240 C -10 160, 60 70, 150 55 C 260 37, 330 90, 340 150 C 350 215, 290 250, 235 220 C 190 196, 205 145, 255 135 C 300 126, 335 155, 330 190"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.85"
      />
      <g fill="currentColor" opacity="0.9">
        <path d="M60 40 l3.2 8.4 8.4 3.2 -8.4 3.2 -3.2 8.4 -3.2 -8.4 -8.4 -3.2 8.4 -3.2 Z" />
        <path d="M355 205 l2.4 6.2 6.2 2.4 -6.2 2.4 -2.4 6.2 -2.4 -6.2 -6.2 -2.4 6.2 -2.4 Z" />
        <path d="M120 280 l2 5.2 5.2 2 -5.2 2 -2 5.2 -2 -5.2 -5.2 -2 5.2 -2 Z" />
      </g>
    </svg>
  )
}
