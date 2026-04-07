import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { MEDIA } from "@/lib/media"

const features = [
  {
    title: "Cursos",
    href: "/cursos",
    image: MEDIA.homeFeature.cursos,
    alt: "Cheesecake y postres — formación en pastelería Daliza",
    description: "Técnicas prácticas, grupos reducidos y acompañamiento en cocina.",
  },
  {
    title: "Productos",
    href: "/productos",
    image: MEDIA.homeFeature.productos,
    alt: "Torta de celebración y catálogo de pastelería",
    description: "Tortas, postres y especialidades para pedir o inspirarte.",
  },
  {
    title: "Galería",
    href: "/galeria",
    image: MEDIA.homeFeature.galeria,
    alt: "Mousse y piezas de pastelería fina para la galería",
    description: "Referencia visual de nuestras creaciones y estilo de marca.",
  },
  {
    title: "Contáctanos",
    href: "/contacto",
    image: MEDIA.homeFeature.contacto,
    alt: "Postres en vaso y atención personalizada",
    description: "Pedidos, cursos o sedes. Escríbenos y te respondemos.",
    showCta: true,
  },
] as const

export function HomeFeatureGrid() {
  return (
    <section className="bg-background py-12 sm:py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {features.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group flex min-h-[22rem] flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-md ring-1 ring-brand-gold/30 transition duration-200 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:min-h-[24rem]"
            >
              <div className="relative aspect-[5/4] w-full shrink-0 overflow-hidden bg-[#f4f0eb] sm:aspect-[4/3]">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="flex flex-1 flex-col border-t border-brand-gold/25 px-4 py-4 text-center sm:px-5 sm:py-5 sm:text-left">
                <h3 className="text-balance font-serif text-2xl font-normal leading-tight text-heading md:text-[1.65rem]">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                {"showCta" in item && item.showCta ? (
                  <span className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground shadow-sm transition group-hover:bg-primary/92">
                    Ir al formulario
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                  </span>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
