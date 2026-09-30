import type { Metadata } from "next"
import { Suspense } from "react"
import Image from "next/image"
import { LoginForm } from "@/components/admin/login-form"
import { BRANDING } from "@/lib/branding"

export const metadata: Metadata = {
  title: "Admin | Dalizas Pastelería Fina",
  robots: { index: false, follow: false },
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-chocolate px-4 py-12">
      <div className="w-full max-w-sm rounded-2xl border border-brand-gold/25 bg-card p-8 shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <Image src={BRANDING.logoPrincipal} alt={BRANDING.logoAlt} width={140} height={70} className="h-14 w-auto" />
          <h1 className="mt-4 font-serif text-2xl font-normal text-heading">Panel administrativo</h1>
          <p className="mt-1 text-sm text-muted-foreground">Ingresa con tu cuenta de administrador</p>
        </div>
        <div className="mt-8">
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
