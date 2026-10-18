import { z } from "zod"

/** Solicitudes de clientes (PQRS, cotizaciones, cursos). Sin dependencias de servidor: lo usan formularios y admin. */

export const TIPOS_SOLICITUD = ["pqrs", "cotizacion", "curso"] as const
export type TipoSolicitud = (typeof TIPOS_SOLICITUD)[number]

export const ESTADOS_SOLICITUD = ["nuevo", "en_proceso", "por_recontactar", "cerrado", "descartado"] as const
export type EstadoSolicitud = (typeof ESTADOS_SOLICITUD)[number]

export const ETIQUETA_TIPO: Record<TipoSolicitud, string> = {
  pqrs: "PQRS",
  cotizacion: "Cotización",
  curso: "Cursos",
}

export const ETIQUETA_ESTADO: Record<EstadoSolicitud, string> = {
  nuevo: "Nuevo",
  en_proceso: "En proceso",
  por_recontactar: "Por recontactar",
  cerrado: "Cerrado",
  descartado: "Descartado",
}

export const OPCIONES_PQRS = [
  { valor: "peticion", etiqueta: "Petición" },
  { valor: "queja", etiqueta: "Queja" },
  { valor: "reclamo", etiqueta: "Reclamo" },
  { valor: "sugerencia", etiqueta: "Sugerencia" },
  { valor: "felicitacion", etiqueta: "Felicitación" },
] as const

export const OPCIONES_COTIZACION = [
  { valor: "torta_personalizada", etiqueta: "Torta personalizada" },
  { valor: "pasteleria", etiqueta: "Pastelería" },
  { valor: "reposteria", etiqueta: "Repostería" },
  { valor: "panaderia", etiqueta: "Panadería" },
  { valor: "evento", etiqueta: "Evento o pedido grande" },
] as const

export const OPCIONES_HORARIO = [
  { valor: "manana", etiqueta: "Mañana" },
  { valor: "tarde", etiqueta: "Tarde" },
  { valor: "noche", etiqueta: "Noche" },
  { valor: "fin_de_semana", etiqueta: "Fin de semana" },
] as const

export const OPCIONES_EXPERIENCIA = [
  { valor: "ninguna", etiqueta: "Ninguna, quiero empezar" },
  { valor: "basica", etiqueta: "Básica" },
  { valor: "intermedia", etiqueta: "Intermedia o avanzada" },
] as const

/** Cómo se muestran en el admin las claves de `detalles`. */
export const ETIQUETA_DETALLE: Record<string, string> = {
  tipo_pqrs: "Tipo de PQRS",
  asunto: "Asunto",
  documento: "Documento",
  categoria: "Qué quiere cotizar",
  producto: "Producto de referencia",
  fecha_evento: "Fecha del evento",
  porciones: "Porciones / personas",
  sabor: "Sabor",
  presupuesto: "Presupuesto aproximado",
  curso: "Curso de interés",
  horario: "Horario preferido",
  experiencia: "Experiencia previa",
}

/** Valores legibles para los detalles con opciones fijas. */
export function valorDetalle(clave: string, valor: unknown): string {
  const texto = String(valor ?? "")
  const listas: Record<string, readonly { valor: string; etiqueta: string }[]> = {
    tipo_pqrs: OPCIONES_PQRS,
    categoria: OPCIONES_COTIZACION,
    horario: OPCIONES_HORARIO,
    experiencia: OPCIONES_EXPERIENCIA,
  }
  return listas[clave]?.find((o) => o.valor === texto)?.etiqueta ?? texto
}

/* ───────────── Validación ───────────── */

const opcional = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Máximo ${max} caracteres.`)
    .transform((v) => (v === "" ? undefined : v))
    .optional()

const valoresDe = <T extends readonly { valor: string }[]>(lista: T) =>
  lista.map((o) => o.valor) as unknown as [T[number]["valor"], ...T[number]["valor"][]]

const comunes = {
  nombre: z.string().trim().min(2, "Escribe tu nombre.").max(120),
  telefono: z
    .string()
    .trim()
    .min(7, "Escribe un teléfono válido.")
    .max(30)
    .regex(/^[0-9+()\s-]+$/, "El teléfono solo puede tener números."),
  email: z
    .string()
    .trim()
    .max(160)
    .transform((v) => (v === "" ? undefined : v))
    .optional()
    .refine((v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "Escribe un correo válido."),
  sede_slug: opcional(80),
  mensaje: opcional(3000),
  pagina: opcional(300),
  acepta_datos: z.literal("on", { errorMap: () => ({ message: "Debes autorizar el tratamiento de tus datos." }) }),
}

export const esquemaSolicitud = z.discriminatedUnion("tipo", [
  z.object({
    tipo: z.literal("pqrs"),
    ...comunes,
    mensaje: z.string().trim().min(10, "Cuéntanos un poco más (mínimo 10 caracteres).").max(3000),
    tipo_pqrs: z.enum(valoresDe(OPCIONES_PQRS), { errorMap: () => ({ message: "Elige el tipo de solicitud." }) }),
    asunto: z.string().trim().min(3, "Escribe el asunto.").max(160),
    documento: opcional(30),
  }),
  z.object({
    tipo: z.literal("cotizacion"),
    ...comunes,
    categoria: z.enum(valoresDe(OPCIONES_COTIZACION), { errorMap: () => ({ message: "Elige qué quieres cotizar." }) }),
    producto: opcional(160),
    fecha_evento: opcional(20),
    porciones: opcional(20),
    sabor: opcional(120),
    presupuesto: opcional(60),
  }),
  z.object({
    tipo: z.literal("curso"),
    ...comunes,
    curso: z.string().trim().min(1, "Elige el curso que te interesa.").max(160),
    horario: z.enum(valoresDe(OPCIONES_HORARIO), { errorMap: () => ({ message: "Elige un horario." }) }).optional(),
    experiencia: z.enum(valoresDe(OPCIONES_EXPERIENCIA)).optional(),
  }),
])

export type SolicitudValida = z.infer<typeof esquemaSolicitud>

/** Campos que van a columnas propias; el resto de cada formulario se guarda en `detalles`. */
export const CAMPOS_BASE = ["tipo", "nombre", "telefono", "email", "sede_slug", "mensaje", "pagina", "acepta_datos"] as const

/* ───────────── Registro (fila de la tabla) ───────────── */

export type Solicitud = {
  id: string
  created_at: string
  updated_at: string
  tipo: TipoSolicitud
  nombre: string
  telefono: string
  email: string | null
  sede_slug: string | null
  mensaje: string | null
  detalles: Record<string, unknown>
  pagina: string | null
  estado: EstadoSolicitud
  proximo_contacto: string | null
  notas: string | null
}
