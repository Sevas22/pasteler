import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const CATEGORIAS = [
  {
    titulo: "Tortas",
    texto: "Creaciones que hacen cada ocasión especial",
    href: "/productos?servicio=pasteleria",
    imagen: "/images/producto-torta-mousse-chocolate-daliza.png",
  },
  {
    titulo: "Postres",
    texto: "Pequeños placeres para grandes momentos",
    href: "/productos?servicio=reposteria",
    imagen: "/images/producto-mousse-fresa-individual-daliza.png",
  },
  {
    titulo: "Cursos",
    texto: "Aprende el arte de la pastelería fina",
    href: "/cursos",
    imagen: "/images/hero-pastry.jpg",
  },
] as const

/** "Qué quieres descubrir hoy": navegación grande por foto, justo después del hero. */
export function ExploraCategorias() {
  return (
    <section data-no-section-divider className="bg-background px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <p
        className="text-center text-3xl font-normal leading-tight text-heading sm:text-4xl"
        style={{ fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }}
      >
        ¿Qué quieres <span className="italic text-primary">descubrir hoy?</span>
      </p>

      <div className="mx-auto mt-10 grid max-w-6xl gap-6 sm:grid-cols-3 sm:gap-8">
        {CATEGORIAS.map((cat) => (
          <Link key={cat.titulo} href={cat.href} className="group flex flex-col items-center text-center">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-[0_20px_45px_-20px_rgba(58,38,32,0.4)]">
              <Image
                src={cat.imagen}
                alt={cat.titulo}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
            <h3
              className="mt-5 text-xl font-normal text-heading"
              style={{ fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }}
            >
              {cat.titulo}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{cat.texto}</p>
            <span className="mt-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:translate-x-1">
              <ArrowRight className="h-4 w-4" aria-hidden />
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
