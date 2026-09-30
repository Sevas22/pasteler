"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MessageCircleMore, Phone, MapPin, Clock, Facebook, MessageCircle } from "lucide-react"
import type { Location } from "@/lib/data/locations"
import type { Course } from "@/lib/data/courses"
import { SoftCircle } from "@/components/ornaments/soft-circle"

type ContactProps = {
  locations: Location[]
  courses: Course[]
}

export function Contact({ locations, courses }: ContactProps) {
  const principal = locations.find((l) => l.isPrincipal) ?? locations[0]
  const contactInfo = [
    {
      icon: Phone,
      title: "Teléfonos",
      details: locations
        .filter((l) => l.phone)
        .map((l) => `${l.phone}${l.isPrincipal ? " (Principal)" : ""}`),
    },
    {
      icon: MapPin,
      title: "Ubicaciones",
      details: locations.map((l) => `${l.name}${l.isPrincipal ? " (Principal)" : ""}`),
    },
    {
      icon: Clock,
      title: "Horario",
      details: principal?.hours ? principal.hours.split(": ") : ["Lunes a Sábado", "8:00 AM - 7:00 PM"],
    },
    {
      icon: Facebook,
      title: "Redes sociales",
      details: ["@PasteleriaDaliza"],
    },
  ]

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    course: "",
    message: "",
  })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const servicio = params.get("servicio")
    const curso = params.get("curso")
    const ref = servicio ?? curso
    if (!ref) return
    setFormData((prev) => (prev.message.trim() ? prev : { ...prev, message: `Me interesa información sobre: ${ref}` }))
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const cursoLabel = courses.find((c) => c.slug === formData.course)?.title
    const lines = [
      `Hola, soy ${formData.name || "un cliente"}.`,
      cursoLabel ? `Me interesa el curso: ${cursoLabel}.` : "",
      formData.message ? formData.message : "",
      formData.phone ? `Mi teléfono de contacto: ${formData.phone}.` : "",
    ].filter(Boolean)

    const waNumber = principal?.whatsapp || "573108336425"
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(lines.join("\n\n"))}`
    window.open(waUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <section id="contacto" data-no-section-divider className="relative overflow-hidden bg-background px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <SoftCircle color="gold" size={300} className="-left-24 top-10" />

      <div className="relative mx-auto max-w-6xl">
        <p
          className="max-w-lg text-balance text-3xl font-normal leading-tight text-heading sm:text-4xl"
          style={{ fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }}
        >
          Cuéntanos tu <span className="italic text-primary">idea.</span>
        </p>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
          Completa lo que sepas — al enviar, abrimos WhatsApp con tu mensaje ya redactado, listo para
          confirmar con tu sede.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">Nombre completo</Label>
                <Input
                  id="name"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="rounded-[3px] border-border bg-card focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground">Teléfono / WhatsApp</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="300 123 4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="rounded-[3px] border-border bg-card focus:border-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="course" className="text-foreground">Curso de interés (opcional)</Label>
              <select
                id="course"
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                className="w-full rounded-[3px] border border-border bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">Selecciona un curso (si aplica)</option>
                {courses.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.title}
                  </option>
                ))}
                <option value="otro">Otro / Información general</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-foreground">Tu mensaje</Label>
              <Textarea
                id="message"
                placeholder="Torta para 20 personas, sabor chocolate, para el 15 de octubre…"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="resize-none rounded-[3px] border-border bg-card focus:border-primary"
              />
            </div>

            <button
              type="submit"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              <MessageCircleMore className="h-4 w-4" aria-hidden />
              Preparar mensaje de WhatsApp
            </button>
            <p className="text-xs text-muted-foreground">
              Sabores, disponibilidad y valor se confirman directamente con Daliza por WhatsApp.
            </p>
          </form>

          <div>
            <div className="flex flex-col gap-3 border-b border-border/70 pb-8">
              <a
                href={`https://wa.me/${principal?.whatsapp || "573108336425"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                WhatsApp: {principal?.phone || "310 833 6425"}
              </a>
              <a
                href="https://www.facebook.com/PasteleriaDaliza"
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
