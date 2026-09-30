import { LocationForm } from "@/components/admin/location-form"
import { BackLink } from "@/components/admin/back-link"

export default function NuevaSucursalPage() {
  return (
    <div>
      <BackLink href="/admin/sucursales" label="Sucursales" />
      <h1 className="font-serif text-3xl font-normal text-heading">Nueva sucursal</h1>
      <p className="mt-1 text-muted-foreground">Se generará un QR automáticamente al guardar.</p>
      <div className="mt-8">
        <LocationForm />
      </div>
    </div>
  )
}
