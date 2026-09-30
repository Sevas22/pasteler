import { SoftCircle } from "@/components/ornaments/soft-circle"

/** Dos líneas, sin cifras inventadas: lo único que decimos es lo que es verdad y verificable. */
export function Manifiesto() {
  return (
    <section
      id="nosotros"
      data-no-section-divider
      className="relative overflow-hidden bg-background px-5 py-16 sm:px-8 sm:py-20 lg:px-12"
    >
      <SoftCircle color="wine" size={220} className="left-1/2 top-1/2 -translate-x-[130%] -translate-y-1/2" />
      <SoftCircle color="gold" size={180} className="left-1/2 top-1/2 translate-x-[60%] -translate-y-[70%]" />
      <p
        className="relative mx-auto max-w-2xl text-balance text-center text-2xl font-normal leading-snug text-heading sm:text-3xl"
        style={{ fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }}
      >
        Hacemos pastelería fina en Bosa, Bogotá.
        <br />
        Cuatro sedes, un mismo horno.
      </p>
    </section>
  )
}
