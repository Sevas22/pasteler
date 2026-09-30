import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DeleteConfirm } from "@/components/admin/delete-confirm"
import { ToastOnParam } from "@/components/admin/toast-on-param"
import { deleteLocationAction } from "@/app/admin/actions"
import { getLocations } from "@/lib/data/locations"
import { generateQrDataUrl, getLocationUrl } from "@/lib/qr"

export default async function AdminSucursalesPage() {
  const locations = await getLocations()
  const qrEntries = await Promise.all(
    locations.map(async (l) => [l.id, await generateQrDataUrl(getLocationUrl(l.slug))] as const),
  )
  const qrByLocationId = Object.fromEntries(qrEntries)

  return (
    <div>
      <Suspense>
        <ToastOnParam
          messages={{ created: "Sucursal creada con éxito.", updated: "Sucursal actualizada con éxito." }}
        />
      </Suspense>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-normal text-heading">Sucursales</h1>
          <p className="mt-1 text-muted-foreground">{locations.length} sedes registradas.</p>
        </div>
        <Button asChild>
          <Link href="/admin/sucursales/nueva">
            <Plus className="mr-2 h-4 w-4" />
            Nueva sucursal
          </Link>
        </Button>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {locations.map((location) => (
          <div
            key={location.id}
            className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-18px_rgba(139,46,46,0.25)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-serif text-lg font-normal text-heading">{location.name}</h2>
                <p className="text-sm text-muted-foreground">{location.type}</p>
                {!location.active && (
                  <span className="mt-1 inline-block rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    Inactiva
                  </span>
                )}
              </div>
              <div className="overflow-hidden rounded-md border border-border bg-white p-1 transition-transform duration-300 group-hover:scale-105">
                <Image src={qrByLocationId[location.id]} alt="" width={56} height={56} className="h-14 w-14" unoptimized />
              </div>
            </div>
            <p className="mt-3 text-sm text-foreground">{location.address}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href={`/tiendas/${location.slug}`} target="_blank">
                  Ver página pública
                </Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href={`/admin/sucursales/${location.id}`}>Editar</Link>
              </Button>
              <DeleteConfirm
                action={deleteLocationAction}
                id={location.id}
                itemLabel={location.name}
                description="También se quitará de todos los productos que la tengan asignada. Esta acción no se puede deshacer."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
