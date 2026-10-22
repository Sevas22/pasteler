import type { ServicioProducto } from "@/lib/types/producto"

/** Sin dependencias de Supabase — seguro de importar desde componentes de cliente. */

export const SERVICIOS_PRODUCTO = [
  { slug: "pasteleria", label: "Pastelería" },
  { slug: "reposteria", label: "Repostería" },
  { slug: "panaderia", label: "Panadería" },
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

/**
 * Clave para comparar categorías: sin tildes, mayúsculas ni separadores.
 * "Postres tradicionales", "postres-tradicionales" y "postres_tradicionales" son la misma categoría.
 */
export function claveCategoria(categoria: string): string {
  return categoria
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

/**
 * Categorías ya usadas, sin repetir (por clave). Para cada una conserva la escritura más frecuente,
 * que es la que se reutiliza al elegir una categoría existente.
 */
export function categoriasExistentes(
  productos: { categoria: string; servicio: ServicioProducto }[],
): { nombre: string; servicio: ServicioProducto }[] {
  const grupos = new Map<string, { servicio: ServicioProducto; escrituras: Map<string, number> }>()
  for (const p of productos) {
    const clave = claveCategoria(p.categoria)
    if (!clave) continue
    const id = `${p.servicio}|${clave}`
    const grupo = grupos.get(id) ?? { servicio: p.servicio, escrituras: new Map<string, number>() }
    grupo.escrituras.set(p.categoria, (grupo.escrituras.get(p.categoria) ?? 0) + 1)
    grupos.set(id, grupo)
  }
  return Array.from(grupos.values())
    .map((g) => ({
      servicio: g.servicio,
      nombre: Array.from(g.escrituras).sort((a, b) => b[1] - a[1])[0][0],
    }))
    .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"))
}

/** Etiqueta legible para badges y metadatos (p. ej. `viennoiserie` → Viennoiserie). */
export function formatCategoriaLabel(categoria: string): string {
  if (!categoria) return ""
  const texto = categoria.split(/[-_\s]+/).filter(Boolean).join(" ").toLowerCase()
  return texto.charAt(0).toUpperCase() + texto.slice(1)
}
