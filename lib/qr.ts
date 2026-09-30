import QRCode from "qrcode"

/** URL pública del sitio (usada para armar los enlaces que codifica cada QR de sucursal). */
export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000"
}

export function getLocationUrl(slug: string): string {
  return `${getSiteUrl()}/tiendas/${slug}`
}

/** PNG como data URL, listo para <img src=...> — se genera en el servidor, sin JS en el cliente. */
export async function generateQrDataUrl(text: string): Promise<string> {
  return QRCode.toDataURL(text, {
    margin: 1,
    width: 640,
    color: {
      dark: "#5A2E2E",
      light: "#F8F5F2",
    },
  })
}
