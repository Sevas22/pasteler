"use client"

import { useActionState, useEffect, useState } from "react"
import { useFormStatus } from "react-dom"
import { toast } from "sonner"
import { ImageIcon, Info, ListChecks, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImageUploadField } from "@/components/admin/image-upload-field"
import { FormSection } from "@/components/admin/form-section"
import { saveCourseAction, type ActionResult } from "@/app/admin/actions"
import type { Course } from "@/lib/data/courses"

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function SubmitButton({ isEdit }: { isEdit: boolean }) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" size="lg" disabled={pending} className="min-w-[10rem]">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {isEdit ? "Guardar cambios" : "Crear curso"}
    </Button>
  )
}

const initialState: ActionResult = {}

export function CourseForm({ course }: { course?: Course }) {
  const [state, formAction] = useActionState(saveCourseAction, initialState)
  const [title, setTitle] = useState(course?.title ?? "")
  const [slug, setSlug] = useState(course?.slug ?? "")
  const [slugTouched, setSlugTouched] = useState(Boolean(course))

  useEffect(() => {
    if (state?.error) toast.error(state.error)
  }, [state])

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      {course ? <input type="hidden" name="id" value={course.id} /> : null}

      <FormSection icon={Info} title="Información básica" description="Título y datos generales del curso.">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">Título del curso</Label>
            <Input
              id="title"
              name="title"
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
                if (!slugTouched) setSlug(slugify(e.target.value))
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">
              Slug <span className="font-normal text-muted-foreground">— se genera solo</span>
            </Label>
            <Input
              id="slug"
              name="slug"
              required
              value={slug}
              onChange={(e) => {
                setSlugTouched(true)
                setSlug(e.target.value)
              }}
            />
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="level">Nivel</Label>
            <Input id="level" name="level" placeholder="Principiante" defaultValue={course?.level ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duración</Label>
            <Input id="duration" name="duration" placeholder="4 semanas" defaultValue={course?.duration ?? ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="students">Cupo</Label>
            <Input id="students" name="students" placeholder="8 máx." defaultValue={course?.students ?? ""} />
          </div>
        </div>
      </FormSection>

      <FormSection icon={ListChecks} title="Descripción y temario" description="Lo que aprenderán tus estudiantes.">
        <div className="space-y-2">
          <Label htmlFor="description">Descripción corta</Label>
          <Textarea id="description" name="description" rows={2} defaultValue={course?.description ?? ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="descriptionLong">Descripción larga (ficha del curso)</Label>
          <Textarea id="descriptionLong" name="descriptionLong" rows={4} defaultValue={course?.descripcionLarga ?? ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="topics">Temario (uno por línea)</Label>
          <Textarea id="topics" name="topics" rows={4} defaultValue={course?.topics.join("\n") ?? ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="highlights">Qué obtienes (uno por línea)</Label>
          <Textarea id="highlights" name="highlights" rows={4} defaultValue={course?.highlights.join("\n") ?? ""} />
        </div>
      </FormSection>

      <FormSection icon={ImageIcon} title="Imágenes" description="La imagen principal se ve en la lista de cursos.">
        <ImageUploadField name="imagen" label="Imagen principal" defaultValue={course?.image} folder="cursos" />
        <div className="space-y-2">
          <Label htmlFor="imagenesExtra">URLs de imágenes extra (una por línea, opcional)</Label>
          <Textarea id="imagenesExtra" name="imagenesExtra" rows={3} defaultValue={course?.imagenesExtra?.join("\n") ?? ""} />
        </div>
      </FormSection>

      <label className="flex items-center gap-2 rounded-2xl border border-border bg-card px-5 py-4 text-sm font-medium shadow-sm">
        <input
          type="checkbox"
          name="active"
          defaultChecked={course?.active ?? true}
          className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
        />
        Curso activo (visible en el sitio)
      </label>

      <SubmitButton isEdit={Boolean(course)} />
    </form>
  )
}
