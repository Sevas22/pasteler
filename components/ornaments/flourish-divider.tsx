import { Cherry } from "lucide-react"
import { cn } from "@/lib/utils"

function FlourishLine({ mirror }: { mirror?: boolean }) {
  return (
    <svg
      className={cn("h-3 w-9 shrink-0 text-brand-gold sm:h-[14px] sm:w-11", mirror && "scale-x-[-1]")}
      viewBox="0 0 40 12"
      fill="none"
      aria-hidden
    >
      <path
        d="M0 6 C6 1 14 1 20 6 S32 11 38 6"
        stroke="currentColor"
        strokeWidth={1.1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

type FlourishDividerProps = {
  className?: string
  tone?: "gold" | "cream"
}

/**
 * Firma visual de marca: línea dorada — cereza — línea dorada.
 * Reutiliza el motivo del hero para dar cohesión bajo los titulares de sección.
 */
export function FlourishDivider({ className, tone = "gold" }: FlourishDividerProps) {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)} aria-hidden>
      <FlourishLine />
      <Cherry
        className={cn("h-4 w-4 sm:h-[1.1rem] sm:w-[1.1rem]", tone === "gold" ? "text-primary" : "text-[#C9A96E]")}
        strokeWidth={1.85}
      />
      <FlourishLine mirror />
    </div>
  )
}
