import Image from "next/image"
import { ClipboardList, GraduationCap, MessageCircle, MessageSquareWarning } from "lucide-react"
import type { Location } from "@/lib/data/locations"
import type { Course } from "@/lib/data/courses"
import { FormulariosSolicitud } from "@/components/formularios-solicitud"
import { FondoMarca } from "@/components/ornaments/fondo-marca"
import { WhatsAppCTA } from "@/components/whatsapp-cta"

const SERIF = { fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }

const OPCIONES = [
  { Icono: ClipboardList, titulo: "Cotiza tu pedido", texto: "Tortas personalizadas, postres o pedidos para eventos." },
  { Icono: GraduationCap, titulo: "Aprende con nosotros", texto: "Recibe fechas, valores y cupos de los cursos." },
  { Icono: MessageSquareWarning, titulo: "PQRS", texto: "Cuéntanos tu petición, queja, reclamo o sugerencia." },
] as const

/** Formularios de solicitud en el inicio (los mismos de /contacto; llegan a /admin/solicitudes). */
export function SolicitudHome({ locations, courses }: { locations: Location[]; courses: Course[] }) {
  return (
    <section
      id="solicitud"
      data-no-section-divider
      className="isolate relative scroll-mt-24 overflow-hidden bg-[#FBF6EF] px-5 py-20 sm:px-8 lg:px-12 lg:py-24"
    >
      <FondoMarca variante="suave" />

      <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        {/* Columna de presentación */}
        <div className="flex flex-col">
          <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-primary">
            <span className="h-px w-10 bg-primary/60" aria-hidden />
            Escríbenos
          </p>
          <p
            className="mt-4 text-balance text-4xl font-normal leading-[1.08] text-[#2E1216] sm:text-5xl"
            style={SERIF}
          >
            ¿Qué tienes en <span className="italic text-[#8B1C32]">mente?</span>
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            Déjanos tus datos y te contactamos. Elige el formulario según lo que necesites:
          </p>

          <ul className="mt-7 space-y-4">
            {OPCIONES.map(({ Icono, titulo, texto }) => (
              <li key={titulo} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F8E4E1] text-[#8B1C32]">
                  <Icono className="h-5 w-5" strokeWidth={1.6} aria-hidden />
                </span>
                <div>
                  <p className="text-base text-[#7A1A2A]" style={SERIF}>
                    {titulo}
                  </p>
                  <p className="text-sm text-muted-foreground">{texto}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="relative mt-8 hidden aspect-[4/3] overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-30px_rgba(90,31,38,0.45)] lg:block">
            <Image
              src="/images/banners/hero-torta-amapola.webp"
              alt="Torta Daliza decorada"
              fill
              sizes="(min-width: 1024px) 40vw, 0px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3A1418]/70 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-3 p-5">
              <p className="text-sm text-white/90">¿Prefieres algo inmediato?</p>
              <WhatsAppCTA
                mensaje="Hola, quiero información de Daliza Pastelería Fina"
                className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#25D366] px-5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                WhatsApp
              </WhatsAppCTA>
            </div>
          </div>
        </div>

        {/* Formularios */}
        <div className="rounded-[2rem] border border-[#C9A96E]/30 bg-white/90 p-5 shadow-[0_30px_70px_-40px_rgba(90,31,38,0.4)] backdrop-blur-sm sm:p-8">
          <FormulariosSolicitud locations={locations} courses={courses} />
        </div>
      </div>
    </section>
  )
}
