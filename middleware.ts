import { type NextRequest } from "next/server"
import { updateSession } from "@/lib/supabase/middleware"

export async function middleware(request: NextRequest) {
  return updateSession(request)
}

export const config = {
  /*
   * Solo el panel admin necesita la sesión de Supabase. Antes corría en todo el sitio: cada visita
   * esperaba una consulta a Supabase Auth y las páginas públicas no se podían servir desde caché.
   */
  matcher: ["/admin/:path*"],
}
