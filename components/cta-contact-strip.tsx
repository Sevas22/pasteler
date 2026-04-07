import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

export function CtaContactStrip() {
  return (
    <section className="border-t border-brand-gold/25 bg-gradient-to-b from-white to-background py-14 sm:py-16 md:py-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 text-center sm:px-6 md:flex-row md:items-center md:text-left lg:px-8">
        <div className="max-w-xl px-1 sm:px-0 md:max-w-none">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/90">Siguiente paso</p>
          <h2 className="mt-2 font-serif text-3xl font-normal text-heading md:text-4xl">
            ¿Listo para endulzar tu día?
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground leading-relaxed">
            Escríbenos para pedidos, cursos o información. Te esperamos en cualquiera de nuestras sedes.
          </p>
        </div>
        <div className="flex w-full max-w-md flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:justify-center md:justify-end">
          <Button asChild size="lg" className="w-full min-h-[48px] sm:w-auto sm:min-h-10">
            <Link href="/contacto">Contactarnos</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full min-h-[48px] border-brand-gold/60 text-primary hover:bg-muted/60 sm:w-auto sm:min-h-10"
          >
            <a href="https://wa.me/573108336425" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
