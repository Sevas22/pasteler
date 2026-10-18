import Image from "next/image"
import { Croissant, GraduationCap, Handshake, ImagePlus, MapPin, PackageCheck } from "lucide-react"
import { cn } from "@/lib/utils"

const SERIF = { fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }

const PILARES = [
  {
    icono: Croissant,
    titulo: "Panadería, pastelería y repostería",
    texto: "Bajo un mismo techo: pan del día, tortas de celebración y postres de autor.",
  },
  {
    icono: ImagePlus,
    titulo: "Tortas con papel de azúcar",
    texto: "Llevamos tu diseño a la torta: personajes, fotos, logos o el mensaje que quieras.",
  },
  {
    icono: Handshake,
    titulo: "Asesoría y acompañamiento",
    texto: "Te guiamos para elegir diseño, sabor y tamaño según tu celebración.",
  },
  {
    icono: PackageCheck,
    titulo: "Entrega contigo",
    texto: "Entregamos tu torta contigo, para que confirmes que quedó como la pediste.",
  },
  {
    icono: MapPin,
    titulo: "Cuatro sedes en Bosa",
    texto: "Bosa Carbonell, Bosa Naranjos, Bosa Piamonte y Ciudadela Colsubsidio.",
  },
  {
    icono: GraduationCap,
    titulo: "Cursos de pastelería",
    texto: "Grupos reducidos para quienes quieren aprender el oficio desde cero.",
  },
] as const

/** Formas orgánicas (coordenadas 0–1, se adaptan al tamaño de cada foto). */
const FORMAS = {
  grande:
    "M0.52,0.015 C0.80,0.01 0.985,0.2 0.985,0.46 C0.985,0.74 0.83,0.975 0.55,0.988 C0.26,1.0 0.02,0.82 0.015,0.55 C0.01,0.27 0.22,0.02 0.52,0.015 Z",
  arriba:
    "M0.32,0.03 C0.6,-0.02 0.97,0.12 0.98,0.46 C0.99,0.8 0.72,0.985 0.43,0.965 C0.15,0.945 0.015,0.72 0.03,0.47 C0.045,0.22 0.13,0.07 0.32,0.03 Z",
  abajo:
    "M0.56,0.025 C0.86,0.06 0.99,0.33 0.97,0.59 C0.95,0.86 0.68,0.995 0.4,0.97 C0.12,0.945 0.0,0.7 0.04,0.44 C0.08,0.17 0.3,-0.005 0.56,0.025 Z",
} as const

const FOTOS = [
  {
    forma: "grande",
    src: "/images/productos/torta-con-cheesecake-de-maracuya-torta-1.webp",
    alt: "Torta con cheesecake de maracuyá Daliza",
    caja: "left-0 top-[6%] h-[86%] w-[63%] z-10",
    sizes: "(max-width: 1024px) 60vw, 330px",
  },
  {
    forma: "arriba",
    src: "/images/productos/brazo-de-reina.webp",
    alt: "Brazo de reina con fresas Daliza",
    caja: "left-[54%] top-0 h-[47%] w-[46%] z-20",
    sizes: "(max-width: 1024px) 45vw, 260px",
  },
  {
    forma: "abajo",
    src: "/images/productos/hojaldre-de-bocadillo-y-queso.webp",
    alt: "Hojaldres de bocadillo y queso Daliza",
    caja: "left-[49%] top-[51%] h-[48%] w-[49%] z-20",
    sizes: "(max-width: 1024px) 45vw, 270px",
  },
] as const

/** Ramita dorada decorativa. */
function Ramita({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 110" fill="none" className={cn("pointer-events-none absolute text-[#C9A96E]", className)} aria-hidden>
      <path d="M30 108 C29 80 31 52 36 26 C38 16 41 9 45 3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      {[
        [31, 86, -38],
        [31, 70, 40],
        [32, 55, -40],
        [34, 41, 38],
        [36, 29, -36],
      ].map(([x, y, r], i) => (
        <ellipse
          key={i}
          cx={x + (r > 0 ? 7 : -7)}
          cy={y}
          rx="7.5"
          ry="2.8"
          transform={`rotate(${r} ${x + (r > 0 ? 7 : -7)} ${y})`}
          stroke="currentColor"
          strokeWidth="0.9"
        />
      ))}
      {[
        [45, 4],
        [51, 13],
        [39, 12],
        [20, 20],
      ].map(([x, y], i) => (
        <g key={i} stroke="currentColor" strokeWidth="0.8">
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx={x} cy={y - 2.4} rx="1.5" ry="2.4" transform={`rotate(${a} ${x} ${y})`} />
          ))}
        </g>
      ))}
      <path d="M36 26 C30 22 25 21 20 20" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      {[
        [10, 40],
        [52, 60],
        [14, 64],
        [48, 30],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1" fill="currentColor" stroke="none" />
      ))}
    </svg>
  )
}

