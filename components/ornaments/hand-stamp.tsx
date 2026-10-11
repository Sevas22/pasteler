import { useId } from "react"
import { Cherry, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type HandStampProps = {
  className?: string
  tone?: "gold" | "cream"
  /** Ícono central — por defecto la cereza de marca. Cambia según el contexto (cursos, sedes, etc.). */
  icon?: LucideIcon
  /** Texto que gira alrededor del ícono. Se repite dos veces para cerrar el círculo. */
  text?: string
}

/** Sello circular de marca: texto girando despacio alrededor de un ícono — como un sello de horneado a mano. */
export function HandStamp({ className, tone = "gold", icon: Icon = Cherry, text = "HECHO A MANO • DALIZA •" }: HandStampProps) {
  const color = tone === "gold" ? "#C9A96E" : "#F8F5F2"
  const pathId = useId()

  return (
    <div className={cn("relative flex h-24 w-24 items-center justify-center", className)} aria-hidden>
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full animate-spin [animation-duration:24s] motion-reduce:animate-none"
      >
        <defs>
          <path id={pathId} d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <text fontSize="8.6" letterSpacing="2.4" fill={color}>
          <textPath href={`#${pathId}`} startOffset="0%">
            {text} {text}
          </textPath>
        </text>
      </svg>
      <Icon className="h-6 w-6" style={{ color }} strokeWidth={1.85} />
    </div>
  )
}
