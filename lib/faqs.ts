import type { Location } from "@/lib/data/locations"

/** Preguntas frecuentes del sitio. Las respuestas sobre sedes se arman con los datos reales de Supabase. */

export type Faq = {
  question: string
  answer: string
  enlace?: { href: string; label: string }
}

export type GrupoFaq = {
  id: string
  titulo: string
  preguntas: Faq[]
}

const ANTICIPACION: Faq = {
  question: "¿Con cuánta anticipación debo pedir mi torta?",
  answer:
    "Entre más pronto nos escribas, mejor: los diseños personalizados, las tortas con papel de azúcar y los pedidos grandes necesitan más tiempo de preparación. Escríbenos por WhatsApp a tu sede, cuéntanos la fecha y te confirmamos disponibilidad.",
}

const ENVIOS: Faq = {
  question: "¿Hacen envíos o solo se recoge en tienda?",
  answer:
    "Puedes recoger tu pedido en cualquiera de nuestras sedes en Bogotá (Bosa y Ciudadela Colsubsidio). Coordina con tu sede más cercana por WhatsApp si necesitas que te lo entreguemos.",
}

const PERSONALIZAR: Faq = {
  question: "¿Puedo personalizar sabor, tamaño o decoración?",
  answer:
    "Sí. La mayoría de nuestras creaciones se pueden ajustar en tamaño y decoración. Cuéntanos tu idea por WhatsApp y te confirmamos opciones y valor.",
}

const ALERGIAS: Faq = {
  question: "¿Manejan productos para alergias o dietas especiales?",
  answer:
    "Consulta con tu sede sobre alérgenos o ingredientes específicos antes de confirmar tu pedido: cada creación puede variar en composición.",
}

const CURSOS: Faq = {
  question: "¿Cómo funcionan los cursos de pastelería?",
  answer:
    "Estamos definiendo la nueva programación de cursos de pastelería. Escríbenos por WhatsApp y te avisamos apenas abramos inscripciones.",
  enlace: { href: "/cursos", label: "Ver cursos" },
}

/** Selección corta para mostrar en otras páginas (p. ej. contacto). */
export const FAQS_DESTACADAS: Faq[] = [ANTICIPACION, ENVIOS, PERSONALIZAR, ALERGIAS, CURSOS]

function listar(items: string[]): string {
  if (items.length <= 1) return items.join("")
  return `${items.slice(0, -1).join(", ")} y ${items[items.length - 1]}`
}

/** Pastelerías (sin repetir la panadería que comparte dirección con su sede). */
function pastelerias(locations: Location[]): Location[] {
  return locations.filter((l) => !/panader/i.test(l.type))
}

function respuestaSedes(locations: Location[]): string {
  const sedes = pastelerias(locations)
  const enBosa = sedes.filter((l) => /bosa/i.test(l.name)).length
  const detalle = sedes.map((l) => `${l.name} (${l.address})`).join("; ")
  const panaderia = locations.find((l) => /panader/i.test(l.type))
  return [
    `Daliza Pastelería Fina tiene ${sedes.length} pastelerías en Bogotá${enBosa ? `, ${enBosa} de ellas en Bosa` : ""}: ${detalle}.`,
    panaderia ? `Además, ${panaderia.name} funciona en ${panaderia.address}.` : "",
  ]
    .filter(Boolean)
    .join(" ")
}

function respuestaHorarios(locations: Location[]): string {
  const porHorario = new Map<string, string[]>()
  for (const l of pastelerias(locations)) {
    if (!l.hours) continue
    porHorario.set(l.hours, [...(porHorario.get(l.hours) ?? []), l.name])
  }
  const partes = [...porHorario.entries()].map(([horas, nombres]) => `${listar(nombres)}: ${horas}`)
  return partes.length
    ? `${partes.join(". ")}. Si vas a recoger un pedido, confírmalo antes por WhatsApp con tu sede.`
    : "Consulta el horario de cada sede en la página de tiendas o escríbenos por WhatsApp."
}

function respuestaWhatsapp(locations: Location[]): string {
  const lineas = pastelerias(locations)
    .filter((l) => l.phone)
    .map((l) => `${l.name}: ${l.phone}`)
  return `Cada sede tiene su propio WhatsApp para pedidos y cotizaciones. ${lineas.join("; ")}. También puedes usar el botón "Consultar" de cualquier producto: te lleva directo al chat de la sede.`
}

