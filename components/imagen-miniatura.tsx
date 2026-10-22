"use client"

import { useState, type ComponentProps } from "react"
import Image from "next/image"
import { urlImagen } from "@/lib/imagenes"

/**
 * Foto de tarjeta o de ficha: pide la versión liviana (miniatura local o reducida al vuelo desde Supabase) y,
 * si esa falla, vuelve sola a la foto original. Recibe la ruta de la foto original y el ancho aproximado en pantalla.
 */
export function ImagenMiniatura({
  src,
  alt,
  ancho = 480,
  ...resto
}: Omit<ComponentProps<typeof Image>, "src"> & { src: string; ancho?: number }) {
  const [fallo, setFallo] = useState(false)
  return <Image {...resto} alt={alt} src={fallo ? src : urlImagen(src, ancho)} onError={() => setFallo(true)} />
}
