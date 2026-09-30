import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import type { Course } from "@/lib/data/courses"
import { SoftCircle } from "@/components/ornaments/soft-circle"

type CursosListaProps = {
  courses: Course[]
}

export function CursosLista({ courses }: CursosListaProps) {
  return (
    <section data-no-section-divider className="relative overflow-hidden bg-background px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <SoftCircle color="gold" size={280} className="-right-20 top-0" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-20">
        {courses.map((course, i) => {
          const invert = i % 2 === 1
          return (
            <article
              key={course.slug}
              className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${invert ? "lg:[&>*:first-child]:order-2" : ""}`}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-[0_25px_55px_-25px_rgba(58,38,32,0.45)]">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 560px"
                />
              </div>

              <div>
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-primary/80">
                  <span>{course.level}</span>
                  <span className="h-1 w-1 rounded-full bg-primary/50" aria-hidden />
                  <span>{course.duration}</span>
                  {course.students ? (
                    <>
                      <span className="h-1 w-1 rounded-full bg-primary/50" aria-hidden />
                      <span>{course.students}</span>
                    </>
                  ) : null}
                </p>

                <h2
                  className="mt-3 text-balance text-3xl font-normal leading-tight text-heading sm:text-4xl"
                  style={{ fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }}
                >
                  {course.title}
                </h2>

                <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                  {course.description}
                </p>

                {course.topics.length > 0 ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {course.topics.map((topic) => (
                      <span
                        key={topic}
                        className="rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-foreground"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                ) : null}

                {course.highlights.length > 0 ? (
                  <ul className="mt-5 flex flex-col gap-2">
                    {course.highlights.slice(0, 3).map((h) => (
                      <li key={h} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                        {h}
                      </li>
                    ))}
                  </ul>
                ) : null}

                <Link
                  href={`/cursos/${course.slug}`}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  Ver curso completo
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
