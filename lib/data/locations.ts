import { createClient } from "@/lib/supabase/server"

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

/** Sedes visibles públicamente (activas), ordenadas para mostrar en el sitio. */
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
