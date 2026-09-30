import { notFound } from "next/navigation"
import { CourseForm } from "@/components/admin/course-form"
import { BackLink } from "@/components/admin/back-link"
import { getCursoById } from "@/lib/data/courses"

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditarCursoPage({ params }: Props) {
  const { id } = await params
  const course = await getCursoById(id)
  if (!course) notFound()

  return (
    <div>
      <BackLink href="/admin/cursos" label="Cursos" />
      <h1 className="font-serif text-3xl font-normal text-heading">Editar curso</h1>
      <p className="mt-1 text-muted-foreground">{course.title}</p>
      <div className="mt-8">
        <CourseForm course={course} />
      </div>
    </div>
  )
}
