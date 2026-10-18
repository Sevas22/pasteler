import type { Metadata } from "next"
import Link from "next/link"
import { LayoutShell } from "@/components/layout-shell"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { BANNERS, TORTAS_PERSONALIZADAS } from "@/lib/media"
import { PageHero } from "@/components/page-hero"
import { formatCategoriaLabel, getProductosPublic } from "@/lib/data/productos"
import { GaleriaPasarela, type EncabezadoPasarela, type ItemPasarela } from "@/components/galeria-pasarela"
import { Reveal } from "@/components/motion/reveal"
import type { Producto, ServicioProducto } from "@/lib/types/producto"
import { FondoMarca } from "@/components/ornaments/fondo-marca"

export const metadata: Metadata = {
  title: "Galería de tortas personalizadas, postres y pan",
  description:
    "Mira tortas personalizadas con papel de azúcar, cheesecakes, postres y pan artesanal de Daliza Pastelería Fina en Bogotá. Toca una foto para ver el producto.",
  alternates: { canonical: "/galeria" },
}

/** Pasarela 3D: las tortas personalizadas. Fotos y textos se editan en TORTAS_PERSONALIZADAS (lib/media.ts). */
const PASARELA_TORTAS: ItemPasarela[] = TORTAS_PERSONALIZADAS.map((t) => ({
  id: t.src,
  nombre: t.nombre,
  categoria: t.ocasion,
  descripcion: t.descripcion,
  imagen: t.src,
  mensaje: `Hola, quiero una torta personalizada como esta: ${t.nombre}`,
  textoBoton: "Quiero una torta así",
}))

/**
 * Una pasarela por línea del catálogo, en este orden. Los productos (foto, nombre, categoría y descripción)
 * salen del catálogo de Supabase: se editan desde el panel admin y aparecen aquí solos si tienen foto.
 */
const LINEAS: { servicio: ServicioProducto; encabezado: EncabezadoPasarela }[] = [
  { servicio: "pasteleria", encabezado: { etiqueta: "Pastelería", titulo: "Tortas que", italica: "celebran contigo." } },
  { servicio: "reposteria", encabezado: { etiqueta: "Repostería", titulo: "Pequeños placeres,", italica: "grandes momentos." } },
  { servicio: "panaderia", encabezado: { etiqueta: "Panadería", titulo: "Pan artesanal,", italica: "hecho en casa." } },
]

const aItem = (p: Producto): ItemPasarela => ({
  id: p.slug,
  nombre: p.nombre,
  categoria: formatCategoriaLabel(p.categoria),
  descripcion: p.descripcionLarga || p.descripcion,
  imagen: p.imagen,
  href: `/productos/${p.slug}`,
})

export default async function GaleriaPage() {
  const productos = await getProductosPublic()
  const conFoto = productos.filter((p) => p.active && !p.imagen.includes("logo-dalizas"))

  return (
    <LayoutShell>
      <PageHero
        src={BANNERS.paginas.galeria}
        alt="Tartaleta de frutas Daliza con fresas, mora y melocotón"
        priority
        alto="medio"
        tono="claro"
        focus="object-[80%_center] lg:object-[center_30%]"
        title={
          <>
            Arte dulce en <span className="italic text-[#E3C98F]">cada detalle.</span>
          </>
        }
        description="Nuestras tortas personalizadas y un recorrido por pastelería, repostería y panadería. Toca el + de cada creación para ver el detalle."
      />

      <GaleriaPasarela
        items={PASARELA_TORTAS}
        encabezado={{ etiqueta: "Tortas personalizadas", titulo: "Tu celebración,", italica: "hecha torta." }}
      />

      {LINEAS.map(({ servicio, encabezado }) => {
        const items = conFoto.filter((p) => p.servicio === servicio).map(aItem)
        return items.length ? <GaleriaPasarela key={servicio} items={items} encabezado={encabezado} /> : null
      })}

      <section data-no-section-divider className="relative isolate overflow-hidden bg-background py-16 sm:py-20">
        <FondoMarca variante="abajo" />
        <Reveal>
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 sm:flex-row sm:justify-center sm:px-6 lg:px-8">
            <Button asChild className="w-full min-h-[48px] sm:w-auto sm:min-h-10">
              <Link href="/productos">
                Ver productos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full min-h-[48px] border-primary/30 text-primary sm:w-auto sm:min-h-10">
              <Link href="/contacto">Pedir cotización</Link>
            </Button>
          </div>
        </Reveal>
      </section>
    </LayoutShell>
  )
}
