"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ImageIcon, Loader2, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"

type ImageUploadFieldProps = {
  name: string
  label: string
  defaultValue?: string | null
  folder: string
  /** Notifica la URL actual al padre (p. ej. para una vista previa en vivo). */
  onChangeUrl?: (url: string) => void
}

/** Sube directo a Supabase Storage (bucket público `daliza-media`), con arrastrar-y-soltar, y guarda la URL final en un input oculto. */
export function ImageUploadField({ name, label, defaultValue, folder, onChangeUrl }: ImageUploadFieldProps) {
  const [url, setUrl] = useState(defaultValue ?? "")
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    onChangeUrl?.(url)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Selecciona un archivo de imagen.")
      return
    }
    setError(null)
    setUploading(true)
    try {
      const supabase = createClient()
      const ext = file.name.split(".").pop() || "jpg"
      const path = `${folder}/${crypto.randomUUID()}.${ext}`
      const { error: uploadError } = await supabase.storage.from("daliza-media").upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      })
      if (uploadError) throw uploadError

      const { data } = supabase.storage.from("daliza-media").getPublicUrl(path)
      setUrl(data.publicUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo subir la imagen.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <input type="hidden" name={name} value={url} readOnly />
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          const file = e.dataTransfer.files?.[0]
          if (file) handleFile(file)
        }}
        className={cn(
          "flex items-center gap-4 rounded-xl border-2 border-dashed p-3 transition-colors",
          dragOver ? "border-primary bg-primary/5" : "border-border",
        )}
      >
        <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-muted">
          {url ? (
            <Image src={url} alt="" fill className="object-cover" unoptimized />
          ) : (
            <ImageIcon className="h-8 w-8 text-muted-foreground" />
          )}
          {uploading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <Loader2 className="h-6 w-6 animate-spin text-white" />
            </div>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <p className="text-xs text-muted-foreground">Arrastra una imagen aquí o</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleFile(file)
            }}
          />
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
            >
              {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
              {url ? "Cambiar imagen" : "Elegir archivo"}
            </Button>
            {url ? (
              <Button type="button" variant="ghost" size="sm" onClick={() => setUrl("")} className="text-destructive">
                <X className="mr-2 h-4 w-4" />
                Quitar
              </Button>
            ) : null}
          </div>
        </div>
      </div>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  )
}
