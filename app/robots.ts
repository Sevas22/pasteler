import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"

/** Rastreadores de buscadores y de asistentes de IA a los que se les permite leer el sitio público. */
const ROBOTS_IA = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
]

export default function robots(): MetadataRoute.Robots {
  const privado = ["/admin", "/admin/", "/api/"]
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: privado },
      { userAgent: ROBOTS_IA, allow: "/", disallow: privado },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
