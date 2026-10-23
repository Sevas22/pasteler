import { NEGOCIO } from "@/lib/seo"
import { Phone, MapPin, Clock, Facebook, MessageCircle } from "lucide-react"
import type { Location } from "@/lib/data/locations"
import type { Course } from "@/lib/data/courses"
import { SoftCircle } from "@/components/ornaments/soft-circle"
import { WhatsAppCTA } from "@/components/whatsapp-cta"
import { FondoMarca } from "@/components/ornaments/fondo-marca"
import { FormulariosSolicitud } from "@/components/formularios-solicitud"
import { telefonosPorSede } from "@/lib/telefonos"

type ContactProps = {
  locations: Location[]
  courses: Course[]
}

export function Contact({ locations, courses }: ContactProps) {
  const principal = locations.find((l) => l.isPrincipal) ?? locations[0]
  // Horario común (el de la sede principal) y, aparte, las sedes que tienen uno distinto.
  const horarios = [
    ...(principal?.hours ? principal.hours.split(/\s*·\s*/).filter(Boolean) : []),
    ...locations
      .filter((l) => l.hours && l.hours !== principal?.hours)
      .map((l) => `${l.name}: ${l.hours.split(/\s*·\s*/).filter(Boolean).join(" · ")}`),
  ]
  const contactInfo = [
    {
      icon: Phone,
      title: "Teléfonos",
      details: telefonosPorSede(locations).map(({ sede, numeros }) => `${sede}: ${numeros.join(" · ")}`),
    },
    {
      icon: MapPin,
      title: "Ubicaciones",
      details: locations.map((l) => `${l.name}${l.isPrincipal ? " (Principal)" : ""}`),
    },
    {
      icon: Clock,
      title: "Horario",
      details: horarios,
    },
    {
      icon: Facebook,
      title: "Redes sociales",
      details: ["Facebook: Dalizas"],
    },
  ]

  return (
    <section id="contacto" data-no-section-divider className="isolate relative overflow-hidden bg-background px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <FondoMarca variante="lateral" />
      <SoftCircle color="gold" size={300} className="-left-24 top-10" />

      <div className="relative mx-auto max-w-6xl">
        <p
          className="max-w-lg text-balance text-3xl font-normal leading-tight text-heading sm:text-4xl"
          style={{ fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }}
        >
          Cuéntanos tu <span className="italic text-primary">idea.</span>
        </p>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
          Elige si quieres cotizar, pedir información de cursos o dejarnos una PQRS. Recibimos tus datos y te
          contactamos — y si prefieres algo inmediato, escríbenos por WhatsApp.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <FormulariosSolicitud locations={locations} courses={courses} />

          <div>
            <div className="flex flex-col gap-3 border-b border-border/70 pb-8">
              <WhatsAppCTA
                mensaje="Hola, quiero información"
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                Escribir por WhatsApp
              </WhatsAppCTA>
              <a
                href={NEGOCIO.redes.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-border px-6 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Facebook className="h-4 w-4" aria-hidden />
                Facebook: Pastelería Daliza
              </a>
            </div>

            <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {contactInfo.map((info) => (
                <div key={info.title}>
                  <div className="flex items-center gap-2.5">
                    <info.icon className="h-4 w-4 text-primary" aria-hidden />
                    <h4 className="text-sm font-semibold text-heading">{info.title}</h4>
                  </div>
                  <div className="mt-1.5 space-y-0.5">
                    {info.details.map((detail) => (
                      <p key={detail} className="text-sm text-muted-foreground">{detail}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
