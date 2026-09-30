import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { LayoutShell } from "@/components/layout-shell"
import { CourseDetailView } from "@/components/course-detail-view"
import { getCursoBySlug, getOtrosCursos } from "@/lib/data/courses"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const course = await getCursoBySlug(slug)
  if (!course) {
    return { title: "Curso | Dalizas" }
  }
  return {
    title: `${course.title} | Dalizas Pastelería Fina`,
    description: course.description,
    openGraph: {
      title: `${course.title} | Dalizas`,
      description: course.description,
      images: [{ url: course.image, alt: course.title }],
    },
  }
}

export default async function CursoDetallePage({ params }: Props) {
  const { slug } = await params
  const course = await getCursoBySlug(slug)
  if (!course) {
    notFound()
  }
  const otros = await getOtrosCursos(course.slug, 2)

  return (
    <LayoutShell>
      <CourseDetailView course={course} otros={otros} />
    </LayoutShell>
  )
}
