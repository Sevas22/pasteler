"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, LogOut, MapPin, Menu, Package, GraduationCap, X } from "lucide-react"
import { BrandLogo } from "@/components/brand-logo"
import { cn } from "@/lib/utils"
import { signOutAction } from "@/app/admin/actions"

const links = [
  { href: "/admin", label: "Panel", icon: LayoutDashboard },
  { href: "/admin/productos", label: "Productos", icon: Package },
  { href: "/admin/sucursales", label: "Sucursales", icon: MapPin },
  { href: "/admin/cursos", label: "Cursos", icon: GraduationCap },
]

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="flex-1 space-y-1 p-3">
      {links.map((link) => {
        const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
        const Icon = link.icon
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              active ? "bg-primary text-primary-foreground shadow-sm" : "text-foreground hover:bg-secondary",
            )}
          >
            <Icon className="h-4 w-4" />
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}

function SidebarFooter({ email }: { email: string }) {
  return (
    <div className="border-t border-border p-4">
      <p className="truncate text-xs text-muted-foreground">{email}</p>
      <form action={signOutAction} className="mt-2">
        <button
          type="submit"
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </button>
      </form>
    </div>
  )
}

export function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!mobileOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileOpen])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const mobileDrawer =
    mounted && mobileOpen
      ? createPortal(
          <div className="fixed inset-0 z-[100] lg:hidden">
            <div className="fixed inset-0 bg-foreground/30" onClick={() => setMobileOpen(false)} aria-hidden />
            <div className="fixed inset-y-0 left-0 z-[101] flex w-72 max-w-[85vw] flex-col bg-card shadow-2xl">
              <div className="flex items-center justify-between border-b border-border p-5">
                <BrandLogo variant="header" />
                <button
                  type="button"
                  className="rounded-md p-2 text-foreground hover:bg-secondary"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="sr-only">Cerrar menú</span>
                  <X className="h-5 w-5" />
                </button>
              </div>
              <NavLinks pathname={pathname} onNavigate={() => setMobileOpen(false)} />
              <SidebarFooter email={email} />
            </div>
          </div>,
          document.body,
        )
      : null

  return (
    <>
      {/* Barra superior móvil */}
      <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3 lg:hidden">
        <BrandLogo variant="header" className="h-10" />
        <button
          type="button"
          className="rounded-md p-2 text-foreground hover:bg-secondary"
          onClick={() => setMobileOpen(true)}
        >
          <span className="sr-only">Abrir menú</span>
          <Menu className="h-5 w-5" />
        </button>
      </div>
      {mobileDrawer}

      {/* Sidebar fija en escritorio */}
      <aside className="hidden h-full w-64 shrink-0 flex-col border-r border-border bg-card lg:flex">
        <div className="border-b border-border p-5">
          <BrandLogo variant="header" />
          <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-primary">Admin</p>
        </div>
        <NavLinks pathname={pathname} />
        <SidebarFooter email={email} />
      </aside>
    </>
  )
}
