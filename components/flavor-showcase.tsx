"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { formatCategoriaLabel } from "@/lib/data/productos-helpers"
import type { Producto } from "@/lib/types/producto"
import { cn } from "@/lib/utils"
import { Reveal } from "@/components/motion/reveal"
import { FlourishDivider } from "@/components/ornaments/flourish-divider"

type FlavorShowcaseProps = {
  productos: Producto[]
}

export function FlavorShowcase({ productos }: FlavorShowcaseProps) {
  const [active, setActive] = useState(0)
  if (productos.length === 0) return null
  const current = productos[active]

  return (
    <section className="bg-white py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl px-1 text-center sm:px-0">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/90">
              00 · Un equilibrio irresistible
            </p>
            <h2 className="mt-3 text-balance font-serif text-4xl font-normal leading-tight text-heading md:text-5xl">
              Difícil elegir <span className="italic">solo uno.</span>
            </h2>
            <FlourishDivider className="mt-4" />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_1.3fr] lg:gap-12">
            {/* Selector numerado */}
            <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
              {productos.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    "group flex shrink-0 items-center gap-4 rounded-2xl border px-4 py-3 text-left transition-all duration-300 lg:w-full",
                    i === active
                      ? "border-primary bg-primary/[0.06] shadow-sm"
                      : "border-border/70 hover:border-primary/30 hover:bg-secondary/40",
                  )}
                >
                  <span
                    className={cn(
                      "relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 transition-all duration-300",
                      i === active ? "ring-brand-gold" : "ring-transparent",
                    )}
                  >
                    <Image src={p.imagen} alt="" fill className="object-cover" sizes="48px" />
                  </span>
                  <span className="min-w-0">
                    <span
                      className={cn(
                        "block text-xs font-semibold tracking-wide",
                        i === active ? "text-primary" : "text-muted-foreground",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="block truncate font-serif text-base font-normal text-heading">{p.nombre}</span>
                  </span>
                </button>
              ))}
            </div>

            {/* Contenido activo */}
            <div className="relative overflow-hidden rounded-3xl border border-brand-gold/25 bg-[#f8f5f2] shadow-[0_24px_60px_-24px_rgba(92,46,46,0.3)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="grid sm:grid-cols-2"
                >
                  <div className="relative aspect-[4/3] sm:aspect-auto">
                    <Image
                      src={current.imagen}
                      alt={current.nombre}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                      priority
                    />
                  </div>
                  <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                      {formatCategoriaLabel(current.categoria)}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl font-normal italic text-heading md:text-3xl">
                      {current.nombre}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                      {current.descripcion}
                    </p>
                    <Link
                      href={`/productos/${current.slug}`}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                    >
                      Quiero esta creación
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
