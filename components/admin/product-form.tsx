"use client"

import { useActionState, useEffect, useState } from "react"
import { useFormStatus } from "react-dom"
import { toast } from "sonner"
import { Check, ImageIcon, Info, Loader2, MapPin, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImageUploadField } from "@/components/admin/image-upload-field"
import { FormSection } from "@/components/admin/form-section"
import { ProductPreviewCard } from "@/components/admin/product-preview-card"
import { saveProductAction, type ActionResult } from "@/app/admin/actions"
import { SERVICIOS_PRODUCTO } from "@/lib/data/productos-helpers"
import type { Producto, ServicioProducto } from "@/lib/types/producto"
import type { Location } from "@/lib/data/locations"
import { cn } from "@/lib/utils"

type ProductFormProps = {
  producto?: Producto
  locations: Location[]
}

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function SubmitButton({ isEdit }: { isEdit: boolean }) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" size="lg" disabled={pending} className="min-w-[10rem]">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {isEdit ? "Guardar cambios" : "Crear producto"}
    </Button>
  )
}

const initialState: ActionResult = {}

export function ProductForm({ producto, locations }: ProductFormProps) {
  const [state, formAction] = useActionState(saveProductAction, initialState)
  const [nombre, setNombre] = useState(producto?.nombre ?? "")
  const [slug, setSlug] = useState(producto?.slug ?? "")
  const [slugTouched, setSlugTouched] = useState(Boolean(producto))
  const [categoria, setCategoria] = useState(producto?.categoria ?? "")
  const [servicio, setServicio] = useState<ServicioProducto>(producto?.servicio ?? "pasteleria")
  const [imagen, setImagen] = useState(producto?.imagen ?? "")
  const [precio, setPrecio] = useState(producto?.precio ? String(producto.precio) : "")
  const [selectedSedes, setSelectedSedes] = useState<Set<string>>(
    new Set(locations.filter((l) => producto?.sedes.includes(l.slug)).map((l) => l.id)),
  )

  useEffect(() => {
    if (state?.error) toast.error(state.error)
  }, [state])

  function toggleSede(id: string) {
    setSelectedSedes((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <form action={formAction} className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start lg:gap-8">
      {producto ? <input type="hidden" name="id" value={producto.id} /> : null}

      <div className="space-y-6">
        <FormSection icon={Info} title="Información básica" description="Nombre y clasificación del producto.">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre del producto</Label>
              <Input
                id="nombre"
                name="nombre"
                required
                value={nombre}
                onChange={(e) => {
                  setNombre(e.target.value)
                  if (!slugTouched) setSlug(slugify(e.target.value))
                }}
                placeholder="Pastel estilo tiramisú"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">
                Slug (URL) <span className="font-normal text-muted-foreground">— se genera solo</span>
              </Label>
              <Input
                id="slug"
                name="slug"
                required
                value={slug}
                onChange={(e) => {
                  setSlugTouched(true)
                  setSlug(e.target.value)
                }}
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="servicio">Servicio</Label>
              <select
                id="servicio"
                name="servicio"
                value={servicio}
                onChange={(e) => setServicio(e.target.value as ServicioProducto)}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {SERVICIOS_PRODUCTO.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="categoria">Categoría</Label>
              <Input
                id="categoria"
                name="categoria"
                placeholder="tortas, postres, tartas…"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="precio">Precio (opcional)</Label>
              <Input
                id="precio"
                name="precio"
                type="number"
                min="0"
                step="1000"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                placeholder="85000"
              />
            </div>
          </div>
        </FormSection>

        <FormSection icon={Tag} title="Descripción" description="Lo que verán tus clientes en la ficha del producto.">
          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción corta</Label>
            <Textarea id="descripcion" name="descripcion" rows={2} defaultValue={producto?.descripcion ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="descripcionLarga">Descripción larga (ficha del producto)</Label>
            <Textarea id="descripcionLarga" name="descripcionLarga" rows={4} defaultValue={producto?.descripcionLarga ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="highlights">Incluye / opciones (una por línea)</Label>
            <Textarea
              id="highlights"
              name="highlights"
              rows={4}
              placeholder={"Textura húmeda y cremosa\nDecoración con fruta fresca"}
              defaultValue={producto?.highlights.join("\n") ?? ""}
            />
          </div>
        </FormSection>

        <FormSection icon={ImageIcon} title="Imágenes" description="La imagen principal es la que se ve en el catálogo.">
          <ImageUploadField
            name="imagen"
            label="Imagen principal"
            defaultValue={producto?.imagen}
            folder="productos"
            onChangeUrl={setImagen}
          />
          <div className="space-y-2">
            <Label htmlFor="imagenesExtra">URLs de imágenes extra (una por línea, opcional)</Label>
            <Textarea
              id="imagenesExtra"
              name="imagenesExtra"
              rows={3}
              placeholder="https://…"
              defaultValue={producto?.imagenesExtra?.join("\n") ?? ""}
            />
            <p className="text-xs text-muted-foreground">
              Sube esas imágenes por separado y pega aquí sus URLs públicas, una por línea.
            </p>
          </div>
        </FormSection>

        <FormSection
          icon={MapPin}
          title="Sucursales donde está disponible"
          description="Sin marcar ninguna, el producto no se muestra en ninguna tienda."
        >
          <div className="grid gap-2 sm:grid-cols-2">
            {locations.map((loc) => {
              const checked = selectedSedes.has(loc.id)
              return (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => toggleSede(loc.id)}
                  aria-pressed={checked}
                  className={cn(
                    "flex items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors",
                    checked
                      ? "border-primary bg-primary/8 text-foreground"
                      : "border-border text-foreground hover:bg-secondary",
                  )}
                >
                  <span>
                    {loc.name}
                    {loc.isPrincipal ? <span className="ml-1 text-xs text-muted-foreground">(Principal)</span> : null}
                  </span>
                  <span
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                      checked ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background",
                    )}
                  >
                    {checked ? <Check className="h-3.5 w-3.5" /> : null}
                  </span>
                  <input type="checkbox" name="sedes" value={loc.id} checked={checked} readOnly className="hidden" />
                </button>
              )
            })}
          </div>
        </FormSection>

        <label className="flex items-center gap-2 rounded-2xl border border-border bg-card px-5 py-4 text-sm font-medium shadow-sm">
          <input
            type="checkbox"
            name="active"
            defaultChecked={producto?.active ?? true}
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
          />
          Producto activo (visible en el sitio)
        </label>
      </div>

      <div className="space-y-4 lg:sticky lg:top-6">
        <ProductPreviewCard nombre={nombre} categoria={categoria} servicio={servicio} imagen={imagen} precio={precio} />
        <SubmitButton isEdit={Boolean(producto)} />
      </div>
    </form>
  )
}
