"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ImagePlus, Loader2, X } from "lucide-react"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"

type Props = {
  name: string
  label: string
  defaultValue?: string[]
  folder: string
  /** Máximo de imágenes extra por producto. */
  max?: number
}

/**
 * Imágenes extra de un producto: subir varias a la vez (hasta `max`), quitar y reordenar.
 * Guarda las URLs en un input oculto, una por línea (el mismo formato que ya lee el servidor).
 */
export function GaleriaUploadField({ name, label, defaultValue = [], folder, max = 4 }: Props) {
  const [urls, setUrls] = useState<string[]>(defaultValue.filter(Boolean))
  const [subiendo, setSubiendo] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [arrastrando, setArrastrando] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const libres = Math.max(0, max - urls.length - subiendo)
  const excedido = urls.length > max

  async function subir(archivos: File[]) {
    setError(null)
    const imagenes = archivos.filter((f) => f.type.startsWith("image/"))
    if (imagenes.length < archivos.length) setError("Algunos archivos no eran imágenes y se omitieron.")
    if (imagenes.length > libres) {
      setError(`Máximo ${max} imágenes extra. Solo se subirán ${libres}.`)
    }
    const lote = imagenes.slice(0, libres)
    if (lote.length === 0) return

    setSubiendo((n) => n + lote.length)
    const supabase = createClient()
    await Promise.all(
      lote.map(async (file) => {
        try {
          const ext = file.name.split(".").pop() || "jpg"
          const path = `${folder}/${crypto.randomUUID()}.${ext}`
          const { error: e } = await supabase.storage
            .from("daliza-media")
            .upload(path, file, { cacheControl: "3600", upsert: false })
          if (e) throw e
          const { data } = supabase.storage.from("daliza-media").getPublicUrl(path)
          setUrls((prev) => [...prev, data.publicUrl])
        } catch (err) {
          setError(err instanceof Error ? err.message : "No se pudo subir una imagen.")
        } finally {
          setSubiendo((n) => n - 1)
        }
      }),
    )
  }

  function mover(i: number, dir: -1 | 1) {
    setUrls((prev) => {
      const j = i + dir
      if (j < 0 || j >= prev.length) return prev
      const copia = [...prev]
      ;[copia[i], copia[j]] = [copia[j], copia[i]]
      return copia
    })
  }

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-2">
        <Label>{label}</Label>
        <span className={cn("text-xs", excedido ? "font-medium text-destructive" : "text-muted-foreground")}>
          {urls.length}/{max}
        </span>
      </div>
      <input type="hidden" name={name} value={urls.join("\n")} readOnly />

      <div
        onDragOver={(e) => {
          e.preventDefault()
          if (libres > 0) setArrastrando(true)
        }}
        onDragLeave={() => setArrastrando(false)}
        onDrop={(e) => {
          e.preventDefault()
          setArrastrando(false)
          void subir(Array.from(e.dataTransfer.files))
        }}
        className={cn(
          "grid grid-cols-2 gap-3 rounded-xl border-2 border-dashed p-3 transition-colors sm:grid-cols-4",
          arrastrando ? "border-primary bg-primary/5" : "border-border",
        )}
      >
        {urls.map((url, i) => (
          <div key={url} className="group relative aspect-square overflow-hidden rounded-lg border border-border bg-muted">
            <Image src={url} alt={`Imagen extra ${i + 1}`} fill className="object-cover" unoptimized />
            <span className="absolute left-1.5 top-1.5 rounded-full bg-black/55 px-2 py-0.5 text-[11px] font-medium text-white">
              {i + 1}
            </span>
            <button
              type="button"
              onClick={() => setUrls((prev) => prev.filter((u) => u !== url))}
              aria-label={`Quitar imagen ${i + 1}`}
              className="absolute right-1.5 top-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-destructive shadow transition-colors hover:bg-white"
            >
              <X className="h-4 w-4" />
            </button>
            {/* Reordenar: el orden es el de la galería en la ficha del producto */}
            <div className="absolute inset-x-1.5 bottom-1.5 flex justify-between">
              <button
                type="button"
                onClick={() => mover(i, -1)}
                disabled={i === 0}
                aria-label={`Mover imagen ${i + 1} a la izquierda`}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-foreground shadow disabled:opacity-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => mover(i, 1)}
                disabled={i === urls.length - 1}
                aria-label={`Mover imagen ${i + 1} a la derecha`}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-foreground shadow disabled:opacity-0"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        {Array.from({ length: subiendo }, (_, i) => (
          <div key={`subiendo-${i}`} className="flex aspect-square items-center justify-center rounded-lg border border-border bg-muted">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ))}

        {libres > 0 && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-primary/40 bg-primary/[0.03] p-2 text-center text-primary transition-colors hover:bg-primary/[0.07]"
          >
            <ImagePlus className="h-6 w-6" />
            <span className="text-xs font-medium">Agregar {libres > 1 ? `(hasta ${libres})` : ""}</span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          void subir(Array.from(e.target.files ?? []))
          e.target.value = ""
        }}
      />

      {excedido ? (
        <p className="text-sm text-destructive">
          Este producto tiene {urls.length} imágenes extra y el máximo es {max}. Se conservan, pero quita{" "}
          {urls.length - max} para poder agregar nuevas.
        </p>
      ) : (
        <p className="text-xs text-muted-foreground">
          Se muestran en la galería de la ficha, después de la imagen principal. Usa las flechas para cambiar el orden.
        </p>
      )}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  )
}
