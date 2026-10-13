import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { BANNERS } from "@/lib/media"
import { cn } from "@/lib/utils"

type Banner = {
  eyebrow: string
  titulo: string
  italica: string
  texto: string
  cta: string
  href: string
  src: string
  alt: string
  /** Lado donde va el texto en desktop */
  lado: "izquierda" | "derecha"
  /** Qué parte de la foto panorámica queda visible */
  enfoque: string
}

const BANNERS_SERVICIO: readonly Banner[] = [
  {
    eyebrow: "Panadería",
    titulo: "Recién horneado,",
    italica: "cada mañana.",
    texto: "Croissants, pandebonos, galletas y empanadas hojaldradas, hechos a mano en nuestras sedes.",
    cta: "Ver panadería",
    href: "/productos?servicio=panaderia",
    src: BANNERS.panaderia,
    alt: "Surtido de panadería Daliza: croissants, pan, galletas",
    lado: "izquierda",
    enfoque: "object-[85%_center]",
  },
  {
    eyebrow: "Pastelería",
    titulo: "Tartaletas, rollos",
    italica: "y tortas de autor.",
    texto: "Fruta fresca, cremas suaves y detalles dorados para que cada porción se sienta especial.",
    cta: "Ver pastelería",
    href: "/productos?servicio=pasteleria",
    src: BANNERS.pasteleria,
    alt: "Tartaletas de durazno y fresa, rollos de crema",
    lado: "derecha",
    enfoque: "object-[15%_center]",
  },
  {
    eyebrow: "Repostería",
    titulo: "Postres que",
    italica: "enamoran.",
    texto: "Tartas de frutos rojos, cremas y frutas de temporada para cerrar cualquier celebración.",
    cta: "Ver repostería",
    href: "/productos?servicio=reposteria",
    src: BANNERS.reposteria,
    alt: "Tarta de frutos rojos, crema y durazno",
    lado: "izquierda",
    enfoque: "object-[80%_center]",
  },
]

/** Tres banners de pantalla completa, uno por servicio; se encuadran al hacer scroll (ver globals.css). */
export function BannerServicios() {
  return (
    <>
      {BANNERS_SERVICIO.map((b) => {
        const izquierda = b.lado === "izquierda"
        return (
          <section
            key={b.eyebrow}
            data-no-section-divider
            className="relative isolate flex min-h-[560px] w-full items-end overflow-hidden bg-[#1c100e] sm:h-[calc(100svh-4rem)] sm:items-center"
          >
            <Image
              src={b.src}
              alt={b.alt}
              fill
              sizes="100vw"
              className={cn("object-cover saturate-[1.1] contrast-[1.04]", b.enfoque)}
            />
            <div
              className={cn(
                "pointer-events-none absolute inset-0",
                "bg-gradient-to-t from-[#1c100e]/90 via-[#1c100e]/45 to-[#1c100e]/10",
                izquierda
                  ? "sm:bg-gradient-to-r sm:from-[#1c100e]/90 sm:via-[#2a1210]/55 sm:via-[40%] sm:to-transparent sm:to-[70%]"
                  : "sm:bg-gradient-to-l sm:from-[#1c100e]/90 sm:via-[#2a1210]/55 sm:via-[40%] sm:to-transparent sm:to-[70%]",
              )}
              aria-hidden
            />

            <div className="relative mx-auto w-full max-w-7xl px-5 pb-14 pt-24 sm:px-8 sm:pb-0 sm:pt-0 lg:px-12">
              <div className={cn("max-w-lg", !izquierda && "sm:ml-auto")}>
                <p className="flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.22em] text-[#E3C98F]">
                  <span className="h-px w-8 bg-[#E3C98F]/70" aria-hidden />
                  {b.eyebrow}
                </p>
                <p
                  className="mt-4 text-balance text-4xl font-normal leading-[1.05] text-[#F7EFE4] drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)] sm:text-6xl lg:text-7xl"
                  style={{ fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }}
                >
                  {b.titulo} <span className="italic text-[#E3C98F]">{b.italica}</span>
                </p>
                <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#EADBCB] sm:text-base">{b.texto}</p>
                <Link
                  href={b.href}
                  className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D64545] px-7 text-sm font-semibold text-white shadow-[0_12px_30px_-10px_rgba(214,69,69,0.8)] transition-colors hover:bg-[#E35252]"
                >
                  {b.cta}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}
