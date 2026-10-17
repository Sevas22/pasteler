"use client"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowRight, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { WhatsAppCTA } from "@/components/whatsapp-cta"
import { cn } from "@/lib/utils"

export type ItemPasarela = {
  id: string
  nombre: string
  categoria: string
  descripcion: string
  imagen: string
  /** Ficha del producto, si la tiene (las tortas personalizadas no). */
  href?: string
  /** Mensaje de WhatsApp del botón principal del modal. */
  mensaje?: string
  /** Texto del botón principal del modal. */
  textoBoton?: string
}

export type EncabezadoPasarela = {
  etiqueta: string
  titulo: string
  italica: string
}

/**
 * Ajustes del efecto. Cambia estos números para afinar la pasarela:
 * - profundidad: px que retrocede cada tarjeta por cada posición que se aleja del centro (translateZ).
 * - inclinacion: grados que gira cada tarjeta por posición (rotateY).
 * - reduccion / escalaMinima: cuánto se encoge cada vecina y el tamaño mínimo.
 * - separacion: distancia horizontal entre tarjetas, como fracción del ancho de la tarjeta.
 * - scrollPorTarjeta: cuánto scroll vertical (en altos de pantalla) cuesta avanzar una tarjeta. Con muchas
 *   tarjetas baja solo (hasta scrollPorTarjetaMinimo) para que el recorrido no pase de recorridoMaximo pantallas.
 */
const AJUSTES = {
  profundidad: 135,
  inclinacion: 15,
  reduccion: 0.055,
  escalaMinima: 0.7,
  separacion: { movil: 0.84, escritorio: 0.9 },
  scrollPorTarjeta: 0.5,
  scrollPorTarjetaMinimo: 0.22,
  recorridoMaximo: 6,
} as const

/** Alto del menú fijo: el escenario se queda pegado justo debajo. */
const ALTO_MENU = 64
/** Alto del bloque de texto de cada tarjeta (categoría + nombre + botón). */
const ALTO_TEXTO = 72
/** Más allá de esta distancia la tarjeta se oculta (y deja de recibir foco y clics). */
const DISTANCIA_VISIBLE = 2.6

const SERIF = { fontFamily: "var(--font-serif), 'Playfair Display', Georgia, serif" }
const dosDigitos = (n: number) => String(n).padStart(2, "0")
const limitar = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

function useMovimientoReducido() {
  const [reducido, setReducido] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const actualizar = () => setReducido(mq.matches)
    actualizar()
    mq.addEventListener("change", actualizar)
    return () => mq.removeEventListener("change", actualizar)
  }, [])
  return reducido
}

/* ───────────── Tarjeta ───────────── */

function Tarjeta({
  item,
  indice,
  total,
  onAbrir,
  onIr,
  estilo,
  refTarjeta,
  refBoton,
  clase,
}: {
  item: ItemPasarela
  indice: number
  total: number
  onAbrir: (i: number, boton: HTMLButtonElement) => void
  onIr?: (i: number) => void
  estilo?: React.CSSProperties
  refTarjeta?: (el: HTMLElement | null) => void
  refBoton?: (el: HTMLButtonElement | null) => void
  clase?: string
}) {
  return (
    <article
      ref={refTarjeta}
      style={estilo}
      aria-roledescription="tarjeta"
      aria-label={`${indice + 1} de ${total}: ${item.nombre}`}
      onClick={onIr ? () => onIr(indice) : undefined}
      className={cn(
        "rounded-[1.4rem] bg-[#F8F5F2] p-3 shadow-[0_30px_60px_-28px_rgba(58,38,32,0.45),0_8px_20px_-12px_rgba(58,38,32,0.18)] sm:p-3.5",
        clase,
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#EDE5DD]">
        <Image
          src={item.imagen}
          alt={item.nombre}
          fill
          sizes="(max-width: 640px) 75vw, 360px"
          className="object-cover"
          draggable={false}
        />
      </div>
      <div className="flex items-center justify-between gap-3 px-1 pt-3" style={{ minHeight: ALTO_TEXTO - 12 }}>
        <div className="min-w-0">
          <p className="truncate font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8B2E2E]/80">
            {item.categoria}
          </p>
          <h3 className="mt-1 truncate text-lg leading-tight text-[#3A2620] sm:text-xl" style={SERIF}>
            {item.nombre}
          </h3>
        </div>
        <button
          ref={refBoton}
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onAbrir(indice, e.currentTarget)
          }}
          aria-label={`Ver detalle de ${item.nombre}`}
          aria-haspopup="dialog"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#8B2E2E] text-white shadow-[0_8px_18px_-8px_rgba(139,46,46,0.8)] transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B2E2E]"
        >
          <Plus className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </article>
  )
}

