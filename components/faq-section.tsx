import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Reveal } from "@/components/motion/reveal"
import { FlourishDivider } from "@/components/ornaments/flourish-divider"
import { JsonLd } from "@/components/json-ld"
import { grafo, preguntasSchema } from "@/lib/seo"

export const faqs = [
  {
    question: "¿Con cuánta anticipación debo pedir mi torta?",
    answer:
      "Entre más pronto nos escribas, mejor: los diseños personalizados, las tortas con papel de azúcar y los pedidos grandes necesitan más tiempo de preparación. Escríbenos por WhatsApp a tu sede, cuéntanos la fecha y te confirmamos disponibilidad.",
  },
  {
    question: "¿Hacen envíos o solo se recoge en tienda?",
    answer:
      "Puedes recoger tu pedido en cualquiera de nuestras sedes en Bogotá (Bosa y Ciudadela Colsubsidio). Coordina con tu sede más cercana por WhatsApp si necesitas que te lo entreguemos.",
  },
  {
    question: "¿Puedo personalizar sabor, tamaño o decoración?",
    answer:
      "Sí — la mayoría de nuestras creaciones se pueden ajustar en tamaño y decoración. Cuéntanos tu idea por WhatsApp y te confirmamos opciones y valor.",
  },
  {
    question: "¿Manejan productos para alergias o dietas especiales?",
    answer:
      "Consulta con tu sede sobre alérgenos o ingredientes específicos antes de confirmar tu pedido — cada creación puede variar en composición.",
  },
  {
    question: "¿Cómo funcionan los cursos de pastelería?",
    answer:
      "Estamos definiendo la nueva programación de cursos de pastelería. Escríbenos por WhatsApp y te avisamos apenas abramos inscripciones.",
  },
] as const

export function FaqSection() {
  return (
    <section data-no-section-divider className="bg-background py-16 sm:py-20 md:py-24">
      <JsonLd data={grafo(preguntasSchema(faqs))} />
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
        </Reveal>
      </div>
    </section>
  )
}
