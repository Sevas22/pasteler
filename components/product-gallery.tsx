"use client"

import { useState } from "react"
import Image from "next/image"
import type { Producto, ServicioProducto } from "@/lib/types/producto"
import { CatalogoProductos } from "@/components/catalogo-productos"
import { BANNERS } from "@/lib/media"
import { PageHero } from "@/components/page-hero"
import { cn } from "@/lib/utils"
import { FondoMarca } from "@/components/ornaments/fondo-marca"

type ProductGalleryProps = {
  productos: Producto[]
  initialServicio?: ServicioProducto | "todos"
  className?: string
}

export function ProductGallery({
  productos,
  initialServicio = "todos",
  className,
}: ProductGalleryProps) {
  const [servicio, setServicio] = useState<ServicioProducto | "todos">(initialServicio)
  return (
    <>
      <PageHero
        title={
          <>
            Nuestros <span className="italic text-[#E3C98F]">productos.</span>
          </>
        }
        description={`${productos.length} creaciones hechas a mano. Filtra por servicio o categoría para encontrar lo que buscas.`}
        background={(Object.keys(BANNERS.productosServicio) as (keyof typeof BANNERS.productosServicio)[]).map((key) => (
          <Image
            key={key}
            src={BANNERS.productosServicio[key]}
            alt=""
            fill
            priority={key === initialServicio}
            sizes="100vw"
            className={cn(
              "object-cover object-center saturate-[1.1] contrast-[1.05] transition-opacity duration-700 ease-in-out",
              // En celular la foto se ve en un bloque 4:3: se encuadra en la torta (en esta foto queda a un tercio del borde)
              key === "pasteleria" && "max-lg:object-[34%_center]",
              // Esta foto es cuadrada: se encuadra en las filas de cheesecakes (la mitad inferior de la foto)
              key === "reposteria" && "object-[center_58%]",
              key === servicio ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
      />

      <section data-no-section-divider className={cn("relative isolate overflow-hidden bg-background px-5 pb-16 pt-12 sm:px-8 lg:px-12 lg:pt-16", className)}>
        <FondoMarca variante="suave" />
      <div className="mx-auto max-w-6xl">
        <CatalogoProductos productos={productos} servicio={servicio} onServicioChange={setServicio} />
      </div>
    </section>
    </>
  )
}
