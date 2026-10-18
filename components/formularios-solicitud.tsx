"use client"

import { startTransition, useActionState, useEffect, useId, useState } from "react"
import { CheckCircle2, ClipboardList, GraduationCap, Loader2, MessageSquareWarning, Send } from "lucide-react"
import type { Location } from "@/lib/data/locations"
import type { Course } from "@/lib/data/courses"
import { enviarSolicitudAction, type EstadoEnvio } from "@/app/solicitudes/actions"
import {
  OPCIONES_COTIZACION,
  OPCIONES_EXPERIENCIA,
  OPCIONES_HORARIO,
  OPCIONES_PQRS,
  type TipoSolicitud,
} from "@/lib/solicitudes"
import { cn } from "@/lib/utils"
import { evento } from "@/lib/analytics"

/** Tres formularios (PQRS, cotizador y cursos) que guardan en la bandeja /admin/solicitudes. */

const PESTANAS: { tipo: TipoSolicitud; titulo: string; ayuda: string; Icono: typeof Send }[] = [
  {
    tipo: "cotizacion",
    titulo: "Cotizar",
    ayuda: "Cuéntanos qué necesitas y te enviamos la cotización.",
    Icono: ClipboardList,
  },
  {
    tipo: "curso",
    titulo: "Cursos",
    ayuda: "Déjanos tus datos y te contamos fechas, valores y cupos.",
    Icono: GraduationCap,
  },
  {
    tipo: "pqrs",
    titulo: "PQRS",
    ayuda: "Peticiones, quejas, reclamos, sugerencias o felicitaciones.",
    Icono: MessageSquareWarning,
  },
]

const CAMPO =
  "w-full rounded-[3px] border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary aria-[invalid=true]:border-destructive"

type Props = { locations: Location[]; courses: Course[] }

export function FormulariosSolicitud({ locations, courses }: Props) {
  const [activo, setActivo] = useState<TipoSolicitud>("cotizacion")
  const [inicial, setInicial] = useState<{ producto?: string; curso?: string }>({})

  // Preselección desde los botones de producto y curso (?formulario=…&producto=… / &curso=…)
  useEffect(() => {
    const p = new URLSearchParams(window.location.search)
    const formulario = p.get("formulario")
    const producto = p.get("producto") ?? p.get("servicio") ?? undefined
    const curso = p.get("curso") ?? undefined
    if (formulario === "pqrs" || formulario === "cotizacion" || formulario === "curso") setActivo(formulario)
    else if (curso) setActivo("curso")
    setInicial({ producto, curso })
  }, [])

  return (
    <div>
      <div role="tablist" aria-label="Tipo de solicitud" className="grid grid-cols-3 gap-1 rounded-full border border-border bg-card p-1">
        {PESTANAS.map(({ tipo, titulo, Icono }) => (
          <button
            key={tipo}
            type="button"
            role="tab"
            id={`pestana-${tipo}`}
            aria-selected={activo === tipo}
            aria-controls={`panel-${tipo}`}
            onClick={() => setActivo(tipo)}
            className={cn(
              "inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full px-2 text-sm font-medium transition-colors",
              activo === tipo ? "bg-primary text-primary-foreground shadow-sm" : "text-foreground hover:text-primary",
            )}
          >
            <Icono className="h-4 w-4 shrink-0" aria-hidden />
            {titulo}
          </button>
        ))}
      </div>

      {PESTANAS.map(({ tipo, ayuda }) => (
        <div
          key={tipo}
          role="tabpanel"
          id={`panel-${tipo}`}
          aria-labelledby={`pestana-${tipo}`}
          hidden={activo !== tipo}
          className="mt-6"
        >
          <p className="mb-5 text-sm text-muted-foreground">{ayuda}</p>
          <Formulario
            // Se remonta al llegar la preselección para que los valores por defecto la tomen
            key={`${tipo}-${inicial.producto ?? ""}-${inicial.curso ?? ""}`}
            tipo={tipo}
            locations={locations}
            courses={courses}
            inicial={inicial}
          />
        </div>
      ))}
    </div>
  )
}

