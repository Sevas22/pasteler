import Link from "next/link"
import { AlertTriangle, CheckCircle2, GraduationCap, MapPin, Package, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getProductos } from "@/lib/data/productos"
import { getLocations } from "@/lib/data/locations"
import { getCourses } from "@/lib/data/courses"

export default async function AdminDashboardPage() {
  const [productos, locations, courses] = await Promise.all([getProductos(), getLocations(), getCourses()])

  const cards = [
    {
      label: "Productos",
      value: productos.length,
      href: "/admin/productos",
      newHref: "/admin/productos/nuevo",
      icon: Package,
    },
    {
      label: "Sucursales",
      value: locations.length,
      href: "/admin/sucursales",
      newHref: "/admin/sucursales/nueva",
      icon: MapPin,
    },
    {
      label: "Cursos",
      value: courses.length,
      href: "/admin/cursos",
      newHref: "/admin/cursos/nuevo",
      icon: GraduationCap,
    },
  ]

  const productosSinSede = productos.filter((p) => p.active && p.sedes.length === 0)
  const cursosInactivos = courses.filter((c) => !c.active).length
  const sedesInactivas = locations.filter((l) => !l.active).length

  const pendientes = [
    productosSinSede.length > 0 && {
      text: `${productosSinSede.length} producto${productosSinSede.length > 1 ? "s" : ""} activo${productosSinSede.length > 1 ? "s" : ""} sin ninguna sucursal asignada — no se ve en ninguna tienda.`,
      href: "/admin/productos",
    },
    locations.length === 0 && { text: "Aún no registras ninguna sucursal.", href: "/admin/sucursales/nueva" },
    productos.length === 0 && { text: "Aún no cargas ningún producto al catálogo.", href: "/admin/productos/nuevo" },
  ].filter(Boolean) as { text: string; href: string }[]

  return (
    <div>
      <h1 className="font-serif text-3xl font-normal text-heading">Hola 👋</h1>
      <p className="mt-1 text-muted-foreground">Aquí tienes un resumen de tu pastelería en Daliza.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.label}
            className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-18px_rgba(139,46,46,0.25)]"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 transition-transform duration-300 group-hover:scale-110">
                <card.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-3xl font-semibold text-heading">{card.value}</span>
            </div>
            <p className="mt-4 font-medium text-foreground">{card.label}</p>
            <div className="mt-4 flex gap-2">
              <Button asChild size="sm" variant="outline" className="flex-1">
                <Link href={card.href}>Ver todos</Link>
              </Button>
              <Button asChild size="sm" className="flex-1">
                <Link href={card.newHref}>
                  <Plus className="mr-1 h-4 w-4" />
                  Nuevo
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-2">
          {pendientes.length > 0 ? (
            <AlertTriangle className="h-5 w-5 text-primary" />
          ) : (
            <CheckCircle2 className="h-5 w-5 text-brand-leaf" />
          )}
          <h2 className="font-medium text-foreground">
            {pendientes.length > 0 ? "Cosas por revisar" : "Todo en orden"}
          </h2>
        </div>
        {pendientes.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {pendientes.map((item) => (
              <li key={item.text}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border px-4 py-3 text-sm text-foreground transition-colors hover:border-primary/40 hover:bg-secondary"
                >
                  {item.text}
                  <span className="shrink-0 text-primary">Revisar →</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">
            Todos tus productos activos tienen al menos una sucursal asignada. Buen trabajo.
          </p>
        )}
        {(cursosInactivos > 0 || sedesInactivas > 0) && (
          <p className="mt-4 text-xs text-muted-foreground">
            {cursosInactivos > 0 ? `${cursosInactivos} curso(s) inactivo(s). ` : ""}
            {sedesInactivas > 0 ? `${sedesInactivas} sucursal(es) inactiva(s).` : ""}
          </p>
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-brand-gold/30 bg-primary/[0.05] p-6">
        <h2 className="font-serif text-xl font-normal text-heading">Sobre la disponibilidad por sucursal</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Cada producto se asigna a una o varias sucursales desde su formulario. La subpágina pública de cada
          sede (<code className="rounded bg-muted px-1">/tiendas/[sede]</code>) solo muestra los productos que le
          asignaste — sin manejo de inventario, solo disponibilidad.
        </p>
      </div>
    </div>
  )
}
