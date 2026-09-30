import { notFound } from "next/navigation"
import Image from "next/image"
import { LocationForm } from "@/components/admin/location-form"
import { BackLink } from "@/components/admin/back-link"
import { getLocationById } from "@/lib/data/locations"
import { generateQrDataUrl, getLocationUrl } from "@/lib/qr"

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditarSucursalPage({ params }: Props) {
  const { id } = await params
  const location = await getLocationById(id)
  if (!location) notFound()

  const qrDataUrl = await generateQrDataUrl(getLocationUrl(location.slug))

  return (
    <div>
      <BackLink href="/admin/sucursales" label="Sucursales" />
      <h1 className="font-serif text-3xl font-normal text-heading">Editar sucursal</h1>
      <p className="mt-1 text-muted-foreground">{location.name}</p>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_260px]">
        <LocationForm location={location} />

        <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 text-center shadow-sm">
          <p className="text-sm font-medium text-foreground">Código QR de esta sede</p>
          <Image src={qrDataUrl} alt="" width={200} height={200} unoptimized />
          <a
            href={qrDataUrl}
            download={`qr-daliza-${location.slug}.png`}
            className="text-sm font-semibold text-primary underline-offset-2 hover:underline"
          >
            Descargar QR
          </a>
          <p className="text-xs text-muted-foreground">Apunta a {getLocationUrl(location.slug)}</p>
        </div>
      </div>
    </div>
  )
}
