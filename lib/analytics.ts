/**
 * ID de Google Analytics 4 de Dalizas. Es público (va en el HTML de cualquier sitio con GA).
 * Se puede reemplazar con la variable NEXT_PUBLIC_GA_ID. Solo se activa en producción,
 * para que las visitas de desarrollo local no ensucien las estadísticas.
 */
export const GA_ID =
  process.env.NEXT_PUBLIC_GA_ID ?? (process.env.NODE_ENV === "production" ? "G-Q0HZPVM2XX" : "")

type Gtag = (comando: "event", nombre: string, parametros?: Record<string, unknown>) => void

/** Envía un evento a GA4 si está cargado (en local o sin ID no hace nada). */
export function evento(nombre: string, parametros?: Record<string, unknown>) {
  if (typeof window === "undefined") return
  const gtag = (window as unknown as { gtag?: Gtag }).gtag
  gtag?.("event", nombre, parametros)
}
