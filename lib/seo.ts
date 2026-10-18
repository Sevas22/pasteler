import type { Location } from "@/lib/data/locations"
import type { Producto } from "@/lib/types/producto"

/** Dominio público del sitio. En producción nunca debe quedar en localhost (sitemap, canónicas, QR, JSON-LD). */
const DOMINIO_POR_DEFECTO = "https://www.dalizas.com"

export function getSiteUrl(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "")
  // dalizas.com redirige a www.dalizas.com: la URL canónica es siempre la de www.
  if (env && !env.includes("localhost")) return env.replace("//dalizas.com", "//www.dalizas.com")
  if (process.env.NODE_ENV === "production") return DOMINIO_POR_DEFECTO
  return env || "http://localhost:3000"
}

export const SITE_URL = getSiteUrl()

export function absoluteUrl(ruta: string): string {
  if (/^https?:\/\//.test(ruta)) return ruta
  return `${SITE_URL}${ruta.startsWith("/") ? ruta : `/${ruta}`}`
}

export const NEGOCIO = {
  nombre: "Daliza Pastelería Fina",
  nombresAlternos: ["Dalizas Pastelería Fina", "Daliza Pastelería"],
  descripcion:
    "Pastelería fina, repostería y panadería en Bosa, Bogotá: tortas personalizadas con papel de azúcar, cheesecakes, postres y pan artesanal, con sedes en Bosa y Ciudadela Colsubsidio.",
  logo: "/images/logo-dalizas-512.png",
  imagenSocial: "/images/banners/hero-tortas-surtido.webp",
  facebook: "https://www.facebook.com/profile.php?id=61595539589501",
  email: "pasteleradalizas9@gmail.com",
  /**
   * Redes sociales. Para activar una, pon aquí su enlace completo (p. ej. "https://www.instagram.com/usuario").
   * Mientras esté vacía, el ícono se muestra en el footer pero no es clicable, y no se anuncia a Google.
   */
  redes: {
    instagram: "https://www.instagram.com/pasteleriadalizas",
    facebook: "https://www.facebook.com/profile.php?id=61595539589501",
    tiktok: "https://www.tiktok.com/@pasteleria.daliza",
    youtube: "https://www.youtube.com/@Pasteleriadalizas",
  },
  telefonoPrincipal: "+573108336425",
  /** Para las páginas legales: si se dejan vacíos, se usa el nombre comercial y no se muestra NIT. */
  razonSocial: "",
  nit: "",
} as const

/* ───────────── Horarios → openingHoursSpecification ───────────── */

const DIAS: Record<string, string> = {
  lun: "Monday",
  mar: "Tuesday",
  mie: "Wednesday",
  jue: "Thursday",
  vie: "Friday",
  sab: "Saturday",
  dom: "Sunday",
}
const ORDEN = ["lun", "mar", "mie", "jue", "vie", "sab", "dom"]

function sinTildes(t: string) {
  return t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
}

function a24h(hora: string): string | null {
  const m = hora.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i)
  if (!m) return null
  let h = Number(m[1]) % 12
  if (m[3].toUpperCase() === "PM") h += 12
  return `${String(h).padStart(2, "0")}:${m[2] ?? "00"}`
}

function diasDe(etiqueta: string): string[] {
  const t = sinTildes(etiqueta)
  const rango = t.match(/(lun|mar|mie|jue|vie|sab|dom)\w*\s*-\s*(lun|mar|mie|jue|vie|sab|dom)/)
  if (rango) {
    const a = ORDEN.indexOf(rango[1])
    const b = ORDEN.indexOf(rango[2])
    return ORDEN.slice(a, b + 1).map((d) => DIAS[d])
  }
  const sueltos = ORDEN.filter((d) => new RegExp(`\\b${d}`).test(t))
  // Sin días indicados no se inventan: el horario se omite del JSON-LD hasta que el texto los incluya.
  return sueltos.map((d) => DIAS[d])
}

/** Convierte "Lun - Vie: 12:00 PM - 8:30 PM · Sáb y Dom: 10:00 AM - 8:30 PM" en el formato de schema.org. */
export function horariosSchema(hours: string) {
  if (!hours) return undefined
  const specs = hours
    .split(/\s*·\s*/)
    .map((segmento) => {
      const partes = segmento.split(/:\s(?=\d)/)
      const etiqueta = partes.length > 1 ? partes[0] : ""
      const rangoHoras = partes.length > 1 ? partes.slice(1).join(": ") : segmento
      const [abre, cierra] = rangoHoras.split(/\s+-\s+/).map((h) => a24h(h))
      const dias = diasDe(etiqueta)
      if (!abre || !cierra || !dias.length) return null
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: dias,
        opens: abre,
        closes: cierra,
      }
    })
    .filter(Boolean)
  return specs.length ? specs : undefined
}

