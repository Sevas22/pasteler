export type Producto = {
  id: string
  /** Ruta única: /productos/[slug] */
  slug: string
  nombre: string
  descripcion: string
  /** Línea de servicio principal para el ecommerce */
  servicio: "panaderia" | "pasteleria" | "reposteria"
  categoria: string
  imagen: string
  /** Texto largo para la ficha del servicio */
  descripcionLarga: string
  highlights: string[]
  /** Imágenes extra para la galería del detalle (opcional) */
  imagenesExtra?: string[]
}


