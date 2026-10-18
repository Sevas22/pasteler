import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Reveal } from "@/components/motion/reveal"
import { FlourishDivider } from "@/components/ornaments/flourish-divider"
import { FAQS_DESTACADAS as faqs } from "@/lib/faqs"
import { FondoMarca } from "@/components/ornaments/fondo-marca"

/** Selección corta de preguntas. El listado completo (y su JSON-LD FAQPage) vive en /preguntas-frecuentes. */
export function FaqSection() {
  return (
    <section data-no-section-divider className="relative isolate overflow-hidden bg-background py-16 sm:py-20 md:py-24">
      <FondoMarca variante="abajo" />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Preguntas frecuentes</p>
            <p
              className="mt-2 text-balance text-3xl font-normal text-heading sm:text-4xl"
              style={{ fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }}
            >
              ¿Tienes dudas?
            </p>
            <FlourishDivider className="mt-4" />
          </div>

          <Accordion type="single" collapsible className="mt-10 rounded-2xl border border-brand-gold/25 bg-card px-6 shadow-sm">
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question} className="border-brand-gold/15">
                <AccordionTrigger className="font-serif text-base font-normal text-heading hover:no-underline sm:text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 text-center">
            <Link
              href="/preguntas-frecuentes"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Ver todas las preguntas frecuentes
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