/* ───────────── Controles (anterior / contador / barra / siguiente) ───────────── */

function Controles({
  activo,
  total,
  onAnterior,
  onSiguiente,
  refBarra,
  progresoInicial = 0,
}: {
  activo: number
  total: number
  onAnterior: () => void
  onSiguiente: () => void
  refBarra?: React.Ref<HTMLSpanElement>
  progresoInicial?: number
}) {
  const boton =
    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#8B2E2E]/30 bg-[#F8F5F2] text-[#8B2E2E] shadow-sm transition-colors hover:bg-[#8B2E2E] hover:text-white disabled:pointer-events-none disabled:opacity-35"
  return (
    <div className="flex items-center gap-4 sm:gap-6">
      <button type="button" onClick={onAnterior} disabled={activo === 0} className={boton} aria-label="Producto anterior">
        <ChevronLeft className="h-5 w-5" aria-hidden />
      </button>
      <p className="w-16 text-center font-sans text-sm font-medium tabular-nums tracking-[0.12em] text-[#3A2620]" aria-live="polite">
        <span className="text-[#8B2E2E]">{dosDigitos(activo + 1)}</span>
        <span className="text-[#3A2620]/45"> / {dosDigitos(total)}</span>
      </p>
      <div
        className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-[#3A2620]/12"
        role="progressbar"
        aria-label="Progreso de la pasarela"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={activo + 1}
      >
        <span
          ref={refBarra}
          className="absolute inset-0 origin-left rounded-full bg-[#8B2E2E]"
          style={{ transform: `scaleX(${progresoInicial})` }}
        />
      </div>
      <button
        type="button"
        onClick={onSiguiente}
        disabled={activo === total - 1}
        className={boton}
        aria-label="Producto siguiente"
      >
        <ChevronRight className="h-5 w-5" aria-hidden />
      </button>
    </div>
  )
}

/* ───────────── Modal ───────────── */

function ModalProducto({ item, onCerrar }: { item: ItemPasarela | null; onCerrar: () => void }) {
  return (
    <Dialog open={Boolean(item)} onOpenChange={(abierto) => !abierto && onCerrar()}>
      <DialogContent className="grid max-h-[90svh] w-[calc(100%-1.5rem)] max-w-3xl grid-cols-1 gap-0 overflow-y-auto rounded-3xl border-0 bg-[#F8F5F2] p-0 sm:grid-cols-2">
        {item ? (
          <>
            <div className="relative aspect-square w-full bg-[#EDE5DD]">
              <Image src={item.imagen} alt={item.nombre} fill sizes="(max-width: 640px) 100vw, 380px" className="object-cover" />
            </div>
            <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8B2E2E]">
                {item.categoria}
              </p>
              <DialogTitle className="text-3xl font-normal leading-tight text-[#3A2620]" style={SERIF}>
                {item.nombre}
              </DialogTitle>
              <DialogDescription className="text-sm leading-relaxed text-[#3A2620]/75 sm:text-base">
                {item.descripcion}
              </DialogDescription>
              <div className="mt-2 flex flex-wrap items-center gap-4">
                <WhatsAppCTA
                  mensaje={item.mensaje ?? `Hola, quiero cotizar: ${item.nombre}`}
                  ruta={item.href}
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#8B2E2E] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#7a2626]"
                >
                  {item.textoBoton ?? "Consultar"}
                </WhatsAppCTA>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#8B2E2E] underline-offset-4 hover:underline"
                  >
                    Ver ficha completa
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                ) : null}
              </div>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}

/* ───────────── Encabezado compartido ───────────── */

const ENCABEZADO_POR_DEFECTO: EncabezadoPasarela = {
  etiqueta: "Pasarela Daliza",
  titulo: "Nuestras creaciones,",
  italica: "una a una.",
}

function Encabezado({ texto, compacto }: { texto: EncabezadoPasarela; compacto?: boolean }) {
  return (
    <div className="text-center">
      <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8B2E2E]">{texto.etiqueta}</p>
      <h2 className={cn("mt-2 text-balance font-normal leading-tight text-[#3A2620]", compacto ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl")} style={SERIF}>
        {texto.titulo} <span className="italic text-[#8B2E2E]">{texto.italica}</span>
      </h2>
    </div>
  )
}

/* ───────────── Versión sin movimiento (prefers-reduced-motion) ───────────── */

function PasarelaSencilla({
  items,
  encabezado,
  onAbrir,
}: {
  items: ItemPasarela[]
  encabezado: EncabezadoPasarela
  onAbrir: (i: number, b: HTMLButtonElement) => void
}) {
  const filaRef = useRef<HTMLDivElement>(null)
  const [activo, setActivo] = useState(0)

  const irA = (i: number) => {
    const fila = filaRef.current
    const destino = fila?.children[limitar(i, 0, items.length - 1)] as HTMLElement | undefined
    if (fila && destino) fila.scrollTo({ left: destino.offsetLeft - (fila.clientWidth - destino.clientWidth) / 2, behavior: "auto" })
  }

  return (
    <section
      data-pasarela
      aria-roledescription="carrusel"
      aria-label={`Pasarela: ${encabezado.etiqueta}`}
      className="bg-[#EDE5DD] px-5 py-16 sm:px-8"
    >
      <Encabezado texto={encabezado} />
      <div
        ref={filaRef}
        onScroll={(e) => {
          const fila = e.currentTarget
          const ancho = (fila.children[0] as HTMLElement | undefined)?.offsetWidth ?? 1
          setActivo(limitar(Math.round(fila.scrollLeft / (ancho + 24)), 0, items.length - 1))
        }}
        className="mx-auto mt-10 flex max-w-6xl snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
      >
        {items.map((item, i) => (
          <Tarjeta key={item.id} item={item} indice={i} total={items.length} onAbrir={onAbrir} clase="w-[min(78vw,320px)] shrink-0 snap-center" />
        ))}
      </div>
      <div className="mx-auto mt-6 max-w-xl">
        <Controles
          activo={activo}
          total={items.length}
          onAnterior={() => irA(activo - 1)}
          onSiguiente={() => irA(activo + 1)}
          progresoInicial={items.length > 1 ? activo / (items.length - 1) : 1}
        />
      </div>
    </section>
  )
}

/* ───────────── Pasarela 3D controlada por el scroll ───────────── */

export function GaleriaPasarela({
  items,
  encabezado = ENCABEZADO_POR_DEFECTO,
}: {
  items: ItemPasarela[]
  encabezado?: EncabezadoPasarela
}) {
  const total = items.length
  const reducido = useMovimientoReducido()
  const scrollPorTarjeta = limitar(
    AJUSTES.recorridoMaximo / Math.max(1, total - 1),
    AJUSTES.scrollPorTarjetaMinimo,
    AJUSTES.scrollPorTarjeta,
  )

  const seccionRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const escenarioRef = useRef<HTMLDivElement>(null)
  const barraRef = useRef<HTMLSpanElement>(null)
  const tarjetasRef = useRef<(HTMLElement | null)[]>([])
  const botonesRef = useRef<(HTMLButtonElement | null)[]>([])
  const medidas = useRef({ separacion: 300, recorrido: 1 })
  const posicionRef = useRef(0)

  const [activo, setActivo] = useState(0)
  const [abierto, setAbierto] = useState<number | null>(null)
  const origenFoco = useRef<HTMLButtonElement | null>(null)

  /* Mide el escenario: tamaño de tarjeta según el alto y ancho disponibles, y la separación entre tarjetas. */
  const medir = useCallback(() => {
    const seccion = seccionRef.current
    const sticky = stickyRef.current
    const escenario = escenarioRef.current
    if (!seccion || !sticky || !escenario) return
    const { width, height } = escenario.getBoundingClientRect()
    const movil = width < 640
    const anchoMax = movil ? width * 0.72 : Math.min(420, width * 0.3)
    // La tarjeta mide (ancho + texto): se limita para que quepa en el alto disponible, aun en pantallas bajas
    const anchoTarjeta = Math.round(limitar(Math.min(anchoMax, height - ALTO_TEXTO - 16), 150, 420))
    escenario.style.setProperty("--ancho-tarjeta", `${anchoTarjeta}px`)
    medidas.current = {
      separacion: anchoTarjeta * (movil ? AJUSTES.separacion.movil : AJUSTES.separacion.escritorio),
      recorrido: Math.max(1, seccion.offsetHeight - sticky.offsetHeight),
    }
  }, [])

  /* Convierte el scroll vertical en la posición de la pasarela y transforma cada tarjeta. */
  const actualizar = useCallback(() => {
    const seccion = seccionRef.current
    if (!seccion) return
    const { separacion, recorrido } = medidas.current
    const progreso = limitar((ALTO_MENU - seccion.getBoundingClientRect().top) / recorrido, 0, 1)
    const posicion = progreso * (total - 1)
    posicionRef.current = posicion

    tarjetasRef.current.forEach((tarjeta, i) => {
      if (!tarjeta) return
      const distancia = i - posicion
      const abs = Math.abs(distancia)
      const escala = Math.max(AJUSTES.escalaMinima, 1 - abs * AJUSTES.reduccion)
      tarjeta.style.transform =
        `translate(-50%, -50%) translateX(${distancia * separacion}px) translateZ(${-abs * AJUSTES.profundidad}px) ` +
        `rotateY(${-distancia * AJUSTES.inclinacion}deg) scale(${escala})`
      tarjeta.style.zIndex = String(1000 - Math.round(abs * 100))
      tarjeta.style.opacity = String(limitar((DISTANCIA_VISIBLE - abs) / 0.6, 0, 1))
      // Solo la tarjeta del centro es interactiva con teclado; las ocultas no reciben clics ni foco
      const oculta = abs >= DISTANCIA_VISIBLE
      tarjeta.inert = oculta
      tarjeta.style.pointerEvents = oculta ? "none" : "auto"
      tarjeta.style.cursor = abs < 0.5 ? "default" : "pointer"
      const boton = botonesRef.current[i]
      if (boton) boton.tabIndex = abs < 0.5 ? 0 : -1
    })

    if (barraRef.current) barraRef.current.style.transform = `scaleX(${progreso})`
    setActivo((a) => {
      const nuevo = Math.round(posicion)
      return a === nuevo ? a : nuevo
    })
  }, [total])

  /* Scroll pasivo + requestAnimationFrame; se vuelve a medir al cambiar el tamaño de la ventana. */
  useEffect(() => {
    if (reducido) return
    let frame = 0
    const programar = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        actualizar()
      })
    }
    const alRedimensionar = () => {
      medir()
      programar()
    }
    medir()
    actualizar()
    window.addEventListener("scroll", programar, { passive: true })
    window.addEventListener("resize", alRedimensionar)
    const observador = new ResizeObserver(alRedimensionar)
    if (escenarioRef.current) observador.observe(escenarioRef.current)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", programar)
      window.removeEventListener("resize", alRedimensionar)
      observador.disconnect()
    }
  }, [reducido, medir, actualizar])

  /* Lleva la página al punto de scroll que deja la tarjeta i en el centro. */
  const irA = useCallback(
    (i: number, suave = true) => {
      const seccion = seccionRef.current
      if (!seccion) return
      const destino = limitar(i, 0, total - 1)
      const inicio = seccion.getBoundingClientRect().top + window.scrollY - ALTO_MENU
      const y = inicio + (destino / Math.max(1, total - 1)) * medidas.current.recorrido
      window.scrollTo({ top: y, behavior: suave ? "smooth" : "auto" })
    },
    [total],
  )

  /* Gestos horizontales en móvil: arrastrar mueve la pasarela de forma continua (el scroll vertical sigue libre). */
  useEffect(() => {
    if (reducido) return
    const escenario = escenarioRef.current
    if (!escenario) return
    let inicioX = 0
    let inicioY = 0
    let ultimoX = 0
    let modo: "indefinido" | "horizontal" | "vertical" = "indefinido"

    const alEmpezar = (e: TouchEvent) => {
      inicioX = ultimoX = e.touches[0].clientX
      inicioY = e.touches[0].clientY
      modo = "indefinido"
    }
    const alMover = (e: TouchEvent) => {
      const x = e.touches[0].clientX
      const y = e.touches[0].clientY
      if (modo === "indefinido") {
        const dx = Math.abs(x - inicioX)
        const dy = Math.abs(y - inicioY)
        if (dx < 8 && dy < 8) return
        modo = dx > dy ? "horizontal" : "vertical"
      }
      if (modo !== "horizontal") return
      const { separacion, recorrido } = medidas.current
      const pasoScroll = recorrido / Math.max(1, total - 1)
      window.scrollBy(0, -(x - ultimoX) * (pasoScroll / separacion))
      ultimoX = x
    }
    const alTerminar = () => {
      if (modo === "horizontal") irA(Math.round(posicionRef.current))
      modo = "indefinido"
    }

    escenario.addEventListener("touchstart", alEmpezar, { passive: true })
    escenario.addEventListener("touchmove", alMover, { passive: true })
    escenario.addEventListener("touchend", alTerminar, { passive: true })
    escenario.addEventListener("touchcancel", alTerminar, { passive: true })
    return () => {
      escenario.removeEventListener("touchstart", alEmpezar)
      escenario.removeEventListener("touchmove", alMover)
      escenario.removeEventListener("touchend", alTerminar)
      escenario.removeEventListener("touchcancel", alTerminar)
    }
  }, [reducido, total, irA])

  const abrir = (i: number, boton: HTMLButtonElement) => {
    // Un "+" de una tarjeta lateral primero la trae al centro
    if (!reducido && Math.round(posicionRef.current) !== i) return irA(i)
    origenFoco.current = boton
    setAbierto(i)
  }

  const modal = (
    <ModalProducto
      item={abierto === null ? null : items[abierto]}
      onCerrar={() => {
        setAbierto(null)
        // Devuelve el foco al "+" que abrió el modal
        requestAnimationFrame(() => origenFoco.current?.focus())
      }}
    />
  )

  if (total === 0) return null

  if (reducido) {
    return (
      <>
        <PasarelaSencilla items={items} encabezado={encabezado} onAbrir={abrir} />
        {modal}
      </>
    )
  }

  return (
    <>
      <section
        ref={seccionRef}
        data-pasarela
        aria-roledescription="carrusel"
        aria-label={`Pasarela: ${encabezado.etiqueta}`}
        className="relative bg-[#EDE5DD]"
        style={{ height: `calc(100svh + ${(total - 1) * scrollPorTarjeta * 100}svh)` }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") irA(activo + 1)
          if (e.key === "ArrowLeft") irA(activo - 1)
        }}
      >
        <div
          ref={stickyRef}
          // pt: deja libre la "barriguita" central del menú (donde va el logo), que baja ~40px más que la barra
          // pb-24 en móvil: los controles quedan por encima del botón flotante de WhatsApp
          className="sticky flex flex-col overflow-hidden px-5 pb-24 pt-12 sm:px-8 sm:pb-8 sm:pt-14"
          style={{ top: ALTO_MENU, height: `calc(100svh - ${ALTO_MENU}px)` }}
        >
          <div className="shrink-0">
            <Encabezado texto={encabezado} compacto />
          </div>

          {/* Escenario 3D: las tarjetas se colocan en el centro y el JS las desplaza en X, Z y las gira en Y */}
          <div
            ref={escenarioRef}
            className="relative my-3 min-h-0 flex-1 select-none [touch-action:pan-y]"
            style={{ perspective: "1400px" }}
          >
            <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
              {items.map((item, i) => (
                <Tarjeta
                  key={item.id}
                  item={item}
                  indice={i}
                  total={total}
                  onAbrir={abrir}
                  onIr={(idx) => Math.round(posicionRef.current) !== idx && irA(idx)}
                  refTarjeta={(el) => {
                    tarjetasRef.current[i] = el
                  }}
                  refBoton={(el) => {
                    botonesRef.current[i] = el
                  }}
                  clase="absolute left-1/2 top-1/2 w-[var(--ancho-tarjeta,300px)] will-change-transform [backface-visibility:hidden]"
                  estilo={{
                    // Posición inicial (antes de que corra el JS): la primera al centro, las demás a la derecha
                    transform: `translate(-50%, -50%) translateX(${i * 270}px) translateZ(${-i * AJUSTES.profundidad}px) rotateY(${-i * AJUSTES.inclinacion}deg) scale(${Math.max(AJUSTES.escalaMinima, 1 - i * AJUSTES.reduccion)})`,
                    zIndex: 1000 - i * 100,
                    opacity: i < DISTANCIA_VISIBLE ? 1 : 0,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="mx-auto w-full max-w-xl shrink-0">
            <Controles
              activo={activo}
              total={total}
              onAnterior={() => irA(activo - 1)}
              onSiguiente={() => irA(activo + 1)}
              refBarra={barraRef}
            />
          </div>
        </div>
      </section>
      {modal}
    </>
  )
}
