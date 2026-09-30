import { createClient as createSupabaseClient } from "@supabase/supabase-js"

/**
 * Cliente Supabase sin cookies — para lecturas públicas y cacheables (catálogo, fichas de producto).
 * Nunca ve sesión de admin: RLS limita automáticamente a filas activas. No usar para el panel admin.
 */
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } },
  )
}
