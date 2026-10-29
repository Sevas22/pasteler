"use client"

import { useEffect, useRef, useState } from "react"
import { Minus, Plus, X } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { ImagenMiniatura } from "@/components/imagen-miniatura"

const ESCALA_MAXIMA = 4
/** Cuánto se acerca la foto al tocarla o hacerle doble clic. */
const ESCALA_AL_TOCAR = 2.5
/** Movimiento (px) a partir del cual un toque deja de contar como "toque" y pasa a ser arrastre. */
const UMBRAL_ARRASTRE = 6

const limitar = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

type Vista = { escala: number; x: number; y: number }

/**
 * La posición y el zoom viven en una referencia y se escriben directo en el `transform` de la foto: así arrastrar o
 * pellizcar no vuelve a renderizar React en cada movimiento del dedo (en celular y tableta eso era lo que lo trababa).
 */
function Lienzo({ src, alt }: { src: string; alt: string }) {
  const lienzoRef = useRef<HTMLDivElement>(null)
  const cajaRef = useRef<HTMLDivElement>(null)
  const porcentajeRef = useRef<HTMLParagraphElement>(null)
  const vista = useRef<Vista>({ escala: 1, x: 0, y: 0 })
  const punteros = useRef(new Map<number, { x: number; y: number }>())
  const gesto = useRef({ recorrido: 0, distancia: 0, huboVarios: false, arrastrando: false })
  // Solo cambian al llegar a los extremos, así que casi nunca vuelven a renderizar
  const [enMinimo, setEnMinimo] = useState(true)
  const [enMaximo, setEnMaximo] = useState(false)
  const [nitida, setNitida] = useState(false)
  // Medidas del lienzo guardadas de antemano: leerlas en cada movimiento obligaría al navegador a recalcular el diseño
  const medidas = useRef({ left: 0, top: 0, width: 1, height: 1 })

  const medir = () => {
    const r = lienzoRef.current?.getBoundingClientRect()
    if (r) medidas.current = { left: r.left, top: r.top, width: r.width, height: r.height }
  }

  useEffect(() => {
    medir()
    window.addEventListener("resize", medir)
    return () => window.removeEventListener("resize", medir)
  }, [])

  const pintar = (suave: boolean) => {
    const { escala, x, y } = vista.current
    const caja = cajaRef.current
    if (caja) {
      caja.style.transition = suave ? "transform 220ms ease-out" : "none"
      caja.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${escala})`
    }
    if (porcentajeRef.current) porcentajeRef.current.textContent = `${Math.round(escala * 100)}%`
    if (lienzoRef.current) lienzoRef.current.style.cursor = gesto.current.arrastrando ? "grabbing" : escala > 1 ? "zoom-out" : "zoom-in"
    setEnMinimo(escala <= 1)
    setEnMaximo(escala >= ESCALA_MAXIMA)
  }

  /** Aplica una nueva vista sin salirse de los bordes de la foto. */
  const fijar = (escala: number, x: number, y: number, suave = false) => {
    const caja = medidas.current
    const e = limitar(escala, 1, ESCALA_MAXIMA)
    if (e === 1) vista.current = { escala: e, x: 0, y: 0 }
    else {
      const maxX = ((e - 1) * caja.width) / 2
      const maxY = ((e - 1) * caja.height) / 2
      vista.current = { escala: e, x: limitar(x, -maxX, maxX), y: limitar(y, -maxY, maxY) }
    }
    pintar(suave)
  }

  /** Cambia el zoom multiplicándolo por `factor`, dejando quieto el punto (cx, cy) medido desde el centro. */
  const zoomPor = (factor: number, cx = 0, cy = 0, suave = false) => {
    const v = vista.current
    const escala = limitar(v.escala * factor, 1, ESCALA_MAXIMA)
    const k = escala / v.escala
    fijar(escala, cx - (cx - v.x) * k, cy - (cy - v.y) * k, suave)
  }

  const desdeElCentro = (clientX: number, clientY: number) => {
    const caja = medidas.current
    return { x: clientX - (caja.left + caja.width / 2), y: clientY - (caja.top + caja.height / 2) }
  }

  const alPresionar = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    punteros.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (punteros.current.size === 1) {
      // Una sola lectura por gesto (el diálogo se anima al abrirse, así que la medida de antes puede estar encogida)
      medir()
      gesto.current = { recorrido: 0, distancia: 0, huboVarios: false, arrastrando: false }
    } else gesto.current.huboVarios = true
  }

  const alMover = (e: React.PointerEvent<HTMLDivElement>) => {
    const anterior = punteros.current.get(e.pointerId)
    if (!anterior) return
    const actual = { x: e.clientX, y: e.clientY }
    punteros.current.set(e.pointerId, actual)

    if (punteros.current.size >= 2) {
      // Pellizco con dos dedos
      const [a, b] = [...punteros.current.values()]
      const distancia = Math.hypot(a.x - b.x, a.y - b.y)
      if (gesto.current.distancia > 0) {
        const centro = desdeElCentro((a.x + b.x) / 2, (a.y + b.y) / 2)
        zoomPor(distancia / gesto.current.distancia, centro.x, centro.y)
      }
      gesto.current.distancia = distancia
      return
    }

    const dx = actual.x - anterior.x
    const dy = actual.y - anterior.y
    gesto.current.recorrido += Math.hypot(dx, dy)
    if (gesto.current.recorrido > UMBRAL_ARRASTRE) {
      gesto.current.arrastrando = true
      const v = vista.current
      if (v.escala > 1) fijar(v.escala, v.x + dx, v.y + dy)
    }
  }

  const alSoltar = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!punteros.current.delete(e.pointerId)) return
    gesto.current.distancia = 0
    if (punteros.current.size > 0) return
    const fueToque = e.type === "pointerup" && !gesto.current.huboVarios && gesto.current.recorrido <= UMBRAL_ARRASTRE
    gesto.current.arrastrando = false
    // Un toque sin arrastre acerca la foto en ese punto (o la devuelve a su tamaño si ya estaba acercada)
    if (fueToque) {
      if (vista.current.escala > 1) fijar(1, 0, 0, true)
      else {
        const punto = desdeElCentro(e.clientX, e.clientY)
        zoomPor(ESCALA_AL_TOCAR, punto.x, punto.y, true)
      }
    } else pintar(false)
  }

  const alRodar = (e: React.WheelEvent<HTMLDivElement>) => {
    const punto = desdeElCentro(e.clientX, e.clientY)
    zoomPor(Math.exp(-e.deltaY * 0.002), punto.x, punto.y)
  }

  const alTeclear = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "+" || e.key === "=") zoomPor(1.4)
    else if (e.key === "-") zoomPor(1 / 1.4)
    else if (e.key === "0") fijar(1, 0, 0, true)
  }

  const botonControl =
    "flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:pointer-events-none disabled:opacity-35"

  return (
    <>
      <div
        ref={lienzoRef}
        onPointerDown={alPresionar}
        onPointerMove={alMover}
        onPointerUp={alSoltar}
        onPointerCancel={alSoltar}
        onWheel={alRodar}
        onKeyDown={alTeclear}
        tabIndex={0}
        role="img"
        aria-label={alt}
        className="absolute inset-0 select-none overflow-hidden outline-none [touch-action:none]"
        style={{ cursor: "zoom-in" }}
      >
        <div ref={cajaRef} className="absolute inset-x-3 bottom-24 top-16 will-change-transform sm:inset-x-10">
          {/* Al instante se ve la misma foto que ya cargó la tarjeta; la versión grande aparece encima cuando termina de bajar */}
          <ImagenMiniatura
            src={src}
            ancho={640}
            alt={alt}
            fill
            priority
            sizes="100vw"
            className={`object-contain ${nitida ? "invisible" : ""}`}
            draggable={false}
          />
          <ImagenMiniatura
            src={src}
            ancho={1280}
            alt=""
            fill
            sizes="100vw"
            onLoad={() => setNitida(true)}
            className={`object-contain transition-opacity duration-300 ${nitida ? "opacity-100" : "opacity-0"}`}
            draggable={false}
          />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 pb-6 pt-3">
        <div className="flex items-center gap-3">
          <button type="button" className={botonControl} aria-label="Alejar" disabled={enMinimo} onClick={() => zoomPor(1 / 1.5, 0, 0, true)}>
            <Minus className="h-5 w-5" aria-hidden />
          </button>
          <p ref={porcentajeRef} className="w-14 text-center text-sm font-medium tabular-nums text-white" aria-live="polite">
            100%
          </p>
          <button type="button" className={botonControl} aria-label="Acercar" disabled={enMaximo} onClick={() => zoomPor(1.5, 0, 0, true)}>
            <Plus className="h-5 w-5" aria-hidden />
          </button>
        </div>
        <p className="px-6 text-center text-xs text-white/65">Toca la foto para acercar · arrastra para moverla</p>
      </div>
    </>
  )
}

/** Foto a pantalla completa con zoom: toque o doble clic, rueda del mouse, pellizco y botones +/−. */
export function VisorZoom({
  foto,
  onCerrar,
}: {
  foto: { src: string; nombre: string } | null
  onCerrar: () => void
}) {
  return (
    <Dialog open={Boolean(foto)} onOpenChange={(abierto) => !abierto && onCerrar()}>
      <DialogContent
        showCloseButton={false}
        className="left-0 top-0 z-[70] h-[100dvh] max-w-none translate-x-0 translate-y-0 gap-0 rounded-none border-0 bg-[#1b1210] p-0 duration-150 sm:max-w-none"
      >
        {foto ? (
          <>
            <DialogTitle className="absolute left-5 top-5 right-20 z-10 truncate text-base font-normal text-white sm:left-10">
              {foto.nombre}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Foto ampliada. Acerca con los botones, la rueda del mouse o pellizcando, y arrastra para moverla.
            </DialogDescription>
            <Lienzo src={foto.src} alt={foto.nombre} />
            <DialogClose
              aria-label="Cerrar"
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-8"
            >
              <X className="h-5 w-5" aria-hidden />
            </DialogClose>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
