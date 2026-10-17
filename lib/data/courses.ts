import { unstable_cache } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { createPublicClient } from "@/lib/supabase/public"

export type Course = {
  id: string
  slug: string
  title: string
  description: string
  /** Texto largo para la ficha del curso */
  descripcionLarga: string
  image: string
  imagenesExtra?: string[]
  duration: string
  students: string
  level: string
  topics: string[]
  highlights: string[]
  active: boolean
}

type CourseRow = {
  id: string
  slug: string
  title: string
  description: string
  description_long: string
  image_url: string | null
  extra_images: string[] | null
  duration: string | null
  students: string | null
  level: string | null
  topics: string[] | null
  highlights: string[] | null
  active: boolean
}

function mapCourse(row: CourseRow): Course {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    descripcionLarga: row.description_long,
    image: row.image_url ?? "/images/logo-dalizas-placeholder.webp",
    imagenesExtra: row.extra_images ?? [],
    duration: row.duration ?? "",
    students: row.students ?? "",
    level: row.level ?? "",
    topics: row.topics ?? [],
    highlights: row.highlights ?? [],
    active: row.active,
  }
}

/** Cursos activos para el sitio público. Cacheado (sin cookies); el panel admin lo refresca con updateTag("cursos"). */
export const getCoursesPublic = unstable_cache(
  async (): Promise<Course[]> => {
    const { data, error } = await createPublicClient().from("courses").select("*").order("sort_order", { ascending: true })
    if (error) {
      console.error("[getCoursesPublic]", error.message)
      return []
    }
    return (data as CourseRow[]).map(mapCourse)
  },
  ["cursos-public"],
  { tags: ["cursos"], revalidate: 300 },
)

export const getCursoBySlugPublic = unstable_cache(
  async (slug: string): Promise<Course | undefined> => {
    const { data, error } = await createPublicClient().from("courses").select("*").eq("slug", slug).maybeSingle()
    if (error || !data) return undefined
    return mapCourse(data as CourseRow)
  },
  ["curso-by-slug"],
  { tags: ["cursos"], revalidate: 300 },
)

export async function getOtrosCursosPublic(slug: string, max = 2): Promise<Course[]> {
  const courses = await getCoursesPublic()
  return courses.filter((c) => c.slug !== slug).slice(0, max)
}

/** Cursos según la sesión (con sesión admin incluye inactivos). Para el panel admin. */
export async function getCourses(): Promise<Course[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("sort_order", { ascending: true })

  if (error) {
    console.error("[getCourses]", error.message)
    return []
  }
  return (data as CourseRow[]).map(mapCourse)
}

export async function getCursoBySlug(slug: string): Promise<Course | undefined> {
  const supabase = await createClient()
  const { data, error } = await supabase.from("courses").select("*").eq("slug", slug).maybeSingle()

  if (error || !data) return undefined
  return mapCourse(data as CourseRow)
}

export async function getCursoById(id: string): Promise<Course | undefined> {
  const supabase = await createClient()
  const { data, error } = await supabase.from("courses").select("*").eq("id", id).maybeSingle()

  if (error || !data) return undefined
  return mapCourse(data as CourseRow)
}

export async function getOtrosCursos(slug: string, max = 2): Promise<Course[]> {
  const courses = await getCourses()
  return courses.filter((c) => c.slug !== slug).slice(0, max)
}
