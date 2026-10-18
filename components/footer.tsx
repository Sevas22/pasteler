import Image from "next/image"
import Link from "next/link"
import {
  ChevronRight,
  HelpCircle,
  House,
  Images,
  Mail,
  MapPin,
  Phone,
  Award,
  Store,
  CakeSlice,
  type LucideIcon,
} from "lucide-react"
import type { Location } from "@/lib/data/locations"
import { WhatsAppCTA } from "@/components/whatsapp-cta"
import { NEGOCIO } from "@/lib/seo"
import { RedesSociales } from "@/components/redes-sociales"
import { Corazon, Hoja } from "@/components/sedes-dalizas/decoraciones"

type FooterProps = {
  locations: Location[]
}

const SERIF = { fontFamily: "var(--font-serif), 'Playfair Display', Georgia, serif" }

/** Círculo dorado de los íconos de contacto. */
const CIRCULO =
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#D9B77D] to-[#B08A4A] text-white shadow-sm"

const ENLACES: { href: string; label: string; icono: LucideIcon }[] = [
  { href: "/", label: "Inicio", icono: House },
  { href: "/productos", label: "Nuestros productos", icono: CakeSlice },
  { href: "/#nosotros", label: "Sobre nosotros", icono: Award },
  { href: "/tiendas", label: "Nuestras sedes", icono: Store },
  { href: "/galeria", label: "Galería", icono: Images },
  { href: "/preguntas-frecuentes", label: "Preguntas frecuentes", icono: HelpCircle },
  { href: "/contacto", label: "Contáctanos", icono: Mail },
]

/** Enlaces de la franja vino inferior (solo páginas que existen). */
const ENLACES_FRANJA = [
  { href: "/preguntas-frecuentes", label: "Preguntas frecuentes" },
  { href: "/tiendas", label: "Nuestras sedes" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
]

/** Título de columna con la línea dorada y el corazón al centro. */
function TituloColumna({ children }: { children: string }) {
  return (
    <div className="flex flex-col items-center lg:items-start">
      <h2 className="text-3xl font-normal text-[#7A1A2A] sm:text-[2.1rem]" style={SERIF}>
        {children}
      </h2>
      <div className="mt-3 flex w-56 items-center gap-2" aria-hidden>
        <span className="h-px flex-1 bg-[#C9A96E]" />
        <svg viewBox="0 0 24 22" className="h-3 w-3 fill-[#C9A96E]">
          <path d="M12 21C11 19.6 1 13.5 1 7A5.6 5.6 0 0 1 12 4.6 5.6 5.6 0 0 1 23 7c0 6.5-10 12.6-11 14Z" />
        </svg>
        <span className="h-px flex-1 bg-[#C9A96E]" />
      </div>
    </div>
  )
}

/** Bocetos de fondo (cupcake, manga pastelera, batidor) en línea dorada muy tenue. */
function Bocetos() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      <svg viewBox="0 0 200 220" className="absolute -left-10 top-6 hidden w-64 opacity-[0.16] lg:block">
        <g fill="none" stroke="#B08A4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M40 120 L58 200 H142 L160 120 Z" />
          <path d="M62 122 L72 198 M88 122 L92 198 M112 122 L108 198 M138 122 L128 198" />
          <path d="M34 120 C30 96,52 86,64 92 C60 70,84 58,100 70 C116 58,140 70,136 92 C150 86,170 98,166 120 Z" />
          <path d="M104 64 C112 44,128 34,140 30" />
          <circle cx="104" cy="56" r="10" />
          <path d="M140 30 C150 18,166 18,176 26 C166 32,152 34,140 30 Z" />
        </g>
      </svg>
      <svg viewBox="0 0 200 220" className="absolute -right-6 top-4 hidden w-60 opacity-[0.16] lg:block">
        <g fill="none" stroke="#B08A4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M150 20 C176 40,182 84,160 110 L120 70 C130 46,136 28,150 20 Z" />
          <path d="M150 20 L120 70 M160 32 L132 76 M168 50 L142 88 M172 72 L150 98" />
          <path d="M120 70 L60 180" />
          <path d="M44 120 C40 100,60 92,70 98 C68 80,90 70,104 82 C116 72,136 84,132 102" />
          <path d="M40 122 L56 196 H120 L134 122 Z" />
        </g>
      </svg>
      <svg viewBox="0 0 120 220" className="absolute bottom-24 left-[28%] hidden w-24 rotate-[25deg] opacity-[0.14] xl:block">
        <g fill="none" stroke="#B08A4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M30 20 L90 20 L66 150 L54 150 Z" />
          <path d="M54 150 L60 190 L66 150" />
          <path d="M40 40 C56 52,72 44,84 34" />
        </g>
      </svg>
      <Corazon className="absolute left-[33%] top-[38%] hidden w-12 -rotate-12 opacity-30 lg:block" />
      <Corazon className="absolute right-[34%] top-[28%] hidden w-10 rotate-12 opacity-30 lg:block" />
      <Hoja className="absolute right-[30%] bottom-28 hidden w-8 rotate-[18deg] opacity-30 xl:block" />
    </div>
  )
}

