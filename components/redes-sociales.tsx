import { Facebook } from "lucide-react"
import { NEGOCIO } from "@/lib/seo"
import { cn } from "@/lib/utils"

/** Íconos de redes sociales (footer y menú). Los enlaces viven en NEGOCIO.redes (lib/seo.ts). */

function IconoInstagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconoFacebook({ className }: { className?: string }) {
  return <Facebook className={className} aria-hidden />
}

function IconoTikTok({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M16.6 2h-3.3v13.2a2.9 2.9 0 1 1-2.1-2.8V9a6.2 6.2 0 1 0 5.4 6.2V8.4a7.8 7.8 0 0 0 4.4 1.4V6.5a4.5 4.5 0 0 1-4.4-4.5Z" />
    </svg>
  )
}

function IconoYouTube({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M22.5 7.2a2.9 2.9 0 0 0-2-2C18.7 4.7 12 4.7 12 4.7s-6.7 0-8.5.5a2.9 2.9 0 0 0-2 2A30 30 0 0 0 1 12a30 30 0 0 0 .5 4.8 2.9 2.9 0 0 0 2 2c1.8.5 8.5.5 8.5.5s6.7 0 8.5-.5a2.9 2.9 0 0 0 2-2A30 30 0 0 0 23 12a30 30 0 0 0-.5-4.8ZM9.8 15.1V8.9l5.6 3.1-5.6 3.1Z" />
    </svg>
  )
}

/** Orden de los íconos (igual a la referencia del footer). */
const REDES: { clave: keyof typeof NEGOCIO.redes; nombre: string; Icono: (p: { className?: string }) => React.JSX.Element }[] = [
  { clave: "instagram", nombre: "Instagram", Icono: IconoInstagram },
  { clave: "facebook", nombre: "Facebook", Icono: IconoFacebook },
  { clave: "tiktok", nombre: "TikTok", Icono: IconoTikTok },
  { clave: "youtube", nombre: "YouTube", Icono: IconoYouTube },
]

const TAMANOS = {
  /** Menú superior */
  sm: { caja: "h-8 w-8 border", icono: "h-4 w-4", separacion: "gap-1.5" },
  /** Footer */
  md: { caja: "h-10 w-10 border-2", icono: "h-[18px] w-[18px]", separacion: "gap-2.5" },
} as const

export function RedesSociales({ tamano = "md", className }: { tamano?: keyof typeof TAMANOS; className?: string }) {
  const t = TAMANOS[tamano]
  return (
    <ul className={cn("flex", t.separacion, className)} aria-label="Redes sociales">
      {REDES.map(({ clave, nombre, Icono }) => {
        const href = NEGOCIO.redes[clave]
        const caja = cn("flex items-center justify-center rounded-full border-[#C9A96E] text-[#7A1A2A] transition-colors", t.caja)
        return (
          <li key={clave}>
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Daliza en ${nombre}`}
                className={cn(caja, "hover:bg-[#7A1A2A] hover:text-white")}
              >
                <Icono className={t.icono} />
              </a>
            ) : (
              // Sin enlace todavía: se ve igual pero no lleva a ningún lado (se activa al poner el enlace en lib/seo.ts)
              <span className={caja} title={`${nombre}: próximamente`}>
                <Icono className={t.icono} />
                <span className="sr-only">{nombre} (próximamente)</span>
              </span>
            )}
          </li>
        )
      })}
    </ul>
  )
}
