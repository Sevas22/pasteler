"use client"

import { useTransition } from "react"
import { Loader2, Trash2 } from "lucide-react"
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

type DeleteConfirmProps = {
  action: (id: string) => Promise<void>
  id: string
  itemLabel: string
  title?: string
  description?: string
}

/** Confirmación elegante (reemplaza window.confirm) + aviso de éxito. */
export function DeleteConfirm({ action, id, itemLabel, title, description }: DeleteConfirmProps) {
  const [pending, startTransition] = useTransition()

  function handleConfirm() {
    startTransition(async () => {
      await action(id)
      toast.success(`"${itemLabel}" se eliminó correctamente.`)
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
          disabled={pending}
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title ?? `¿Eliminar "${itemLabel}"?`}</AlertDialogTitle>
          <AlertDialogDescription>
            {description ?? "Esta acción no se puede deshacer. Se quitará de inmediato del sitio público."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/30"
          >
            Sí, eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
