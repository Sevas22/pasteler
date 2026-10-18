import type { Metadata } from "next"
import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ShieldCheck } from "lucide-react"
import { LoginForm } from "@/components/admin/login-form"
import { BRANDING } from "@/lib/branding"

export const metadata: Metadata = {
  title: "Admin | Dalizas Pastelería Fina",
  robots: { index: false, follow: false },
}

const SERIF = { fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }

export default function AdminLoginPage() {
  return (
    <div className="grid min-h-screen bg-[#FBF6EF] lg:grid-cols-[1.1fr_1fr]">
      {/* Foto de marca (franja arriba en móvil, mitad izquierda en escritorio) */}
      <div className="relative h-56 overflow-hidden sm:h-64 lg:h-auto">
        <Image
          src="/images/banners/hero-tortas-surtido.webp"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#3A1418]/90 via-[#5A1F26]/55 to-[#7A1A2A]/30 lg:bg-gradient-to-r lg:from-[#3A1418]/85 lg:via-[#5A1F26]/55 lg:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:inset-y-0 lg:flex lg:flex-col lg:justify-end lg:p-14">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#E8CFA0]">Daliza Pastelería Fina</p>
          <p className="mt-2 max-w-md text-2xl leading-tight text-white sm:text-3xl lg:text-5xl" style={SERIF}>
            Todo tu negocio, <span className="italic text-[#E8CFA0]">en un solo lugar.</span>
          </p>
          <p className="mt-3 hidden max-w-sm text-sm leading-relaxed text-white/80 lg:block">
            Productos, sedes, cursos y las solicitudes de tus clientes — listos para atender desde aquí.
          </p>
        </div>
      </div>

      {/* Formulario */}
      <div className="relative flex items-center justify-center px-5 py-10 sm:px-8 lg:py-16">
        <div className="w-full max-w-[400px]">
          <Image src={BRANDING.logoPrincipal} alt={BRANDING.logoAlt} width={160} height={80} className="h-16 w-auto" />

          <h1 className="mt-6 text-3xl font-normal leading-tight text-[#5A1F26] sm:text-[2.1rem]" style={SERIF}>
            Hola de nuevo
          </h1>
          <div className="mt-3 h-[3px] w-16 rounded-full bg-gradient-to-r from-[#C9A96E] to-[#7A1A2A]" aria-hidden />
          <p className="mt-4 text-sm text-muted-foreground">Ingresa con tu cuenta de administrador para gestionar el sitio.</p>

          <div className="mt-8 rounded-2xl border border-[#C9A96E]/30 bg-white p-6 shadow-[0_24px_60px_-30px_rgba(90,31,38,0.35)] sm:p-7">
            <Suspense>
              <LoginForm />
            </Suspense>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
            <Link href="/" className="inline-flex items-center gap-1.5 font-medium transition-colors hover:text-[#7A1A2A]">
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
              Volver al sitio
            </Link>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-[#C9A96E]" aria-hidden />
              Acceso solo para administradores
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
