import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import { GraduationCap, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DeleteConfirm } from "@/components/admin/delete-confirm"
import { ToastOnParam } from "@/components/admin/toast-on-param"
import { deleteCourseAction } from "@/app/admin/actions"
import { getCourses } from "@/lib/data/courses"

export default async function AdminCursosPage() {
  const courses = await getCourses()

  return (
    <div>
      <Suspense>
        <ToastOnParam messages={{ created: "Curso creado con éxito.", updated: "Curso actualizado con éxito." }} />
      </Suspense>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-normal text-heading">Cursos</h1>
          <p className="mt-1 text-muted-foreground">{courses.length} cursos publicados.</p>
        </div>
        <Button asChild>
          <Link href="/admin/cursos/nuevo">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo curso
          </Link>
        </Button>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-18px_rgba(139,46,46,0.25)]"
          >
            <div className="relative h-36 w-full overflow-hidden bg-muted">
              <Image
                src={course.image}
                alt=""
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                unoptimized
              />
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-serif text-lg font-normal text-heading">{course.title}</h2>
                {!course.active && (
                  <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    Inactivo
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {course.level} · {course.duration}
              </p>
              <div className="mt-4 flex items-center gap-1">
                <Button asChild variant="ghost" size="sm">
                  <Link href={`/admin/cursos/${course.id}`}>Editar</Link>
                </Button>
                <DeleteConfirm action={deleteCourseAction} id={course.id} itemLabel={course.title} />
              </div>
            </div>
          </div>
        ))}
        {courses.length === 0 && (
          <div className="col-span-full flex flex-col items-center gap-2 py-16 text-center text-muted-foreground">
            <GraduationCap className="h-10 w-10 opacity-50" />
            Aún no hay cursos. Crea el primero.
          </div>
        )}
      </div>
    </div>
  )
}
