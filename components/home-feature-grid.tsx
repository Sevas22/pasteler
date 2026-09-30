"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { MEDIA } from "@/lib/media"
import { RevealStagger, RevealItem } from "@/components/motion/reveal"
import { useTilt } from "@/components/motion/use-tilt"

const features = [
  {
    title: "Cursos",
    href: "/cursos",
    image: MEDIA.homeFeature.cursos,
    alt: "Cheesecake y postres — formación en pastelería Daliza",
    description: "Técnicas prácticas y grupos reducidos.",
    eyebrow: "Formación",
  },
  {
    title: "Productos",
    href: "/productos",
    image: MEDIA.homeFeature.productos,
    alt: "Torta de celebración y catálogo de pastelería",
    description: "Tortas y especialidades para pedir.",
    eyebrow: "Catálogo",
  },
  {
    title: "Galería",
    href: "/galeria",
    image: MEDIA.homeFeature.galeria,
    alt: "Mousse y piezas de pastelería fina para la galería",
    description: "Nuestras creaciones y estilo de marca.",
    eyebrow: "Inspiración",
  },
  {
    title: "Contáctanos",
    href: "/contacto",
    image: MEDIA.homeFeature.contacto,
    alt: "Postres en vaso y atención personalizada",
    description: "Pedidos, cursos o sedes.",
    eyebrow: "Escríbenos",
  },
] as const

function FeatureCard(item: (typeof features)[number]) {
  const { rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(5)

  return (
    <Link
      href={item.href}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group relative block aspect-[3/4] w-full [perspective:900px] transition-transform duration-300 hover:-translate-y-1 sm:aspect-[4/5]"
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-brand-gold/25 shadow-md ring-1 ring-brand-gold/20 transition-shadow duration-300 group-hover:shadow-[0_24px_48px_-18px_rgba(139,46,46,0.35)] group-hover:ring-brand-gold/60"
      >
        <Image
          src={item.image}
          alt={item.alt}
          fill
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.08]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/88 via-black/30 to-black/5"
          aria-hidden
        />
        <span className="absolute left-3 top-3 rounded-full border border-white/40 bg-black/25 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm sm:left-4 sm:top-4">
          {item.eyebrow}
        </span>
        <div className="relative mt-auto p-4 sm:p-5">
          <h3 className="text-balance font-serif text-xl font-normal leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] sm:text-2xl">
            {item.title}
          </h3>
          <p className="mt-1.5 hidden text-sm leading-snug text-white/85 sm:block">{item.description}</p>
          <span className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#E8D2A4] sm:text-sm">
            Explorar
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 sm:h-4 sm:w-4"
              aria-hidden
            />
          </span>
        </div>
      </motion.div>
    </Link>
  )
}

export function HomeFeatureGrid() {
  return (
    <section className="bg-background py-12 sm:py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealStagger className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {features.map((item) => (
            <RevealItem key={item.title}>
              <FeatureCard {...item} />
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  )
}
