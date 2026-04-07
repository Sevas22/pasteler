import Image from "next/image"
import { MEDIA } from "@/lib/media"

/**
 * Banner /cursos a pantalla completa: encuadre pensado para composición texto izquierda + foto derecha (landscape).
 * Espaciador superior = altura del header fijo: la imagen no se dibuja bajo el nav (texto del PNG legible).
 */
export function CoursesPageHeader() {
  return (
    <section
      className="relative min-h-svh w-full overflow-hidden bg-[#5c4a36]"
      aria-label="Promoción de cursos de pastelería Daliza"
    >
      {/* Espaciador: mismo tono que el header; debajo empieza foto + degradado (top-28 / sm:7.25rem) */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-28 bg-brand-cream sm:h-[7.25rem]"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 top-28 z-0 sm:top-[7.25rem]"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% 40%, rgba(212, 180, 130, 0.35), transparent 55%), linear-gradient(180deg, #7d6548 0%, #5c4a36 45%, #4a3b2c 100%)",
        }}
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-28 z-[1] sm:top-[7.25rem]">
        <div className="relative h-full w-full min-h-[calc(100svh-7rem)] sm:min-h-[calc(100svh-7.25rem)]">
          <Image
            src={MEDIA.cursosBannerFondo}
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover object-[42%_48%] sm:object-[32%_48%] md:object-[40%_46%] lg:object-[46%_44%] xl:object-[50%_42%]"
          />
        </div>
      </div>

      {/* Transición suave hacia la lista de cursos */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-24 bg-gradient-to-t from-background via-background/55 to-transparent sm:h-28"
        aria-hidden
      />

      <h1 className="sr-only">Próximamente curso de pastelería — Daliza Pastelería Fina</h1>
    </section>
  )
}
