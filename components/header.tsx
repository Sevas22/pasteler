"use client"

import { useEffect, useLayoutEffect, useState } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Search, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { BrandLogo } from "@/components/brand-logo"

/** En home, el header es transparente hasta este desplazamiento (px). */
const HOME_HEADER_SOLID_AFTER = 48

const navigation = [
  { name: "Nosotros", href: "/#nosotros" },
  { name: "Productos", href: "/productos" },
  { name: "Cursos", href: "/cursos" },
  { name: "Tiendas", href: "/tiendas" },
  { name: "Galería", href: "/galeria" },
  { name: "Contacto", href: "/contacto" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === "/"
  const isCursos = pathname === "/cursos"
  const [elevated, setElevated] = useState(() => !isHome)

  useLayoutEffect(() => {
    if (!isHome) {
      setElevated(true)
      return
    }
    const update = () => setElevated(window.scrollY > HOME_HEADER_SOLID_AFTER)
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [isHome])

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
        <div className="fixed inset-y-0 right-0 z-[101] flex w-full max-w-full flex-col overflow-y-auto bg-card px-6 py-6 shadow-2xl sm:max-w-sm sm:ring-1 sm:ring-border">
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
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300 ease-out",
        elevated
          ? cn(
              "bg-brand-cream/95 shadow-sm backdrop-blur-md",
              isCursos ? "border-b border-transparent" : "border-b border-brand-gold/30",
            )
          : "border-b border-white/15 bg-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center lg:flex-1">
          <BrandLogo variant="header" className="-m-1.5 p-1.5" />
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Abrir menú</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-10">
          {navigation.map((item) => {
            const active =
              item.href === "/#nosotros"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium tracking-wide transition-colors",
                  active ? "text-primary" : "text-foreground hover:text-primary",
                )}
              >
                {item.name}
              </Link>
            )
          })}
        </div>
        <div className="hidden items-center gap-2 lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="/productos"
            className="rounded-full p-2 text-foreground transition-colors duration-200 hover:bg-primary/10 hover:text-primary"
            aria-label="Buscar productos"
          >
            <Search className="h-5 w-5" />
          </Link>
          <Button
            asChild
            className="rounded-full border border-brand-gold/60 bg-transparent text-primary duration-200 hover:bg-primary-hover hover:text-primary-foreground"
          >
            <Link href="/contacto" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Contáctanos
            </Link>
          </Button>
        </div>
      </nav>
    </header>
    {mobileMenu ? createPortal(mobileMenu, document.body) : null}
    </>
  )
}
