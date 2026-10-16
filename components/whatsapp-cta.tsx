"use client"

import { useEffect, useState, type ReactNode } from "react"
import { MapPin, MessageCircle } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { useLocations } from "@/components/locations-context"
import { WHATSAPP_RESPALDO, waLink } from "@/lib/whatsapp"

type WhatsAppCTAProps = {
  /** Qué quiere el cliente (ej. "Hola, quiero cotizar: Torta tres leches"). Se le agrega el enlace del sitio. */
  mensaje: string
  /** Ruta a incluir en el mensaje (ej. "/productos/torta-tres-leches"). Por defecto, la página actual. */
  ruta?: string
  /** Si se pasa, solo se ofrecen estas sedes (ej. donde está disponible el producto). */
  sedesSlugs?: string[]
  className?: string
  children: ReactNode
}

/**
 * Botón de WhatsApp: si hay varias sedes pregunta a cuál escribir; el mensaje siempre lleva
 * el producto/tema y el enlace del sitio. Con una sola sede abre el chat directo.
 */
export function WhatsAppCTA({ mensaje, ruta, sedesSlugs, className, children }: WhatsAppCTAProps) {
  const locations = useLocations()
  const [abierto, setAbierto] = useState(false)
  const [url, setUrl] = useState("")

  useEffect(() => {
    setUrl(`${window.location.origin}${ruta ?? window.location.pathname}`)
  }, [ruta])

  const conWhatsApp = locations.filter((l) => l.whatsapp)
  const filtradas = sedesSlugs?.length ? conWhatsApp.filter((l) => sedesSlugs.includes(l.slug)) : conWhatsApp
  const sedes = (filtradas.length > 0 ? filtradas : conWhatsApp).sort(
    (a, b) => Number(b.isPrincipal) - Number(a.isPrincipal),
  )
  const texto = url ? `${mensaje}\n${url}` : mensaje

  if (sedes.length <= 1) {
    return (
      <a
        href={waLink(sedes[0]?.whatsapp ?? WHATSAPP_RESPALDO, texto)}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    )
  }

  return (
    <>
      <button type="button" onClick={() => setAbierto(true)} className={className}>
        {children}
      </button>
      <Dialog open={abierto} onOpenChange={setAbierto}>
        <DialogContent className="max-w-md gap-0 rounded-2xl border-brand-gold/30 bg-card p-6 sm:p-7">
          <DialogTitle className="font-serif text-2xl font-normal text-heading">¿A qué sede quieres escribir?</DialogTitle>
          <DialogDescription className="mt-1.5 text-sm text-muted-foreground">
            Tu mensaje llega directo a la sede que elijas.
          </DialogDescription>
          <ul className="mt-5 flex flex-col gap-3">
            {sedes.map((sede) => (
              <li key={sede.slug}>
                <a
                  href={waLink(sede.whatsapp, texto)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setAbierto(false)}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-background p-4 transition-colors hover:border-primary hover:bg-primary/5"
                >
                  <span className="min-w-0">
                    <span className="block text-base font-medium text-heading">{sede.name}</span>
                    <span className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 shrink-0 text-[#B08A4A]" aria-hidden />
                      <span className="truncate">{sede.address}</span>
                    </span>
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors group-hover:bg-primary-hover">
                    <MessageCircle className="h-3.5 w-3.5" aria-hidden />
                    Escribir
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  )
}
