import Image from "next/image"
import { Cake, Croissant, GraduationCap, Handshake, ImagePlus, MapPin, PackageCheck } from "lucide-react"
import { SoftCircle } from "@/components/ornaments/soft-circle"
import { HandStamp } from "@/components/ornaments/hand-stamp"

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

/** Sección de marca: lo que hace distinta a Daliza, con fotografía de producto. */
export function OficioPilares() {
  return (
    <section
      data-no-section-divider
      className="relative flex items-center overflow-hidden bg-background px-5 py-20 sm:min-h-[calc(100svh-4rem)] sm:px-8 sm:py-16 lg:px-12"
    >
      <SoftCircle color="gold" size={340} className="-left-24 -top-20" />
      <SoftCircle color="cherry" size={260} className="bottom-[-4rem] right-[6%]" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        {/* Mosaico de fotografía de producto */}
        <div className="relative mx-auto w-full max-w-md lg:mx-0">
          <div className="grid grid-cols-[1.15fr_1fr] grid-rows-2 gap-3 sm:gap-4">
            <div className="group relative row-span-2 aspect-[3/5] overflow-hidden rounded-2xl shadow-[0_30px_60px_-28px_rgba(58,38,32,0.5)]">
              <Image
                src="/images/productos/torta-con-cheesecake-de-maracuya-torta-1.webp"
                alt="Torta con cheesecake de maracuyá Daliza"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                sizes="(max-width: 1024px) 55vw, 260px"
              />
            </div>
            <div className="group relative aspect-square overflow-hidden rounded-2xl shadow-[0_24px_50px_-26px_rgba(58,38,32,0.45)]">
              <Image
                src="/images/productos/torta-de-amapola-torta-1.webp"
                alt="Torta de amapola Daliza"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                sizes="(max-width: 1024px) 40vw, 220px"
              />
            </div>
            <div className="group relative aspect-square overflow-hidden rounded-2xl shadow-[0_24px_50px_-26px_rgba(58,38,32,0.45)]">
              <Image
                src="/images/productos/cruasan-de-chocolate.webp"
                alt="Croissants de panadería Daliza"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                sizes="(max-width: 1024px) 40vw, 220px"
              />
            </div>
          </div>
          <div className="absolute -left-5 bottom-[10%] z-10 rounded-full bg-background p-2 shadow-[0_12px_30px_-10px_rgba(58,38,32,0.35)] sm:-left-8">
            <HandStamp />
          </div>
        </div>

        <div>
          <p className="flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.22em] text-primary">
            <span className="h-px w-8 bg-primary/50" aria-hidden />
            Lo que nos hace Daliza
          </p>
          <p
            className="mt-4 max-w-xl text-balance text-4xl font-normal leading-[1.08] text-heading sm:text-5xl"
            style={SERIF}
          >
            Todo lo que somos, <span className="italic text-primary">en un mismo obrador.</span>
          </p>

          <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {PILARES.map(({ icono: Icono, titulo, texto }, i) => (
              <li key={titulo} className="flex gap-4">
                <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brand-gold/60 bg-card text-primary shadow-sm">
                  <Icono className="h-5 w-5" strokeWidth={1.7} aria-hidden />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                </span>
                <div>
                  <h3 className="text-lg font-normal leading-snug text-heading" style={SERIF}>
                    {titulo}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{texto}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
