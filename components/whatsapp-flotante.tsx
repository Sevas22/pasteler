"use client"

import { useLocations } from "@/components/locations-context"
import { WhatsAppCTA } from "@/components/whatsapp-cta"

/** Logo de WhatsApp (lucide no lo trae). */
function IconoWhatsApp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden>
      <path d="M16.04 3C8.86 3 3.02 8.83 3.02 16c0 2.3.6 4.53 1.74 6.5L3 29l6.68-1.75A13 13 0 0 0 16.04 29C23.2 29 29.04 23.17 29.04 16S23.2 3 16.04 3Zm0 23.67c-2 0-3.95-.54-5.65-1.55l-.4-.24-3.96 1.04 1.06-3.86-.26-.4a10.62 10.62 0 0 1-1.63-5.66c0-5.88 4.79-10.66 10.68-10.66 5.88 0 10.67 4.78 10.67 10.66 0 5.89-4.79 10.67-10.51 10.67Zm5.85-7.98c-.32-.16-1.89-.93-2.18-1.04-.3-.11-.5-.16-.72.16-.21.32-.83 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.6-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.72-1.73-.99-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66 0 1.57 1.14 3.08 1.3 3.3.16.21 2.25 3.43 5.45 4.81.76.33 1.36.53 1.82.67.77.24 1.46.21 2.01.13.61-.09 1.89-.77 2.15-1.52.27-.74.27-1.38.19-1.52-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  )
}

/**
 * Botón flotante de WhatsApp en todas las páginas. Si hay varias sedes, pregunta a cuál escribir
 * (reutiliza WhatsAppCTA). Las sedes que comparten número (p. ej. Panadería Carbonell y Bosa Carbonell)
 * se muestran una sola vez.
 */
export function WhatsAppFlotante() {
  const locations = useLocations()
  const vistos = new Set<string>()
  const sedesUnicas = locations
    .filter((l) => l.whatsapp)
    .sort((a, b) => Number(b.isPrincipal) - Number(a.isPrincipal))
    .filter((l) => {
      const numero = l.whatsapp.replace(/\D/g, "")
      if (vistos.has(numero)) return false
      vistos.add(numero)
      return true
    })
    .map((l) => l.slug)

  return (
    <div className="fixed bottom-5 right-5 z-[60] sm:bottom-6 sm:right-6">
      <WhatsAppCTA
        mensaje="Hola, quiero información de Daliza Pastelería Fina"
        sedesSlugs={sedesUnicas}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_28px_-8px_rgba(37,211,102,0.65)] transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366] sm:h-16 sm:w-16"
      >
        <span className="whatsapp-onda absolute inset-0 rounded-full bg-[#25D366]" aria-hidden />
        <IconoWhatsApp className="relative h-7 w-7 sm:h-8 sm:w-8" />
        <span className="sr-only">Escríbenos por WhatsApp</span>
        {/* Etiqueta al pasar el mouse (escritorio) */}
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-[#2a1210] px-4 py-2 text-sm font-medium text-[#F7EFE4] opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 sm:block">
          ¿Te ayudamos?
        </span>
      </WhatsAppCTA>
    </div>
  )
}
