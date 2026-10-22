// Uso: node scripts/generar-miniaturas.js
// Genera miniaturas de 480x480 de las fotos de productos y de tortas personalizadas.
// Entrada:  public/images/productos/*.webp y public/images/galeria/tortas/*.webp  (1000x1000)
// Salida:   public/images/miniaturas/productos/*.webp y public/images/miniaturas/galeria/tortas/*.webp
const sharp = require("sharp")
const fs = require("fs")
const path = require("path")

const RAIZ = path.join(__dirname, "..", "public", "images")
const CARPETAS = ["productos", "galeria/tortas"]
const LADO = 480
const CALIDAD = 72

async function main() {
  let totalOrig = 0, totalMini = 0, n = 0
  for (const carpeta of CARPETAS) {
    const destino = path.join(RAIZ, "miniaturas", carpeta)
    fs.mkdirSync(destino, { recursive: true })
    for (const archivo of fs.readdirSync(path.join(RAIZ, carpeta))) {
      if (!archivo.endsWith(".webp")) continue
      const origen = path.join(RAIZ, carpeta, archivo)
      const salida = path.join(destino, archivo)
      const info = await sharp(origen).resize(LADO, LADO, { fit: "cover" }).webp({ quality: CALIDAD, effort: 5, smartSubsample: true }).toFile(salida)
      totalOrig += fs.statSync(origen).size
      totalMini += info.size
      n++
    }
  }
  console.log(`${n} miniaturas · originales ${(totalOrig / 1048576).toFixed(1)} MB → miniaturas ${(totalMini / 1048576).toFixed(1)} MB (promedio ${Math.round(totalMini / n / 1024)} KB c/u)`)
}
main().catch((e) => { console.error(e); process.exit(1) })
