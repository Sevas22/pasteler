import { existsSync } from "node:fs"
import path from "node:path"
import Image from "next/image"
import { Caveat } from "next/font/google"
import type { Location } from "@/lib/data/locations"
import { generateQrDataUrl, getLocationUrl } from "@/lib/qr"
import { WhatsAppCTA } from "@/components/whatsapp-cta"
import { FondoSedes, Corazon, Hoja } from "./decoraciones"
import styles from "./sedes-dalizas.module.css"

/** Letra manuscrita solo para "Te esperamos en Bosa". */
const manuscrita = Caveat({ subsets: ["latin"], weight: ["500", "700"], display: "swap" })

export type Store = {
  id: string
  slug: string
  name: string
  image: string
  /** true si la foto es la de respaldo (logo) porque aún no hay foto de la fachada. */
  sinFoto: boolean
  qr: string
  address: string
  weekday?: string
  weekend?: string
  whatsapp: string
}

/**
 * Fotos de las fachadas: un archivo por sede en /public/images/sedes/<slug>.webp
 * (bosa-carbonell, bosa-naranjos, bosa-piamonte, ciudadela-colsubsidio, panaderia-carbonell).
 * Mientras no exista el archivo se muestra el logo de Daliza.
 */
const FOTO_RESPALDO = "/images/logo-dalizas-placeholder.webp"

function fotoDeSede(slug: string): { image: string; sinFoto: boolean } {
  for (const ext of ["webp", "jpg", "png"]) {
    if (existsSync(path.join(process.cwd(), "public", "images", "sedes", `${slug}.${ext}`))) {
      return { image: `/images/sedes/${slug}.${ext}`, sinFoto: false }
    }
  }
  return { image: FOTO_RESPALDO, sinFoto: true }
}

/** "Lun - Vie: 12:00 PM - 8:30 PM · Sáb y Dom: 10:00 AM - 8:30 PM" → dos renglones. */
function partirHorario(horas: string): Pick<Store, "weekday" | "weekend"> {
  const [weekday, weekend] = horas.split(/\s*·\s*/)
  return { weekday: weekday || undefined, weekend: weekend || undefined }
}

/** Las sedes salen del panel admin (Supabase); los QR se generan con el enlace real de cada sede. */
async function aStores(locations: Location[]): Promise<Store[]> {
  return Promise.all(
    locations.map(async (l) => ({
      id: l.id,
      slug: l.slug,
      name: l.name,
      ...fotoDeSede(l.slug),
      qr: await generateQrDataUrl(getLocationUrl(l.slug)),
      address: l.address,
      ...partirHorario(l.hours),
      whatsapp: l.whatsapp,
    })),
  )
}

function IconoUbicacion() {
  return (
    <svg viewBox="0 0 24 24" className={styles.icono} aria-hidden>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21Z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  )
}

function IconoReloj() {
  return (
    <svg viewBox="0 0 24 24" className={styles.icono} aria-hidden>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  )
}

