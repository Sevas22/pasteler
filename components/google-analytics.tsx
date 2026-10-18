"use client"

import { useEffect } from "react"
import Script from "next/script"
import { GA_ID, evento } from "@/lib/analytics"

/**
 * Google Analytics 4. Solo se carga si existe NEXT_PUBLIC_GA_ID (se configura en Vercel).
 * Además mide, en todo el sitio, los clics a WhatsApp, a llamar y a escribir correo.
 */
export function GoogleAnalytics() {
  useEffect(() => {
    if (!GA_ID) return
    const alHacerClic = (e: MouseEvent) => {
      const enlace = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null
      if (!enlace) return
      const href = enlace.getAttribute("href") ?? ""
      const origen = window.location.pathname
      if (href.includes("wa.me/") || href.includes("api.whatsapp.com")) {
        evento("clic_whatsapp", { pagina: origen, numero: href.match(/wa\.me\/(\d+)/)?.[1] })
      } else if (href.startsWith("tel:")) {
        evento("clic_llamar", { pagina: origen })
      } else if (href.startsWith("mailto:")) {
        evento("clic_correo", { pagina: origen })
      }
    }
    document.addEventListener("click", alHacerClic, { capture: true })
    return () => document.removeEventListener("click", alHacerClic, { capture: true })
  }, [])

  if (!GA_ID) return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  )
}
