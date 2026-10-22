import { NextResponse, type NextRequest } from "next/server"
import sharp from "sharp"

/**
 * Reduce al vuelo las fotos de productos que se suben desde el panel admin (Supabase Storage).
 * Esas fotos llegan de 1254 px y hasta 3,9 MB; en una tarjeta se ven a ~280 px. Aquí se convierten a WebP
 * del ancho pedido (pasan de cientos de KB a ~20-60 KB) y el resultado queda en caché de por vida
 * (la URL de cada foto es única: si se cambia la foto, cambia la URL).
 *
 *   /api/imagen?u=<URL de la foto en Supabase>&w=<ancho>
 *
 * Solo acepta fotos del bucket público `daliza-media` de Supabase y anchos de la lista: no es un proxy abierto.
 */
export const runtime = "nodejs"

const ORIGEN_PERMITIDO = /^https:\/\/[a-z0-9]+\.supabase\.co\/storage\/v1\/object\/public\/daliza-media\//
const ANCHOS = [160, 240, 360, 480, 640, 800, 1000, 1280] as const
const MAX_ORIGINAL = 15 * 1024 * 1024

export async function GET(request: NextRequest) {
  const u = request.nextUrl.searchParams.get("u") ?? ""
  const w = Number(request.nextUrl.searchParams.get("w"))

  if (!ORIGEN_PERMITIDO.test(u) || !(ANCHOS as readonly number[]).includes(w)) {
    return new NextResponse("Parámetros no válidos", { status: 400 })
  }

  try {
    const respuesta = await fetch(u)
    if (!respuesta.ok) throw new Error(`origen ${respuesta.status}`)
    const original = Buffer.from(await respuesta.arrayBuffer())
    if (original.length > MAX_ORIGINAL) throw new Error("foto demasiado grande")

    const webp = await sharp(original, { failOn: "none" })
      .rotate() // respeta la orientación de las fotos tomadas con celular
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 76, effort: 4 })
      .toBuffer()

    return new NextResponse(new Uint8Array(webp), {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=31536000, s-maxage=31536000, immutable",
      },
    })
  } catch (error) {
    console.error("[api/imagen]", error instanceof Error ? error.message : error)
    // Nunca se deja una foto rota: si algo falla, se manda a la original (sin guardar en caché)
    return NextResponse.redirect(u, { status: 302, headers: { "Cache-Control": "no-store" } })
  }
}
