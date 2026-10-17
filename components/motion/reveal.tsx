"use client"

import { useEffect, useRef, type CSSProperties, type ReactNode, type RefObject } from "react"
import { cn } from "@/lib/utils"

/*
 * Aparición suave al entrar en pantalla. Antes usaba framer-motion (~40 KB de JS en todas las páginas);
 * ahora es CSS (.reveal / .reveal-item en globals.css) + un IntersectionObserver. Misma API que antes.
 */

/**
 * Pone data-visible cuando el elemento entra en pantalla y lo quita cuando vuelve a salir por abajo
 * (la persona sube): así aparece al bajar y se va al subir. Si sale por arriba se queda visible.
 */
function useAparecer(ref: RefObject<HTMLElement | null>, margen: string, alAparecer?: (el: HTMLElement) => void) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const mostrar = () => {
      if (el.hasAttribute("data-visible")) return
      alAparecer?.(el)
      el.dataset.visible = ""
    }
    const ocultar = () => {
      delete el.dataset.visible
    }
    // Revisión por scroll: red de seguridad por si el observador se demora (un bloque nunca se queda invisible)
    function revisar() {
      const { top, bottom } = el!.getBoundingClientRect()
      if (top < window.innerHeight - 40 && bottom > 0) mostrar()
      else if (top >= window.innerHeight) ocultar()
    }
    let observador: IntersectionObserver | undefined
    if ("IntersectionObserver" in window) {
      observador = new IntersectionObserver(
        (entradas) => {
          for (const e of entradas) {
            if (e.isIntersecting) mostrar()
            else if (e.boundingClientRect.top > 0) ocultar()
          }
        },
        { rootMargin: `0px 0px ${margen} 0px` },
      )
      observador.observe(el)
    }
    window.addEventListener("scroll", revisar, { passive: true })
    window.addEventListener("resize", revisar)
    revisar()
    return () => {
      observador?.disconnect()
      window.removeEventListener("scroll", revisar)
      window.removeEventListener("resize", revisar)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

type RevealProps = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}

/** Fade + slide sutil al entrar en viewport. Úsalo para envolver bloques que deben "aparecer" al hacer scroll. */
export function Reveal({ children, delay = 0, y = 22, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  useAparecer(ref, "-80px")
  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={{ "--reveal-y": `${y}px`, transitionDelay: delay ? `${delay}s` : undefined } as CSSProperties}
    >
      {children}
    </div>
  )
}

/** Contenedor para animar hijos en cascada (grids de tarjetas). Los hijos deben ser <RevealItem>. */
export function RevealStagger({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useAparecer(ref, "-60px", (el) => {
    // Cascada: cada hijo arranca 90 ms después del anterior
    Array.from(el.children).forEach((hijo, i) => {
      ;(hijo as HTMLElement).style.transitionDelay = `${40 + i * 90}ms`
    })
  })
  return (
    <div ref={ref} className={cn("reveal-stagger", className)}>
      {children}
    </div>
  )
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("reveal-item", className)}>{children}</div>
}
