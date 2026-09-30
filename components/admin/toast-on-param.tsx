"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"

type ToastOnParamProps = {
  /** Nombre del query param que dispara el toast, p. ej. "ok". */
  param?: string
  /** Mensajes por valor de `msg` (p. ej. created/updated); "default" cubre cualquier otro caso. */
  messages: Partial<Record<"created" | "updated" | "default", string>>
}

/** Muestra un toast de éxito cuando la URL trae el query param (tras un redirect de Server Action) y lo limpia. */
export function ToastOnParam({ param = "ok", messages }: ToastOnParamProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get(param) !== "1") return
    const msg = searchParams.get("msg") ?? "default"
    toast.success(messages[msg as keyof typeof messages] ?? messages.default ?? "Guardado con éxito.")
    const url = new URL(window.location.href)
    url.searchParams.delete(param)
    url.searchParams.delete("msg")
    router.replace(`${url.pathname}${url.search}`, { scroll: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  return null
}