function IconoWhatsApp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden>
      <path d="M16.04 3C8.86 3 3.02 8.83 3.02 16c0 2.3.6 4.53 1.74 6.5L3 29l6.68-1.75A13 13 0 0 0 16.04 29C23.2 29 29.04 23.17 29.04 16S23.2 3 16.04 3Zm0 23.67c-2 0-3.95-.54-5.65-1.55l-.4-.24-3.96 1.04 1.06-3.86-.26-.4a10.62 10.62 0 0 1-1.63-5.66c0-5.88 4.79-10.66 10.68-10.66 5.88 0 10.67 4.78 10.67 10.66 0 5.89-4.79 10.67-10.51 10.67Zm5.85-7.98c-.32-.16-1.89-.93-2.18-1.04-.3-.11-.5-.16-.72.16-.21.32-.83 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.6-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.72-1.73-.99-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66 0 1.57 1.14 3.08 1.3 3.3.16.21 2.25 3.43 5.45 4.81.76.33 1.36.53 1.82.67.77.24 1.46.21 2.01.13.61-.09 1.89-.77 2.15-1.52.27-.74.27-1.38.19-1.52-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  )
}

/** Adorno de las esquinas de la franja: línea con voluta y corazón. */
function Voluta({ className, espejo }: { className?: string; espejo?: boolean }) {
  return (
    <svg viewBox="0 0 380 30" className={className} style={espejo ? { transform: "scaleX(-1)" } : undefined} aria-hidden>
      <g fill="none" stroke="#C9A96E" strokeWidth="1.6" strokeLinecap="round">
        <path d="M0 15 H250" />
        <path d="M250 15 C262 15,268 24,262 27 C256 30,250 22,256 18" />
        <path d="M330 15 C318 15,312 24,318 27 C324 30,330 22,324 18" />
        <path d="M330 15 H380" />
      </g>
      <path d="M290 24C289 23 280 17.5 280 11.5A5 5 0 0 1 290 9.4 5 5 0 0 1 300 11.5c0 6-9 11.5-10 12.5Z" fill="#C9A96E" />
    </svg>
  )
}

