"use client"

import { useEffect, useRef } from "react"

/** Línea dorada que marca el avance de scroll — detalle sutil de sitios editoriales premium. Sin librerías. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0
    const actualizar = () => {
      frame = 0
      const el = ref.current
      if (!el) return
      const max = document.documentElement.scrollHeight - window.innerHeight
      el.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`
    }
    const programar = () => {
      if (!frame) frame = requestAnimationFrame(actualizar)
    }
    actualizar()
    window.addEventListener("scroll", programar, { passive: true })
    window.addEventListener("resize", programar)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", programar)
      window.removeEventListener("resize", programar)
    }
  }, [])

  return (
    <div
      ref={ref}
      style={{ transform: "scaleX(0)" }}
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#c9a96e] via-[#8b2e2e] to-[#c9a96e] transition-transform duration-150 ease-out"
      aria-hidden
    />
  )
}