/* ───────────── Constructores de JSON-LD ───────────── */

const ID_ORG = `${SITE_URL}/#organizacion`

export function organizacionSchema() {
  return {
    "@type": "Organization",
    "@id": ID_ORG,
    name: NEGOCIO.nombre,
    alternateName: NEGOCIO.nombresAlternos,
    url: SITE_URL,
    logo: absoluteUrl(NEGOCIO.logo),
    description: NEGOCIO.descripcion,
    sameAs: Object.values(NEGOCIO.redes).filter(Boolean),
    email: NEGOCIO.email,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: NEGOCIO.telefonoPrincipal,
      email: NEGOCIO.email,
      contactType: "customer service",
      areaServed: "CO",
      availableLanguage: "es",
    },
  }
}

export function sitioWebSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#sitio`,
    url: SITE_URL,
    name: NEGOCIO.nombre,
    inLanguage: "es-CO",
    publisher: { "@id": ID_ORG },
  }
}

export function sedeSchema(location: Location) {
  const telefono = location.whatsapp ? `+${location.whatsapp.replace(/\D/g, "")}` : NEGOCIO.telefonoPrincipal
  return {
    "@type": "Bakery",
    "@id": `${SITE_URL}/tiendas/${location.slug}#sede`,
    name: location.slug === "panaderia-carbonell" ? location.name : `${NEGOCIO.nombre} · ${location.name}`,
    url: absoluteUrl(`/tiendas/${location.slug}`),
    image: absoluteUrl(NEGOCIO.imagenSocial),
    logo: absoluteUrl(NEGOCIO.logo),
    description: NEGOCIO.descripcion,
    telephone: telefono,
    parentOrganization: { "@id": ID_ORG },
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address,
      addressLocality: "Bogotá",
      addressRegion: "Bogotá D.C.",
      addressCountry: "CO",
    },
    ...(location.mapsUrl ? { hasMap: location.mapsUrl } : {}),
    openingHoursSpecification: horariosSchema(location.hours),
    areaServed: { "@type": "City", name: "Bogotá" },
    sameAs: Object.values(NEGOCIO.redes).filter(Boolean),
  }
}

export function migasSchema(items: { nombre: string; ruta: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.nombre,
      item: absoluteUrl(item.ruta),
    })),
  }
}

export function productoSchema(p: Producto) {
  const imagenes = [p.imagen, ...(p.imagenesExtra ?? [])].filter((x) => x && !x.includes("logo-dalizas")).map(absoluteUrl)
  return {
    "@type": "Product",
    "@id": `${SITE_URL}/productos/${p.slug}#producto`,
    name: p.nombre,
    description: p.descripcionLarga || p.descripcion,
    url: absoluteUrl(`/productos/${p.slug}`),
    sku: p.slug,
    category: p.categoria,
    image: imagenes.length ? imagenes : undefined,
    brand: { "@type": "Brand", name: NEGOCIO.nombre },
    ...(p.precio
      ? {
          offers: {
            "@type": "Offer",
            price: p.precio,
            priceCurrency: "COP",
            availability: "https://schema.org/InStock",
            url: absoluteUrl(`/productos/${p.slug}`),
            seller: { "@id": ID_ORG },
          },
        }
      : {}),
  }
}

export function preguntasSchema(faqs: readonly { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  }
}

export function articuloSchema(a: {
  titulo: string
  descripcion: string
  ruta: string
  imagen: string
  fecha: string
  actualizado?: string
}) {
  return {
    "@type": "BlogPosting",
    headline: a.titulo,
    description: a.descripcion,
    image: [absoluteUrl(a.imagen)],
    datePublished: a.fecha,
    dateModified: a.actualizado ?? a.fecha,
    inLanguage: "es-CO",
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(a.ruta) },
    author: { "@type": "Organization", name: NEGOCIO.nombre, url: SITE_URL },
    publisher: { "@id": ID_ORG },
  }
}

/** Envuelve varios nodos en un solo @graph listo para <script type="application/ld+json">. */
export function grafo(...nodos: (object | undefined | null)[]) {
  return { "@context": "https://schema.org", "@graph": nodos.filter(Boolean) }
}
