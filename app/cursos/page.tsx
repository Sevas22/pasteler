import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Cake } from "lucide-react"
import { LayoutShell } from "@/components/layout-shell"
import { RedesSociales } from "@/components/redes-sociales"
import { BRANDING } from "@/lib/branding"

export const metadata: Metadata = {
  title: "Cursos de pastelería, próximamente",
  description:
    "Muy pronto abriremos nuestros cursos de pastelería en Bogotá. Síguenos en redes y déjanos tus datos para avisarte cuando abran las inscripciones.",
  alternates: { canonical: "/cursos" },
}

const SERIF = { fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }

/** Fotos de la composición (productos reales de Daliza). */
const FOTOS = [
  {
    src: "/images/productos/torta-con-cheesecake-de-maracuya-torta-1.webp",
    alt: "Torta con cheesecake de maracuyá",
    clase: "left-[18%] top-[16%] z-20 h-[62%] w-[62%]",
  },
  {
    src: "/images/productos/tartaleta-de-frutas-2.webp",
    alt: "Tartaleta de frutas",
    clase: "left-0 bottom-[2%] z-30 h-[40%] w-[40%]",
  },
  {
    src: "/images/productos/cheesecake-de-mora-torta-1.webp",
    alt: "Cheesecake de mora",
    clase: "right-0 top-0 z-10 h-[44%] w-[44%]",
  },
] as const

export default function CursosPage() {
  return (
    <LayoutShell>
      <section
        data-no-section-divider
        className="relative isolate overflow-hidden bg-[#FBF4EA] px-5 pb-20 pt-32 sm:px-8 sm:pt-36 lg:flex lg:min-h-[100svh] lg:items-center lg:px-12 lg:pb-16 lg:pt-28"
      >
        {/* Luz cálida de fondo, como de cocina iluminada */}
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <div className="absolute -left-40 top-0 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(255,236,200,0.9),transparent_65%)]" />
          <div className="absolute -right-32 bottom-0 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(240,205,170,0.55),transparent_65%)]" />
          <div className="absolute left-1/2 top-1/3 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(244,210,205,0.45),transparent_70%)]" />
        </div>

        <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* Texto */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-4" aria-hidden>
              <span className="h-px w-10 bg-[#C9A96E] sm:w-14" />
              <Image src={BRANDING.logoPrincipal} alt="" width={140} height={70} className="h-14 w-auto sm:h-16" />
              <span className="h-px w-10 bg-[#C9A96E] sm:w-14" />
            </div>

            <h1 className="mt-6">
              <span
                className="block text-5xl font-normal italic leading-none text-[#B08A4A] sm:text-6xl lg:text-7xl"
                style={SERIF}
              >
                Próximamente
              </span>
              <span
                className="mt-2 block text-balance text-[2.6rem] font-normal leading-[1.05] text-[#3A1A14] sm:text-6xl lg:text-[4.1rem]"
                style={SERIF}
              >
                Cursos de Pastelería
              </span>
            </h1>

            <div className="mt-6 flex items-center gap-3 text-[#C9A96E]" aria-hidden>
              <span className="h-px w-20 bg-[#C9A96E]/70 sm:w-28" />
              <Cake className="h-5 w-5" strokeWidth={1.6} />
              <span className="h-px w-20 bg-[#C9A96E]/70 sm:w-28" />
            </div>

            <p className="mt-5 max-w-md text-base text-[#4A2A22] sm:text-lg">
              Síguenos en redes para estar atentos a la apertura.
            </p>

            <RedesSociales className="mt-5 justify-center" />

            <Link
              href="/contacto?formulario=curso#contacto"
              className="group mt-8 inline-flex min-h-14 items-center gap-3 rounded-full bg-[#9B1B3A] px-9 text-lg italic text-white shadow-[0_16px_34px_-14px_rgba(155,27,58,0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#86152F]"
              style={SERIF}
            >
              Inscripciones pronto
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
            <p className="mt-3 text-xs text-[#6B4A40]">Déjanos tus datos y te avisamos primero cuando abramos.</p>
          </div>

          {/* Composición de productos */}
          <div className="relative mx-auto aspect-square w-full max-w-[520px]">
            <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(255,240,215,0.95),rgba(251,244,234,0)_70%)]" aria-hidden />
            {FOTOS.map((f) => (
              <div
                key={f.src}
                className={`absolute overflow-hidden rounded-full border-[6px] border-white shadow-[0_28px_50px_-24px_rgba(90,40,20,0.55)] ${f.clase}`}
              >
                <Image src={f.src} alt={f.alt} fill sizes="(min-width: 1024px) 330px, 60vw" className="object-cover" />
              </div>
            ))}
            {/* Florecitas doradas */}
            {[
              "left-[6%] top-[10%]",
              "right-[8%] bottom-[18%]",
              "left-[46%] bottom-[0%]",
            ].map((pos) => (
              <svg key={pos} viewBox="0 0 20 20" className={`absolute h-5 w-5 text-[#C9A96E] ${pos}`} aria-hidden>
                {[0, 72, 144, 216, 288].map((a) => (
                  <ellipse key={a} cx="10" cy="6" rx="2.2" ry="3.6" fill="currentColor" opacity="0.75" transform={`rotate(${a} 10 10)`} />
                ))}
                <circle cx="10" cy="10" r="1.8" fill="#FFF6E6" />
              </svg>
            ))}
          </div>
        </div>
      </section>
    </LayoutShell>
  )
}
