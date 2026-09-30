import type { MouseEvent } from "react"
import { useMotionValue, useSpring, useTransform } from "framer-motion"

/** Inclinación 3D sutil siguiendo el cursor — para tarjetas de catálogo en escritorio. */
export function useTilt(range = 7) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springConfig = { stiffness: 300, damping: 28, mass: 0.5 }
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [range, -range]), springConfig)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-range, range]), springConfig)

  function onMouseMove(e: MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function onMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return { rotateX, rotateY, onMouseMove, onMouseLeave }
}
