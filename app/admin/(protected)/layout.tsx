import type { Metadata } from "next"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { getAdminSession } from "@/lib/supabase/admin-guard"
import { signOutAction } from "@/app/admin/actions"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "Admin | Dalizas Pastelería Fina",
  robots: { index: false, follow: false },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession()

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-sm rounded-2xl border border-border bg-card p-8 text-center shadow-lg">
          <h1 className="font-serif text-2xl font-normal text-heading">Sin autorización</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Tu cuenta no tiene permisos de administrador en Daliza. Pide a otro administrador que te agregue desde
            Supabase (tabla <code className="rounded bg-muted px-1">admins</code>).
          </p>
          <form action={signOutAction} className="mt-6">
            <button type="submit" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
              Cerrar sesión
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background lg:flex-row">
      <AdminSidebar email={session.email} />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">{children}</main>
      <Toaster position="top-right" richColors />
    </div>
  )
}
