"use client"

import { EmbedYoutube } from "@/components/embed-youtube"

/**
 * Fondo de vídeo a pantalla completa (legacy). Preferir `EmbedYoutube` o la sección de vídeo.
 */
export function HeroYoutubeBackground() {
  return <EmbedYoutube variant="background" />
}
