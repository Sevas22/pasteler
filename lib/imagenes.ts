/**
 * Dirección liviana de una foto de producto, según dónde se muestre.
 *
 * - Fotos del catálogo en /images/productos y /images/galeria/tortas (1000 px, ~85 KB): para tarjetas
 *   hay miniaturas de 480 px (~21 KB) en /images/miniaturas/ con la misma ruta.
 * - Fotos subidas desde el panel admin (Supabase Storage, hasta 3,9 MB y 1254 px): se piden a /api/imagen,
 *   que las reduce al ancho pedido y las deja en caché.
 * - Cualquier otra foto se devuelve igual.
 *
 * `ancho` es el ancho aproximado en pantalla (tarjeta ≈ 480, ficha o ventana grande ≈ 1000, miniaturita ≈ 160).
 */
const ORIGEN_SUPABASE = /^https:\/\/[a-z0-9]+\.supabase\.co\/storage\/v1\/object\/public\/daliza-media\//
const CON_MINIATURA = ["/images/productos/", "/images/galeria/tortas/"]
const ANCHOS = [160, 240, 360, 480, 640, 800, 1000, 1280] as const

export function urlImagen(src: string, ancho = 480): string {
  if (ORIGEN_SUPABASE.test(src)) {
    const w = ANCHOS.find((a) => a >= ancho) ?? ANCHOS[ANCHOS.length - 1]
    return `/api/imagen?u=${encodeURIComponent(src)}&w=${w}`
  }
  if (ancho <= 480 && CON_MINIATURA.some((prefijo) => src.startsWith(prefijo))) {
    return src.replace("/images/", "/images/miniaturas/")
  }
  return src
}
