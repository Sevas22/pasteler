import { LayoutShell } from "@/components/layout-shell"
import { Hero } from "@/components/hero"
import { HomeFeatureGrid } from "@/components/home-feature-grid"
import { About } from "@/components/about"
import { ProductosTeaser } from "@/components/productos-teaser"
import { Courses } from "@/components/courses"
import { Locations } from "@/components/locations"
import { CtaContactStrip } from "@/components/cta-contact-strip"

export default function HomePage() {
  return (
    <LayoutShell>
      <Hero />
      <HomeFeatureGrid />
      <About />
      <ProductosTeaser />
      <Courses />
      <Locations />
      <CtaContactStrip />
    </LayoutShell>
  )
}
