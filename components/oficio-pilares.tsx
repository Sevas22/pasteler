import Image from "next/image"
import { SoftCircle } from "@/components/ornaments/soft-circle"
import { HandStamp } from "@/components/ornaments/hand-stamp"

const PILARES = [
  {
    titulo: "Panadería, pastelería y repostería",
    texto: "Bajo un mismo techo: pan del día, tortas de celebración y postres de autor.",
  },
  {
    titulo: "Cuatro sedes en Bosa",
    texto: "Bosa Carbonell, Bosa Naranjos, Bosa Piamonte y Ciudadela Colsubsidio.",
  },
  {
    titulo: "Cursos de pastelería",
    texto: "Grupos reducidos para quienes quieren aprender el oficio desde cero.",
  },
] as const

/** Sección de marca: qué es Dalizas en realidad, sin cifras inventadas ni iconografía genérica. */
export function OficioPilares() {
  return (
    <section data-no-section-divider className="relative overflow-hidden bg-background px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
      <SoftCircle color="gold" size={340} className="-left-24 -top-20" />
      <SoftCircle color="cherry" size={260} className="bottom-[-4rem] right-[8%]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative mx-auto w-full max-w-md">
          <div className="group relative aspect-[4/5] w-[78%] overflow-hidden rounded-sm">
            <Image
              src="/images/producto-tartas-fruta-daliza.png"
              alt="Tartas de fruta Daliza"
              fill
              className="object-cover object-[85%_42%] transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 1024px) 60vw, 320px"
            />
          </div>
          <div className="group absolute bottom-[-8%] right-0 aspect-[4/5] w-[52%] overflow-hidden rounded-sm border-4 border-background shadow-[0_20px_50px_-20px_rgba(58,38,32,0.45)]">
            <Image
              src="/images/producto-mousse-frutos-rojos-daliza.png"
              alt="Mousse de frutos rojos Daliza"
              fill
              className="object-cover object-[center_68%] transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 1024px) 40vw, 220px"
            />
          </div>
          <div className="absolute -left-6 bottom-[8%] z-10 rounded-full bg-background p-2 shadow-[0_12px_30px_-10px_rgba(58,38,32,0.35)] sm:-left-8">
            <HandStamp />
          </div>
        </div>

        <div>
          <p
            className="max-w-lg text-balance text-3xl font-normal leading-tight text-heading sm:text-4xl"
            style={{ fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }}
          >
            Todo lo que somos, en un mismo obrador
          </p>

          <ul className="mt-8 flex flex-col divide-y divide-border/70 border-t border-border/70">
            {PILARES.map((pilar) => (
              <li key={pilar.titulo} className="py-5">
                <h3
                  className="text-lg font-normal text-heading sm:text-xl"
                  style={{ fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }}
                >
                  {pilar.titulo}
                </h3>
                <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted-foreground">{pilar.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
