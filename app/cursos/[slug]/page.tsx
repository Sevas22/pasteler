import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { LayoutShell } from "@/components/layout-shell"
import { CourseDetailView } from "@/components/course-detail-view"
import { getCoursesPublic, getCursoBySlugPublic, getOtrosCursosPublic } from "@/lib/data/courses"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return (await getCoursesPublic()).map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const course = await getCursoBySlugPublic(slug)
  if (!course) {
    return { title: "Curso" }
  }
  return {
    title: `${course.title}, curso de pastelería en Bogotá`,
    description: course.description,
    alternates: { canonical: `/cursos/${course.slug}` },
    openGraph: {
      title: `${course.title} | Daliza Pastelería Fina`,
      url: `/cursos/${course.slug}`,
      description: course.description,
      images: [{ url: course.image, alt: course.title }],
    },
  }
}

export default async function CursoDetallePage({ params }: Props) {
  const { slug } = await params
  const course = await getCursoBySlugPublic(slug)
  if (!course) {
    notFound()
  }
  const otros = await getOtrosCursosPublic(course.slug, 2)

  return (
    <LayoutShell>
      <CourseDetailView course={course} otros={otros} />
    </LayoutShell>
  )
}
