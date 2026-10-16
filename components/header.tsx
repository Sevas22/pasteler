"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, UserRound, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { BrandLogo } from "@/components/brand-logo"


const navigation = [
  { name: "Nosotros", href: "/#nosotros" },
  { name: "Productos", href: "/productos" },
  { name: "Cursos", href: "/cursos" },
  { name: "Tiendas", href: "/tiendas" },
  { name: "Galería", href: "/galeria" },
  { name: "Blog", href: "/blog" },
  { name: "Contacto", href: "/contacto" },
]

function NavLink({ item, pathname }: { item: (typeof navigation)[number]; pathname: string }) {
  const active =
    item.href === "/#nosotros" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`)
  return (
    <Link
      href={item.href}
      className={cn(
        "text-sm font-medium tracking-wide transition-colors",
        active ? "text-primary" : "text-foreground hover:text-primary",
      )}
    >
      {item.name}
    </Link>
  )
}

const NAV_IZQUIERDA = navigation.slice(0, 3)
const NAV_DERECHA = navigation.slice(3)

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mobileMenuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileMenuOpen])

  const mobileMenu =
    mounted && mobileMenuOpen ? (
      <div className="lg:hidden fixed inset-0 z-[100]">
        <div className="fixed inset-0 bg-foreground/20" onClick={() => setMobileMenuOpen(false)} aria-hidden />
        <div className="menu-drawer-left fixed inset-y-0 left-0 z-[101] flex w-full max-w-full flex-col overflow-y-auto bg-card px-6 py-6 shadow-2xl sm:max-w-sm sm:ring-1 sm:ring-border">
          <div className="flex items-center justify-between">
            <BrandLogo
              variant="header"
              className="-m-1.5 p-1.5"
              onClick={() => setMobileMenuOpen(false)}
            />
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Cerrar menú</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-border">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-medium text-foreground hover:bg-secondary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <Button asChild className="w-full">
                  <Link href="/contacto" onClick={() => setMobileMenuOpen(false)}>
                    <Phone className="mr-2 h-4 w-4" />
                    Contáctanos
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null

  return (
    <>
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Fondo: barra delgada de lado a lado con una "barriguita" curva al centro donde vive el logo */}
      <div className="pointer-events-none absolute inset-x-0 top-0 drop-shadow-[0_6px_10px_rgba(58,38,32,0.16)]" aria-hidden>
        <div className="h-16 bg-brand-cream" />
        <svg
          viewBox="0 0 320 104"
          preserveAspectRatio="none"
          className="absolute left-1/2 top-0 h-[104px] w-[250px] -translate-x-1/2 text-brand-cream sm:w-[320px]"
        >
          <path
            fill="currentColor"
            d="M0,0 L320,0 L320,64 C285,64 270,72 255,88 C240,102 215,104 160,104 C105,104 80,102 65,88 C50,72 35,64 0,64 Z"
          />
        </svg>
      </div>

      <nav className="relative mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 lg:px-8">
        {/* Izquierda: botón de menú (móvil) / enlaces (desktop) */}
        <div className="flex items-center lg:justify-end">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Abrir menú</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="hidden lg:flex lg:gap-x-8 xl:gap-x-10">
            {NAV_IZQUIERDA.map((item) => (
              <NavLink key={item.name} item={item} pathname={pathname} />
            ))}
          </div>
        </div>

        {/* Centro: espacio reservado para el logo (que sobresale sobre la barriguita) */}
        <div className="w-[110px] sm:w-[170px] lg:w-[230px]" aria-hidden />

        {/* Derecha: enlaces y acciones (desktop) / acceso admin (móvil) */}
        <div className="flex items-center justify-end gap-2">
          <div className="hidden lg:flex lg:gap-x-8 xl:gap-x-10">
            {NAV_DERECHA.map((item) => (
              <NavLink key={item.name} item={item} pathname={pathname} />
            ))}
          </div>
          <Link
            href="/admin"
            className="rounded-full p-2 text-foreground transition-colors duration-200 hover:bg-primary/10 hover:text-primary lg:ml-4"
            aria-label="Panel administrativo"
            title="Panel administrativo"
          >
            <UserRound className="h-5 w-5" />
          </Link>
          <Button
            asChild
            className="hidden h-9 rounded-full border border-brand-gold/60 bg-transparent text-primary duration-200 hover:bg-primary-hover hover:text-primary-foreground xl:inline-flex"
          >
            <Link href="/contacto" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Contáctanos
            </Link>
          </Button>
        </div>

        <div className="absolute left-1/2 top-1 -translate-x-1/2">
          <BrandLogo variant="header" className="p-0" />
        </div>
      </nav>
    </header>
    {mobileMenu ? createPortal(mobileMenu, document.body) : null}
    </>
  )
}
