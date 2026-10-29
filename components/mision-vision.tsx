import Image from "next/image"
import { Award, Lightbulb, Star, Store, TrendingUp, Users, type LucideIcon } from "lucide-react"
import { FlourishDivider } from "@/components/ornaments/flourish-divider"
import { SoftCircle } from "@/components/ornaments/soft-circle"
import { Reveal } from "@/components/motion/reveal"
import { cn } from "@/lib/utils"
import { FondoMarca } from "@/components/ornaments/fondo-marca"

const SERIF = { fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }

type Bloque = {
  etiqueta: string
  titulo: string
  texto: string
  pilares: { icono: LucideIcon; texto: string }[]
  imagen: { src: string; alt: string; encuadre: string }
  /** Lado de la foto en pantallas grandes (en móvil la foto va siempre arriba). */
  fotoA: "izquierda" | "derecha"
}

/** Misión y visión oficiales de Daliza. Para cambiar textos o fotos, edítalos aquí. */
const BLOQUES: Bloque[] = [
  {
    etiqueta: "Nuestra misión",
    titulo: "Misión",
    texto:
      "La pastelería Daliza será la organización líder en producción y comercialización de productos de repostería y pasteles de excelente calidad, ofreciendo variedad, confiabilidad y calidad al cliente; promoviendo el desarrollo de nuestro personal para poder atraer nuevos clientes, logrando así crecimiento y rentabilidad de nuestro negocio y ofrecer día a día la mejor atención a nuestra clientela.",
    pilares: [
      { icono: Award, texto: "Excelente calidad" },
      { icono: Users, texto: "Nuestro personal" },
      { icono: TrendingUp, texto: "Crecimiento y rentabilidad" },
    ],
    imagen: {
      src: "/images/banners/mision-torta-milkiway.webp",
      alt: "Torta Milkiway de Daliza con crema batida, chocolate y fresas",
      encuadre: "50% 50%",
    },
    fotoA: "derecha",
  },
  {
    etiqueta: "Nuestra visión",
    titulo: "Visión",
    texto:
      "Daliza será la mejor opción en tortas y ponqués, innovando continuamente los sabores, diseños y decoraciones, para satisfacer a nuestros clientes y crecer con muchos más objetivos de preferencia, rentabilidad y crecimiento, con un claro compromiso de mejoramiento continuo en toda nuestra actividad. Queremos ser una pastelería posicionada, con nuevas sucursales para dar a conocer nuestros productos en Bogotá y ofrecer más variedad.",
    pilares: [
      { icono: Lightbulb, texto: "Innovación constante" },
      { icono: Star, texto: "Satisfacción de clientes" },
      { icono: Store, texto: "Más variedad" },
    ],
    imagen: {
      src: "/images/banners/vision-torta-65.webp",
      alt: "Torta de dos pisos de Daliza decorada con rosas rojas, esferas doradas y el número 65",
      encuadre: "50% 50%",
    },
    fotoA: "izquierda",
  },
]

function Foto({ imagen }: { imagen: Bloque["imagen"] }) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-[0_30px_60px_-25px_rgba(58,38,32,0.45)] lg:aspect-[4/5]">
      <Image
        src={imagen.src}
        alt={imagen.alt}
        fill
        className="object-cover transition-transform duration-[1.2s] ease-out hover:scale-[1.04]"
        style={{ objectPosition: imagen.encuadre }}
        sizes="(max-width: 1024px) 100vw, 480px"
      />
    </div>
  )
}

function Texto({ bloque }: { bloque: Bloque }) {
  return (
    <div>
      <p className="flex items-center gap-3 text-sm font-medium uppercase tracking-wide text-primary/80">
        {bloque.etiqueta}
        <span className="h-px w-12 bg-primary/40" aria-hidden />
      </p>
      <h2 className="mt-2 text-5xl font-normal leading-none text-heading sm:text-6xl" style={SERIF}>
        {bloque.titulo}
      </h2>
      <FlourishDivider className="mt-4 justify-start" />
      <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">{bloque.texto}</p>

      <ul className="mt-8 grid max-w-xl grid-cols-3 gap-3 sm:gap-6">
        {bloque.pilares.map(({ icono: Icono, texto }) => (
          <li key={texto} className="group flex flex-col items-center text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-brand-gold/50 bg-card text-primary shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-md sm:h-16 sm:w-16">
              <Icono className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.5} aria-hidden />
            </span>
            <span className="mt-3 text-sm leading-tight text-heading sm:text-base" style={SERIF}>
              {texto}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Misión y visión: dos bloques en zigzag (texto y foto alternados), con los pilares de cada uno. */
export function MisionVision() {
  return (
    <section data-no-section-divider className="isolate relative overflow-hidden bg-background px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
      <FondoMarca variante="lateral" />
      <SoftCircle color="cherry" size={280} className="-right-24 top-10" />
      <SoftCircle color="gold" size={320} className="-left-28 bottom-0" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-20 sm:gap-28">
        {BLOQUES.map((bloque) => (
          <Reveal key={bloque.titulo}>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
              <div className={cn("mx-auto w-full max-w-md lg:mx-0", bloque.fotoA === "derecha" && "lg:order-2 lg:justify-self-end")}>
                <Foto imagen={bloque.imagen} />
              </div>
              <div className={cn(bloque.fotoA === "derecha" && "lg:order-1")}>
                <Texto bloque={bloque} />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
