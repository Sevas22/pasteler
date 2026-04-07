import { MEDIA } from "@/lib/media"

export type Course = {
  id: string
  slug: string
  title: string
  description: string
  /** Texto largo para la ficha del curso */
  descripcionLarga: string
  image: string
  imagenesExtra?: string[]
  duration: string
  students: string
  level: string
  topics: string[]
  highlights: string[]
}

export const courses: Course[] = [
  {
    id: "c1",
    slug: "curso-basico-pasteleria",
    title: "Curso Básico de Pastelería",
    description:
      "Aprende las técnicas fundamentales de la repostería: masas, cremas, decoración básica y más.",
    descripcionLarga:
      "Programa pensado para quien empieza desde cero o quiere ordenar conocimientos. Trabajamos en cocina con ingredientes reales: tipos de harina, azúcares, huevos y cómo obtener masas uniformes. Verás demostraciones y practicarás en mesa con acompañamiento del instructor. Al finalizar tendrás recetas base que podrás repetir en casa y criterios para corregir texturas o sabores. Incluye material de apoyo y recomendaciones de utensilios.",
    image: MEDIA.courses.basico,
    imagenesExtra: [
      "/images/producto-mousse-fresa-individual-daliza.png",
      "/images/producto-brazo-gitano-daliza.png",
    ],
    duration: "4 semanas",
    students: "8 máx.",
    level: "Principiante",
    topics: ["Masas básicas", "Cremas y rellenos", "Decoración con manga", "Cupcakes y muffins"],
    highlights: [
      "Grupos reducidos y práctica guiada",
      "Recetas base para aplicar en casa",
      "Sesiones de repaso de técnicas clave",
      "Certificado de participación al finalizar",
    ],
  },
  {
    id: "c2",
    slug: "decoracion-avanzada-tortas",
    title: "Decoración Avanzada de Tortas",
    description:
      "Domina el arte de la decoración profesional con fondant, flores de azúcar y técnicas avanzadas.",
    descripcionLarga:
      "Profundizamos en acabados de nivel pastelería: cobertura con fondant, volumen y estructura para tortas de varios pisos, flores modeladas y uso de color. Verás cómo planificar un diseño desde el boceto hasta la entrega, tiempos de secado y trucos para bordes limpios. Requiere haber trabajado antes con buttercream o haber completado un nivel básico; si tienes dudas, te orientamos antes de inscribirte.",
    image: MEDIA.courses.avanzado,
    imagenesExtra: [
      "/images/producto-mousse-frutos-rojos-daliza.png",
      "/images/producto-cheesecake-maracuya-daliza.png",
    ],
    duration: "6 semanas",
    students: "6 máx.",
    level: "Avanzado",
    topics: ["Fondant y pastillaje", "Flores de azúcar", "Técnicas de aerógrafo", "Tortas de varios pisos"],
    highlights: [
      "Proyecto final tipo torta de evento",
      "Técnicas de color y modelado",
      "Introducción a estructuras seguras",
      "Biblioteca de referencias y proveedores",
    ],
  },
  {
    id: "c3",
    slug: "especialidades-francesas",
    title: "Especialidades Francesas",
    description:
      "Sumérgete en el mundo de la pastelería francesa: macarons, éclairs, petit fours y más.",
    descripcionLarga:
      "Recorremos clásicos de la pâtisserie francesa con rigor técnico: merengues, masas laminadas ligeras, cremas y glaseados. El foco está en precisión de temperatura, tiempos de horno y presentación. Ideal si ya manejas recetas básicas y quieres subir el nivel. Las recetas se adaptan a ingredientes disponibles en Bogotá y te damos alternativas cuando haga falta.",
    image: MEDIA.courses.frances,
    imagenesExtra: [
      "/images/producto-cheesecake-maracuya-daliza.png",
      "/images/producto-tartas-fruta-daliza.png",
    ],
    duration: "5 semanas",
    students: "6 máx.",
    level: "Intermedio",
    topics: ["Macarons perfectos", "Éclairs y profiteroles", "Tartas francesas", "Chocolatería básica"],
    highlights: [
      "Enfoque en técnica y presentación",
      "Degustación y corrección en clase",
      "Fichas de recetas y puntos de control",
      "Opción de armar caja de minis para llevar",
    ],
  },
]

export function getCursoBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug)
}

export function getOtrosCursos(slug: string, max = 2): Course[] {
  return courses.filter((c) => c.slug !== slug).slice(0, max)
}
