/**
 * Teléfonos de las sedes. En el panel admin cada sede guarda un solo texto (p. ej. "310 8527365 · 312 5169547"
 * cuando tiene dos números). Estas funciones lo separan, arman el enlace de llamada de cada número y evitan
 * que un mismo número salga dos veces (por ejemplo, la panadería comparte el número de Carbonell).
 */

/** "310 8527365 · 312 5169547" → ["310 8527365", "312 5169547"] (sin repetir). */
export function numerosDe(phone: string | null | undefined): string[] {
  const vistos = new Set<string>()
  return (phone ?? "")
    .split(/\s*(?:·|\/|,|;|\sy\s)\s*/)
    .map((n) => n.trim())
    .filter((n) => {
      const digitos = n.replace(/\D/g, "")
      if (digitos.length < 7 || vistos.has(digitos)) return false
      vistos.add(digitos)
      return true
    })
}

/** Enlace para llamar: "310 8527365" → "tel:+573108527365". */
export function telHref(numero: string): string {
  const digitos = numero.replace(/\D/g, "")
  return `tel:${digitos.startsWith("57") && digitos.length > 10 ? "+" : "+57"}${digitos}`
}

/**
 * Teléfonos por sede, de la principal a las demás, sin repetir ningún número en toda la lista:
 * una sede que solo comparte números ya listados (como la panadería de Carbonell) no aparece de nuevo.
 */
export function telefonosPorSede<T extends { name: string; phone: string; isPrincipal: boolean }>(
  sedes: readonly T[],
): { sede: string; numeros: string[] }[] {
  const vistos = new Set<string>()
  return [...sedes]
    .sort((a, b) => Number(b.isPrincipal) - Number(a.isPrincipal))
    .map((s) => ({
      sede: s.name,
      numeros: numerosDe(s.phone).filter((n) => {
        const digitos = n.replace(/\D/g, "")
        if (vistos.has(digitos)) return false
        vistos.add(digitos)
        return true
      }),
    }))
    .filter((t) => t.numeros.length > 0)
}
