"use client"

import { motion, useScroll, useSpring } from "framer-motion"

/** Línea dorada que marca el avance de scroll — detalle sutil de sitios editoriales premium. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#c9a96e] via-[#8b2e2e] to-[#c9a96e]"
      aria-hidden
    />
  )
}
