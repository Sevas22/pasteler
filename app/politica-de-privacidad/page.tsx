import type { Metadata } from "next"
import Link from "next/link"
import { LayoutShell } from "@/components/layout-shell"
import { JsonLd } from "@/components/json-ld"
import { DatosResponsable, DocumentoLegal, type SeccionLegal } from "@/components/documento-legal"
import { getLocationsPublic } from "@/lib/data/locations"
import { BANNERS } from "@/lib/media"
import { NEGOCIO, grafo, migasSchema } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Qué información recoge el sitio web de Daliza Pastelería Fina, para qué la usamos, qué servicios de terceros intervienen y cómo puedes contactarnos.",
  alternates: { canonical: "/politica-de-privacidad" },
}

function Lista({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5 marker:text-[#C9A96E]">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}

const enlace = "font-medium text-primary underline-offset-2 hover:underline"

export default async function PoliticaPrivacidadPage() {
  const locations = await getLocationsPublic()
  const principal = locations.find((l) => l.isPrincipal) ?? locations[0]

  const secciones: SeccionLegal[] = [
    {
      id: "alcance",
      titulo: "Alcance",
      contenido: (
        <>
          <p>
            Esta política explica cómo se maneja tu información cuando navegas por www.dalizas.com y cuando usas sus
            formularios. Complementa nuestra{" "}
            <Link href="/tratamiento-de-datos" className={enlace}>
              Política de tratamiento de datos personales
            </Link>
            , donde están tus derechos y el procedimiento para ejercerlos.
          </p>
          <DatosResponsable principal={principal} />
        </>
      ),
    },
    {
      id: "informacion",
      titulo: "Información que recopilamos",
      contenido: (
        <>
          <p>
            <strong>Información que tú nos das.</strong> Cuando llenas un formulario de cotización, cursos o PQRS
            recibimos los datos que escribes: nombre, teléfono, correo (opcional), sede de preferencia, los detalles de tu
            solicitud y la página desde la que la enviaste. Si nos escribes por WhatsApp, recibimos la información que
            compartas en esa conversación.
          </p>
          <p>
            <strong>Información técnica.</strong> Como cualquier sitio web, nuestro proveedor de alojamiento registra datos
            técnicos de las visitas (dirección IP, tipo de navegador y dispositivo, páginas visitadas y fecha) para
            mantener el sitio seguro y funcionando.
          </p>
          <p>
            <strong>Estadísticas de uso.</strong> Usamos Google Analytics y Vercel Web Analytics para entender cómo se
            usa el sitio: páginas visitadas, tiempo de visita, tipo de dispositivo, ciudad o país aproximado y de dónde
            llegan las visitas. También medimos acciones como enviar un formulario o tocar el botón de WhatsApp. Estos
            datos son estadísticos: no incluyen tu nombre, teléfono ni lo que escribes en los formularios.
          </p>
        </>
      ),
    },
    {
      id: "cookies",
      titulo: "Cookies y almacenamiento en tu navegador",
      contenido: (
        <>
          <p>El sitio no usa cookies de publicidad. Usamos:</p>
          <Lista
            items={[
              <><strong>Cookies de Google Analytics</strong> (por ejemplo, _ga y _ga_*): distinguen visitas de forma anónima para generar estadísticas. Duran hasta 2 años. Puedes bloquearlas en tu navegador o instalar el complemento oficial de inhabilitación de Google Analytics.</>,
              "Almacenamiento de sesión (sessionStorage) para recordar que ya sonó el audio de bienvenida y no repetirlo durante tu visita. Se borra al cerrar la pestaña.",
              "Cookies de inicio de sesión exclusivamente en el panel administrativo, para el personal autorizado de Daliza.",
            ]}
          />
          <p>Puedes borrar o bloquear este almacenamiento desde la configuración de tu navegador.</p>
        </>
      ),
    },
    {
      id: "uso",
      titulo: "Para qué usamos la información",
      contenido: (
        <Lista
          items={[
            "Responder tus cotizaciones, consultas de cursos y PQRS, y hacerles seguimiento.",
            "Contactarte por teléfono, WhatsApp o correo sobre tu solicitud y, si lo autorizaste, sobre productos, cursos y promociones.",
            "Mantener el sitio seguro, prevenir abusos (por ejemplo, envíos automáticos de spam) y mejorar su funcionamiento.",
          ]}
        />
      ),
    },
    {
      id: "terceros",
      titulo: "Servicios y enlaces de terceros",
      contenido: (
        <>
          <p>El sitio funciona con algunos servicios externos:</p>
          <Lista
            items={[
              <><strong>Vercel:</strong> alojamiento del sitio y estadísticas anónimas de visitas.</>,
              <><strong>Google Analytics (Google LLC):</strong> estadísticas de uso del sitio. Google trata estos datos según su propia política de privacidad.</>,
              <><strong>Supabase:</strong> base de datos donde se guardan las solicitudes de los formularios.</>,
              <><strong>WhatsApp, Facebook, Instagram, TikTok y YouTube:</strong> los botones te llevan a esas plataformas, que tienen sus propias políticas de privacidad.</>,
              <><strong>Google Maps:</strong> los enlaces “Cómo llegar” abren Google Maps con la dirección de la sede.</>,
            ]}
          />
          <p>
            No somos responsables de las prácticas de privacidad de sitios de terceros; te recomendamos revisar sus
            políticas al usarlos.
          </p>
        </>
      ),
    },
    {
      id: "compartir",
      titulo: "Con quién compartimos tu información",
      contenido: (
        <p>
          Solo con los proveedores tecnológicos mencionados, en la medida necesaria para prestarnos el servicio, y con
          autoridades cuando la ley o una orden judicial lo exijan. No vendemos ni alquilamos tu información.
        </p>
      ),
    },
    {
      id: "seguridad",
      titulo: "Seguridad",
      contenido: (
        <p>
          El sitio usa conexión cifrada (HTTPS). Las solicitudes se guardan en una base de datos que el público no puede
          leer, y solo el personal autorizado de Daliza accede a ellas con usuario y contraseña. Ningún sistema es
          totalmente infalible, pero trabajamos para proteger tu información con medidas razonables.
        </p>
      ),
    },
    {
      id: "menores",
      titulo: "Menores de edad",
      contenido: (
        <p>
          El sitio no está dirigido a menores de edad. Si eres menor y quieres información de un curso, pide a tu padre,
          madre o representante legal que llene el formulario.
        </p>
      ),
    },
    {
      id: "derechos",
      titulo: "Tus derechos",
      contenido: (
        <p>
          Puedes conocer, actualizar, rectificar o pedir la eliminación de tus datos, y revocar tu autorización, escribiendo
          a <strong>{NEGOCIO.email}</strong> o por el{" "}
          <Link href="/contacto?formulario=pqrs#contacto" className={enlace}>
            formulario de PQRS
          </Link>
          . Los plazos y el procedimiento están en la{" "}
          <Link href="/tratamiento-de-datos#consultas-reclamos" className={enlace}>
            Política de tratamiento de datos
          </Link>
          .
        </p>
      ),
    },
    {
      id: "cambios",
      titulo: "Cambios a esta política",
      contenido: (
        <p>
          Podemos actualizar esta política para reflejar cambios en el sitio o en la ley. La versión vigente siempre estará
          publicada en esta página con su fecha.
        </p>
      ),
    },
  ]

  return (
    <LayoutShell>
      <JsonLd
        data={grafo(
          migasSchema([
            { nombre: "Inicio", ruta: "/" },
            { nombre: "Política de privacidad", ruta: "/politica-de-privacidad" },
          ]),
        )}
      />
      <DocumentoLegal
        titulo="Política de"
        tituloDestacado="privacidad."
        descripcion="Qué información recoge nuestro sitio web, para qué la usamos y cómo la protegemos."
        imagen={BANNERS.paginas.blog}
        secciones={secciones}
        relacionado={{ href: "/tratamiento-de-datos", label: "Política de tratamiento de datos personales" }}
        principal={principal}
      />
    </LayoutShell>
  )
}
