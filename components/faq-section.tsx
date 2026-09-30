import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Reveal } from "@/components/motion/reveal"
import { FlourishDivider } from "@/components/ornaments/flourish-divider"

const faqs = [
  {
    question: "¿Con cuánta anticipación debo pedir mi torta?",
    answer:
      "Para tortas de celebración recomendamos al menos 3 a 5 días de anticipación, y 1 a 2 semanas para diseños personalizados o pedidos grandes. Escríbenos por WhatsApp para confirmar disponibilidad en tu fecha.",
  },
  {
    question: "¿Hacen envíos o solo se recoge en tienda?",
    answer:
      "Puedes recoger tu pedido en cualquiera de nuestras 4 sedes en Bogotá. Coordina con tu sede más cercana por WhatsApp si necesitas entrega.",
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
      "Nuestros cursos son presenciales, en grupos reducidos, con niveles desde principiante hasta especialidades avanzadas. Revisa el detalle de cada uno en la sección de Cursos o escríbenos para conocer las próximas fechas.",
  },
] as const

export function FaqSection() {
  return (
    <section data-no-section-divider className="bg-background py-16 sm:py-20 md:py-24">
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
