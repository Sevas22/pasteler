"use client"

import { useEffect, useMemo, useState, useTransition } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2, PackageOpen, Search, X } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { DeleteConfirm } from "@/components/admin/delete-confirm"
import { deleteProductAction, setProductosActivosAction } from "@/app/admin/actions"
import { getServicioLabel } from "@/lib/data/productos-helpers"
import type { Producto } from "@/lib/types/producto"
import { cn } from "@/lib/utils"

type ProductListProps = {
  productos: Producto[]
  locationNameBySlug: Record<string, string>
}

type FiltroEstado = "todos" | "activos" | "inactivos"

export function ProductList({ productos, locationNameBySlug }: ProductListProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [filtroEstado, setFiltroEstado] = useState<FiltroEstado>("todos")
  const [seleccion, setSeleccion] = useState<Set<string>>(new Set())
  const [pendientes, setPendientes] = useState<Set<string>>(new Set())
  const [masivo, startMasivo] = useTransition()

  // Estado visible de cada producto: cambia al instante y luego se confirma con el servidor
  const [activos, setActivos] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(productos.map((p) => [p.id, p.active])),
  )
  useEffect(() => {
    setActivos(Object.fromEntries(productos.map((p) => [p.id, p.active])))
  }, [productos])

  const conteo = useMemo(() => {
    const act = productos.filter((p) => activos[p.id]).length
    return { todos: productos.length, activos: act, inactivos: productos.length - act }
  }, [productos, activos])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return productos.filter((p) => {
      if (filtroEstado === "activos" && !activos[p.id]) return false
      if (filtroEstado === "inactivos" && activos[p.id]) return false
      if (!q) return true
      return (
        p.nombre.toLowerCase().includes(q) ||
        p.categoria.toLowerCase().includes(q) ||
        getServicioLabel(p.servicio).toLowerCase().includes(q)
      )
    })
  }, [productos, query, filtroEstado, activos])

  const todosMarcados = filtered.length > 0 && filtered.every((p) => seleccion.has(p.id))

  function cambiarUno(p: Producto, active: boolean) {
    setActivos((prev) => ({ ...prev, [p.id]: active }))
    setPendientes((prev) => new Set(prev).add(p.id))
    setProductosActivosAction([p.id], active).then((res) => {
      setPendientes((prev) => {
        const s = new Set(prev)
        s.delete(p.id)
        return s
      })
      if (res.error) {
        setActivos((prev) => ({ ...prev, [p.id]: !active }))
        toast.error(res.error)
        return
      }
      toast.success(active ? `"${p.nombre}" ahora se ve en el sitio.` : `"${p.nombre}" quedó oculto del sitio.`)
      router.refresh()
    })
  }

  function cambiarSeleccion(active: boolean) {
    const ids = [...seleccion]
    const anteriores = Object.fromEntries(ids.map((id) => [id, activos[id]]))
    setActivos((prev) => ({ ...prev, ...Object.fromEntries(ids.map((id) => [id, active])) }))
    startMasivo(async () => {
      const res = await setProductosActivosAction(ids, active)
      if (res.error) {
        setActivos((prev) => ({ ...prev, ...anteriores }))
        toast.error(res.error)
        return
      }
      toast.success(
        `${ids.length} producto${ids.length > 1 ? "s" : ""} ${active ? "activado" : "desactivado"}${ids.length > 1 ? "s" : ""}.`,
      )
      setSeleccion(new Set())
      router.refresh()
    })
  }

  function alternarFila(id: string) {
    setSeleccion((prev) => {
      const s = new Set(prev)
      if (s.has(id)) s.delete(id)
      else s.add(id)
      return s
    })
  }

  function alternarTodos() {
    setSeleccion((prev) => {
      const s = new Set(prev)
      if (todosMarcados) filtered.forEach((p) => s.delete(p.id))
      else filtered.forEach((p) => s.add(p.id))
      return s
    })
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre, categoría o servicio…"
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filtrar por estado">
          {(
            [
              ["todos", "Todos"],
              ["activos", "Activos"],
              ["inactivos", "Inactivos"],
            ] as const
          ).map(([valor, etiqueta]) => (
            <button
              key={valor}
              type="button"
              onClick={() => setFiltroEstado(valor)}
              aria-pressed={filtroEstado === valor}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                filtroEstado === valor
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:border-primary/40",
              )}
            >
              {etiqueta} <span className="opacity-70">({conteo[valor]})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Barra de acciones para varios productos */}
      {seleccion.size > 0 && (
        <div className="fixed inset-x-3 bottom-[5.25rem] z-40 flex flex-wrap items-center gap-2 rounded-2xl border border-primary/30 bg-card px-4 py-3 shadow-2xl md:sticky md:inset-x-auto md:bottom-auto md:top-2 md:z-20 md:mb-3 md:rounded-xl md:py-2.5 md:shadow-lg">
          <span className="mr-auto text-sm font-medium text-foreground">
            {seleccion.size} seleccionado{seleccion.size > 1 ? "s" : ""}
          </span>
          <Button size="sm" onClick={() => cambiarSeleccion(true)} disabled={masivo}>
            {masivo ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : <Eye className="mr-1.5 h-4 w-4" />}
            Activar
          </Button>
          <Button size="sm" variant="outline" onClick={() => cambiarSeleccion(false)} disabled={masivo}>
            <EyeOff className="mr-1.5 h-4 w-4" />
            Desactivar
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setSeleccion(new Set())} disabled={masivo}>
            <X className="mr-1 h-4 w-4" />
            Quitar selección
          </Button>
        </div>
      )}

      {/* Celular: tarjetas con todo a la mano (sin deslizar de lado) */}
      <div className="md:hidden">
        {filtered.length > 0 && (
          <label className="mb-2 flex items-center gap-2.5 px-1 py-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={todosMarcados}
              onChange={alternarTodos}
              className="h-5 w-5 accent-[var(--primary)]"
            />
            Seleccionar todos ({filtered.length})
          </label>
        )}
        <ul className="space-y-2.5">
          {filtered.map((p) => {
            const activo = activos[p.id]
            return (
              <li
                key={p.id}
                className={cn(
                  "rounded-2xl border bg-card p-3 shadow-sm transition-colors",
                  seleccion.has(p.id) ? "border-primary/50 bg-primary/[0.04]" : "border-border",
                )}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={seleccion.has(p.id)}
                    onChange={() => alternarFila(p.id)}
                    aria-label={`Seleccionar ${p.nombre}`}
                    className="h-5 w-5 shrink-0 accent-[var(--primary)]"
                  />
                  <div
                    className={cn(
                      "relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-muted transition-opacity",
                      !activo && "opacity-50 grayscale",
                    )}
                  >
                    <Image src={p.imagen} alt="" fill className="object-cover" unoptimized />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={cn("line-clamp-2 font-medium leading-snug", activo ? "text-foreground" : "text-muted-foreground")}>
                      {p.nombre}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {getServicioLabel(p.servicio)} · {p.categoria}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between gap-2 border-t border-border pt-3">
                  <label className="flex min-h-10 cursor-pointer items-center gap-2.5">
                    <Switch
                      checked={activo}
                      onCheckedChange={(v) => cambiarUno(p, v)}
                      disabled={pendientes.has(p.id) || masivo}
                      aria-label={`${activo ? "Desactivar" : "Activar"} ${p.nombre}`}
                    />
                    <span className={cn("text-sm font-medium", activo ? "text-brand-leaf" : "text-muted-foreground")}>
                      {pendientes.has(p.id) ? <Loader2 className="h-4 w-4 animate-spin" /> : activo ? "Visible" : "Oculto"}
                    </span>
                  </label>
                  <div className="flex items-center gap-1">
                    <Button asChild variant="outline" size="sm" className="h-10 px-4">
                      <Link href={`/admin/productos/${p.id}`}>Editar</Link>
                    </Button>
                    <DeleteConfirm action={deleteProductAction} id={p.id} itemLabel={p.nombre} />
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
        {filtered.length === 0 && (
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border px-4 py-14 text-center text-muted-foreground">
            <PackageOpen className="h-10 w-10 opacity-50" />
            {productos.length === 0 ? "Aún no hay productos. Crea el primero." : "No hay productos con estos filtros."}
          </div>
        )}
      </div>

      {/* Tableta y computador: tabla */}
      <div className="hidden overflow-x-auto rounded-2xl border border-border bg-card md:block">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-secondary text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="w-10 py-3 pl-4">
                <input
                  type="checkbox"
                  checked={todosMarcados}
                  onChange={alternarTodos}
                  aria-label="Seleccionar todos los productos de la lista"
                  className="h-4 w-4 accent-[var(--primary)]"
                />
              </th>
              <th className="px-4 py-3">Producto</th>
              <th className="hidden px-4 py-3 sm:table-cell">Servicio</th>
              <th className="hidden px-4 py-3 md:table-cell">Categoría</th>
              <th className="hidden px-4 py-3 lg:table-cell">Sucursales</th>
              <th className="whitespace-nowrap px-4 py-3">Visible</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((p) => {
              const activo = activos[p.id]
              return (
                <tr
                  key={p.id}
                  className={cn(
                    "transition-colors hover:bg-secondary/40",
                    seleccion.has(p.id) && "bg-primary/[0.04]",
                    !activo && "text-muted-foreground",
                  )}
                >
                  <td className="py-3 pl-4">
                    <input
                      type="checkbox"
                      checked={seleccion.has(p.id)}
                      onChange={() => alternarFila(p.id)}
                      aria-label={`Seleccionar ${p.nombre}`}
                      className="h-4 w-4 accent-[var(--primary)]"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-muted transition-opacity",
                          !activo && "opacity-50 grayscale",
                        )}
                      >
                        <Image src={p.imagen} alt="" fill className="object-cover" unoptimized />
                      </div>
                      <div className="min-w-0">
                        <span className={cn("block truncate font-medium", activo ? "text-foreground" : "text-muted-foreground")}>
                          {p.nombre}
                        </span>
                        <span className="block text-xs text-muted-foreground sm:hidden">{getServicioLabel(p.servicio)}</span>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">{getServicioLabel(p.servicio)}</td>
                  <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">{p.categoria}</td>
                  <td className="hidden px-4 py-3 text-muted-foreground lg:table-cell">
                    {p.sedes.length === 0
                      ? "Ninguna"
                      : p.sedes.map((slug) => locationNameBySlug[slug] ?? slug).join(", ")}
                  </td>
                  <td className="px-4 py-3">
                    <label className="inline-flex cursor-pointer items-center gap-2.5">
                      <Switch
                        checked={activo}
                        onCheckedChange={(v) => cambiarUno(p, v)}
                        disabled={pendientes.has(p.id) || masivo}
                        aria-label={`${activo ? "Desactivar" : "Activar"} ${p.nombre}`}
                      />
                      <span
                        className={cn(
                          "w-16 text-xs font-medium",
                          activo ? "text-brand-leaf" : "text-muted-foreground",
                        )}
                      >
                        {pendientes.has(p.id) ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : activo ? (
                          "Activo"
                        ) : (
                          "Inactivo"
                        )}
                      </span>
                    </label>
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
              )
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-16 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <PackageOpen className="h-10 w-10 opacity-50" />
                    {productos.length === 0 ? "Aún no hay productos. Crea el primero." : "No hay productos con estos filtros."}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Los productos inactivos no se borran: solo dejan de verse en el sitio. Puedes volver a activarlos cuando quieras.
      </p>
    </div>
  )
}
