import type { Producto } from "@/lib/types/producto"

export const SERVICIOS_PRODUCTO = [
  { slug: "panaderia", label: "Panadería" },
  { slug: "pasteleria", label: "Pastelería" },
  { slug: "reposteria", label: "Repostería" },
] as const

export type ServicioProducto = (typeof SERVICIOS_PRODUCTO)[number]["slug"]

const SERVICE_LABEL: Record<ServicioProducto, string> = {
  panaderia: "Panadería",
  pasteleria: "Pastelería",
  reposteria: "Repostería",
}

/**
 * Catálogo real Daliza — fotos con marca en `/public/images/producto-*-daliza.png`.
 */
export const PRODUCTOS: Producto[] = [
  {
    id: "1",
    slug: "pastel-tiramisu-daliza",
    nombre: "Pastel estilo tiramisú",
    descripcion:
      "Capas de bizcocho, crema mascarpone y cacao en retícula, fresas glaseadas y chocolate de adorno.",
    servicio: "pasteleria",
    categoria: "tortas",
    imagen: "/images/producto-pastel-tiramisu-daliza.png",
    descripcionLarga:
      "Pastel redondo sobre base dorada, acabado con crema blanca y polvo de cacao en patrón de rombos. Lleva fresas enteras y un lazo de chocolate oscuro. Ideal para celebraciones y mesas dulces. Consulta porciones y personalización de mensaje o topper.",
    highlights: [
      "Textura húmeda y cremosa",
      "Decoración con cacao y fruta fresca",
      "Presentación en base dorada",
      "Pedido con antelación recomendada",
    ],
    imagenesExtra: [
      "/images/producto-cheesecake-maracuya-daliza.png",
      "/images/producto-torta-mousse-chocolate-daliza.png",
    ],
  },
  {
    id: "2",
    slug: "tartas-fruta-fresca",
    nombre: "Tartas de fruta fresca",
    descripcion:
      "Masa quebrada dorada, fruta de temporada glaseada y detalle de menta y flores comestibles.",
    servicio: "reposteria",
    categoria: "tartas",
    imagen: "/images/producto-tartas-fruta-daliza.png",
    descripcionLarga:
      "Dos tartas individuales sobre pizarra, rellenas con laminas de fruta amarilla en círculo y fresas en el centro. Presentación gourmet con azúcar glass y flores. Perfectas para brunch, coffee break o mesa dulce. Disponibles por unidad o bandeja según agenda.",
    highlights: [
      "Fruta fresca glaseada",
      "Base de masa quebrada artesanal",
      "Presentación sobre pizarra",
      "Opción para eventos y catering",
    ],
    imagenesExtra: [
      "/images/producto-mousse-fresa-individual-daliza.png",
      "/images/producto-cheesecake-maracuya-daliza.png",
    ],
  },
  {
    id: "3",
    slug: "cheesecake-maracuya-daliza",
    nombre: "Cheesecake de maracuyá",
    descripcion:
      "Mousse amarillo con semillas de maracuyá, glaseado espejo, fresas y chocolate, listón decorativo.",
    servicio: "pasteleria",
    categoria: "tortas",
    imagen: "/images/producto-cheesecake-maracuya-daliza.png",
    descripcionLarga:
      "Cheesecake o mousse de maracuyá sobre base de chocolate, cubierta con gel brillante, fresas frescas y rizos de chocolate. Incluye cinta roja alrededor del pastel. Sabor cítrico equilibrado. Pide disponibilidad y tamaño (individual o familiar).",
    highlights: [
      "Gel de maracuyá brillante",
      "Base crocante de chocolate",
      "Decoración con fresas y chocolate",
      "Ideal para mesas elegantes",
    ],
    imagenesExtra: [
      "/images/producto-pastel-tiramisu-daliza.png",
      "/images/producto-mousse-frutos-rojos-daliza.png",
    ],
  },
  {
    id: "4",
    slug: "brazo-de-reina-daliza",
    nombre: "Brazo de reina",
    descripcion:
      "Bizcocho enrollado, crema suave con trozos de fruta roja, fresas encima y azúcar glass.",
    servicio: "panaderia",
    categoria: "especiales",
    imagen: "/images/producto-brazo-gitano-daliza.png",
    descripcionLarga:
      "Rollo esponjoso con relleno cremoso y frutos rojos, espolvoreado con azúcar glass y decorado con fresas enteras. Textura ligera y presentación rústica-chic. Porción para compartir; consulta también formato para eventos.",
    highlights: [
      "Relleno cremoso con fruta",
      "Acabado con azúcar glass",
      "Horno del día o pedido programado",
      "Corte y empaque para transporte",
    ],
    imagenesExtra: [
      "/images/producto-tartas-fruta-daliza.png",
      "/images/producto-mousse-fresa-individual-daliza.png",
    ],
  },
  {
    id: "5",
    slug: "torta-mousse-chocolate-daliza",
    nombre: "Torta mousse de chocolate",
    descripcion:
      "Tres capas de mousse y bizcocho, glaseado espejo de chocolate, fresas y decoración de chocolate.",
    servicio: "pasteleria",
    categoria: "tortas",
    imagen: "/images/producto-torta-mousse-chocolate-daliza.png",
    descripcionLarga:
      "Torta redonda multicapa con alternancia de chocolate y crema, cubierta con ganache o glaseado brillante. Incluye fresas y pieza de chocolate con patrón. Sobre base dorada y mármol. Un clásico para amantes del chocolate; pregunta por diámetro y porciones.",
    highlights: [
      "Perfil de capas visibles",
      "Glaseado brillante tipo espejo",
      "Decoración con fresas",
      "Presentación premium en base dorada",
    ],
    imagenesExtra: [
      "/images/producto-mousse-frutos-rojos-daliza.png",
      "/images/producto-pastel-tiramisu-daliza.png",
    ],
  },
  {
    id: "6",
    slug: "mousse-fresa-individual",
    nombre: "Mousse de fresa individual",
    descripcion:
      "Mini torta en acetato, mousse rosa, cinta terciopelo, chocolate y fresas en la parte superior.",
    servicio: "reposteria",
    categoria: "postres",
    imagen: "/images/producto-mousse-fresa-individual-daliza.png",
    descripcionLarga:
      "Porción individual con capas de galleta, mousse de fresa y crema blanca, decorada con chocolate y fresas. Lazo rojo alrededor y base dorada festoneada. Ideal para regalo, mesa dulce o cierre de cena. Cajas disponibles por cantidad.",
    highlights: [
      "Formato individual listo para servir",
      "Decoración con fresas y chocolate",
      "Base dorada y cinta decorativa",
      "Pedidos por múltiplos para eventos",
    ],
    imagenesExtra: [
      "/images/producto-torta-mousse-chocolate-daliza.png",
      "/images/producto-tartas-fruta-daliza.png",
    ],
  },
  {
    id: "7",
    slug: "mousse-frutos-rojos-daliza",
    nombre: "Mousse de frutos rojos",
    descripcion:
      "Acabado aterciopelado en tonos berries, topping de frutos rojos, fresas y chocolate blanco.",
    servicio: "pasteleria",
    categoria: "postres",
    imagen: "/images/producto-mousse-frutos-rojos-daliza.png",
    descripcionLarga:
      "Pastel cilíndrico con spray terciopelo morado-berry, compota brillante arriba, fresas y rizo de chocolate blanco rayado. Base dorada sobre mármol. Sabor intenso a frutos del bosque. Consulta alérgenos y versión sin ciertos ingredientes con antelación.",
    highlights: [
      "Textura mousse y glaseado de frutos",
      "Acabado terciopelo profesional",
      "Decoración con fresas y chocolate",
      "Presentación sobre mármol",
    ],
    imagenesExtra: [
      "/images/producto-cheesecake-maracuya-daliza.png",
      "/images/producto-mousse-fresa-individual-daliza.png",
    ],
  },
]

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

export function getProductoBySlug(slug: string): Producto | undefined {
  return PRODUCTOS.find((p) => p.slug === slug)
}

export function getProductosByServicio(servicio: ServicioProducto): Producto[] {
  return PRODUCTOS.filter((p) => p.servicio === servicio)
}

export function getOtrosProductos(slug: string, max = 3): Producto[] {
  return PRODUCTOS.filter((p) => p.slug !== slug).slice(0, max)
}
