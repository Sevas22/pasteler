import { unstable_cache } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { createPublicClient } from "@/lib/supabase/public"

export type Location = {
  id: string
  slug: string
  name: string
  type: string
  address: string
  phone: string
  whatsapp: string
  hours: string
  isPrincipal: boolean
  /** Google Maps search URL for the address */
  mapsUrl: string
  active: boolean
  sortOrder: number
}

type LocationRow = {
  id: string
  slug: string
  name: string
  type: string
  address: string
  phone: string | null
  whatsapp: string | null
  hours: string | null
  is_principal: boolean
  maps_url: string | null
  active: boolean
  sort_order: number
}

function mapLocation(row: LocationRow): Location {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    type: row.type,
    address: row.address,
    phone: row.phone ?? "",
    whatsapp: row.whatsapp ?? (row.phone ? row.phone.replace(/\D/g, "") : ""),
    hours: row.hours ?? "",
    isPrincipal: row.is_principal,
    mapsUrl: row.maps_url ?? "",
    active: row.active,
    sortOrder: row.sort_order,
  }
}

// ── Lecturas públicas (sin cookies — cacheables, para las páginas del sitio) ──
// Sin cookies las páginas se pueden servir desde caché; el panel admin las refresca con updateTag("locations").

/** Sedes activas para el sitio público. Cacheado; se invalida al crear/editar/borrar una sede. */
export const getLocationsPublic = unstable_cache(
  async (): Promise<Location[]> => {
    const { data, error } = await createPublicClient().from("locations").select("*").order("sort_order", { ascending: true })
    if (error) {
      console.error("[getLocationsPublic]", error.message)
      return []
    }
    return (data as LocationRow[]).map(mapLocation)
  },
  ["locations-public"],
  { tags: ["locations"], revalidate: 300 },
)

export const getLocationBySlugPublic = unstable_cache(
  async (slug: string): Promise<Location | undefined> => {
    const { data, error } = await createPublicClient().from("locations").select("*").eq("slug", slug).maybeSingle()
    if (error || !data) return undefined
    return mapLocation(data as LocationRow)
  },
  ["location-by-slug"],
  { tags: ["locations"], revalidate: 300 },
)

// ── Lecturas admin (cookies de sesión — ven también las sedes inactivas) ──

/** Sedes según la sesión: con sesión admin incluye las inactivas. Para el panel admin. */
export async function getLocations(): Promise<Location[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("locations")
    .select("*")
    .order("sort_order", { ascending: true })

  if (error) {
    console.error("[getLocations]", error.message)
    return []
  }
  return (data as LocationRow[]).map(mapLocation)
}

export async function getLocationBySlug(slug: string): Promise<Location | undefined> {
  const supabase = await createClient()
  const { data, error } = await supabase.from("locations").select("*").eq("slug", slug).maybeSingle()

  if (error || !data) return undefined
  return mapLocation(data as LocationRow)
}

export async function getLocationById(id: string): Promise<Location | undefined> {
  const supabase = await createClient()
  const { data, error } = await supabase.from("locations").select("*").eq("id", id).maybeSingle()

  if (error || !data) return undefined
  return mapLocation(data as LocationRow)
}
