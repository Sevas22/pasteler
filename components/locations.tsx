"use client"

import { MapPin, Phone, Clock, Navigation, MessageCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { locations } from "@/lib/data/locations"

export function Locations() {
  return (
    <section id="sedes" className="relative overflow-hidden bg-background py-16 sm:py-20 md:py-24">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold/40 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl px-1 text-center sm:px-0">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Nuestras sedes
          </p>
          <h2 className="mt-2 text-balance font-serif text-3xl font-normal text-heading sm:text-4xl md:text-5xl">
            4 ubicaciones en Bogotá
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
            Encuéntranos en Bosa y Ciudadela Colsubsidio. Detalle de direcciones y teléfonos en{" "}
            <Link href="/contacto" className="font-medium text-primary underline-offset-4 hover:underline">
              Contacto
            </Link>
            .
          </p>
          <div className="mt-6">
            <Button asChild>
              <Link href="/contacto#mapa-contacto">
                Ver mapa de sedes
                <MapPin className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 grid gap-5 sm:mt-14 sm:gap-6 md:mt-16 md:grid-cols-2 lg:grid-cols-4">
          {locations.map((location) => (
            <Card
              key={location.name}
              className={`group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                location.isPrincipal
                  ? "bg-primary text-primary-foreground ring-2 ring-brand-gold/50"
                  : "bg-card border-border hover:border-primary/35"
              }`}
            >
              {location.isPrincipal && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                  PRINCIPAL
                </div>
              )}
              <CardContent className="p-6">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                    location.isPrincipal ? "bg-primary-foreground/20" : "bg-primary/10"
                  }`}
                >
                  <MapPin
                    className={`h-6 w-6 ${location.isPrincipal ? "text-primary-foreground" : "text-primary"}`}
                  />
                </div>

                <h3
                  className={`font-serif text-xl font-normal ${
                    location.isPrincipal ? "text-primary-foreground" : "text-heading"
                  }`}
                >
                  {location.name}
                </h3>
                <p
                  className={`text-sm ${location.isPrincipal ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                >
                  {location.type}
                </p>

                <div className="mt-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <Navigation
                      className={`h-4 w-4 mt-0.5 flex-shrink-0 ${location.isPrincipal ? "text-brand-gold" : "text-primary"}`}
                    />
                    <span
                      className={`text-sm ${location.isPrincipal ? "text-primary-foreground/90" : "text-foreground"}`}
                    >
                      {location.address}
                    </span>
                  </div>

                  {location.phone ? (
                    <div className="flex items-center gap-3">
                      <Phone
                        className={`h-4 w-4 flex-shrink-0 ${location.isPrincipal ? "text-brand-gold" : "text-primary"}`}
                      />
                      <a
                        href={`tel:+57${location.phone.replace(/\s/g, "")}`}
                        className={`text-sm font-medium hover:underline ${location.isPrincipal ? "text-primary-foreground" : "text-foreground"}`}
                      >
                        {location.phone}
                      </a>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Teléfono: ver sede principal</p>
                  )}

                  <div className="flex items-start gap-3">
                    <Clock
                      className={`h-4 w-4 mt-0.5 flex-shrink-0 ${location.isPrincipal ? "text-brand-gold" : "text-primary"}`}
                    />
                    <span
                      className={`text-sm ${location.isPrincipal ? "text-primary-foreground/90" : "text-muted-foreground"}`}
                    >
                      {location.hours}
                    </span>
                  </div>
                </div>

                {location.phone ? (
                  <Button
                    asChild
                    className={`w-full mt-6 ${
                      location.isPrincipal
                        ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                        : "bg-primary text-primary-foreground hover:bg-primary-hover"
                    }`}
                  >
                    <a
                      href={`https://wa.me/57${location.phone.replace(/\s/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      WhatsApp
                    </a>
                  </Button>
                ) : (
                  <Button asChild className="w-full mt-6 bg-primary text-primary-foreground">
                    <Link href="/contacto">Ver contacto</Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-brand-gold/35 bg-primary/[0.07] p-6 text-center sm:mt-14 sm:p-8 md:mt-16 md:p-12">
          <h3 className="font-serif text-2xl font-normal text-heading md:text-3xl">
            ¿Necesitas más información?
          </h3>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Visítanos o escríbenos. También puedes seguirnos en Facebook como Pastelería Daliza.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <a href="https://wa.me/573108336425" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp principal
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary-hover hover:text-primary-foreground"
            >
              <a href="https://www.facebook.com/PasteleriaDaliza" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
