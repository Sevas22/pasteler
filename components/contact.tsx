"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send, Phone, MapPin, Clock, Facebook, MessageCircle, CheckCircle } from "lucide-react"

const contactInfo = [
  {
    icon: Phone,
    title: "Teléfonos",
    details: ["310 833 6425 (Principal)", "312 516 9547", "322 394 0849"]
  },
  {
    icon: MapPin,
    title: "Ubicaciones",
    details: ["Bosa Carbonell (Principal)", "Bosa Naranjos", "Bosa Piamonte", "Ciudadela Colsubsidio"]
  },
  {
    icon: Clock,
    title: "Horario",
    details: ["Lunes a Sábado", "8:00 AM - 7:00 PM"]
  },
  {
    icon: Facebook,
    title: "Redes Sociales",
    details: ["@PasteleriaDaliza"]
  }
]

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    course: "",
    message: ""
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const servicio = params.get("servicio")
    const curso = params.get("curso")
    const ref = servicio ?? curso
    if (!ref) return
    const line = `Me interesa información sobre: ${ref}`
    setFormData((prev) =>
      prev.message.trim() ? prev : { ...prev, message: `${line}\n\n` },
    )
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
    setFormData({ name: "", phone: "", email: "", course: "", message: "" })
  }

  return (
    <section id="contacto" className="py-24 bg-primary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-primary-foreground rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-foreground/90">
            Contáctanos
          </p>
          <h2 className="mt-2 font-serif text-4xl md:text-5xl font-normal text-primary-foreground text-balance">
            ¡Comienza Tu Aventura Dulce!
          </h2>
          <p className="mt-6 text-lg text-primary-foreground/80">
            ¿Listo para aprender el arte de la pastelería? Déjanos tus datos y te contactaremos pronto.
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="bg-card rounded-2xl p-8 md:p-10 shadow-2xl">
            <h3 className="mb-6 font-serif text-2xl font-normal text-heading">Solicita Información</h3>
            
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-leaf/15">
                  <CheckCircle className="h-8 w-8 text-brand-leaf" />
                </div>
                <h4 className="font-serif text-xl font-normal text-heading">¡Mensaje Enviado!</h4>
                <p className="mt-2 text-muted-foreground">Te contactaremos muy pronto.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">Nombre completo</Label>
                    <Input
                      id="name"
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-secondary border-border focus:border-accent"
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
                      required
                      className="bg-secondary border-border focus:border-accent"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-secondary border-border focus:border-accent"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="course" className="text-foreground">Curso de interés</Label>
                  <select
                    id="course"
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full rounded-md border border-border bg-secondary px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  >
                    <option value="">Selecciona un curso</option>
                    <option value="basico">Curso Básico de Pastelería</option>
                    <option value="avanzado">Decoración Avanzada de Tortas</option>
                    <option value="frances">Especialidades Francesas</option>
                    <option value="otro">Otro / Información general</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground">Mensaje (opcional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Cuéntanos qué te gustaría aprender..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-secondary border-border focus:border-accent resize-none"
                  />
                </div>

                <Button type="submit" className="w-full py-6 text-base">
                  <Send className="mr-2 h-5 w-5" />
                  Enviar Solicitud
                </Button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Quick contact buttons */}
            <div className="bg-primary-foreground/10 rounded-2xl p-8 backdrop-blur-sm border border-primary-foreground/20">
              <h3 className="font-serif text-2xl font-normal text-primary-foreground mb-6">
                Contacto Directo
              </h3>
              <p className="text-primary-foreground/80 mb-6">
                ¿Prefieres contactarnos directamente? ¡Escríbenos o llámanos!
              </p>
              <div className="flex flex-col gap-4">
                <Button
                  asChild
                  size="lg"
                  className="justify-start bg-brand-leaf text-white hover:opacity-90"
                >
                  <a href="https://wa.me/573108336425" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-3 h-5 w-5" />
                    WhatsApp: 310 833 6425
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="justify-start border-primary-foreground/35 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20"
                >
                  <a href="https://www.facebook.com/PasteleriaDaliza" target="_blank" rel="noopener noreferrer">
                    <Facebook className="mr-3 h-5 w-5" />
                    Facebook: Pastelería Daliza
                  </a>
                </Button>
              </div>
            </div>

            {/* Info cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              {contactInfo.map((info) => (
                <div 
                  key={info.title}
                  className="bg-primary-foreground/5 rounded-xl p-6 border border-primary-foreground/10"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/20">
                      <info.icon className="h-5 w-5 text-accent" />
                    </div>
                    <h4 className="font-semibold text-primary-foreground">{info.title}</h4>
                  </div>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-sm text-primary-foreground/70">{detail}</p>
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
