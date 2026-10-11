export type Proveedor = {
  slug: string
  nombre: string
  /** Ruta del logo en /public. Sin logo se muestra el nombre como marca de texto. */
  logo?: string
  /** Clase de fondo de la tarjeta (para logos blancos). Por defecto, blanco. */
  fondo?: string
}

export const PROVEEDORES: readonly Proveedor[] = [
  { slug: "alqueria", nombre: "Alquería", logo: "/images/proveedores/alqueria.png", fondo: "bg-[#0B4EA2]" },
  { slug: "colanta", nombre: "Colanta", logo: "/images/proveedores/colanta.png" },
  { slug: "pomar", nombre: "Pomar", logo: "/images/proveedores/pomar.png" },
  { slug: "puratos", nombre: "Puratos", logo: "/images/proveedores/puratos.svg" },
  { slug: "mass-cream", nombre: "Mass Cream" },
  { slug: "harina-el-lobo", nombre: "Harina El Lobo" },
  { slug: "haz-de-oros", nombre: "Haz de Oros", logo: "/images/proveedores/haz-de-oros.png" },
]
