import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"
import { LayoutShell } from "@/components/layout-shell"
import { PageHero } from "@/components/page-hero"
import { JsonLd } from "@/components/json-ld"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { construirFaqs } from "@/lib/faqs"
import { getLocationsPublic } from "@/lib/data/locations"
import { BANNERS } from "@/lib/media"
import { grafo, migasSchema, preguntasSchema } from "@/lib/seo"
import { FondoMarca } from "@/components/ornaments/fondo-marca"

export const metadata: Metadata = {
  title: "Preguntas frecuentes: pedidos, sedes, horarios y tortas",
  description:
    "Resolvemos tus dudas sobre Daliza Pastelería Fina en Bosa, Bogotá: cómo pedir una torta personalizada, sedes y horarios, WhatsApp, porciones, precios y cómo conservar tu torta.",
  alternates: { canonical: "/preguntas-frecuentes" },
  openGraph: { type: "website", url: "/preguntas-frecuentes" },
}

const SERIF = { fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }

export default async function PreguntasFrecuentesPage() {
  const locations = await getLocationsPublic()
  const grupos = construirFaqs(locations)

  return (
    <LayoutShell>
      <JsonLd
        data={grafo(
          migasSchema([
            { nombre: "Inicio", ruta: "/" },
            { nombre: "Preguntas frecuentes", ruta: "/preguntas-frecuentes" },
          ]),
          preguntasSchema(grupos.flatMap((g) => g.preguntas)),
        )}
      />
      <PageHero
        src={BANNERS.paginas.preguntas}
        alt="Pastelería fina de Daliza en Bogotá"
        priority
        title={
          <>
            Preguntas <span className="italic text-[#E3C98F]">frecuentes.</span>
          </>
        }
        description="Todo lo que necesitas saber para pedir tu torta, encontrar tu sede y disfrutar tus postres."
      />

      <section data-no-section-divider className="relative isolate overflow-hidden bg-background px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <FondoMarca variante="suave" />
        <div className="mx-auto max-w-3xl">
          <nav aria-label="Temas" className="flex flex-wrap gap-2">
            {grupos.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="rounded-full border border-brand-gold/40 px-4 py-1.5 text-sm text-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                {g.titulo}
              </a>
            ))}
          </nav>

          {grupos.map((g) => (
            <div key={g.id} id={g.id} className="mt-12 scroll-mt-28">
              <h2 className="text-2xl font-normal text-heading sm:text-3xl" style={SERIF}>
                {g.titulo}
              </h2>
              <Accordion type="multiple" className="mt-5 rounded-2xl border border-brand-gold/25 bg-card px-6 shadow-sm">
                {g.preguntas.map((faq) => (
                  <AccordionItem key={faq.question} value={faq.question} className="border-brand-gold/15">
                    <AccordionTrigger className="font-serif text-base font-normal text-heading hover:no-underline sm:text-lg">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                      <p>{faq.answer}</p>
                      {faq.enlace ? (
                        <Link
                          href={faq.enlace.href}
                          className="mt-3 inline-flex items-center gap-1.5 font-medium text-primary underline-offset-4 hover:underline"
                        >
                          {faq.enlace.label}
                          <ArrowRight className="h-4 w-4" aria-hidden />
                        </Link>
                      ) : null}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          <div className="mt-16 rounded-2xl border border-border bg-card p-8 text-center">
            <p className="text-2xl font-normal text-heading" style={SERIF}>
              ¿No encontraste tu respuesta?
            </p>
            <p className="mt-2 text-sm text-muted-foreground">Escríbenos por WhatsApp a tu sede y te respondemos.</p>
            <Link
              href="/contacto"
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              Contactar a una sede
            </Link>
          </div>
        </div>
      </section>
    </LayoutShell>
  )
}
