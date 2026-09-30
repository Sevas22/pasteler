import { createClient } from "@/lib/supabase/server"

export type AdminSession = {
  userId: string
  email: string
}

/** Sesión + membresía admin actuales, o `null` si no aplica. La autoridad real es RLS (is_admin()); esto es solo para la UI. */
export async function getAdminSession(): Promise<AdminSession | null> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data: adminRow } = await supabase.from("admins").select("user_id").eq("user_id", user.id).maybeSingle()
  if (!adminRow) return null

  return { userId: user.id, email: user.email ?? "" }
}

/** Para usar en Server Actions: lanza si no hay un admin autenticado. */
export async function requireAdminSession(): Promise<AdminSession> {
  const session = await getAdminSession()
  if (!session) {
    throw new Error("No autorizado: se requiere sesión de administrador.")
  }
  return session
}
