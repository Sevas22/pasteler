"use client"

import { useEffect } from "react"

/**
 * Títulos que aparecen al bajar y se van al subir, en todo el sitio, sin marcar nada a mano.
 *
 * Busca dentro de <main> los títulos (h2, textos con la tipografía serif de la marca) y las etiquetas
 * pequeñas en mayúsculas de cada sección. Al entrar en pantalla desde abajo aparecen; al volver a salir
 * por abajo (cuando la persona sube) se van. Si salen por arriba se quedan, para no parpadear mientras se baja.
 */

const SELECTOR = [
  "main h2",
  "main h1:not(.sr-only)",
  'main :is(p, span, div)[style*="font-serif"]',
  "main p.uppercase",
].join(",")

/** Zonas que ya tienen su propia animación o no deben moverse. */
const EXCLUIR = ["#inicio", "[data-pasarela] article", ".reveal", ".reveal-item", "[role=dialog]", ".sr-only", "header", "footer"]

export function AnimarAlScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (!("IntersectionObserver" in window)) return

    const elementos = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR)).filter(
      (el) => !EXCLUIR.some((sel) => el.closest(sel)) && !el.closest(".anim-scroll"),
    )

    const alto = window.innerHeight
    for (const el of elementos) {
      // Lo que ya está en pantalla al cargar se muestra sin animar (no "desaparece y aparece")
      const { top } = el.getBoundingClientRect()
      if (top < alto) el.dataset.visible = ""
      el.classList.add("anim-scroll")
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          const el = e.target as HTMLElement
          if (e.isIntersecting) el.dataset.visible = ""
          // Solo se oculta si salió por abajo (la persona está subiendo)
          else if (e.boundingClientRect.top > 0) delete el.dataset.visible
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    )
    elementos.forEach((el) => observador.observe(el))

    return () => {
      observador.disconnect()
      elementos.forEach((el) => {
        el.classList.remove("anim-scroll")
        delete el.dataset.visible
      })
    }
  }, [])

  return null
}
