import Link from "next/link"
import { Facebook, Phone } from "lucide-react"
import { BrandLogo } from "@/components/brand-logo"
import { SoftCircle } from "@/components/ornaments/soft-circle"
import type { Location } from "@/lib/data/locations"

type FooterProps = {
  locations: Location[]
}

const ENLACES = [
  { href: "/", label: "Inicio" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/productos", label: "Productos" },
  { href: "/cursos", label: "Cursos" },
  { href: "/tiendas", label: "Tiendas" },
  { href: "/galeria", label: "Galería" },
  { href: "/contacto", label: "Contacto" },
] as const

export function Footer({ locations }: FooterProps) {
  return (
    <footer className="relative overflow-hidden bg-[#3A2620] pb-20 text-[#F3E9DC] sm:pb-16">
      <SoftCircle color="gold" size={360} className="-right-32 -top-32" />
      <SoftCircle color="cherry" size={240} className="-left-20 bottom-0" />

      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <BrandLogo variant="footer" className="mx-0" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#D8C7B8]">
              Pastelería fina y cursos en Bosa, Bogotá. Tradición, sabor y enseñanza con pasión.
            </p>
            <a
              href="https://www.facebook.com/PasteleriaDaliza"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm text-[#D8C7B8] transition-colors hover:text-[#C9A96E]"
            >
              <Facebook className="h-4 w-4" aria-hidden />
              Pastelería Daliza
            </a>
          </div>

          <div>
            <h3
              className="text-lg font-normal text-[#F3E9DC]"
              style={{ fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }}
            >
              Enlaces
            </h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-1">
              {ENLACES.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#D8C7B8] transition-colors hover:text-[#C9A96E]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              className="text-lg font-normal text-[#F3E9DC]"
              style={{ fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }}
            >
              Sedes
            </h3>
            <ul className="mt-5 flex flex-col gap-4">
              {locations.map((location) => (
                <li key={location.id}>
                  <Link
                    href={`/tiendas/${location.slug}`}
                    className="text-sm text-[#D8C7B8] transition-colors hover:text-[#C9A96E]"
                  >
                    {location.name}
                    {location.isPrincipal ? <span className="text-[#C9A96E]"> · Principal</span> : null}
                  </Link>
                  {location.phone ? (
                    <a
                      href={`tel:+57${location.phone.replace(/\s/g, "")}`}
                      className="mt-0.5 flex items-center gap-1.5 text-xs text-[#D8C7B8]/70 transition-colors hover:text-[#C9A96E]"
                    >
                      <Phone className="h-3 w-3" aria-hidden />
                      {location.phone}
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-center sm:text-left">
          <p className="text-sm text-[#D8C7B8]/70">
            © {new Date().getFullYear()} Dalizas Pastelería Fina. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
