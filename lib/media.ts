/**
 * Imágenes de marca en `/public/images` (fotografía de producto, logotipos y piezas gráficas).
 */

import { formatCategoriaLabel } from "@/lib/data/productos-helpers"
import type { Producto } from "@/lib/types/producto"

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
export function buildGalleryItems(productos: readonly Producto[]): GalleryItem[] {
  return productos.map((p, i) => {
    const layout = i % 9 === 0 ? { size: "col-span-2 row-span-2", contain: false } : { size: "col-span-1", contain: false }
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
}

/** Banners editados (carpeta `public/images/banners`). */
export const BANNERS = {
  hero: [
    { src: "/images/banners/hero-pasteleria-cinco-rebanadas.webp", alt: "Rebanadas de tortas y cheesecakes Daliza" },
    { src: "/images/banners/hero-pasteleria-frutos-rojos.webp", alt: "Cheesecakes con frutos rojos, caramelo y chocolate" },
    { src: "/images/banners/hero-pasteleria-onda-dorada.webp", alt: "Cuatro rebanadas de pastelería fina Daliza" },
  ],
  panaderia: "/images/banners/panaderia-surtido-crema.webp",
  pasteleria: "/images/banners/pasteleria-tartaletas-rollos-claro.webp",
  reposteria: "/images/banners/reposteria-tarta-vino.webp",
  celebracion: "/images/banners/celebracion-vino-oro.webp",
  historia: "/images/banners/panaderia-canasta.webp",
  /** Cabecera de /productos según el servicio elegido */
  productosServicio: {
    todos: "/images/banners/hero-pasteleria-frutos-rojos.webp",
    panaderia: "/images/banners/panaderia-lino-flores.webp",
    pasteleria: "/images/banners/hero-pasteleria-onda-dorada.webp",
    reposteria: "/images/banners/reposteria-rebanadas-caramelo.webp",
  },
  paginas: {
    cursos: "/images/banners/pasteleria-brillos.webp",
    tiendas: "/images/banners/panaderia-bokeh.webp",
    contacto: "/images/banners/panaderia-dorada.webp",
    galeria: "/images/banners/panaderia-dorada-densa.webp",
    blog: "/images/banners/reposteria-tarta-vino.webp",
  },
} as const

/** Tortas personalizadas de cumpleaños y celebraciones (solo galería, no son productos del catálogo). */
export const TORTAS_PERSONALIZADAS: readonly { src: string; alt: string; size: string }[] = [
  { src: "/images/galeria/tortas/torta-01.webp", alt: "Torta personalizada temática de fútbol", size: "col-span-2 row-span-2" },
  { src: "/images/galeria/tortas/torta-02.webp", alt: "Torta personalizada de Snoopy y Charlie Brown", size: "col-span-1" },
  { src: "/images/galeria/tortas/torta-03.webp", alt: "Torta personalizada rosada de Barbie", size: "col-span-1" },
  { src: "/images/galeria/tortas/torta-04.webp", alt: "Torta de primera comunión", size: "col-span-1" },
  { src: "/images/galeria/tortas/torta-05.webp", alt: "Torta de cumpleaños con estampado de leopardo", size: "col-span-1" },
  { src: "/images/galeria/tortas/torta-06.webp", alt: "Torta de cumpleaños de Snoopy de dos pisos", size: "col-span-2 row-span-2" },
  { src: "/images/galeria/tortas/torta-07.webp", alt: "Torta roja de cumpleaños decorada con moños", size: "col-span-1" },
  { src: "/images/galeria/tortas/torta-08.webp", alt: "Torta personalizada de Bluey", size: "col-span-1" },
  { src: "/images/galeria/tortas/torta-09.webp", alt: "Torta de bautizo con ángel", size: "col-span-1" },
  { src: "/images/galeria/tortas/torta-10.webp", alt: "Torta de dos pisos de Barbie", size: "col-span-1" },
  { src: "/images/galeria/tortas/torta-11.webp", alt: "Torta elegante con rosas rojas y número dorado", size: "col-span-2 row-span-2" },
]

export const MEDIA = {
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
} as const
