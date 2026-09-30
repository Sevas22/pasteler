import { unstable_cache } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { createPublicClient } from "@/lib/supabase/public"
import type { Producto, ServicioProducto } from "@/lib/types/producto"

export {
  SERVICIOS_PRODUCTO,
  isServicioProducto,
  getServicioLabel,
  formatCategoriaLabel,
} from "@/lib/data/productos-helpers"

type ProductRow = {
  id: string
  slug: string
  name: string
  description: string
  description_long: string
  servicio: ServicioProducto
  categoria: string
  image_url: string | null
  extra_images: string[] | null
  highlights: string[] | null
  price: number | null
  active: boolean
  product_locations?: { locations: { slug: string } | null }[]
}

const PRODUCT_COLUMNS = "*, product_locations(locations(slug))"
const PLACEHOLDER_IMAGE = "/images/logo-dalizas-blanco.png"
/** Todo lo que cambie un producto invalida este tag (ver revalidateTag en admin/actions.ts). */
const PRODUCTOS_TAG = "productos"

function mapProducto(row: ProductRow): Producto {
  const sedes =
    row.product_locations
      ?.map((pl) => pl.locations?.slug)
      .filter((slug): slug is string => Boolean(slug)) ?? []

  return {
    id: row.id,
    slug: row.slug,
    nombre: row.name,
    descripcion: row.description,
    descripcionLarga: row.description_long,
    servicio: row.servicio,
    categoria: row.categoria,
    imagen: row.image_url ?? PLACEHOLDER_IMAGE,
    highlights: row.highlights ?? [],
    imagenesExtra: row.extra_images ?? [],
    precio: row.price,
    sedes,
    active: row.active,
  }
}

// ── Lecturas admin (cookies de sesión — ven también los productos inactivos) ──

/**
 * Catálogo de productos para el panel admin. RLS decide qué filas llegan: con sesión admin,
 * incluye también los inactivos (para poder listarlos y editarlos). Sin cache: siempre al día.
 */
export async function getProductos(): Promise<Producto[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_COLUMNS)
    .order("sort_order", { ascending: true })

  if (error) {
    console.error("[getProductos]", error.message)
    return []
  }
  return (data as unknown as ProductRow[]).map(mapProducto)
}

export async function getProductoById(id: string): Promise<Producto | undefined> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_COLUMNS)
    .eq("id", id)
    .maybeSingle()

  if (error || !data) return undefined
  return mapProducto(data as unknown as ProductRow)
}

// ── Lecturas públicas (sin cookies — cacheables, para las páginas del sitio) ──

/** Catálogo público completo. Cacheado; se invalida al crear/editar/borrar un producto. */
export const getProductosPublic = unstable_cache(
  async (): Promise<Producto[]> => {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from("products")
      .select(PRODUCT_COLUMNS)
      .order("sort_order", { ascending: true })

    if (error) {
      console.error("[getProductosPublic]", error.message)
      return []
    }
    return (data as unknown as ProductRow[]).map(mapProducto)
  },
  ["productos-public"],
  { tags: [PRODUCTOS_TAG], revalidate: 300 },
)

export const getProductoBySlugPublic = unstable_cache(
  async (slug: string): Promise<Producto | undefined> => {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from("products")
      .select(PRODUCT_COLUMNS)
      .eq("slug", slug)
      .maybeSingle()

    if (error || !data) return undefined
    return mapProducto(data as unknown as ProductRow)
  },
  ["producto-by-slug"],
  { tags: [PRODUCTOS_TAG], revalidate: 300 },
)

/** Productos disponibles en una sucursal — arma la subpágina pública de cada sede. */
export const getProductosByLocationSlugPublic = unstable_cache(
  async (locationSlug: string): Promise<Producto[]> => {
    const supabase = createPublicClient()
    const { data: location } = await supabase
      .from("locations")
      .select("id")
      .eq("slug", locationSlug)
      .maybeSingle()

    if (!location) return []

    const { data, error } = await supabase
      .from("products")
      .select("*, product_locations!inner(location_id, locations(slug))")
      .eq("active", true)
      .eq("product_locations.location_id", location.id)
      .order("sort_order", { ascending: true })

    if (error) {
      console.error("[getProductosByLocationSlugPublic]", error.message)
      return []
    }
    return (data as unknown as ProductRow[]).map(mapProducto)
  },
  ["productos-by-location"],
  { tags: [PRODUCTOS_TAG, "locations"], revalidate: 300 },
)

/** Hasta `max` productos distintos de `slug` — consulta directa, no trae todo el catálogo. */
export const getOtrosProductosPublic = unstable_cache(
  async (slug: string, max = 3): Promise<Producto[]> => {
    const supabase = createPublicClient()
    const { data, error } = await supabase
      .from("products")
      .select(PRODUCT_COLUMNS)
      .eq("active", true)
      .neq("slug", slug)
      .order("sort_order", { ascending: true })
      .limit(max)

    if (error) {
      console.error("[getOtrosProductosPublic]", error.message)
      return []
    }
    return (data as unknown as ProductRow[]).map(mapProducto)
  },
  ["otros-productos"],
  { tags: [PRODUCTOS_TAG], revalidate: 300 },
)
