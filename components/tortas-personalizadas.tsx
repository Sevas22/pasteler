import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Handshake, ImagePlus, MessageCircle, PackageCheck } from "lucide-react"
import { HandStamp } from "@/components/ornaments/hand-stamp"

const SERIF = { fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }

const SERVICIOS = [
  {
    icono: ImagePlus,
    titulo: "Tu diseño en papel de azúcar",
    texto:
      "Ponemos en tu torta el diseño que imaginas con papel de azúcar: personajes, fotos, logos o el mensaje que quieras.",
  },
  {
    icono: Handshake,
    titulo: "Te asesoramos y acompañamos",
    texto: "Desde la idea hasta el último detalle: te ayudamos a elegir diseño, sabor y tamaño para tu celebración.",
  },
  {
    icono: PackageCheck,
    titulo: "Entrega contigo",
    texto: "Entregamos tu torta contigo, para que la veas y confirmes que quedó tal como la pediste.",
  },
] as const

/** Servicio diferencial: tortas con papel de azúcar, asesoría y entrega acompañada. */
export function TortasPersonalizadas() {
  return (
    <section
      data-no-section-divider
      className="relative isolate flex items-center overflow-hidden bg-[#2a1210] px-5 py-20 sm:min-h-[calc(100svh-4rem)] sm:px-8 sm:py-16 lg:px-12"
    >
      <div
        className="pointer-events-none absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-[#C9A96E]/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#D64545]/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div className="relative mx-auto w-full max-w-md lg:mx-0">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-[0_30px_70px_-25px_rgba(0,0,0,0.8)]">
            <Image
              src="/images/galeria/tortas/torta-01.webp"
              alt="Torta personalizada con diseño de fútbol en papel de azúcar"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 90vw, 440px"
            />
          </div>
          <div className="absolute -bottom-8 -right-4 w-[46%] overflow-hidden rounded-2xl border-4 border-[#2a1210] shadow-[0_24px_50px_-20px_rgba(0,0,0,0.8)] sm:-right-8">
            <div className="relative aspect-square w-full">
              <Image
                src="/images/galeria/tortas/torta-03.webp"
                alt="Torta personalizada de Barbie con papel de azúcar"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 40vw, 200px"
              />
            </div>
          </div>
          <div className="absolute -left-4 top-6 hidden sm:block sm:-left-8">
            <div className="rounded-full bg-[#2a1210] p-1.5">
              <HandStamp tone="gold" icon={ImagePlus} text="PAPEL DE AZÚCAR • DALIZA •" />
            </div>
          </div>
        </div>

        <div>
          <p className="flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.22em] text-[#E3C98F]">
            <span className="h-px w-8 bg-[#E3C98F]/70" aria-hidden />
            Tortas personalizadas
          </p>
          <p
            className="mt-4 max-w-lg text-balance text-4xl font-normal leading-[1.08] text-[#F7EFE4] sm:text-5xl"
            style={SERIF}
          >
            Tu idea, <span className="italic text-[#E3C98F]">hecha torta.</span>
          </p>

          <ul className="mt-9 flex flex-col gap-6">
            {SERVICIOS.map(({ icono: Icono, titulo, texto }) => (
              <li key={titulo} className="flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#E3C98F]/50 bg-white/5 text-[#E3C98F]">
                  <Icono className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </span>
                <div>
                  <p className="text-lg font-normal text-[#F7EFE4]" style={SERIF}>
                    {titulo}
                  </p>
                  <p className="mt-1 max-w-md text-sm leading-relaxed text-[#D8C7B8] sm:text-[15px]">{texto}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <a
              href={`https://wa.me/573108336425?text=${encodeURIComponent("Hola, quiero cotizar una torta personalizada con papel de azúcar")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D64545] px-7 text-sm font-semibold text-white shadow-[0_12px_30px_-10px_rgba(214,69,69,0.8)] transition-colors hover:bg-[#E35252]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              Cotizar mi torta
            </a>
            <Link
              href="/galeria"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#F7EFE4] underline-offset-4 transition hover:text-[#E3C98F] hover:underline"
            >
              Ver tortas personalizadas
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