/** Sección de marca: lo que hace distinta a Daliza, con fotografía de producto. */
export function OficioPilares() {
  return (
    <section
      data-no-section-divider
      className="isolate relative overflow-hidden bg-[#FDF8F3] px-5 py-20 sm:px-8 lg:px-12 lg:py-24"
    >
      {/* Recortes de las fotos */}
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          {Object.entries(FORMAS).map(([id, d]) => (
            <clipPath key={id} id={`pilares-${id}`} clipPathUnits="objectBoundingBox">
              <path d={d} />
            </clipPath>
          ))}
        </defs>
      </svg>

      {/* Fondo: manchas rosadas suaves y líneas doradas */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute -left-32 top-[12%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(240,196,196,0.45),transparent_68%)]" />
        <div className="absolute -right-24 -top-24 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(244,210,205,0.5),transparent_70%)]" />
        <div className="absolute -bottom-40 right-[8%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(240,196,196,0.4),transparent_70%)]" />
        <svg viewBox="0 0 1600 900" preserveAspectRatio="none" className="absolute inset-0 h-full w-full text-[#C9A96E]">
          <path
            d="M-20 110 C 180 60, 300 160, 520 20"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="none"
            opacity="0.55"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M-20 700 C 160 760, 300 860, 620 830 C 900 800, 1050 920, 1620 760"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="none"
            opacity="0.5"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M1620 260 C 1520 340, 1560 470, 1450 520"
            stroke="currentColor"
            strokeWidth="1.1"
            fill="none"
            opacity="0.45"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        {/* Composición de fotos en formas orgánicas */}
        <div className="relative mx-auto aspect-[1/0.98] w-full max-w-[560px]">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute -inset-[4%] h-[108%] w-[108%] text-[#C9A96E]"
            aria-hidden
          >
            <path
              d="M6 62 C -2 30, 22 6, 50 6 C 70 6, 82 14, 92 4"
              stroke="currentColor"
              strokeWidth="0.35"
              fill="none"
              opacity="0.8"
            />
            <path d="M14 92 C 34 100, 60 96, 76 99" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.7" />
          </svg>

          <div className="absolute -left-[6%] top-[42%] h-[40%] w-[40%] rounded-full bg-[#F3C9C6]/60 blur-2xl" aria-hidden />

          {FOTOS.map((f) => (
            <div
              key={f.src}
              className={cn("group absolute drop-shadow-[0_22px_30px_rgba(122,26,42,0.18)]", f.caja)}
            >
              {/* Marco blanco con la misma forma */}
              <div className="absolute inset-0 bg-white" style={{ clipPath: `url(#pilares-${f.forma})` }} />
              <div className="absolute inset-[2.2%] overflow-hidden" style={{ clipPath: `url(#pilares-${f.forma})` }}>
                <Image
                  src={f.src}
                  alt={f.alt}
                  fill
                  sizes={f.sizes}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
              </div>
            </div>
          ))}

          <Ramita className="-left-[4%] top-[6%] w-[11%] -rotate-12" />
          <Ramita className="left-[60%] -top-[8%] w-[10%] rotate-[28deg]" />
          <Ramita className="-left-[2%] bottom-[2%] w-[10%] -rotate-[30deg]" />
          <Ramita className="-right-[4%] bottom-[12%] hidden w-[9%] rotate-[20deg] sm:block" />
        </div>

        <div className="relative">
          <Ramita className="-right-2 top-10 hidden w-12 rotate-[15deg] xl:block" />

          <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-primary">
            <span className="h-px w-10 bg-primary/60" aria-hidden />
            Lo que nos hace Daliza
          </p>
          <p
            className="mt-5 max-w-xl text-balance text-4xl font-normal leading-[1.05] text-[#2E1216] sm:text-5xl lg:text-[3.6rem]"
            style={SERIF}
          >
            Todo lo que somos, <span className="italic text-[#8B1C32]">en un mismo obrador.</span>
          </p>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5">
            {PILARES.map(({ icono: Icono, titulo, texto }, i) => (
              <li
                key={titulo}
                className="group relative flex items-center gap-4 rounded-[2rem] border border-white/80 bg-white/70 py-5 pl-5 pr-5 shadow-[0_18px_40px_-26px_rgba(122,26,42,0.35)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_24px_46px_-24px_rgba(122,26,42,0.4)]"
              >
                <span className="absolute -left-1 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#8B1C32] text-sm font-semibold text-white shadow-md ring-4 ring-[#FDF8F3]">
                  {i + 1}
                </span>
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#F8E4E1] text-[#8B1C32] transition-transform duration-300 group-hover:scale-105">
                  <Icono className="h-7 w-7" strokeWidth={1.5} aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="text-[1.05rem] font-normal leading-snug text-[#7A1A2A] sm:text-lg" style={SERIF}>
                    {titulo}
                  </h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{texto}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
