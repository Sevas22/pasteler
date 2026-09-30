"use client"

import { MessageCircle, Sparkles, Truck } from "lucide-react"
import { motion } from "framer-motion"
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/reveal"
import { FlourishDivider } from "@/components/ornaments/flourish-divider"

const steps = [
  {
    icon: Sparkles,
    title: "Elige tu creación",
    description: "Explora el catálogo o cuéntanos la idea que tienes en mente para tu celebración.",
  },
  {
    icon: MessageCircle,
    title: "Escríbenos por WhatsApp",
    description: "Confirma sabor, tamaño, fecha y sede. Te respondemos con disponibilidad y valor.",
  },
  {
    icon: Truck,
    title: "Recoge o recibe tu pedido",
    description: "Pasa por tu sede más cercana o coordina la entrega el día de tu evento.",
  },
] as const

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl px-1 text-center sm:px-0">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/90">05 · Así de fácil</p>
            <h2 className="mt-3 text-balance font-serif text-4xl font-normal leading-tight text-heading md:text-5xl">
              Tu pedido en <span className="italic">tres pasos</span>
            </h2>
            <FlourishDivider className="mt-4" />
          </div>
        </Reveal>

        <RevealStagger className="relative mx-auto mt-14 grid max-w-5xl gap-8 sm:grid-cols-3 sm:gap-6">
          {/* Línea conectora — solo desktop */}
          <div className="pointer-events-none absolute inset-x-0 top-8 hidden h-px sm:block" aria-hidden>
            <div className="mx-[16.6%] h-full bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" />
          </div>

          {steps.map((step, i) => (
            <RevealItem key={step.title} className="relative flex flex-col items-center text-center">
              <motion.div
                whileHover={{ scale: 1.08, rotate: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_30px_-8px_rgba(139,46,46,0.5)]"
              >
                <step.icon className="h-7 w-7" strokeWidth={1.75} />
                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-brand-gold text-xs font-bold text-brand-chocolate shadow-sm">
                  {i + 1}
                </span>
              </motion.div>
              <h3 className="mt-5 font-serif text-xl font-normal text-heading">{step.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  )
}
