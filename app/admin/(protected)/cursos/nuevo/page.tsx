import { CourseForm } from "@/components/admin/course-form"
import { BackLink } from "@/components/admin/back-link"

export default function NuevoCursoPage() {
  return (
    <div>
      <BackLink href="/admin/cursos" label="Cursos" />
      <h1 className="font-serif text-3xl font-normal text-heading">Nuevo curso</h1>
      <div className="mt-8">
        <CourseForm />
      </div>
    </div>
  )
}
