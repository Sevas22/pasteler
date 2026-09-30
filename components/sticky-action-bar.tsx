"use client"

import Link from "next/link"
import { MapPin, MessageCircle } from "lucide-react"
import type { Location } from "@/lib/data/locations"
import { MagneticButton } from "@/components/motion/magnetic-button"

type StickyActionBarProps = {
  locations: Location[]
}

/** Barra inferior persistente: sede rápida + WhatsApp — visible en todo el sitio. */
export function StickyActionBar({ locations }: StickyActionBarProps) {
  const principal = locations.find((l) => l.isPrincipal) ?? locations[0]
  const whatsapp = principal?.whatsapp || "573108336425"

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-brand-gold/30 bg-[#2a1a1a]/95 backdrop-blur-md"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/tiendas"
          className="flex min-w-0 items-center gap-2 text-sm font-medium text-white/85 transition-colors hover:text-[#C9A96E]"
        >
          <MapPin className="h-4 w-4 shrink-0 text-[#C9A96E]" />
          <span className="hidden truncate sm:inline">{principal?.name ?? "Nuestras tiendas"}</span>
          <span className="truncate sm:hidden">Tiendas</span>
        </Link>

        <MagneticButton strength={0.3}>
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_8px_24px_rgba(139,46,46,0.4)] transition-all duration-200 hover:scale-[1.03] hover:bg-primary-hover"
          >
            <MessageCircle className="h-4 w-4" />
            Personalizar mi pedido
          </a>
        </MagneticButton>
      </div>
    </div>
  )
}