function Formulario({
  tipo,
  locations,
  courses,
  inicial,
}: {
  tipo: TipoSolicitud
  locations: Location[]
  courses: Course[]
  inicial: { producto?: string; curso?: string }
}) {
  const [estado, accion, enviando] = useActionState<EstadoEnvio, FormData>(enviarSolicitudAction, null)
  // La solicitud ya agradecida: al pulsar "Enviar otra" se vuelve a mostrar el formulario vacío
  const [descartado, setDescartado] = useState<EstadoEnvio>(null)
  const [pagina, setPagina] = useState("")
  const uid = useId()

  useEffect(() => setPagina(window.location.pathname + window.location.search), [])

  // Analytics: cada solicitud enviada con éxito cuenta como un lead, con el formulario de origen
  useEffect(() => {
    if (estado?.ok) evento("generate_lead", { formulario: tipo, pagina: window.location.pathname })
  }, [estado, tipo])

  if (estado?.ok && estado !== descartado) {
    return (
      <div className="rounded-md border border-primary/20 bg-card p-8 text-center" role="status">
        <CheckCircle2 className="mx-auto h-10 w-10 text-primary" aria-hidden />
        <p className="mt-4 text-xl text-heading" style={{ fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }}>
          ¡Gracias{estado.nombre ? `, ${estado.nombre}` : ""}!
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Recibimos tu solicitud. Te contactaremos pronto al teléfono que nos dejaste.
        </p>
        <button
          type="button"
          onClick={() => setDescartado(estado)}
          className="mt-6 inline-flex min-h-11 items-center rounded-full border border-border px-6 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
        >
          Enviar otra solicitud
        </button>
      </div>
    )
  }

  const errores = estado && !estado.ok ? (estado.errores ?? {}) : {}
  const id = (campo: string) => `${uid}-${campo}`
  const error = (campo: string) =>
    errores[campo] ? (
      <p id={id(`${campo}-error`)} className="text-xs text-destructive">
        {errores[campo]}
      </p>
    ) : null
  const aria = (campo: string) =>
    errores[campo] ? { "aria-invalid": true as const, "aria-describedby": id(`${campo}-error`) } : {}

  const sedes = locations.filter((l) => l.active !== false)
  const cursoInicial = courses.find((c) => c.slug === inicial.curso || c.title === inicial.curso)?.title ?? ""

  return (
    <form
      // onSubmit (y no action=) para que React no vacíe los campos si hay errores de validación
      onSubmit={(e) => {
        e.preventDefault()
        const fd = new FormData(e.currentTarget)
        startTransition(() => accion(fd))
      }}
      className="flex flex-col gap-5"
    >
      <input type="hidden" name="tipo" value={tipo} />
      <input type="hidden" name="pagina" value={pagina} />
      {/* Trampa para bots: invisible para las personas */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Empresa
          <input type="text" name="empresa" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Campo etiqueta="Nombre completo" htmlFor={id("nombre")} error={error("nombre")}>
          <input id={id("nombre")} name="nombre" autoComplete="name" required placeholder="Tu nombre" className={CAMPO} {...aria("nombre")} />
        </Campo>
        <Campo etiqueta="Teléfono / WhatsApp" htmlFor={id("telefono")} error={error("telefono")}>
          <input
            id={id("telefono")}
            name="telefono"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="300 123 4567"
            className={CAMPO}
            {...aria("telefono")}
          />
        </Campo>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Campo etiqueta="Correo (opcional)" htmlFor={id("email")} error={error("email")}>
          <input id={id("email")} name="email" type="email" autoComplete="email" placeholder="tucorreo@ejemplo.com" className={CAMPO} {...aria("email")} />
        </Campo>
        <Campo etiqueta="Sede de preferencia" htmlFor={id("sede")}>
          <select id={id("sede")} name="sede_slug" defaultValue="" className={CAMPO}>
            <option value="">Cualquiera</option>
            {sedes.map((l) => (
              <option key={l.slug} value={l.slug}>
                {l.name}
              </option>
            ))}
          </select>
        </Campo>
      </div>

      {tipo === "cotizacion" && (
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <Campo etiqueta="¿Qué quieres cotizar?" htmlFor={id("categoria")} error={error("categoria")}>
              <select
                id={id("categoria")}
                name="categoria"
                required
                defaultValue={inicial.producto ? "pasteleria" : "torta_personalizada"}
                className={CAMPO}
                {...aria("categoria")}
              >
                {OPCIONES_COTIZACION.map((o) => (
                  <option key={o.valor} value={o.valor}>
                    {o.etiqueta}
                  </option>
                ))}
              </select>
            </Campo>
            <Campo etiqueta="Producto de referencia (opcional)" htmlFor={id("producto")} error={error("producto")}>
              <input id={id("producto")} name="producto" defaultValue={inicial.producto ?? ""} placeholder="Ej. Torta de chocolate" className={CAMPO} />
            </Campo>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            <Campo etiqueta="Fecha del evento" htmlFor={id("fecha_evento")} error={error("fecha_evento")}>
              <input id={id("fecha_evento")} name="fecha_evento" type="date" className={CAMPO} />
            </Campo>
            <Campo etiqueta="Porciones / personas" htmlFor={id("porciones")} error={error("porciones")}>
              <input id={id("porciones")} name="porciones" inputMode="numeric" placeholder="Ej. 20" className={CAMPO} />
            </Campo>
            <Campo etiqueta="Presupuesto (opcional)" htmlFor={id("presupuesto")} error={error("presupuesto")}>
              <input id={id("presupuesto")} name="presupuesto" placeholder="Ej. $150.000" className={CAMPO} />
            </Campo>
          </div>
          <Campo etiqueta="Sabor o temática (opcional)" htmlFor={id("sabor")} error={error("sabor")}>
            <input id={id("sabor")} name="sabor" placeholder="Ej. Chocolate con frutos rojos, temática de flores" className={CAMPO} />
          </Campo>
          <Campo etiqueta="Detalles adicionales" htmlFor={id("mensaje")} error={error("mensaje")}>
            <textarea id={id("mensaje")} name="mensaje" rows={4} placeholder="Diseño, colores, mensaje en la torta, si necesitas domicilio…" className={cn(CAMPO, "resize-none")} />
          </Campo>
        </>
      )}

      {tipo === "curso" && (
        <>
          <Campo etiqueta="Curso de interés" htmlFor={id("curso")} error={error("curso")}>
            <select id={id("curso")} name="curso" required defaultValue={cursoInicial} className={CAMPO} {...aria("curso")}>
              <option value="">Selecciona un curso</option>
              {courses.map((c) => (
                <option key={c.slug} value={c.title}>
                  {c.title}
                </option>
              ))}
              <option value="Información general">Información general / otro</option>
            </select>
          </Campo>
          <div className="grid gap-5 sm:grid-cols-2">
            <Campo etiqueta="Horario preferido" htmlFor={id("horario")} error={error("horario")}>
              <select id={id("horario")} name="horario" defaultValue="" className={CAMPO}>
                <option value="">Me da igual</option>
                {OPCIONES_HORARIO.map((o) => (
                  <option key={o.valor} value={o.valor}>
                    {o.etiqueta}
                  </option>
                ))}
              </select>
            </Campo>
            <Campo etiqueta="Experiencia previa" htmlFor={id("experiencia")} error={error("experiencia")}>
              <select id={id("experiencia")} name="experiencia" defaultValue="" className={CAMPO}>
                <option value="">Prefiero no decir</option>
                {OPCIONES_EXPERIENCIA.map((o) => (
                  <option key={o.valor} value={o.valor}>
                    {o.etiqueta}
                  </option>
                ))}
              </select>
            </Campo>
          </div>
          <Campo etiqueta="¿Algo que quieras preguntarnos? (opcional)" htmlFor={id("mensaje")} error={error("mensaje")}>
            <textarea id={id("mensaje")} name="mensaje" rows={3} className={cn(CAMPO, "resize-none")} />
          </Campo>
        </>
      )}

      {tipo === "pqrs" && (
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <Campo etiqueta="Tipo de solicitud" htmlFor={id("tipo_pqrs")} error={error("tipo_pqrs")}>
              <select id={id("tipo_pqrs")} name="tipo_pqrs" required defaultValue="" className={CAMPO} {...aria("tipo_pqrs")}>
                <option value="" disabled>
                  Selecciona…
                </option>
                {OPCIONES_PQRS.map((o) => (
                  <option key={o.valor} value={o.valor}>
                    {o.etiqueta}
                  </option>
                ))}
              </select>
            </Campo>
            <Campo etiqueta="Cédula (opcional)" htmlFor={id("documento")} error={error("documento")}>
              <input id={id("documento")} name="documento" inputMode="numeric" className={CAMPO} />
            </Campo>
          </div>
          <Campo etiqueta="Asunto" htmlFor={id("asunto")} error={error("asunto")}>
            <input id={id("asunto")} name="asunto" required placeholder="Resumen en pocas palabras" className={CAMPO} {...aria("asunto")} />
          </Campo>
          <Campo etiqueta="Descripción" htmlFor={id("mensaje")} error={error("mensaje")}>
            <textarea
              id={id("mensaje")}
              name="mensaje"
              rows={5}
              required
              placeholder="Cuéntanos qué pasó: fecha, sede, producto…"
              className={cn(CAMPO, "resize-none")}
              {...aria("mensaje")}
            />
          </Campo>
        </>
      )}

      <div className="space-y-1.5">
        <label className="flex items-start gap-2.5 text-xs leading-relaxed text-muted-foreground">
          <input type="checkbox" name="acepta_datos" required className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--primary)]" {...aria("acepta_datos")} />
          <span>
            Autorizo a Daliza Pastelería Fina a tratar mis datos personales para responder esta solicitud y
            contactarme con información de productos y cursos, según la{" "}
            <a href="/tratamiento-de-datos" target="_blank" className="font-medium text-primary underline underline-offset-2">
              Política de tratamiento de datos
            </a>{" "}
            y la{" "}
            <a href="/politica-de-privacidad" target="_blank" className="font-medium text-primary underline underline-offset-2">
              Política de privacidad
            </a>
            . Puedo consultar, actualizar o pedir la eliminación de mis datos escribiendo a pasteleradalizas9@gmail.com.
          </span>
        </label>
        {error("acepta_datos")}
      </div>

      {estado && !estado.ok && estado.error && (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
          {estado.error}
        </p>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover disabled:opacity-70"
      >
        {enviando ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Send className="h-4 w-4" aria-hidden />}
        {enviando ? "Enviando…" : "Enviar solicitud"}
      </button>
    </form>
  )
}

function Campo({
  etiqueta,
  htmlFor,
  error,
  children,
}: {
  etiqueta: string
  htmlFor: string
  error?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
        {etiqueta}
      </label>
      {children}
      {error}
    </div>
  )
}