export function construirFaqs(locations: Location[]): GrupoFaq[] {
  return [
    {
      id: "pedidos",
      titulo: "Pedidos y tortas personalizadas",
      preguntas: [
        {
          question: "¿Cómo hago un pedido en Daliza Pastelería Fina?",
          answer:
            "Los pedidos se hacen por WhatsApp con la sede que prefieras. Desde la página de productos puedes tocar \"Consultar\" en cualquier torta, postre o pan y se abre el chat con el nombre del producto. Cuéntanos la fecha y la cantidad, y te confirmamos disponibilidad y valor.",
          enlace: { href: "/productos", label: "Ver productos" },
        },
        ANTICIPACION,
        {
          question: "¿Qué necesito para cotizar una torta personalizada?",
          answer:
            "Solo necesitas la fecha, el número de personas, el sabor y la idea o imagen del diseño (nombre, personaje, foto o logo). Con eso tu sede te confirma disponibilidad y valor por WhatsApp.",
          enlace: { href: "/blog/torta-personalizada-papel-de-azucar-bogota", label: "Guía para pedir tu torta personalizada" },
        },
        {
          question: "¿Qué es el papel de azúcar en una torta?",
          answer:
            "Es una lámina comestible impresa con tintas aptas para alimentos. Se coloca sobre la cobertura de la torta y permite personalizarla con nombres, fotos, personajes o logos con mucho detalle.",
        },
        PERSONALIZAR,
        {
          question: "¿Cuánto cuesta una torta en Daliza?",
          answer:
            "El valor depende del tamaño, el sabor y la decoración, por eso cada torta se cotiza. Escríbele a tu sede por WhatsApp con la fecha y el número de personas y te damos el precio exacto.",
        },
      ],
    },
    {
      id: "sedes",
      titulo: "Sedes, horarios y entregas",
      preguntas: [
        {
          question: "¿Dónde quedan las sedes de Daliza Pastelería Fina?",
          answer: respuestaSedes(locations),
          enlace: { href: "/tiendas", label: "Ver sedes y mapas" },
        },
        {
          question: "¿Dónde puedo comprar tortas y postres en Bosa, Bogotá?",
          answer: `En Daliza Pastelería Fina, una pastelería de Bosa con tortas personalizadas, cheesecakes, tortas frías, postres y panadería artesanal. Puedes visitarnos en ${listar(
            pastelerias(locations)
              .filter((l) => /bosa/i.test(l.name))
              .map((l) => l.name),
          )}, o pedir por WhatsApp para recoger en tienda.`,
          enlace: { href: "/tiendas", label: "Ver sedes en Bosa" },
        },
        {
          question: "¿Cuál es el horario de atención?",
          answer: respuestaHorarios(locations),
        },
        {
          question: "¿Cuál es el WhatsApp de Daliza?",
          answer: respuestaWhatsapp(locations),
          enlace: { href: "/contacto", label: "Ir a contacto" },
        },
        ENVIOS,
      ],
    },
    {
      id: "productos",
      titulo: "Productos",
      preguntas: [
        {
          question: "¿Qué productos venden?",
          answer:
            "Tenemos tres líneas: pastelería (tortas tres leches, tortas frías, tortas con cheesecake, tortas de chocolate y tortas personalizadas), repostería (cheesecakes, postres tradicionales, milhojas, brownies, galletas y alfajores) y panadería (almojábanas, pan de bono, pan de queso, roscones, hojaldres, cruasanes y pan tradicional).",
          enlace: { href: "/productos", label: "Ver catálogo completo" },
        },
        {
          question: "¿Qué diferencia hay entre cheesecake, torta tres leches y torta fría?",
          answer:
            "El cheesecake es cremoso y a base de queso; la tres leches es un bizcocho húmedo bañado en leches; la torta fría es ligera, fresca y muy decorable, ideal para celebraciones grandes y diseños personalizados. Las tres se conservan y se sirven refrigeradas.",
          enlace: { href: "/blog/cheesecake-torta-tres-leches-o-torta-fria", label: "Leer la comparación completa" },
        },
        {
          question: "¿Cuántas porciones tiene una torta?",
          answer:
            "Como referencia general, una torta redonda mediana rinde entre 10 y 12 porciones. Calcula una porción por invitado y suma unas pocas más si es el único postre. El número exacto depende de la torta; tu sede te lo confirma.",
          enlace: { href: "/blog/cuantas-porciones-tiene-una-torta-que-tamano-pedir", label: "Guía de tamaños y porciones" },
        },
        {
          question: "¿Venden pan para el desayuno?",
          answer:
            "Sí. En nuestra línea de panadería hay almojábana, pan de bono, pan de queso, resobados, roscones, hojaldres, cruasanes y pan tradicional, hechos en nuestras sedes.",
          enlace: { href: "/productos?servicio=panaderia", label: "Ver panadería" },
        },
        ALERGIAS,
      ],
    },
    {
      id: "conservacion",
      titulo: "Conservación y transporte",
      preguntas: [
        {
          question: "¿La torta debe guardarse en la nevera?",
          answer:
            "Sí, si lleva crema, queso o fruta. Los cheesecakes, las tres leches y las tortas frías deben mantenerse refrigerados y tapados hasta poco antes de servir. Evita congelar tortas con papel de azúcar: la humedad puede dañar la imagen.",
          enlace: { href: "/blog/como-conservar-y-transportar-una-torta", label: "Cómo conservar tu torta" },
        },
        {
          question: "¿Cómo transporto la torta sin que se dañe?",
          answer:
            "Llévala sobre una superficie plana (el piso del carro o el baúl, nunca en un asiento inclinado), con el aire acondicionado puesto y sin frenazos. Al llegar, guárdala en la nevera.",
        },
        {
          question: "¿Cuándo debo sacar la torta de la nevera?",
          answer:
            "Unos 15 a 30 minutos antes de servir, para que gane sabor y textura. No la dejes por horas a temperatura ambiente, sobre todo si hace calor.",
        },
      ],
    },
    {
      id: "cursos",
      titulo: "Cursos",
      preguntas: [CURSOS],
    },
  ]
}
