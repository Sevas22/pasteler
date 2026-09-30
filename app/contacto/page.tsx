import type { Metadata } from "next"
import { LayoutShell } from "@/components/layout-shell"
import { ContactoHero } from "@/components/contacto-hero"
import { Contact } from "@/components/contact"
import { FaqSection } from "@/components/faq-section"
import { getLocations } from "@/lib/data/locations"
import { getCourses } from "@/lib/data/courses"

export const metadata: Metadata = {
  title: "Contacto y sedes | Dalizas Pastelería Fina",
  description:
    "Sedes en Bogotá: Bosa Carbonell, Bosa Naranjos, Bosa Piamonte y Ciudadela Colsubsidio. WhatsApp, formulario y Facebook.",
}

export default async function ContactoPage() {
  const [locations, courses] = await Promise.all([getLocations(), getCourses()])
  return (
    <LayoutShell>
      <ContactoHero locations={locations} />
      <Contact locations={locations} courses={courses} />
      <FaqSection />
    </LayoutShell>
  )
}
