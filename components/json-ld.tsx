/** Inserta datos estructurados (JSON-LD). Se renderiza en el servidor, así los buscadores y las IA lo leen sin ejecutar JavaScript. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // El contenido es JSON generado por nosotros; se escapa "<" para que no pueda cerrar la etiqueta.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  )
}
