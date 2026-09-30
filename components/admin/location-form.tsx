"use client"

import { useActionState, useEffect, useState } from "react"
import { useFormStatus } from "react-dom"
import { toast } from "sonner"
import { Clock, Loader2, MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormSection } from "@/components/admin/form-section"
import { saveLocationAction, type ActionResult } from "@/app/admin/actions"
import type { Location } from "@/lib/data/locations"

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
      {isEdit ? "Guardar cambios" : "Crear sucursal"}
    </Button>
  )
}

const initialState: ActionResult = {}

export function LocationForm({ location }: { location?: Location }) {
  const [state, formAction] = useActionState(saveLocationAction, initialState)
  const [name, setName] = useState(location?.name ?? "")
  const [slug, setSlug] = useState(location?.slug ?? "")
  const [slugTouched, setSlugTouched] = useState(Boolean(location))

  useEffect(() => {
    if (state?.error) toast.error(state.error)
  }, [state])

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      {location ? <input type="hidden" name="id" value={location.id} /> : null}

      <FormSection icon={MapPin} title="Datos de la sede" description="Nombre, tipo y dirección.">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre de la sede</Label>
            <Input
              id="name"
              name="name"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (!slugTouched) setSlug(slugify(e.target.value))
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">
              Slug <span className="font-normal text-muted-foreground">— /tiendas/…</span>
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
        <div className="space-y-2">
          <Label htmlFor="type">Tipo</Label>
          <Input id="type" name="type" placeholder="Sede Principal / Sucursal" defaultValue={location?.type ?? "Sucursal"} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Dirección</Label>
          <Input id="address" name="address" required defaultValue={location?.address ?? ""} />
        </div>
      </FormSection>

      <FormSection icon={Clock} title="Contacto y horario" description="Cómo te encuentran y contactan tus clientes.">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input id="phone" name="phone" placeholder="310 833 6425" defaultValue={location?.phone ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp (solo números, con indicativo)</Label>
            <Input id="whatsapp" name="whatsapp" placeholder="573108336425" defaultValue={location?.whatsapp ?? ""} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="hours">Horario</Label>
          <Input id="hours" name="hours" placeholder="Lun - Sáb: 8:00 AM - 7:00 PM" defaultValue={location?.hours ?? ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="maps_url">URL de Google Maps</Label>
          <Input id="maps_url" name="maps_url" placeholder="https://www.google.com/maps/search/…" defaultValue={location?.mapsUrl ?? ""} />
        </div>
      </FormSection>

      <FormSection icon={Star} title="Prioridad y estado" description="Orden en las listas y visibilidad pública.">
        <div className="space-y-2">
          <Label htmlFor="sort_order">Orden de aparición</Label>
          <Input id="sort_order" name="sort_order" type="number" defaultValue={location?.sortOrder ?? 0} className="max-w-[10rem]" />
        </div>
        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            name="is_principal"
            defaultChecked={location?.isPrincipal ?? false}
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
          />
          Es la sede principal
        </label>
        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            name="active"
            defaultChecked={location?.active ?? true}
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
          />
          Sucursal activa (visible en el sitio)
        </label>
      </FormSection>

      <SubmitButton isEdit={Boolean(location)} />
    </form>
  )
}
