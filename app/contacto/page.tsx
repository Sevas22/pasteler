import type { Metadata } from "next"
import { LayoutShell } from "@/components/layout-shell"
import { ContactoHero } from "@/components/contacto-hero"
import { Contact } from "@/components/contact"

export const metadata: Metadata = {
  title: "Contacto y sedes | Dalizas Pastelería Fina",
  description:
    "Cuatro sedes en Bogotá: Bosa Carbonell, Bosa Naranjos, Bosa Piamonte y Ciudadela Colsubsidio. WhatsApp, formulario y Facebook.",
}

export default function ContactoPage() {
  return (
    <LayoutShell>
      <ContactoHero />
      <Contact />
    </LayoutShell>
  )
}
