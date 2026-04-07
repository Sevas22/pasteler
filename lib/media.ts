/**
 * Imágenes de marca en `/public/images` (fotografía de producto, logotipos y piezas gráficas).
 */

import { formatCategoriaLabel, PRODUCTOS } from "@/lib/data/productos"

export type GalleryItem = {
  id: string
  /** Slug del producto en `/productos/[slug]` */
  productSlug: string
  nombre: string
  src: string
  alt: string
  tag: string
  size: string
  /** Logos y piezas gráficas: evita recortes agresivos */
  contain?: boolean
}

/** Carrusel a pantalla completa del hero — fotos Daliza con logo */
export const HERO_CAROUSEL = [
  { src: "/images/producto-cheesecake-maracuya-daliza.png", alt: "Cheesecake de maracuyá Daliza" },
  { src: "/images/producto-pastel-tiramisu-daliza.png", alt: "Pastel estilo tiramisú Daliza" },
  { src: "/images/producto-tartas-fruta-daliza.png", alt: "Tartas de fruta fresca Daliza" },
  { src: "/images/producto-torta-mousse-chocolate-daliza.png", alt: "Torta mousse de chocolate Daliza" },
  { src: "/images/producto-mousse-fresa-individual-daliza.png", alt: "Mousse de fresa individual Daliza" },
  { src: "/images/producto-mousse-frutos-rojos-daliza.png", alt: "Mousse de frutos rojos Daliza" },
] as const

/** Disposición del grid (4 columnas en md+) — una tarjeta por producto del catálogo */
const GALLERY_LAYOUT: readonly { size: string; contain?: boolean }[] = [
  { size: "col-span-2 row-span-2" },
  { size: "col-span-2" },
  { size: "col-span-1" },
  { size: "col-span-1" },
  { size: "col-span-2" },
  { size: "col-span-2" },
  { size: "col-span-2" },
]

/** Galería: una vista por producto; enlaces a `/productos/[slug]` */
export const GALLERY_ITEMS: readonly GalleryItem[] = PRODUCTOS.map((p, i) => {
  const layout = GALLERY_LAYOUT[i] ?? { size: "col-span-2" }
  return {
    id: p.slug,
    productSlug: p.slug,
    nombre: p.nombre,
    src: p.imagen,
    alt: `${p.nombre}: ${p.descripcion}`,
    tag: formatCategoriaLabel(p.categoria),
    size: layout.size,
    ...(layout.contain ? { contain: layout.contain } : {}),
  }
})

export const MEDIA = {
  /** Banner promocional “próximamente curso” — pieza gráfica completa (mixer + postres + logo) */
  cursosHeroPromo: "/images/cursos-hero-promo.png",
  /** Banner /cursos — imagen única con texto y CTA ya integrados en el archivo */
  cursosBannerFondo: "/images/cursos-banner-fondo.png",
  /** Fondo de cabecera en /cursos — fotografía de producto (misma línea que el catálogo) */
  heroMarble: "/images/producto-pastel-tiramisu-daliza.png",
  heroIngredientsA: "/images/brand-iconos-pasteleria.png",
  heroIngredientsB: "/images/producto-mousse-fresa-individual-daliza.png",
  heroChefs: "/images/brand-iconos-pasteleria.png",
  hero: "/images/producto-cheesecake-maracuya-daliza.png",
  courses: {
    basico: "/images/producto-pastel-tiramisu-daliza.png",
    avanzado: "/images/producto-torta-mousse-chocolate-daliza.png",
    frances: "/images/producto-cheesecake-maracuya-daliza.png",
  },
  heroCarousel: HERO_CAROUSEL,
  /** Imagen única del hero a pantalla completa (home) */
  heroBannerPrincipal: "/images/hero-banner-principal.png",
  /** Banners por servicio (página productos) */
  servicioBanners: {
    todos: "/images/producto-cheesecake-maracuya-daliza.png",
    panaderia: "/images/producto-brazo-gitano-daliza.png",
    pasteleria: "/images/producto-torta-mousse-chocolate-daliza.png",
    reposteria: "/images/producto-tartas-fruta-daliza.png",
  },
  productos: {
    torta: "/images/producto-torta-mousse-chocolate-daliza.png",
    cupcakes: "/images/producto-mousse-fresa-individual-daliza.png",
    postre: "/images/producto-cheesecake-maracuya-daliza.png",
    galletas: "/images/producto-tartas-fruta-daliza.png",
  },
  /**
   * Home — grid de accesos (misma línea visual que el catálogo).
   * Rutas reutilizan fotos de producto ya usadas en el sitio.
   */
  homeFeature: {
    cursos: "/images/producto-cheesecake-maracuya-daliza.png",
    productos: "/images/producto-pastel-tiramisu-daliza.png",
    galeria: "/images/producto-mousse-frutos-rojos-daliza.png",
    contacto: "/images/producto-mousse-fresa-individual-daliza.png",
  },
  galeria: GALLERY_ITEMS,
} as const
