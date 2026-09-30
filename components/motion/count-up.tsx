"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useMotionValue, useSpring } from "framer-motion"

type CountUpProps = {
  /** Texto con el número a animar, p. ej. "+150", "+8K", "100%". Conserva prefijo/sufijo tal cual. */
  value: string
  className?: string
}

/** Anima el número contenido en `value` de 0 hasta su valor real al entrar en viewport; conserva +, K, % literales. */
export function CountUp({ value, className }: CountUpProps) {
  const match = value.match(/(-?\d+(?:\.\d+)?)/)
  const numeric = match ? Number.parseFloat(match[1]) : null
  const prefix = numeric !== null && match ? value.slice(0, match.index) : ""
  const suffix = numeric !== null && match ? value.slice((match.index ?? 0) + match[0].length) : ""

  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { duration: 1400, bounce: 0 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (inView && numeric !== null) motionValue.set(numeric)
  }, [inView, numeric, motionValue])

  useEffect(() => {
    const unsubscribe = spring.on("change", (v) => setDisplay(v))
    return unsubscribe
  }, [spring])

  if (numeric === null) {
    return (
      <span className={className} ref={ref}>
        {value}
      </span>
    )
  }

  const isInt = Number.isInteger(numeric)
  const shown = isInt ? Math.round(display) : Math.round(display * 10) / 10

  return (
    <span className={className} ref={ref}>
      {prefix}
      {shown}
      {suffix}
    </span>
  )
}
