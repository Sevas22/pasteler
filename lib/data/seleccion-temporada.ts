import { SERVICIOS_PRODUCTO } from "@/lib/data/productos-helpers"
import type { Producto, ServicioProducto } from "@/lib/types/producto"

/** Sin dependencias de servidor ni de cliente: lo usan la página (para filtrar) y el componente. */

export const POR_SERVICIO = 4

/** Productos destacados por servicio (si falta alguno se completa con otros que tengan foto). */
const DESTACADOS: Record<ServicioProducto, string[]> = {
  pasteleria: ["torta-con-cheesecake-de-maracuya", "torta-opera", "torta-con-cheesecake-de-mora", "tiramisu"],
  reposteria: ["cheesecake-de-maracuya", "milhojas", "brazo-de-reina", "tartaleta-de-frutas"],
  panaderia: ["roscon-de-coco", "corazones", "churros", "pan-de-breva"],
}

const tieneFoto = (p: Producto) => !p.imagen.includes("logo-dalizas")

export function seleccionar(productos: Producto[], servicio: ServicioProducto): Producto[] {
  const delServicio = productos.filter((p) => p.active && p.servicio === servicio && tieneFoto(p))
  const elegidos = DESTACADOS[servicio]
    .map((slug) => delServicio.find((p) => p.slug === slug))
    .filter((p): p is Producto => Boolean(p))
  for (const p of delServicio) {
    if (elegidos.length >= POR_SERVICIO) break
    if (!elegidos.includes(p)) elegidos.push(p)
  }
  return elegidos.slice(0, POR_SERVICIO)
}

/** Solo los productos que muestra la sección, sin las descripciones largas (para no inflar la página). */
export function productosSeleccion(productos: Producto[]): Producto[] {
  return SERVICIOS_PRODUCTO.flatMap((s) => seleccionar(productos, s.slug)).map((p) => ({ ...p, descripcionLarga: "" }))
}
