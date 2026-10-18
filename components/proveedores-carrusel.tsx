import Image from "next/image"
import { Cherry } from "lucide-react"
import { PROVEEDORES, type Proveedor } from "@/lib/proveedores"
import { cn } from "@/lib/utils"

const SERIF = { fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }

/** Veces que se repite la lista en cada mitad de la cinta: con pocas marcas, así cubre pantallas anchas sin huecos. */
const REPETICIONES = 2

function Marca({ proveedor, oculto }: { proveedor: Proveedor; oculto?: boolean }) {
  return (
    <li
      aria-hidden={oculto || undefined}
      className={cn(
        "group/marca mr-4 flex h-24 w-48 shrink-0 items-center justify-center rounded-2xl border px-6 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.9)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-20px_rgba(201,169,110,0.45)] sm:mr-6 sm:h-28 sm:w-60",
        proveedor.oscuro
          ? "border-[#7C3AED]/40 bg-[#05060f] px-3 hover:border-[#22D3EE]/70"
          : "border-[#C9A96E]/25 bg-[#F7EFE4] hover:border-[#E3C98F]",
      )}
    >
      {proveedor.logo ? (
        <Image
          src={proveedor.logo}
          alt={oculto ? "" : proveedor.nombre}
          width={200}
          height={80}
          className={cn(
            "h-auto max-h-16 w-auto max-w-[80%] object-contain transition-all duration-500 sm:max-h-20",
            // En reposo: tonos sepia de la marca; al pasar el mouse, el logo con su color real
            proveedor.oscuro
              ? "max-w-[92%] opacity-95 group-hover/marca:opacity-100"
              : proveedor.silueta
                ? "opacity-80 [filter:brightness(0)] group-hover/marca:opacity-100"
                : "opacity-85 mix-blend-multiply [filter:grayscale(1)_sepia(0.35)] group-hover/marca:opacity-100 group-hover/marca:[filter:none]",
          )}
        />
      ) : (
        <span
          className="text-center text-lg font-normal uppercase leading-tight tracking-[0.14em] text-[#5A2E2E]/75 transition-colors duration-500 group-hover/marca:text-primary sm:text-xl"
          style={SERIF}
        >
          {proveedor.nombre}
        </span>
      )}
    </li>
  )
}

function Cinta({ marcas, inversa }: { marcas: readonly Proveedor[]; inversa?: boolean }) {
  const mitad = Array.from({ length: REPETICIONES }, () => marcas).flat()
  return (
    <div className="proveedores-wrap relative">
      <ul className={cn("proveedores-track flex w-max py-3", inversa && "proveedores-track-inversa")}>
        {mitad.map((p, i) => (
          <Marca key={`${p.slug}-${i}`} proveedor={p} oculto={i >= marcas.length} />
        ))}
        {mitad.map((p, i) => (
          <Marca key={`${p.slug}-copia-${i}`} proveedor={p} oculto />
        ))}
      </ul>
    </div>
  )
}

/** Marcas aliadas: dos cintas infinitas en sentidos opuestos. Cada una se pausa al pasar el mouse. */
export function ProveedoresCarrusel() {
  // La segunda cinta arranca en otra marca para que las dos filas no queden alineadas
  const corrida = [...PROVEEDORES.slice(3), ...PROVEEDORES.slice(0, 3)]

  return (
    <section data-no-section-divider className="relative isolate overflow-hidden bg-[#2a1210] py-20 sm:py-28">
      <div
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-[#C9A96E]/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#D64545]/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-5 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-12">
        <div>
          <p className="flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.28em] text-[#E3C98F]">
            <Cherry className="h-3.5 w-3.5" strokeWidth={1.85} aria-hidden />
            Nuestros aliados
          </p>
          <h2
            className="mt-4 text-balance text-4xl font-normal leading-[1.05] text-[#F7EFE4] sm:text-5xl lg:text-6xl"
            style={SERIF}
          >
            Ingredientes de marcas
            <br />
            <span className="italic text-[#E3C98F]">en las que confiamos.</span>
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-[#D8C7B8] lg:pb-2 lg:text-right">
          {PROVEEDORES.length} marcas aliadas para que cada receta tenga la calidad que esperas.
        </p>
      </div>

      <div className="relative mt-14 flex flex-col gap-2 [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)] sm:gap-4">
        <Cinta marcas={PROVEEDORES} />
        <Cinta marcas={corrida} inversa />
      </div>
    </section>
  )
}
