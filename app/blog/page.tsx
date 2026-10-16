import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { LayoutShell } from "@/components/layout-shell"
import { PageHero } from "@/components/page-hero"
import { JsonLd } from "@/components/json-ld"
import { RevealItem, RevealStagger } from "@/components/motion/reveal"
import { ARTICULOS, formatearFecha } from "@/lib/blog"
import { BANNERS } from "@/lib/media"
import { absoluteUrl, grafo, migasSchema } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Blog de pastelería y panadería: guías y consejos",
  description:
    "Guías prácticas de Daliza Pastelería Fina: cómo pedir una torta personalizada, qué tamaño elegir, diferencias entre cheesecake y tres leches, panadería colombiana y cómo conservar tu torta.",
  alternates: { canonical: "/blog" },
  openGraph: { type: "website", url: "/blog" },
}

const SERIF = { fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }

export default function BlogPage() {
  return (
    <LayoutShell>
      <JsonLd
        data={grafo(
          migasSchema([
            { nombre: "Inicio", ruta: "/" },
            { nombre: "Blog", ruta: "/blog" },
          ]),
          {
            "@type": "Blog",
            name: "Blog de Daliza Pastelería Fina",
            url: absoluteUrl("/blog"),
            inLanguage: "es-CO",
            blogPost: ARTICULOS.map((a) => ({
              "@type": "BlogPosting",
              headline: a.titulo,
              url: absoluteUrl(`/blog/${a.slug}`),
              datePublished: a.fecha,
              image: absoluteUrl(a.imagen),
            })),
          },
        )}
      />
      <PageHero
        src={BANNERS.paginas.blog}
        alt="Tarta y postres de Daliza Pastelería Fina"
        priority
        title={
          <>
            Blog de pastelería <span className="italic text-[#E3C98F]">y panadería.</span>
          </>
        }
        description="Guías y consejos para pedir, elegir y disfrutar tus tortas, postres y panes."
      />

      <section data-no-section-divider className="bg-background px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary/80">Artículos</p>
          <div className="mt-2 h-px w-full bg-border" aria-hidden />

          <RevealStagger className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {ARTICULOS.map((a) => (
              <RevealItem key={a.slug} className="group flex flex-col">
                <Link href={`/blog/${a.slug}`} className="flex flex-1 flex-col">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                    <Image
                      src={a.imagen}
                      alt={a.imagenAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                    />
                  </div>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-primary/80">
                    {a.categoria} · {a.lecturaMin} min de lectura
                  </p>
                  <h2 className="mt-1.5 text-xl font-normal leading-snug text-heading" style={SERIF}>
                    {a.titulo}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{a.descripcion}</p>
                  <p className="mt-auto flex items-center gap-1.5 pt-4 text-sm font-medium text-primary">
                    Leer artículo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </p>
                  <time dateTime={a.fecha} className="mt-1 text-xs text-muted-foreground">
                    {formatearFecha(a.fecha)}
                  </time>
                </Link>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>
    </LayoutShell>
  )
}
