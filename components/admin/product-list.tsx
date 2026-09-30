"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, PackageOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DeleteConfirm } from "@/components/admin/delete-confirm"
import { deleteProductAction } from "@/app/admin/actions"
import { getServicioLabel } from "@/lib/data/productos-helpers"
import type { Producto } from "@/lib/types/producto"

type ProductListProps = {
  productos: Producto[]
  locationNameBySlug: Record<string, string>
}

export function ProductList({ productos, locationNameBySlug }: ProductListProps) {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return productos
    return productos.filter(
      (p) =>
        p.nombre.toLowerCase().includes(q) ||
        p.categoria.toLowerCase().includes(q) ||
        getServicioLabel(p.servicio).toLowerCase().includes(q),
    )
  }, [productos, query])

  return (
    <div>
      <div className="relative mb-4 max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre, categoría o servicio…"
          className="pl-9"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-secondary text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Producto</th>
              <th className="hidden px-4 py-3 sm:table-cell">Servicio</th>
              <th className="hidden px-4 py-3 md:table-cell">Categoría</th>
              <th className="hidden px-4 py-3 lg:table-cell">Sucursales</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((p) => (
              <tr key={p.id} className="transition-colors hover:bg-secondary/40">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-muted">
                      <Image src={p.imagen} alt="" fill className="object-cover" unoptimized />
                    </div>
                    <div className="min-w-0">
                      <span className="block truncate font-medium text-foreground">{p.nombre}</span>
                      <span className="block text-xs text-muted-foreground sm:hidden">
                        {getServicioLabel(p.servicio)}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">
                  {getServicioLabel(p.servicio)}
                </td>
                <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">{p.categoria}</td>
                <td className="hidden px-4 py-3 text-muted-foreground lg:table-cell">
                  {p.sedes.length === 0
                    ? "Ninguna"
                    : p.sedes.map((slug) => locationNameBySlug[slug] ?? slug).join(", ")}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      p.active ? "bg-brand-leaf/15 text-brand-leaf" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {p.active ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/admin/productos/${p.id}`}>Editar</Link>
                    </Button>
                    <DeleteConfirm action={deleteProductAction} id={p.id} itemLabel={p.nombre} />
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-16 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <PackageOpen className="h-10 w-10 opacity-50" />
                    {productos.length === 0 ? "Aún no hay productos. Crea el primero." : "No hay resultados para tu búsqueda."}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
