"use client"

import { useRef, useState } from "react"
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

function Lienzo({ src, alt }: { src: string; alt: string }) {
  const lienzoRef = useRef<HTMLDivElement>(null)
  const [vista, setVista] = useState<Vista>({ escala: 1, x: 0, y: 0 })
  const [moviendo, setMoviendo] = useState(false)
  const [nitida, setNitida] = useState(false)
  const punteros = useRef(new Map<number, { x: number; y: number }>())
  const gesto = useRef({ recorrido: 0, distancia: 0, huboVarios: false })

  /** Mantiene la foto dentro del recuadro: no se puede arrastrar más allá de sus bordes. */
  const ajustar = (escala: number, x: number, y: number): Vista => {
    const caja = lienzoRef.current?.getBoundingClientRect()
    const e = limitar(escala, 1, ESCALA_MAXIMA)
    if (e === 1 || !caja) return { escala: e, x: 0, y: 0 }
    const maxX = ((e - 1) * caja.width) / 2
    const maxY = ((e - 1) * caja.height) / 2
    return { escala: e, x: limitar(x, -maxX, maxX), y: limitar(y, -maxY, maxY) }
  }

  /** Cambia el zoom multiplicándolo por `factor`, dejando quieto el punto (cx, cy) medido desde el centro. */
  const zoomPor = (factor: number, cx = 0, cy = 0) =>
    setVista((v) => {
      const escala = limitar(v.escala * factor, 1, ESCALA_MAXIMA)
      const k = escala / v.escala
      return ajustar(escala, cx - (cx - v.x) * k, cy - (cy - v.y) * k)
    })

  const desdeElCentro = (clientX: number, clientY: number) => {
    const caja = lienzoRef.current?.getBoundingClientRect()
    if (!caja) return { x: 0, y: 0 }
    return { x: clientX - (caja.left + caja.width / 2), y: clientY - (caja.top + caja.height / 2) }
  }

  const alPresionar = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    punteros.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (punteros.current.size === 1) gesto.current = { recorrido: 0, distancia: 0, huboVarios: false }
    else gesto.current.huboVarios = true
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
      setMoviendo(true)
      return
    }

    const dx = actual.x - anterior.x
    const dy = actual.y - anterior.y
    gesto.current.recorrido += Math.hypot(dx, dy)
    if (gesto.current.recorrido > UMBRAL_ARRASTRE) {
      setMoviendo(true)
      setVista((v) => (v.escala > 1 ? ajustar(v.escala, v.x + dx, v.y + dy) : v))
    }
  }

  const alSoltar = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!punteros.current.delete(e.pointerId)) return
    gesto.current.distancia = 0
    if (punteros.current.size > 0) return
    setMoviendo(false)
    // Un toque sin arrastre acerca la foto en ese punto (o la devuelve a su tamaño si ya estaba acercada)
    if (e.type === "pointerup" && !gesto.current.huboVarios && gesto.current.recorrido <= UMBRAL_ARRASTRE) {
      const punto = desdeElCentro(e.clientX, e.clientY)
      if (vista.escala > 1) setVista({ escala: 1, x: 0, y: 0 })
      else zoomPor(ESCALA_AL_TOCAR, punto.x, punto.y)
    }
  }

  const alRodar = (e: React.WheelEvent<HTMLDivElement>) => {
    const punto = desdeElCentro(e.clientX, e.clientY)
    zoomPor(Math.exp(-e.deltaY * 0.002), punto.x, punto.y)
  }

  const alTeclear = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "+" || e.key === "=") zoomPor(1.4)
    else if (e.key === "-") zoomPor(1 / 1.4)
    else if (e.key === "0") setVista({ escala: 1, x: 0, y: 0 })
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
        style={{ cursor: moviendo ? "grabbing" : vista.escala > 1 ? "zoom-out" : "zoom-in" }}
      >
        <div
          className="absolute inset-x-3 bottom-24 top-16 sm:inset-x-10"
          style={{
            transform: `translate(${vista.x}px, ${vista.y}px) scale(${vista.escala})`,
            transition: moviendo ? "none" : "transform 220ms ease-out",
          }}
        >
          {/* Al instante se ve la misma foto que ya cargó la tarjeta; la versión grande aparece encima cuando termina de bajar */}
          <ImagenMiniatura src={src} ancho={640} alt={alt} fill priority sizes="100vw" className="object-contain" draggable={false} />
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
          <button type="button" className={botonControl} aria-label="Alejar" disabled={vista.escala <= 1} onClick={() => zoomPor(1 / 1.5)}>
            <Minus className="h-5 w-5" aria-hidden />
          </button>
          <p className="w-14 text-center text-sm font-medium tabular-nums text-white" aria-live="polite">
            {Math.round(vista.escala * 100)}%
          </p>
          <button type="button" className={botonControl} aria-label="Acercar" disabled={vista.escala >= ESCALA_MAXIMA} onClick={() => zoomPor(1.5)}>
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
        className="left-0 top-0 z-[70] h-[100dvh] max-w-none translate-x-0 translate-y-0 gap-0 rounded-none border-0 bg-[#1b1210]/95 p-0 sm:max-w-none"
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