export function Footer({ locations }: FooterProps) {
  // Un renglón por sede con sus números ("310 8527365 · 312 5169547" → dos enlaces); sin repetir números ya listados
  const vistos = new Set<string>()
  const telefonos = [...locations]
    .sort((a, b) => Number(b.isPrincipal) - Number(a.isPrincipal))
    .map((l) => ({
      sede: l.name,
      numeros: l.phone
        .split("·")
        .map((n) => n.trim())
        .filter((n) => n && !vistos.has(n.replace(/\D/g, "")) && vistos.add(n.replace(/\D/g, ""))),
    }))
    .filter((t) => t.numeros.length > 0)

  return (
    <footer className="relative isolate overflow-hidden bg-[#FBF6F0]">
      <Bocetos />

      {/* Parte crema: enlaces · logo · contacto */}
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-24 pt-16 sm:px-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-10 lg:px-12 lg:pb-28 lg:pt-20">
        {/* Logo (primero en móvil, al centro en escritorio) */}
        <Link href="/" className="order-first mx-auto block w-56 sm:w-64 lg:order-none lg:w-72" aria-label="Daliza Pastelería Fina, inicio">
          <Image
            src="/images/logo-dalizas-500.webp"
            alt="Daliza Pastelería Fina"
            width={500}
            height={500}
            sizes="(max-width: 1024px) 256px, 288px"
            className="h-auto w-full drop-shadow-[0_18px_30px_rgba(122,26,42,0.18)]"
          />
        </Link>

        {/* Enlaces rápidos */}
        <nav aria-label="Enlaces rápidos" className="lg:order-first lg:justify-self-start">
          <TituloColumna>Enlaces rápidos</TituloColumna>
          <ul className="mx-auto mt-6 grid w-fit grid-cols-1 gap-x-8 gap-y-3.5 sm:grid-cols-2 lg:mx-0 lg:grid-cols-1">
            {ENLACES.map(({ href, label, icono: Icono }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group flex items-center gap-3.5 text-lg text-[#5A2E2E] transition-colors hover:text-[#8B2E2E]"
                  style={SERIF}
                >
                  <Icono className="h-6 w-6 shrink-0 text-[#B08A4A] transition-transform group-hover:-translate-y-0.5" strokeWidth={1.6} aria-hidden />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contáctanos */}
        <div className="flex flex-col items-center lg:items-start lg:justify-self-end">
          <TituloColumna>Contáctanos</TituloColumna>
          <ul className="mt-6 flex flex-col gap-3.5">
            <li>
              <a href={`mailto:${NEGOCIO.email}`} className="flex items-center gap-3.5 text-[17px] text-[#5A2E2E] transition-colors hover:text-[#8B2E2E]" style={SERIF}>
                <span className={CIRCULO}>
                  <Mail className="h-4 w-4" aria-hidden />
                </span>
                {NEGOCIO.email}
              </a>
            </li>
            <li>
              <Link href="/tiendas" className="flex items-center gap-3.5 text-[17px] text-[#5A2E2E] transition-colors hover:text-[#8B2E2E]" style={SERIF}>
                <span className={CIRCULO}>
                  <MapPin className="h-4 w-4" aria-hidden />
                </span>
                Bosa, Bogotá · {locations.length} sedes
              </Link>
            </li>
            {/* Teléfonos de todas las sedes (las que comparten número salen una sola vez) */}
            <li className="flex items-start gap-3.5">
              <span className={CIRCULO}>
                <Phone className="h-4 w-4" aria-hidden />
              </span>
              <ul className="flex flex-col gap-1.5 pt-1.5">
                {telefonos.map(({ sede, numeros }) => (
                  <li key={sede} className="text-[15px] leading-snug text-[#5A2E2E]" style={SERIF}>
                    <span className="text-[#8B2E2E]">{sede}</span>
                    {numeros.map((n) => (
                      <span key={n}>
                        {" · "}
                        <a href={`tel:+57${n.replace(/\D/g, "")}`} className="whitespace-nowrap transition-colors hover:text-[#8B2E2E] hover:underline">
                          {n}
                        </a>
                      </span>
                    ))}
                  </li>
                ))}
              </ul>
            </li>
          </ul>

          <WhatsAppCTA
            mensaje="Hola, quiero hacer un pedido en Daliza Pastelería Fina"
            className="mt-7 inline-flex min-h-14 items-center gap-3 rounded-full border-2 border-[#C9A96E] bg-gradient-to-r from-[#7A1A2A] to-[#A51F31] px-7 text-lg text-white shadow-[0_14px_28px_-12px_rgba(122,26,42,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_32px_-12px_rgba(122,26,42,0.8)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A96E]"
          >
            <IconoWhatsApp className="h-7 w-7" />
            <span style={SERIF}>Haz tu pedido por WhatsApp</span>
            <ChevronRight className="h-5 w-5" aria-hidden />
          </WhatsAppCTA>

          <div className="mt-6 flex w-60 items-center gap-2" aria-hidden>
            <span className="h-px flex-1 bg-[#C9A96E]/70" />
            <svg viewBox="0 0 24 22" className="h-2.5 w-2.5 fill-[#C9A96E]">
              <path d="M12 21C11 19.6 1 13.5 1 7A5.6 5.6 0 0 1 12 4.6 5.6 5.6 0 0 1 23 7c0 6.5-10 12.6-11 14Z" />
            </svg>
            <span className="h-px flex-1 bg-[#C9A96E]/70" />
          </div>
          <RedesSociales className="mt-4" />
        </div>
      </div>

      {/* Franja vino inferior con ola y filo dorados */}
      <div className="relative bg-gradient-to-b from-[#7A1A2A] to-[#5E1220] text-[#F3E3C8]">
        <svg
          viewBox="0 0 1920 80"
          preserveAspectRatio="none"
          className="absolute -top-[59px] left-0 h-[60px] w-full"
          aria-hidden
        >
          <path d="M0 52 C320 6,640 70,960 38 C1280 6,1600 66,1920 22 L1920 80 L0 80 Z" fill="#7A1A2A" />
          <path d="M0 52 C320 6,640 70,960 38 C1280 6,1600 66,1920 22" fill="none" stroke="#C9A96E" strokeWidth="5" />
          <path d="M0 60 C320 14,640 78,960 46 C1280 14,1600 74,1920 30" fill="none" stroke="#E3C98F" strokeWidth="1.5" opacity="0.7" />
        </svg>

        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-4 px-5 py-8 text-center sm:px-8 lg:px-12">
          <Voluta className="absolute left-6 top-1/2 hidden w-72 -translate-y-1/2 xl:block" />
          <Voluta className="absolute right-6 top-1/2 hidden w-72 -translate-y-1/2 xl:block" espejo />

          <nav aria-label="Enlaces del pie de página">
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[15px]" style={SERIF}>
              {ENLACES_FRANJA.map((e, i) => (
                <li key={e.href} className="flex items-center gap-5">
                  {i > 0 ? <span className="hidden text-[#C9A96E] sm:inline" aria-hidden>|</span> : null}
                  <Link href={e.href} className="transition-colors hover:text-[#E3C98F]">
                    {e.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-sm text-[#D9B77D]" style={SERIF}>
            © {new Date().getFullYear()} Daliza Pastelería Fina. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
