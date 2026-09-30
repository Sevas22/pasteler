import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { cookies } from "next/headers"

type CookieToSet = { name: string; value: string; options: CookieOptions }

/**
 * Cliente Supabase para Server Components, Server Actions y Route Handlers.
 * Lee/escribe cookies de sesión — en Server Components la escritura se ignora
 * (Next.js no permite set-cookie fuera de Server Actions/Route Handlers),
 * el middleware se encarga de refrescar la sesión en ese caso.
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: CookieToSet[]) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options)
            }
          } catch {
            // Server Component: no puede escribir cookies; el middleware refresca la sesión.
          }
        },
      },
    },
  )
}
