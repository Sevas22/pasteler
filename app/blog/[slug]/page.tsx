import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight, MessageCircle } from "lucide-react"
import { LayoutShell } from "@/components/layout-shell"
import { JsonLd } from "@/components/json-ld"
import { WhatsAppCTA } from "@/components/whatsapp-cta"
import { ARTICULOS, formatearFecha, getArticulo, type Bloque } from "@/lib/blog"
import { articuloSchema, grafo, migasSchema, preguntasSchema } from "@/lib/seo"

type Props = {
  params: Promise<{ slug: string }>
}

const SERIF = { fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }

export function generateStaticParams() {
  return ARTICULOS.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const a = getArticulo(slug)
  if (!a) return { title: "Artículo" }
  return {
    title: a.titulo,
    description: a.descripcion,
    alternates: { canonical: `/blog/${a.slug}` },
    openGraph: {
      type: "article",
      title: a.titulo,
      description: a.descripcion,
      url: `/blog/${a.slug}`,
      publishedTime: a.fecha,
      authors: ["Daliza Pastelería Fina"],
      images: [{ url: a.imagen, alt: a.imagenAlt }],
    },
    twitter: { card: "summary_large_image", title: a.titulo, description: a.descripcion, images: [a.imagen] },
  }
}

/** Convierte [texto](/ruta) en enlaces internos dentro de un párrafo. */
function Texto({ children }: { children: string }) {
  const partes = children.split(/(\[[^\]]+\]\([^)]+\))/g)
  return (
    <>
      {partes.map((parte, i) => {
        const m = parte.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
        if (!m) return parte
        return (
          <Link key={i} href={m[2]} className="font-medium text-primary underline underline-offset-4 hover:text-primary-hover">
            {m[1]}
          </Link>
        )
      })}
    </>
  )
}

function Bloques({ bloque }: { bloque: Bloque }) {
  switch (bloque.t) {
    case "h2":
      return (
        <h2 className="mt-12 text-balance text-2xl font-normal text-heading sm:text-3xl" style={SERIF}>
          {bloque.x}
        </h2>
      )
    case "p":
      return (
        <p className="mt-4 leading-relaxed text-foreground">
          <Texto>{bloque.x}</Texto>
        </p>
      )
    case "ul":
      return (
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-foreground marker:text-primary">
          {bloque.x.map((item) => (
            <li key={item}>
              <Texto>{item}</Texto>
            </li>
          ))}
        </ul>
      )
    case "ol":
      return (
        <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed text-foreground marker:font-semibold marker:text-primary">
          {bloque.x.map((item) => (
            <li key={item}>
              <Texto>{item}</Texto>
            </li>
          ))}
        </ol>
      )
    case "nota":
      return (
        <aside className="mt-6 rounded-xl border border-brand-gold/40 bg-card px-5 py-4 text-sm leading-relaxed text-muted-foreground">
          <Texto>{bloque.x}</Texto>
        </aside>
      )
  }
}

export default async function ArticuloPage({ params }: Props) {
  const { slug } = await params
  const a = getArticulo(slug)
  if (!a) notFound()

  const ruta = `/blog/${a.slug}`
  const siguientes = a.siguientes.map((s) => getArticulo(s)).filter((x) => x !== undefined)

  return (
    <LayoutShell>
      <JsonLd
        data={grafo(
          articuloSchema({
            titulo: a.titulo,
            descripcion: a.descripcion,
            ruta,
            imagen: a.imagen,
            fecha: a.fecha,
          }),
          preguntasSchema(a.faqs),
          migasSchema([
            { nombre: "Inicio", ruta: "/" },
            { nombre: "Blog", ruta: "/blog" },
            { nombre: a.titulo, ruta },
          ]),
        )}
      />

      <article className="bg-background px-5 pb-20 pt-32 sm:px-8 sm:pt-36 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <nav aria-label="Migas de pan" className="text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Inicio</Link>
            <span className="mx-2" aria-hidden>/</span>
            <Link href="/blog" className="hover:text-primary">Blog</Link>
          </nav>

          <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-primary/80">
            {a.categoria} · {a.lecturaMin} min de lectura
          </p>
          <h1 className="mt-2 text-balance text-4xl font-normal leading-tight text-heading sm:text-5xl" style={SERIF}>
            {a.titulo}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Por Daliza Pastelería Fina ·{" "}
            <time dateTime={a.fecha}>{formatearFecha(a.fecha)}</time>
          </p>

          <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl">
            <Image src={a.imagen} alt={a.imagenAlt} fill priority sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
          </div>

          <div className="mt-8 rounded-2xl border-l-4 border-primary bg-card px-6 py-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Respuesta rápida</p>
            <p className="mt-1.5 leading-relaxed text-foreground">{a.respuestaRapida}</p>
          </div>

          {a.cuerpo.map((bloque, i) => (
            <Bloques key={i} bloque={bloque} />
          ))}

          <h2 className="mt-14 text-balance text-2xl font-normal text-heading sm:text-3xl" style={SERIF}>
            Preguntas frecuentes
          </h2>
          <dl className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card px-6">
            {a.faqs.map((f) => (
              <div key={f.question} className="py-5">
                <dt className="font-semibold text-heading">{f.question}</dt>
                <dd className="mt-1.5 leading-relaxed text-muted-foreground">{f.answer}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 rounded-2xl bg-[#3A2620] px-6 py-8 text-center text-[#F3E9DC] sm:px-10">
            <p className="text-2xl font-normal" style={SERIF}>
              ¿Quieres cotizar tu pedido?
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#D8C7B8]">
              Escríbele a la sede Daliza más cercana en Bogotá y te confirmamos sabores, disponibilidad y valor.
            </p>
            <WhatsAppCTA
              mensaje={`Hola, leí el artículo "${a.titulo}" y quiero cotizar un pedido`}
              ruta={ruta}
              className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D64545] px-7 text-sm font-semibold text-white transition-colors hover:bg-[#E35252]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              Escribir por WhatsApp
            </WhatsAppCTA>
          </div>

          <h2 className="mt-14 text-xl font-normal text-heading" style={SERIF}>
            Te puede interesar
          </h2>
          <ul className="mt-3 space-y-2">
            {a.relacionados.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="inline-flex items-center gap-2 font-medium text-primary hover:underline">
                  <ArrowRight className="h-4 w-4" aria-hidden />
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>

          {siguientes.length ? (
            <>
              <h2 className="mt-12 text-xl font-normal text-heading" style={SERIF}>
                Sigue leyendo
              </h2>
              <ul className="mt-3 space-y-2">
                {siguientes.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/blog/${s.slug}`} className="text-foreground underline-offset-4 hover:text-primary hover:underline">
                      {s.titulo}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </article>
    </LayoutShell>
  )
}
