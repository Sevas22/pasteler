import Image from "next/image"
import Link from "next/link"
import { Cake, Gift, Heart, ArrowRight } from "lucide-react"
import { SoftCircle } from "@/components/ornaments/soft-circle"

const OCASIONES = [
  { icono: Cake, label: "Cumpleaños" },
  { icono: Heart, label: "Aniversarios" },
  { icono: Gift, label: "Un detalle especial" },
] as const

/** Sección de ocasiones: la razón real por la que alguien pide una torta. */
export function CelebraOcasiones() {
  return (
    <section data-no-section-divider className="relative overflow-hidden bg-background px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
      <SoftCircle color="wine" size={260} className="right-[-4rem] top-[-4rem]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl shadow-[0_30px_60px_-25px_rgba(58,38,32,0.45)] lg:mx-0">
          <Image
            src="/images/producto-brazo-gitano-daliza.png"
            alt="Torta para celebraciones Daliza"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 480px"
          />
        </div>

        <div>
          <div className="h-px w-14 bg-primary/50" aria-hidden />
          <p className="mt-4 text-sm font-medium uppercase tracking-wide text-primary/80">Celebra con Daliza</p>
          <p
            className="mt-2 max-w-md text-balance text-3xl font-normal leading-tight text-heading sm:text-4xl"
            style={{ fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }}
          >
            Haz especial <span className="italic text-primary">ese momento.</span>
          </p>

          <ul className="mt-8 flex flex-col divide-y divide-border/70 border-t border-border/70">
            {OCASIONES.map(({ icono: Icono, label }) => (
              <li key={label}>
                <Link href="/contacto" className="group flex items-center gap-4 py-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icono className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="flex-1 text-base font-medium text-foreground transition-colors group-hover:text-primary">
                    {label}
                  </span>
                  <ArrowRight
                    className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/productos?servicio=pasteleria"
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            Explorar tortas
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
