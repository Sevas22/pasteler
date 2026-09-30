import type { ServicioProducto } from "@/lib/types/producto"

/** Sin dependencias de Supabase — seguro de importar desde componentes de cliente. */

export const SERVICIOS_PRODUCTO = [
  { slug: "panaderia", label: "Panadería" },
  { slug: "pasteleria", label: "Pastelería" },
  { slug: "reposteria", label: "Repostería" },
] as const

const SERVICE_LABEL: Record<ServicioProducto, string> = {
  panaderia: "Panadería",
  pasteleria: "Pastelería",
  reposteria: "Repostería",
}

export function isServicioProducto(value: string): value is ServicioProducto {
  return SERVICIOS_PRODUCTO.some((s) => s.slug === value)
}

export function getServicioLabel(servicio: ServicioProducto): string {
  return SERVICE_LABEL[servicio]
}

/** Etiqueta legible para badges y metadatos (p. ej. `viennoiserie` → Viennoiserie). */
export function formatCategoriaLabel(categoria: string): string {
  if (!categoria) return ""
  return categoria
    .split(/[-_\s]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ")
}
