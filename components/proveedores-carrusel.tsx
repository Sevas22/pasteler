import Image from "next/image"
import { PROVEEDORES, type Proveedor } from "@/lib/proveedores"
import { cn } from "@/lib/utils"

const SERIF = { fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }

function Marca({ proveedor, oculto }: { proveedor: Proveedor; oculto?: boolean }) {
  return (
    <li aria-hidden={oculto || undefined} className={cn("mr-6 flex h-28 w-60 shrink-0 items-center justify-center rounded-2xl border border-[#C9A96E]/30 px-6 shadow-[0_14px_30px_-20px_rgba(58,38,32,0.45)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A96E] hover:shadow-[0_20px_36px_-18px_rgba(58,38,32,0.55)] sm:mr-8 sm:h-32 sm:w-72", proveedor.fondo ?? "bg-white")}>
      {proveedor.logo ? (
        <Image
          src={proveedor.logo}
          alt={proveedor.nombre}
          width={200}
          height={80}
          loading="eager"
          className="h-auto max-h-16 w-auto max-w-[80%] object-contain sm:max-h-20"
        />
      ) : (
        <span
          className="text-center text-xl font-normal uppercase tracking-[0.14em] text-[#5A2E2E] sm:text-2xl"
          style={SERIF}
        >
          {proveedor.nombre}
        </span>
      )}
    </li>
  )
}

/** Carrusel infinito de marcas con las que trabaja Daliza. Se pausa al pasar el mouse. */
export function ProveedoresCarrusel() {
  return (
    <section
      data-no-section-divider
      className="relative overflow-hidden bg-[#F3E9DC] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <p className="flex items-center justify-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-primary">
          <span className="h-px w-8 bg-primary/50" aria-hidden />
          Nuestros aliados
          <span className="h-px w-8 bg-primary/50" aria-hidden />
        </p>
        <p
          className="mt-4 text-balance text-4xl font-normal leading-tight text-heading sm:text-5xl"
          style={SERIF}
        >
          Ingredientes de marcas <span className="italic text-primary">en las que confiamos.</span>
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          Trabajamos con proveedores reconocidos para que cada receta tenga la calidad que esperas.
        </p>
      </div>

      <div className="proveedores-wrap group/carrusel relative mt-12 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        <ul className="proveedores-track flex w-max">
          {PROVEEDORES.map((p) => (
            <Marca key={p.slug} proveedor={p} />
          ))}
          {PROVEEDORES.map((p) => (
            <Marca key={`${p.slug}-copia`} proveedor={p} oculto />
          ))}
        </ul>
      </div>
    </section>
  )
}
