import type { MetadataRoute } from "next"
import { ARTICULOS } from "@/lib/blog"
import { getLocationsPublic } from "@/lib/data/locations"
import { getProductosPublic } from "@/lib/data/productos"
import { absoluteUrl } from "@/lib/seo"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [productos, sedes] = await Promise.all([getProductosPublic(), getLocationsPublic()])
  const ahora = new Date()

  const fijas: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: ahora, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/productos"), lastModified: ahora, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/tiendas"), lastModified: ahora, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/galeria"), lastModified: ahora, changeFrequency: "weekly", priority: 0.7 },
    { url: absoluteUrl("/blog"), lastModified: ahora, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/contacto"), lastModified: ahora, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/preguntas-frecuentes"), lastModified: ahora, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/tratamiento-de-datos"), lastModified: ahora, changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/politica-de-privacidad"), lastModified: ahora, changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/cursos"), lastModified: ahora, changeFrequency: "monthly", priority: 0.4 },
  ]

  const sedesUrls: MetadataRoute.Sitemap = sedes.map((s) => ({
    url: absoluteUrl(`/tiendas/${s.slug}`),
    lastModified: ahora,
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  const productosUrls: MetadataRoute.Sitemap = productos.map((p) => ({
    url: absoluteUrl(`/productos/${p.slug}`),
    lastModified: ahora,
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  const blogUrls: MetadataRoute.Sitemap = ARTICULOS.map((a) => ({
    url: absoluteUrl(`/blog/${a.slug}`),
    lastModified: new Date(`${a.fecha}T12:00:00`),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...fijas, ...sedesUrls, ...productosUrls, ...blogUrls]
}
