"use client"

import { startTransition, useActionState, useEffect, useRef, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Save, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { eliminarSolicitudAction, guardarSeguimientoAction, type ActionResult } from "@/app/admin/actions"
import { ESTADOS_SOLICITUD, ETIQUETA_ESTADO, type EstadoSolicitud } from "@/lib/solicitudes"

const CAMPO = "h-10 w-full rounded-md border border-border bg-background px-3 text-sm"

/** Fecha local (Bogotá) + n días en formato yyyy-mm-dd. */
function enDias(n: number): string {
  const hoy = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Bogota" }).format(new Date())
  const d = new Date(`${hoy}T12:00:00Z`)
  d.setUTCDate(d.getUTCDate() + n)
  return d.toISOString().slice(0, 10)
}

export function SeguimientoSolicitud({
  id,
  estado,
  proximoContacto,
}: {
  id: string
  estado: EstadoSolicitud
  proximoContacto: string | null
}) {
  const [resultado, accion, guardando] = useActionState<ActionResult, FormData>(guardarSeguimientoAction, {})
  const [fecha, setFecha] = useState(proximoContacto ?? "")
  const [estadoSel, setEstadoSel] = useState<EstadoSolicitud>(estado)
  const notaRef = useRef<HTMLTextAreaElement>(null)
  const enviado = useRef(false)

  useEffect(() => {
    if (!enviado.current || guardando) return
    enviado.current = false
    if (resultado.error) toast.error(resultado.error)
    else {
      toast.success("Seguimiento guardado.")
      if (notaRef.current) notaRef.current.value = ""
    }
  }, [resultado, guardando])

  const programar = (dias: number) => {
    setFecha(enDias(dias))
    if (estadoSel === "nuevo" || estadoSel === "cerrado" || estadoSel === "descartado") setEstadoSel("por_recontactar")
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        enviado.current = true
        const fd = new FormData(e.currentTarget)
        // Fuera de <form action> para que React no reinicie el formulario al terminar
        startTransition(() => accion(fd))
      }}
      className="space-y-4"
    >
      <input type="hidden" name="id" value={id} />

      <div className="space-y-1.5">
        <label htmlFor="estado" className="text-sm font-medium text-foreground">
          Estado
        </label>
        <select
          id="estado"
          name="estado"
          value={estadoSel}
          onChange={(e) => setEstadoSel(e.target.value as EstadoSolicitud)}
          className={CAMPO}
        >
          {ESTADOS_SOLICITUD.map((e) => (
            <option key={e} value={e}>
              {ETIQUETA_ESTADO[e]}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="proximo_contacto" className="text-sm font-medium text-foreground">
          Volver a contactar el
        </label>
        <input
          id="proximo_contacto"
          name="proximo_contacto"
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className={CAMPO}
        />
        <div className="flex flex-wrap gap-1.5">
          {[
            { etiqueta: "Mañana", dias: 1 },
            { etiqueta: "En 1 semana", dias: 7 },
            { etiqueta: "En 1 mes", dias: 30 },
            { etiqueta: "En 3 meses", dias: 90 },
          ].map((o) => (
            <button
              key={o.dias}
              type="button"
              onClick={() => programar(o.dias)}
              className="rounded-full border border-border px-2.5 py-1 text-xs text-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              {o.etiqueta}
            </button>
          ))}
          {fecha && (
            <button type="button" onClick={() => setFecha("")} className="px-2 py-1 text-xs text-muted-foreground hover:text-foreground">
              Quitar fecha
            </button>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="nota" className="text-sm font-medium text-foreground">
          Agregar nota
        </label>
        <textarea
          id="nota"
          name="nota"
          ref={notaRef}
          rows={4}
          maxLength={2000}
          placeholder="Ej. Le envié la cotización por WhatsApp, quedó de confirmar el viernes."
          className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
      </div>

      <Button type="submit" disabled={guardando} className="w-full">
        {guardando ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
        Guardar seguimiento
      </Button>
    </form>
  )
}

export function EliminarSolicitud({ id, nombre }: { id: string; nombre: string }) {
  const router = useRouter()
  const [pendiente, startTransition] = useTransition()

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10 hover:text-destructive" disabled={pendiente}>
          {pendiente ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
          Eliminar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar la solicitud de {nombre}?</AlertDialogTitle>
          <AlertDialogDescription>
            Se borran sus datos y notas de seguimiento. No se puede deshacer. Si solo no te interesa, mejor márcala
            como “Descartado”.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                await eliminarSolicitudAction(id)
                toast.success("Solicitud eliminada.")
                router.push("/admin/solicitudes")
              })
            }
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            Sí, eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
