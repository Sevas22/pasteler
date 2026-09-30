import { type NextRequest } from "next/server"
import { updateSession } from "@/lib/supabase/middleware"

export async function middleware(request: NextRequest) {
  return updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Aplica a todo excepto assets estáticos, para poder proteger /admin
     * y mantener viva la sesión en el resto del sitio.
     */
    "/((?!_next/static|_next/image|favicon.ico|images/|fonts/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
