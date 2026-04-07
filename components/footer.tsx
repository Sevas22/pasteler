import Link from "next/link"
import { Facebook, Phone, MapPin, Heart } from "lucide-react"
import { BrandLogo } from "@/components/brand-logo"

export function Footer() {
  return (
    <footer className="bg-brand-chocolate text-brand-cream">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-10 text-center sm:text-left md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <div className="flex flex-col items-center md:items-start lg:col-span-1">
            <BrandLogo variant="footer" />
            <p className="mt-5 max-w-sm text-sm text-brand-cream/75 sm:mt-6">
              Pastelería fina y cursos en Bogotá. Tradición, sabor y enseñanza con pasión.
            </p>
          </div>

          <div className="md:text-left">
            <h3 className="mb-4 font-semibold text-brand-cream">Enlaces</h3>
            <ul className="mx-auto max-w-xs space-y-2 md:mx-0">
              <li>
                <Link
                  href="/"
                  className="inline-block text-sm text-brand-cream/70 transition-colors duration-200 hover:text-brand-gold"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/#nosotros" className="inline-block text-sm text-brand-cream/70 transition-colors duration-200 hover:text-brand-gold">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/productos" className="inline-block text-sm text-brand-cream/70 transition-colors duration-200 hover:text-brand-gold">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/galeria" className="inline-block text-sm text-brand-cream/70 transition-colors duration-200 hover:text-brand-gold">
                  Galería
                </Link>
              </li>
              <li>
                <Link href="/cursos" className="inline-block text-sm text-brand-cream/70 transition-colors duration-200 hover:text-brand-gold">
                  Cursos
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="inline-block text-sm text-brand-cream/70 transition-colors duration-200 hover:text-brand-gold">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:text-left">
            <h3 className="mb-4 font-semibold text-brand-cream">Sedes</h3>
            <ul className="mx-auto max-w-xs space-y-2 md:mx-0">
              <li className="flex items-start justify-center gap-2 text-sm text-brand-cream/70 md:justify-start">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                Bosa Carbonell (Principal)
              </li>
              <li className="flex items-start justify-center gap-2 text-sm text-brand-cream/70 md:justify-start">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                Bosa Naranjos
              </li>
              <li className="flex items-start justify-center gap-2 text-sm text-brand-cream/70 md:justify-start">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                Bosa Piamonte
              </li>
              <li className="flex items-start justify-center gap-2 text-sm text-brand-cream/70 md:justify-start">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                Ciudadela Colsubsidio
              </li>
            </ul>
          </div>

          <div className="md:text-left">
            <h3 className="mb-4 font-semibold text-brand-cream">Contacto</h3>
            <ul className="mx-auto max-w-xs space-y-3 md:mx-0">
              <li>
                <a
                  href="tel:+573108336425"
                  className="flex items-center justify-center gap-2 text-sm text-brand-cream/70 transition-colors duration-200 hover:text-brand-gold md:justify-start"
                >
                  <Phone className="h-4 w-4" />
                  310 833 6425
                </a>
              </li>
              <li>
                <a
                  href="tel:+573125169547"
                  className="flex items-center justify-center gap-2 text-sm text-brand-cream/70 transition-colors duration-200 hover:text-brand-gold md:justify-start"
                >
                  <Phone className="h-4 w-4" />
                  312 516 9547
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/PasteleriaDaliza"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-sm text-brand-cream/70 transition-colors duration-200 hover:text-brand-gold md:justify-start"
                >
                  <Facebook className="h-4 w-4" />
                  Pastelería Daliza
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-brand-gold/25 pt-8">
          <p className="text-center text-sm text-brand-cream/65">
            © {new Date().getFullYear()} Dalizas Pastelería Fina. Todos los derechos reservados.
          </p>
          <p className="mt-2 text-center text-xs text-brand-cream/45 flex items-center justify-center gap-1">
            Hecho con <Heart className="h-3 w-3 text-brand-cherry fill-brand-cherry" /> en
            Bogotá, Colombia
          </p>
        </div>
      </div>
    </footer>
  )
}
