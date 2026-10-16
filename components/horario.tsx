/** Muestra el horario de una sede. Si trae varias partes separadas por " · ", cada una va en su propia línea. */
export function Horario({ texto }: { texto: string }) {
  const lineas = texto.split(/\s*·\s*/).filter(Boolean)
  return (
    <>
      {lineas.map((linea) => (
        <span key={linea} className="block">
          {linea}
        </span>
      ))}
    </>
  )
}
