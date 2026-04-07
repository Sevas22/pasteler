import Link from "next/link"
import { LayoutShell } from "@/components/layout-shell"

export default function ServicioNotFound() {
  return (
    <LayoutShell>
      <div className="h-20" aria-hidden />
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="font-serif text-3xl font-normal text-heading">Servicio no encontrado</h1>
        <p className="mt-4 text-muted-foreground">Ese servicio no existe en el ecommerce.</p>
        <Link
          href="/productos"
          className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Ver todos los productos
        </Link>
      </div>
    </LayoutShell>
  )
}
