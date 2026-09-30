"use server"

import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { requireAdminSession } from "@/lib/supabase/admin-guard"

export type ActionResult = { error: string } | { error?: undefined }

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function linesToArray(value: FormDataEntryValue | null): string[] {
  if (typeof value !== "string") return []
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
}

function revalidateSite() {
  revalidatePath("/", "layout")
}

// ── Auth ─────────────────────────────────────────────────────────────────

export async function signOutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/admin/login")
}

// ── Productos ────────────────────────────────────────────────────────────

export async function saveProductAction(_prevState: ActionResult, formData: FormData): Promise<ActionResult> {
  await requireAdminSession()
  const supabase = await createClient()

  const productId = String(formData.get("id") ?? "").trim() || null
  const nombre = String(formData.get("nombre") ?? "").trim()
  const slugInput = String(formData.get("slug") ?? "").trim()
  if (!nombre) return { error: "El nombre es obligatorio." }

  const slug = slugify(slugInput || nombre)
  if (!slug) return { error: "No se pudo generar un slug válido." }

  const precioRaw = String(formData.get("precio") ?? "").trim()
  const sedes = formData.getAll("sedes").map(String)

  const payload = {
    slug,
    name: nombre,
    description: String(formData.get("descripcion") ?? "").trim(),
    description_long: String(formData.get("descripcionLarga") ?? "").trim(),
    servicio: String(formData.get("servicio") ?? "pasteleria"),
    categoria: String(formData.get("categoria") ?? "").trim(),
    image_url: String(formData.get("imagen") ?? "").trim() || null,
    extra_images: linesToArray(formData.get("imagenesExtra")),
    highlights: linesToArray(formData.get("highlights")),
    price: precioRaw ? Number(precioRaw) : null,
    active: formData.get("active") === "on",
  }

  let id = productId
  if (id) {
    const { error } = await supabase.from("products").update(payload).eq("id", id)
    if (error) return { error: error.message }
  } else {
    const { data, error } = await supabase.from("products").insert(payload).select("id").single()
    if (error) return { error: error.message }
    id = data.id
  }

  const { error: deleteError } = await supabase.from("product_locations").delete().eq("product_id", id)
  if (deleteError) return { error: deleteError.message }

  if (sedes.length > 0) {
    const { error: insertError } = await supabase
      .from("product_locations")
      .insert(sedes.map((locationId) => ({ product_id: id, location_id: locationId })))
    if (insertError) return { error: insertError.message }
  }

  revalidateSite()
  revalidateTag("productos")
  redirect(productId ? "/admin/productos?ok=1&msg=updated" : "/admin/productos?ok=1&msg=created")
}

export async function deleteProductAction(productId: string): Promise<void> {
  await requireAdminSession()
  const supabase = await createClient()
  await supabase.from("products").delete().eq("id", productId)
  revalidateSite()
  revalidateTag("productos")
}

// ── Sucursales ───────────────────────────────────────────────────────────

export async function saveLocationAction(_prevState: ActionResult, formData: FormData): Promise<ActionResult> {
  await requireAdminSession()
  const supabase = await createClient()

  const locationId = String(formData.get("id") ?? "").trim() || null
  const name = String(formData.get("name") ?? "").trim()
  const slugInput = String(formData.get("slug") ?? "").trim()
  if (!name) return { error: "El nombre es obligatorio." }

  const slug = slugify(slugInput || name)
  if (!slug) return { error: "No se pudo generar un slug válido." }

  const phone = String(formData.get("phone") ?? "").trim()

  const payload = {
    slug,
    name,
    type: String(formData.get("type") ?? "Sucursal").trim() || "Sucursal",
    address: String(formData.get("address") ?? "").trim(),
    phone: phone || null,
    whatsapp: String(formData.get("whatsapp") ?? "").trim() || (phone ? phone.replace(/\D/g, "") : null),
    hours: String(formData.get("hours") ?? "").trim() || null,
    is_principal: formData.get("is_principal") === "on",
    maps_url: String(formData.get("maps_url") ?? "").trim() || null,
    sort_order: Number(formData.get("sort_order") ?? 0) || 0,
    active: formData.get("active") === "on",
  }

  if (locationId) {
    const { error } = await supabase.from("locations").update(payload).eq("id", locationId)
    if (error) return { error: error.message }
  } else {
    const { error } = await supabase.from("locations").insert(payload)
    if (error) return { error: error.message }
  }

  revalidateSite()
  revalidateTag("locations")
  redirect(locationId ? "/admin/sucursales?ok=1&msg=updated" : "/admin/sucursales?ok=1&msg=created")
}

export async function deleteLocationAction(locationId: string): Promise<void> {
  await requireAdminSession()
  const supabase = await createClient()
  await supabase.from("locations").delete().eq("id", locationId)
  revalidateSite()
  revalidateTag("locations")
}

// ── Cursos ───────────────────────────────────────────────────────────────

export async function saveCourseAction(_prevState: ActionResult, formData: FormData): Promise<ActionResult> {
  await requireAdminSession()
  const supabase = await createClient()

  const courseId = String(formData.get("id") ?? "").trim() || null
  const title = String(formData.get("title") ?? "").trim()
  const slugInput = String(formData.get("slug") ?? "").trim()
  if (!title) return { error: "El título es obligatorio." }

  const slug = slugify(slugInput || title)
  if (!slug) return { error: "No se pudo generar un slug válido." }

  const payload = {
    slug,
    title,
    description: String(formData.get("description") ?? "").trim(),
    description_long: String(formData.get("descriptionLong") ?? "").trim(),
    image_url: String(formData.get("imagen") ?? "").trim() || null,
    extra_images: linesToArray(formData.get("imagenesExtra")),
    duration: String(formData.get("duration") ?? "").trim() || null,
    students: String(formData.get("students") ?? "").trim() || null,
    level: String(formData.get("level") ?? "").trim() || null,
    topics: linesToArray(formData.get("topics")),
    highlights: linesToArray(formData.get("highlights")),
    active: formData.get("active") === "on",
  }

  if (courseId) {
    const { error } = await supabase.from("courses").update(payload).eq("id", courseId)
    if (error) return { error: error.message }
  } else {
    const { error } = await supabase.from("courses").insert(payload)
    if (error) return { error: error.message }
  }

  revalidateSite()
  redirect(courseId ? "/admin/cursos?ok=1&msg=updated" : "/admin/cursos?ok=1&msg=created")
}

export async function deleteCourseAction(courseId: string): Promise<void> {
  await requireAdminSession()
  const supabase = await createClient()
  await supabase.from("courses").delete().eq("id", courseId)
  revalidateSite()
}
