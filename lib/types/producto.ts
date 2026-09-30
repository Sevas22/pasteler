export type ServicioProducto = "panaderia" | "pasteleria" | "reposteria"

export type Producto = {
  id: string
  /** Ruta única: /productos/[slug] */
  slug: string
  nombre: string
  descripcion: string
  /** Línea de servicio principal para el ecommerce */
  servicio: ServicioProducto
  categoria: string
  imagen: string
  /** Texto largo para la ficha del servicio */
  descripcionLarga: string
  highlights: string[]
  /** Imágenes extra para la galería del detalle (opcional) */
  imagenesExtra?: string[]
  precio?: number | null
  /** Slugs de las sucursales donde este producto está disponible */
  sedes: string[]
  active: boolean
}
