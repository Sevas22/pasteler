import Image from "next/image"
import Link from "next/link"
import { ChefHat, Check, Clock, MessageCircle, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Course } from "@/lib/data/courses"
import { cn } from "@/lib/utils"
import { Reveal, RevealStagger, RevealItem } from "@/components/motion/reveal"
import { FlourishDivider } from "@/components/ornaments/flourish-divider"

type CourseDetailViewProps = {
  course: Course
  otros: Course[]
}

export function CourseDetailView({ course, otros }: CourseDetailViewProps) {
  const contactHref = `/contacto?curso=${encodeURIComponent(course.title)}`
  const waHref = `https://wa.me/573108336425?text=${encodeURIComponent(
    `Hola, quiero información sobre el curso: ${course.title}`,
  )}`

  return (
    <article>
      {/* Hero fotográfico */}
      <div className="relative aspect-[5/4] min-h-[280px] w-full overflow-hidden bg-muted sm:aspect-[21/9] sm:min-h-[240px] md:aspect-[2.4/1] md:min-h-[360px]">
        <Image
          src={course.image}
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/50 to-black/10"
          aria-hidden
        />
        <div className="absolute inset-x-0 top-0 mx-auto max-w-7xl px-4 pt-[calc(4.5rem+1rem)] sm:px-6 lg:px-8">
          <nav className="flex flex-wrap items-center gap-1.5 text-xs text-white/65">
            <Link href="/" className="transition-colors hover:text-white">
              Inicio
            </Link>
            <span aria-hidden>/</span>
            <Link href="/cursos" className="transition-colors hover:text-white">
              Cursos
            </Link>
            <span aria-hidden>/</span>
            <span className="text-white/90">{course.title}</span>
          </nav>
        </div>
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A96E]">Una experiencia Daliza</p>
          <h1 className="mt-2 font-serif text-3xl font-normal tracking-normal text-balance text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.65)] md:text-5xl">
            {course.title}
          </h1>
          <FlourishDivider className="mt-3 justify-start" tone="cream" />
          <div className="mt-4 flex flex-wrap items-center gap-3">
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
          <Reveal className="min-w-0 space-y-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Sobre este curso</p>
              <h2 className="mt-2 font-serif text-2xl italic font-normal text-heading md:text-3xl">
                {course.description}
              </h2>
              <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                {course.descripcionLarga}
              </p>
            </div>

            {course.highlights.length > 0 && (
              <div>
                <h3 className="font-serif text-lg font-normal text-heading">Qué obtienes</h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {course.highlights.map((line) => (
                    <div
                      key={line}
                      className="flex items-start gap-3 rounded-xl border border-brand-gold/20 bg-card px-4 py-3 shadow-sm"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-3.5 w-3.5 text-primary" aria-hidden />
                      </span>
                      <span className="text-sm text-foreground">{line}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {course.topics.length > 0 && (
              <div>
                <h3 className="font-serif text-lg font-normal text-heading">Temario</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {course.topics.map((topic) => (
                    <span
                      key={topic}
                      className="inline-flex items-center gap-1.5 rounded-full border border-brand-cherry/25 bg-brand-cherry/[0.06] px-3.5 py-1.5 text-sm text-foreground"
                    >
                      <ChefHat className="h-3.5 w-3.5 shrink-0 text-brand-cherry" aria-hidden />
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {course.imagenesExtra && course.imagenesExtra.length > 0 && (
              <div>
                <h3 className="font-serif text-lg font-normal text-heading">Galería</h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {course.imagenesExtra.map((src, i) => (
                    <div
                      key={src}
                      className={cn(
                        "group relative aspect-[4/3] overflow-hidden rounded-xl bg-muted shadow-inner",
                        course.imagenesExtra!.length === 1 && "sm:col-span-2",
                      )}
                    >
                      <Image
                        src={src}
                        alt={`${course.title} — imagen ${i + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <aside className="lg:sticky lg:top-28">
              <div className="rounded-2xl border-2 border-brand-gold/30 bg-card p-6 shadow-[0_20px_50px_-20px_rgba(92,46,46,0.3)]">
                <p className="font-serif text-xl italic font-normal text-heading">{course.level}</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{course.description}</p>
                <div className="mt-6 flex flex-col gap-3">
                  <Button asChild className="w-full rounded-full py-6 text-base font-semibold" size="lg">
                    <Link href={waHref} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Inscribirme por WhatsApp
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full rounded-full border-primary/30 text-primary">
                    <Link href={contactHref}>Solicitar información</Link>
                  </Button>
                </div>
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Indica en el mensaje el curso y tu disponibilidad; te respondemos con fechas y valor.
                </p>
              </div>
            </aside>
          </Reveal>
        </div>

        {otros.length > 0 && (
          <section className="mt-20 border-t border-brand-gold/20 pt-16">
            <Reveal>
              <div className="mx-auto max-w-2xl px-1 text-center">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">Sigue aprendiendo</p>
                <h2 className="mt-2 font-serif text-3xl font-normal text-heading">Otros cursos</h2>
                <FlourishDivider className="mt-4" />
              </div>
            </Reveal>
            <RevealStagger className="mt-10 grid gap-6 sm:grid-cols-2">
              {otros.map((c) => (
                <RevealItem key={c.slug}>
                  <Link
                    href={`/cursos/${c.slug}`}
                    className="group block overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-gold/50 hover:shadow-[0_20px_44px_-18px_rgba(139,46,46,0.3)]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                      <Image
                        src={c.image}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.08]"
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
                </RevealItem>
              ))}
            </RevealStagger>
          </section>
        )}
      </div>
    </article>
  )
}
