import { Cherry } from "lucide-react"
import { cn } from "@/lib/utils"

type HandStampProps = {
  className?: string
  tone?: "gold" | "cream"
}

/** Sello circular de marca: texto girando despacio alrededor de la cereza — como un sello de horneado a mano. */
export function HandStamp({ className, tone = "gold" }: HandStampProps) {
  const color = tone === "gold" ? "#C9A96E" : "#F8F5F2"

  return (
    <div className={cn("relative flex h-24 w-24 items-center justify-center", className)} aria-hidden>
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full animate-spin [animation-duration:24s] motion-reduce:animate-none"
      >
        <defs>
          <path id="hand-stamp-circle" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <text fontSize="8.6" letterSpacing="2.4" fill={color}>
          <textPath href="#hand-stamp-circle" startOffset="0%">
            HECHO A MANO • DALIZA • HECHO A MANO • DALIZA •
          </textPath>
        </text>
      </svg>
      <Cherry className="h-6 w-6" style={{ color }} strokeWidth={1.85} />
    </div>
  )
}
