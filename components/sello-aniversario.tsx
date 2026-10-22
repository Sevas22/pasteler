import Image from "next/image"
import Link from "next/link"

const SELLO = "/images/sello-13-anos.webp"

/**
 * Sello flotante "13 años de experiencia" en la esquina superior izquierda, bajo el menú de todas las páginas.
 * Flota suavemente y cada tanto le pasa un brillo dorado (solo sobre el sello, gracias a la máscara).
 */
export function SelloAniversario() {
  return (
    <div className="sello-entrada fixed left-3 top-[76px] z-40 sm:left-5 sm:top-20">
      <Link
        href="/#nosotros"
        aria-label="Daliza: 13 años de experiencia. Conoce nuestra historia"
        className="group relative block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A96E]"
      >
        <span className="block origin-top-left transition-transform duration-300 ease-out group-hover:scale-110">
          <span className="sello-flotar relative block h-[72px] w-[72px] sm:h-[96px] sm:w-[96px] lg:h-[110px] lg:w-[110px]">
            {/* Resplandor dorado detrás */}
            <span
              className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(232,196,120,0.55),transparent_70%)] blur-md transition-opacity duration-300 group-hover:opacity-100 sm:opacity-80"
              aria-hidden
            />
            <Image
              src={SELLO}
              alt=""
              fill
              sizes="(min-width: 1024px) 110px, (min-width: 640px) 96px, 72px"
              className="relative object-contain drop-shadow-[0_10px_14px_rgba(90,31,38,0.35)]"
            />
            {/* Brillo que recorre solo la forma del sello */}
            <span
              className="sello-brillo absolute inset-0"
              style={{
                WebkitMaskImage: `url(${SELLO})`,
                maskImage: `url(${SELLO})`,
              }}
              aria-hidden
            />
          </span>
        </span>

        {/* Mensaje al pasar el mouse (escritorio) */}
        <span className="pointer-events-none absolute left-full top-1/2 ml-3 hidden -translate-x-1 -translate-y-1/2 whitespace-nowrap rounded-full border border-[#C9A96E]/50 bg-[#2a1210] px-4 py-2 text-sm text-[#F7EFE4] opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
          <span className="font-semibold text-[#E8CFA0]">13 años</span>{" "}
          endulzando tus celebraciones
        </span>
      </Link>
    </div>
  )
}
