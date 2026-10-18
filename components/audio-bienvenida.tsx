"use client"

import { useEffect, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"

/** Audio de marca ("Daliza, pastelería fina"): suena al entrar al sitio o al escanear el QR de una sede. */
const AUDIO_SRC = "/audio/bienvenida.mp3"
/** Una sola vez por visita: no se repite al navegar entre páginas. */
const CLAVE_SESION = "daliza-audio-bienvenida"
/** En celulares el navegador solo habilita el sonido al terminar el toque (pointerup/touchend/click), no al empezarlo. */
const EVENTOS_GESTO = ["pointerdown", "pointerup", "touchend", "click", "keydown"] as const

function yaSono(): boolean {
  try {
    return sessionStorage.getItem(CLAVE_SESION) === "1"
  } catch {
    return false
  }
}

function marcarSonado() {
  try {
    sessionStorage.setItem(CLAVE_SESION, "1")
  } catch {}
}

type Estado = "inactivo" | "esperando-toque" | "sonando"

export function AudioBienvenida() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [estado, setEstado] = useState<Estado>("inactivo")

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || yaSono()) return
    let activo = true

    const quitarEscuchas = () => EVENTOS_GESTO.forEach((e) => window.removeEventListener(e, alPrimerGesto))
    const reproducir = () =>
      audio.play().then(() => {
        marcarSonado()
        quitarEscuchas()
      })
    function alPrimerGesto() {
      reproducir().catch(() => {})
    }

    // Los navegadores suelen bloquear el sonido hasta que la persona interactúa: en ese caso se invita a escuchar
    // y el audio suena con el primer toque o clic en cualquier parte de la página.
    reproducir().catch(() => {
      if (!activo || yaSono()) return
      EVENTOS_GESTO.forEach((e) => window.addEventListener(e, alPrimerGesto, { passive: true }))
      setEstado("esperando-toque")
    })

    return () => {
      activo = false
      quitarEscuchas()
    }
  }, [])

  const cerrar = () => {
    audioRef.current?.pause()
    marcarSonado()
    setEstado("inactivo")
  }

  return (
    <>
      {/* preload="none": los 190 KB solo se descargan cuando de verdad va a sonar (una vez por visita) */}
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        preload="none"
        onPlay={() => setEstado("sonando")}
        onPause={() => setEstado("inactivo")}
        onEnded={() => setEstado("inactivo")}
      />
      {estado === "esperando-toque" ? (
        <button
          type="button"
          onClick={() => audioRef.current?.play().catch(() => {})}
          className="hero-pulso fixed bottom-8 left-[88px] z-[60] sm:bottom-11 sm:left-[118px] lg:bottom-12 lg:left-[134px] inline-flex items-center gap-2 rounded-full border border-[#C9A96E]/50 bg-[#2a1210]/90 px-4 py-2.5 text-sm font-medium text-[#F7EFE4] shadow-lg backdrop-blur-md transition-colors hover:bg-[#2a1210]"
        >
          <Volume2 className="h-4 w-4 text-[#E3C98F]" aria-hidden />
          Escuchar
        </button>
      ) : null}
      {estado === "sonando" ? (
        <button
          type="button"
          onClick={cerrar}
          className="fixed bottom-8 left-[88px] z-[60] sm:bottom-11 sm:left-[118px] lg:bottom-12 lg:left-[134px] inline-flex items-center gap-2 rounded-full border border-[#C9A96E]/40 bg-[#2a1210]/90 px-4 py-2 text-xs font-medium text-[#F7EFE4] shadow-lg backdrop-blur-md transition-colors hover:bg-[#2a1210]"
        >
          <VolumeX className="h-4 w-4 text-[#E3C98F]" aria-hidden />
          Silenciar
        </button>
      ) : null}
    </>
  )
}
