import Image from "next/image"
import Link from "next/link"
import { Check, ChefHat, Clock, MessageCircle, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getOtrosCursos, type Course } from "@/lib/data/courses"
import { cn } from "@/lib/utils"

type CourseDetailViewProps = {
  course: Course
}

export function CourseDetailView({ course }: CourseDetailViewProps) {
  const otros = getOtrosCursos(course.slug, 2)
  const contactHref = `/contacto?curso=${encodeURIComponent(course.title)}`
  const waHref = `https://wa.me/573108336425?text=${encodeURIComponent(
    `Hola, quiero información sobre el curso: ${course.title}`,
  )}`

  return (
    <article>
      <div className="relative aspect-[5/4] min-h-[240px] w-full overflow-hidden bg-muted sm:aspect-[21/9] sm:min-h-[220px] md:aspect-[2.4/1] md:min-h-[300px]">
        <Image
          src={course.image}
          alt=""
          fill
          priority
          className="object-contain object-center sm:object-cover sm:object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent md:via-black/25"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A96E]">Formación · Dalizas</p>
          <h1 className="mt-2 font-serif text-3xl font-normal tracking-normal text-balance text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.65)] md:text-5xl">
            {course.title}
          </h1>
          <div className="mt-3 h-0.5 w-14 rounded-full bg-brand-gold md:w-16" aria-hidden />
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="inline-flex rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow-sm">
              {course.level}
            </span>
            <span className="inline-flex items-center gap-1 text-sm text-white/90">
              <Clock className="h-4 w-4 text-[#C9A96E]" />
              {course.duration}
            </span>
            <span className="inline-flex items-center gap-1 text-sm text-white/90">
              <Users className="h-4 w-4 text-[#C9A96E]" />
              {course.students}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_380px] lg:items-start lg:gap-16">
          <div className="min-w-0 space-y-8">
            <div>
              <h2 className="font-serif text-xl font-normal text-heading md:text-2xl">Sobre este curso</h2>
              <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                {course.descripcionLarga}
              </p>
            </div>

            <div className="rounded-2xl border border-brand-gold/25 bg-card/80 p-6 shadow-sm ring-1 ring-brand-gold/10">
              <h3 className="font-serif text-lg font-normal text-heading">Qué obtienes</h3>
              <ul className="mt-4 space-y-3">
                {course.highlights.map((line) => (
                  <li key={line} className="flex gap-3 text-sm text-muted-foreground md:text-base">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-lg font-normal text-heading">Temario</h3>
              <ul className="mt-4 space-y-2">
                {course.topics.map((topic) => (
                  <li
                    key={topic}
                    className="flex items-center gap-2 text-sm text-muted-foreground md:text-base"
                  >
                    <ChefHat className="h-4 w-4 shrink-0 text-brand-cherry" aria-hidden />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>

            {course.imagenesExtra && course.imagenesExtra.length > 0 && (
              <div>
                <h3 className="font-serif text-lg font-normal text-heading">Galería</h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {course.imagenesExtra.map((src, i) => (
                    <div
                      key={src}
                      className={cn(
                        "relative aspect-[4/3] overflow-hidden rounded-xl bg-muted shadow-inner",
                        course.imagenesExtra!.length === 1 && "sm:col-span-2",
                      )}
                    >
                      <Image
                        src={src}
                        alt={`${course.title} — imagen ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="lg:sticky lg:top-28">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-md">
              <p className="text-sm text-muted-foreground leading-relaxed">{course.description}</p>
              <div className="mt-6 flex flex-col gap-3">
                <Button asChild className="w-full rounded-full py-6 text-base font-semibold" size="lg">
                  <Link href={contactHref}>
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Inscribirme
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full rounded-full border-primary/30">
                  <Link href={waHref} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </Link>
                </Button>
              </div>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                Indica en el mensaje el curso y tu disponibilidad; te respondemos con fechas y valor.
              </p>
            </div>
          </aside>
        </div>

        {otros.length > 0 && (
          <section className="mt-20 border-t border-brand-leaf/20 pt-16">
            <h2 className="font-serif text-2xl font-normal text-heading md:text-3xl">Otros cursos</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {otros.map((c) => (
                <Link
                  key={c.slug}
                  href={`/cursos/${c.slug}`}
                  className="group overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <Image
                      src={c.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-medium uppercase tracking-wider text-primary">{c.level}</p>
                    <p className="mt-1 font-serif text-lg font-normal text-heading transition-colors group-hover:text-primary">
                      {c.title}
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  )
}
