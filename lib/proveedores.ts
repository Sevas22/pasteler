export type Proveedor = {
  slug: string
  nombre: string
  /** Ruta del logo en /public. Sin logo se muestra el nombre como marca de texto. */
  logo?: string
  /** Logos blancos: se muestran como silueta color chocolate (sobre crema un logo blanco no se vería). */
  silueta?: boolean
  /** Logos con fondo oscuro propio: tarjeta oscura y logo a todo color (sin el tono sepia de reposo). */
  oscuro?: boolean
}

export const PROVEEDORES: readonly Proveedor[] = [
  { slug: "alqueria", nombre: "Alquería", logo: "/images/proveedores/alqueria.png", silueta: true },
  { slug: "colanta", nombre: "Colanta", logo: "/images/proveedores/colanta.png" },
  { slug: "pomar", nombre: "Pomar", logo: "/images/proveedores/pomar.png" },
  { slug: "puratos", nombre: "Puratos", logo: "/images/proveedores/puratos.svg" },
  { slug: "mass-cream", nombre: "Mass Cream" },
  { slug: "harina-el-lobo", nombre: "Harina El Lobo" },
  { slug: "haz-de-oros", nombre: "Haz de Oros", logo: "/images/proveedores/haz-de-oros.png" },
  { slug: "codifikai", nombre: "CodifikAI", logo: "/images/proveedores/codifikai.webp", oscuro: true },
]
