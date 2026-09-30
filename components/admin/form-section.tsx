import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"

type FormSectionProps = {
  icon: LucideIcon
  title: string
  description?: string
  children: ReactNode
}

/** Tarjeta de sección para formularios admin — agrupa campos relacionados con encabezado claro. */
export function FormSection({ icon: Icon, title, description, children }: FormSectionProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <Icon className="h-4.5 w-4.5 text-primary" />
        </div>
        <div>
          <h2 className="font-medium text-foreground">{title}</h2>
          {description ? <p className="mt-0.5 text-sm text-muted-foreground">{description}</p> : null}
        </div>
      </div>
      <div className="mt-5 space-y-5">{children}</div>
    </div>
  )
}
