/** Carga de la API iframe de YouTube (compartida entre embeds). */

export type YTPlayer = {
  playVideo: () => void
  pauseVideo: () => void
  mute: () => void
  unMute: () => void
  setVolume: (n: number) => void
  isMuted: () => boolean
  getIframe: () => HTMLIFrameElement | null
  destroy: () => void
}

export type YTNamespace = {
  Player: new (
    id: string | HTMLElement,
    opts: {
      videoId: string
      width?: string | number
      height?: string | number
      playerVars: Record<string, string | number>
      events?: {
        onReady?: (e: { target: YTPlayer }) => void
        onStateChange?: (e: { target: YTPlayer; data: number }) => void
      }
    },
  ) => YTPlayer
}

/** Estados del reproductor (IFrame API) — ENDED = 0 */
export const YT_PLAYER_ENDED = 0

declare global {
  interface Window {
    YT?: YTNamespace
    onYouTubeIframeAPIReady?: () => void
  }
}

export function applyYoutubeCoverStyles(iframe: HTMLIFrameElement | null) {
  if (!iframe) return
  Object.assign(iframe.style, {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "100vw",
    height: "56.25vw",
    minHeight: "100vh",
    minWidth: "177.77vh",
    transform: "translate(-50%, -50%)",
    border: "0",
    pointerEvents: "none",
  })
}

/** Encaja el vídeo 16:9 entero en el viewport (sin recortar; puede dejar bandas). */
export function applyYoutubeContainStyles(iframe: HTMLIFrameElement | null) {
  if (!iframe || typeof window === "undefined") return
  const vw = window.innerWidth
  const vh = window.innerHeight
  const videoAr = 16 / 9
  const viewAr = vw / vh

  let width: number
  let height: number
  if (viewAr > videoAr) {
    height = vh
    width = vh * videoAr
  } else {
    width = vw
    height = vw / videoAr
  }

  Object.assign(iframe.style, {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: `${width}px`,
    height: `${height}px`,
    minWidth: "unset",
    minHeight: "unset",
    maxWidth: "none",
    maxHeight: "none",
    transform: "translate(-50%, -50%)",
    border: "0",
    pointerEvents: "none",
  })
}

export function applyYoutubeEmbeddedStyles(iframe: HTMLIFrameElement | null) {
  if (!iframe) return
  Object.assign(iframe.style, {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    border: "0",
  })
}

export function loadYoutubeApi(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve()
      return
    }
    if (window.YT?.Player) {
      resolve()
      return
    }
    const existing = document.querySelector<HTMLScriptElement>('script[src*="youtube.com/iframe_api"]')
    const done = () => resolve()
    const prev = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      prev?.()
      done()
    }
    if (!existing) {
      const tag = document.createElement("script")
      tag.src = "https://www.youtube.com/iframe_api"
      tag.async = true
      document.head.appendChild(tag)
    } else {
      const t = setInterval(() => {
        if (window.YT?.Player) {
          clearInterval(t)
          done()
        }
      }, 50)
    }
  })
}