function IconoWhatsApp() {
  return (
    <svg viewBox="0 0 32 32" className={styles.iconoWhatsapp} fill="currentColor" aria-hidden>
      <path d="M16.04 3C8.86 3 3.02 8.83 3.02 16c0 2.3.6 4.53 1.74 6.5L3 29l6.68-1.75A13 13 0 0 0 16.04 29C23.2 29 29.04 23.17 29.04 16S23.2 3 16.04 3Zm0 23.67c-2 0-3.95-.54-5.65-1.55l-.4-.24-3.96 1.04 1.06-3.86-.26-.4a10.62 10.62 0 0 1-1.63-5.66c0-5.88 4.79-10.66 10.68-10.66 5.88 0 10.67 4.78 10.67 10.66 0 5.89-4.79 10.67-10.51 10.67Zm5.85-7.98c-.32-.16-1.89-.93-2.18-1.04-.3-.11-.5-.16-.72.16-.21.32-.83 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.6-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.72-1.73-.99-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66 0 1.57 1.14 3.08 1.3 3.3.16.21 2.25 3.43 5.45 4.81.76.33 1.36.53 1.82.67.77.24 1.46.21 2.01.13.61-.09 1.89-.77 2.15-1.52.27-.74.27-1.38.19-1.52-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  )
}

function TarjetaSede({ store }: { store: Store }) {
  return (
    <article className={styles.tarjeta} aria-labelledby={`sede-${store.slug}`}>
      <div className={styles.anilloFoto}>
        <div className={styles.foto}>
          <Image
            src={store.image}
            alt={store.sinFoto ? `Logo de Daliza, sede ${store.name}` : `Fachada de Daliza Pastelería Fina en ${store.name}`}
            fill
            sizes="180px"
            className={store.sinFoto ? styles.imagenLogo : styles.imagen}
          />
        </div>
      </div>

      <h3 id={`sede-${store.slug}`} className={styles.nombre}>
        {store.name}
      </h3>

      <a href={`/tiendas/${store.slug}`} className={styles.qr} aria-label={`Ver la página de la sede ${store.name}`}>
        {/* QR real (data URL generada en el servidor con el enlace de la sede) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={store.qr} alt={`Código QR de ${store.name}`} width={104} height={104} />
      </a>

      <ul className={styles.datos}>
        <li>
          <IconoUbicacion />
          <span>{store.address}</span>
        </li>
        {store.weekday || store.weekend ? (
          <li>
            <IconoReloj />
            <span>
              {store.weekday}
              {store.weekend ? (
                <>
                  <br />
                  {store.weekend}
                </>
              ) : null}
            </span>
          </li>
        ) : null}
      </ul>

      {store.whatsapp ? (
        <WhatsAppCTA
          mensaje={`Hola, quiero información de la sede ${store.name}`}
          ruta={`/tiendas/${store.slug}`}
          sedesSlugs={[store.slug]}
          className={styles.whatsapp}
        >
          <IconoWhatsApp />
          <span className={styles.whatsappTexto}>
            Escríbenos por
            <br />
            WhatsApp
          </span>
          <svg viewBox="0 0 24 24" className={styles.flecha} aria-hidden>
            <path d="m9 6 6 6-6 6" />
          </svg>
          <span className="sr-only"> a la sede {store.name}</span>
        </WhatsAppCTA>
      ) : null}
    </article>
  )
}

/** "Nuestras sedes": encabezado editorial + fila de sedes con foto, QR, dirección, horario y WhatsApp. */
export async function SedesDalizas({
  locations,
  esPagina = false,
}: {
  locations: Location[]
  /** true cuando la sección es la página completa (/tiendas): título h1 y espacio para el menú fijo. */
  esPagina?: boolean
}) {
  const stores = await aStores(locations)
  const Titulo = esPagina ? "h1" : "h2"

  return (
    <section
      className={`${styles.seccion} ${esPagina ? styles.pagina : ""}`}
      aria-labelledby="sedes-title"
      data-no-section-divider
    >
      <FondoSedes className={styles.fondo} />

      <div className={styles.contenido}>
        <header className={styles.encabezado}>
          <div>
            <p className={styles.etiqueta}>
              <span aria-hidden />
              Nuestras sedes
              <span aria-hidden />
            </p>
            <Titulo id="sedes-title" className={styles.titulo}>
              El mismo sabor,
              <br />
              <em>diferentes historias.</em>
            </Titulo>
          </div>

          <p className={styles.bajada}>Con cada visita a nuestras sedes, estás más cerca de lo que más te gusta.</p>

          <div className={`${styles.manuscrito} ${manuscrita.className}`} aria-hidden>
            <span>Te esperamos</span>
            <span className={styles.manuscritoLinea2}>
              en Bosa
              <Corazon className={styles.corazonFirma} />
            </span>
            <svg viewBox="0 0 125 28" className={styles.subrayado}>
              <path d="M7 18 C35 12 59 26 118 9" />
            </svg>
          </div>
          <p className="sr-only">Te esperamos en Bosa.</p>

          <Corazon className={styles.corazonA} />
          <Corazon className={styles.corazonB} />
          <Hoja className={styles.hoja} />
        </header>

        <div className={styles.fila} role="list" aria-label="Sedes de Daliza Pastelería Fina">
          {stores.map((store) => (
            <div role="listitem" key={store.id} className={styles.celda}>
              <TarjetaSede store={store} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
