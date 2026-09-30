import Image from "next/image"
import { Cake, Award, Users, Heart } from "lucide-react"
import { MEDIA } from "@/lib/media"
import { FlourishDivider } from "@/components/ornaments/flourish-divider"
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/reveal"

const features = [
  {
    icon: Cake,
    title: "Pastelería Artesanal",
    description:
      "Cada creación es elaborada con ingredientes de primera calidad y técnicas tradicionales.",
  },
  {
    icon: Award,
    title: "Instructores Expertos",
    description:
      "Aprende de chefs pasteleros con años de experiencia en el arte de la repostería.",
  },
  {
    icon: Users,
    title: "Grupos Reducidos",
    description:
      "Clases personalizadas con atención individual para maximizar tu aprendizaje.",
  },
  {
    icon: Heart,
    title: "Pasión por Enseñar",
    description: "Transmitimos el amor por la pastelería con dedicación y entusiasmo.",
  },
] as const

export function About() {
  return (
    <section
      id="nosotros"
      className="relative overflow-hidden border-t border-brand-gold/25 bg-gradient-to-b from-background via-white to-white py-14 sm:py-16 md:py-22 lg:py-24"
    >
      <div
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/[0.06] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-brand-gold/[0.10] blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <header className="mx-auto max-w-3xl px-1 text-center sm:px-0">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/90">01 · Sobre nosotros</p>
            <h2 className="mt-3 font-serif text-4xl font-normal leading-tight text-heading text-balance md:text-5xl">
              Tradición y excelencia en cada creación
            </h2>
            <FlourishDivider className="mt-4" />
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              En Dalizas Pastelería Fina combinamos la tradición de la repostería clásica con técnicas modernas
              para ofrecerte los mejores cursos de pastelería en Bogotá. Nuestra misión es formar nuevos talentos y
              compartir nuestra pasión por el dulce arte de la pastelería.
            </p>
          </header>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mx-auto mt-12 max-w-5xl sm:mt-16">
            <div
              className="pointer-events-none absolute -inset-3 rounded-[2rem] border border-brand-gold/40 sm:-inset-4 sm:rounded-[2.5rem]"
              aria-hidden
            />
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-brand-gold/25 bg-muted shadow-[0_24px_60px_-12px_rgba(92,46,46,0.22)] sm:rounded-3xl sm:aspect-[21/10] md:aspect-[2.2/1]">
              <Image
                src={MEDIA.heroBannerPrincipal}
                alt="Selección de tortas y postres de pastelería fina Daliza"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
                aria-hidden
              />
              <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex items-end justify-between sm:bottom-7 sm:left-7 sm:right-7">
                <p className="font-serif text-xl italic text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] sm:text-2xl">
                  El arte de celebrar.
                </p>
                <span className="hidden rounded-full border border-white/50 bg-black/20 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/95 backdrop-blur-sm sm:inline-block">
                  Bogotá · Colombia
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        <RevealStagger className="mx-auto mt-10 grid max-w-6xl list-none grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:mt-14 lg:grid-cols-4 lg:gap-6">
          {features.map((feature) => (
            <RevealItem key={feature.title} className="h-full">
              <article className="group flex h-full min-h-0 flex-col rounded-2xl border border-border/60 bg-white/90 p-5 text-center shadow-[0_1px_3px_rgba(0,0,0,0.06)] ring-1 ring-brand-gold/10 transition duration-300 hover:-translate-y-1.5 hover:border-primary/20 hover:shadow-[0_20px_40px_-16px_rgba(139,46,46,0.28)] sm:min-h-[260px] sm:p-7 md:min-h-[280px]">
                <div className="flex justify-center">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-primary/12 to-primary/8 ring-4 ring-background transition-transform duration-300 group-hover:scale-110 md:h-[3.75rem] md:w-[3.75rem]">
                    <feature.icon className="h-7 w-7 text-primary md:h-8 md:w-8" strokeWidth={1.75} aria-hidden />
                  </div>
                </div>
                <h3 className="mt-5 flex min-h-[4.5rem] items-center justify-center text-balance font-serif text-xl font-normal leading-snug text-heading md:min-h-[5rem] md:text-[1.35rem]">
                  {feature.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground md:text-[0.9375rem]">
                  {feature.description}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  )
}
