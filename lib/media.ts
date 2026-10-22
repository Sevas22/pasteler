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
  /**
   * `lado`: dónde queda libre la foto para poner el texto encima.
   * `encuadre`: qué parte de la foto se conserva cuando la pantalla la recorta. En pantallas más
   *   angostas que la foto se recorta por los lados (manda la X: se conserva el lado del texto para
   *   empujar las tortas lejos de él); en pantallas más anchas se recorta arriba/abajo (manda la Y).
   * `zoom`: punto desde el que se amplía. Va en el borde de las tortas que mira al texto, para que
   *   al crecer se alejen del texto en vez de montarse sobre él.
   */
  hero: [
    {
      src: "/images/banners/hero-tortas-surtido.webp",
      alt: "Tortas y cheesecakes Daliza decorados con fresas",
      lado: "izquierda",
      encuadre: "0% 45%",
      zoom: "45% 55%",
    },
    {
      src: "/images/banners/hero-cheesecake-maracuya.webp",
      alt: "Torta con cheesecake de maracuyá Daliza con cinta roja, fresa y chocolate",
      lado: "derecha",
      encuadre: "80% 50%",
      zoom: "50% 60%",
    },
    {
      src: "/images/banners/hero-cheesecake-mango.webp",
      alt: "Torta con cheesecake Daliza con cinta negra, fresa y chocolate sobre mármol",
      lado: "derecha",
      encuadre: "34% 50%",
      zoom: "33% 55%",
    },
    {
      src: "/images/banners/hero-cheesecake-mora.webp",
      alt: "Torta con cheesecake de mora Daliza con cinta azul, fresa y frutos rojos",
      lado: "izquierda",
      encuadre: "50% 50%",
      zoom: "70% 58%",
    },
  ],
  panaderia: "/images/banners/panaderia-surtido-crema.webp",
  pasteleria: "/images/banners/pasteleria-tartaletas-rollos-claro.webp",
  reposteria: "/images/banners/reposteria-tarta-vino.webp",
  celebracion: "/images/banners/celebracion-vino-oro.webp",
  historia: "/images/banners/panaderia-canasta.webp",
  /** Cabecera de /productos según el servicio elegido */
  productosServicio: {
    todos: "/images/banners/hero-tortas-surtido.webp",
    panaderia: "/images/banners/panaderia-lino-flores.webp",
    pasteleria: "/images/banners/hero-cheesecake-mango.webp",
    reposteria: "/images/banners/reposteria-rebanadas-caramelo.webp",
  },
  paginas: {
    cursos: "/images/banners/pasteleria-brillos.webp",
    tiendas: "/images/banners/panaderia-bokeh.webp",
    contacto: "/images/banners/panaderia-dorada.webp",
    galeria: "/images/banners/galeria-tartaleta-frutas.webp",
    blog: "/images/banners/reposteria-tarta-vino.webp",
    preguntas: "/images/banners/pasteleria-brillos.webp",
  },
} as const

/**
 * Tortas personalizadas de cumpleaños y celebraciones (no son productos del catálogo).
 * Se muestran en la pasarela 3D de /galeria y en el carrusel del inicio. Para cambiar una foto, reemplaza
 * el archivo en /public/images/galeria/tortas (cuadrado, idealmente 1000×1000) y ajusta sus textos aquí.
 */
export const TORTAS_PERSONALIZADAS: readonly {
  src: string
  alt: string
  nombre: string
  ocasion: string
  descripcion: string
}[] = [
  {
    src: "/images/galeria/tortas/torta-01.webp",
    alt: "Torta personalizada temática de fútbol",
    nombre: "Torta de fútbol",
    ocasion: "Cumpleaños",
    descripcion:
      "Torta temática de fútbol con figuras en papel de azúcar, balones, estrellas doradas y el nombre del cumpleañero. La personalizamos con el equipo, el jugador y la edad que quieras.",
  },
  {
    src: "/images/galeria/tortas/torta-02.webp",
    alt: "Torta personalizada de Snoopy y Charlie Brown",
    nombre: "Torta de Snoopy",
    ocasion: "Cumpleaños infantil",
    descripcion:
      "Snoopy, Charlie Brown y sus amigos en una torta llena de color, con el nombre del cumpleañero. Ideal para fiestas infantiles.",
  },
  {
    src: "/images/galeria/tortas/torta-03.webp",
    alt: "Torta personalizada rosada de Barbie",
    nombre: "Torta de Barbie",
    ocasion: "Cumpleaños",
    descripcion:
      "Torta rosada de dos pisos inspirada en Barbie, con figuras en papel de azúcar, detalles brillantes, el nombre y la edad.",
  },
  {
    src: "/images/galeria/tortas/torta-04.webp",
    alt: "Torta de primera comunión",
    nombre: "Torta de primera comunión",
    ocasion: "Primera comunión",
    descripcion:
      "Torta blanca y dorada para primera comunión, con figuras religiosas y los nombres de los niños. Elegante y llena de significado.",
  },
  {
    src: "/images/galeria/tortas/torta-05.webp",
    alt: "Torta de cumpleaños con estampado de leopardo",
    nombre: "Torta de leopardo",
    ocasion: "Cumpleaños",
    descripcion: "Torta de cumpleaños con estampado de leopardo y un mensaje de felicitación. Un diseño moderno para celebrar con estilo.",
  },
  {
    src: "/images/galeria/tortas/torta-06.webp",
    alt: "Torta de cumpleaños de Snoopy de dos pisos",
    nombre: "Torta de Snoopy de dos pisos",
    ocasion: "Cumpleaños infantil",
    descripcion: "Torta de dos pisos con Snoopy como protagonista, pensada para celebraciones grandes y fotos memorables.",
  },
  {
    src: "/images/galeria/tortas/torta-07.webp",
    alt: "Torta roja de cumpleaños decorada con moños",
    nombre: "Torta roja con moños",
    ocasion: "Cumpleaños",
    descripcion: "Torta roja decorada con moños, un diseño romántico y delicado para un cumpleaños especial.",
  },
  {
    src: "/images/galeria/tortas/torta-08.webp",
    alt: "Torta personalizada de Bluey",
    nombre: "Torta de Bluey",
    ocasion: "Cumpleaños infantil",
    descripcion: "Torta inspirada en Bluey, con los personajes favoritos de los más pequeños, el nombre y la edad del cumpleañero.",
  },
  {
    src: "/images/galeria/tortas/torta-09.webp",
    alt: "Torta de bautizo con ángel",
    nombre: "Torta de bautizo",
    ocasion: "Bautizo",
    descripcion: "Torta de bautizo con ángel y detalles suaves, para celebrar en familia un día muy especial.",
  },
  {
    src: "/images/galeria/tortas/torta-10.webp",
    alt: "Torta de dos pisos de Barbie",
    nombre: "Torta de Barbie de dos pisos",
    ocasion: "Cumpleaños",
    descripcion: "Torta de dos pisos inspirada en Barbie, con figuras, color rosa y el nombre de la cumpleañera.",
  },
  {
    src: "/images/galeria/tortas/torta-11.webp",
    alt: "Torta elegante con rosas rojas y número dorado",
    nombre: "Torta de rosas rojas",
    ocasion: "Celebración",
    descripcion: "Torta elegante con rosas rojas y número dorado, perfecta para aniversarios y celebraciones de adultos.",
  },
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
