"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import {
  applyYoutubeCoverStyles,
  applyYoutubeEmbeddedStyles,
  loadYoutubeApi,
  type YTPlayer,
} from "@/lib/youtube-iframe"
import { HERO_YOUTUBE_ID } from "@/lib/branding-video"

type EmbedYoutubeProps = {
  videoId?: string
  /** Fondo a pantalla completa (p. ej. antiguo hero) */
  variant: "background" | "embedded"
  className?: string
}

/**
 * Reproductor YouTube API: modo background (cover viewport) o embedded (16:9 con controles).
 */
export function EmbedYoutube({ videoId = HERO_YOUTUBE_ID, variant, className }: EmbedYoutubeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<YTPlayer | null>(null)
  const [showSoundHint, setShowSoundHint] = useState(false)

  const tryEnableSound = useCallback(() => {
    const p = playerRef.current
    if (!p) return
    try {
      p.unMute()
      p.setVolume(100)
      if (!p.isMuted?.()) {
        setShowSoundHint(false)
      }
    } catch {
      /* noop */
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    const onFirstInteraction = () => {
      tryEnableSound()
      setShowSoundHint(false)
      window.removeEventListener("pointerdown", onFirstInteraction)
      window.removeEventListener("keydown", onFirstInteraction)
    }

    ;(async () => {
      await loadYoutubeApi()
      if (cancelled || !containerRef.current || !window.YT?.Player) return

      const embedded = variant === "embedded"
      const player = new window.YT.Player(containerRef.current, {
        videoId,
        width: "100%",
        height: "100%",
        playerVars: embedded
          ? {
              autoplay: 1,
              mute: 1,
              loop: 1,
              playlist: videoId,
              controls: 1,
              rel: 0,
              modestbranding: 1,
              playsinline: 1,
              iv_load_policy: 3,
              cc_load_policy: 0,
            }
          : {
              autoplay: 1,
              mute: 1,
              loop: 1,
              playlist: videoId,
              controls: 0,
              rel: 0,
              modestbranding: 1,
              playsinline: 1,
              fs: 0,
              iv_load_policy: 3,
              cc_load_policy: 0,
              disablekb: 1,
            },
        events: {
          onReady: (e) => {
            const p = e.target
            playerRef.current = p
            p.playVideo()
            const iframe = p.getIframe?.() ?? null
            if (embedded) {
              applyYoutubeEmbeddedStyles(iframe)
            } else {
              applyYoutubeCoverStyles(iframe)
            }
            p.unMute()
            p.setVolume(100)
            if (p.isMuted?.()) {
              setShowSoundHint(true)
              window.addEventListener("pointerdown", onFirstInteraction, { passive: true })
              window.addEventListener("keydown", onFirstInteraction)
            } else {
              setShowSoundHint(false)
            }
          },
        },
      })
      playerRef.current = player
    })()

    return () => {
      cancelled = true
      window.removeEventListener("pointerdown", onFirstInteraction)
      window.removeEventListener("keydown", onFirstInteraction)
      try {
        playerRef.current?.destroy?.()
      } catch {
        /* noop */
      }
      playerRef.current = null
    }
  }, [tryEnableSound, variant, videoId])

  if (variant === "embedded") {
    return (
      <div className={cn("relative w-full overflow-hidden rounded-2xl", className)}>
        <div className="aspect-video w-full">
          <div ref={containerRef} className="absolute inset-0 h-full w-full" />
        </div>
        {showSoundHint && (
          <button
            type="button"
            onClick={() => {
              tryEnableSound()
              setShowSoundHint(false)
            }}
            className="absolute bottom-4 right-4 z-20 rounded-full border border-brand-gold/60 bg-brand-cream/95 px-4 py-2 text-sm font-medium text-primary shadow-md backdrop-blur-sm transition duration-200 hover:bg-primary hover:text-primary-foreground"
          >
            Activar sonido
          </button>
        )}
      </div>
    )
  }

  return (
    <>
      <div className={cn("absolute inset-0 z-0 overflow-hidden", className)} aria-hidden>
        <div ref={containerRef} className="pointer-events-none absolute inset-0 h-full min-h-full w-full" />
      </div>
      {showSoundHint && (
        <button
          type="button"
          onClick={() => {
            tryEnableSound()
            setShowSoundHint(false)
          }}
          className="pointer-events-auto absolute bottom-24 left-1/2 z-[25] -translate-x-1/2 rounded-full border border-brand-gold/60 bg-brand-cream/95 px-5 py-2.5 text-sm font-medium text-primary shadow-md backdrop-blur-sm transition duration-200 hover:bg-primary hover:text-primary-foreground md:bottom-28"
        >
          Activar sonido
        </button>
      )}
    </>
  )
}
