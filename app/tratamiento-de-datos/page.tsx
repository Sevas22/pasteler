import type { Metadata } from "next"
import Link from "next/link"
import { LayoutShell } from "@/components/layout-shell"
import { JsonLd } from "@/components/json-ld"
import { DatosResponsable, DocumentoLegal, type SeccionLegal } from "@/components/documento-legal"
import { getLocationsPublic } from "@/lib/data/locations"
import { BANNERS } from "@/lib/media"
import { NEGOCIO, grafo, migasSchema } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Política de tratamiento de datos personales",
  description:
    "Cómo Daliza Pastelería Fina recolecta, usa y protege tus datos personales conforme a la Ley 1581 de 2012, y cómo ejercer tus derechos como titular.",
  alternates: { canonical: "/tratamiento-de-datos" },
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

export default async function TratamientoDatosPage() {
  const locations = await getLocationsPublic()
  const principal = locations.find((l) => l.isPrincipal) ?? locations[0]

  const secciones: SeccionLegal[] = [
    {
      id: "responsable",
      titulo: "Responsable del tratamiento",
      contenido: (
        <>
          <p>
            {NEGOCIO.nombre} (en adelante, “Daliza”) es responsable del tratamiento de los datos personales que recolecta a
            través de su sitio web, sus sedes, WhatsApp y demás canales de atención.
          </p>
          <DatosResponsable principal={principal} />
        </>
      ),
    },
    {
      id: "marco-legal",
      titulo: "Marco legal",
      contenido: (
        <p>
          Esta política se expide en cumplimiento del artículo 15 de la Constitución Política de Colombia, la Ley Estatutaria
          1581 de 2012, el Decreto 1377 de 2013 (compilado en el Decreto Único Reglamentario 1074 de 2015) y las demás normas
          que los modifiquen, adicionen o complementen.
        </p>
      ),
    },
    {
      id: "definiciones",
      titulo: "Definiciones",
      contenido: (
        <Lista
          items={[
            <><strong>Titular:</strong> persona natural cuyos datos personales son objeto de tratamiento.</>,
            <><strong>Dato personal:</strong> cualquier información vinculada o que pueda asociarse a una persona natural determinada o determinable.</>,
            <><strong>Dato sensible:</strong> aquel que afecta la intimidad del titular o cuyo uso indebido puede generar discriminación (por ejemplo, datos de salud, biométricos u origen étnico).</>,
            <><strong>Tratamiento:</strong> cualquier operación sobre datos personales, como recolección, almacenamiento, uso, circulación o supresión.</>,
            <><strong>Autorización:</strong> consentimiento previo, expreso e informado del titular para el tratamiento de sus datos.</>,
            <><strong>Encargado del tratamiento:</strong> persona que realiza el tratamiento por cuenta del responsable.</>,
            <><strong>Base de datos:</strong> conjunto organizado de datos personales objeto de tratamiento.</>,
          ]}
        />
      ),
    },
    {
      id: "datos",
      titulo: "Datos que recolectamos",
      contenido: (
        <>
          <p>Según el canal y el tipo de solicitud, podemos recolectar:</p>
          <Lista
            items={[
              "Datos de identificación y contacto: nombre, teléfono o WhatsApp y correo electrónico.",
              "Datos de tu solicitud: sede de preferencia, producto o curso de interés, fecha del evento, número de porciones, sabor, presupuesto y el mensaje que nos escribas.",
              "En PQRS, de forma opcional, tu número de documento para identificar tu caso.",
              "Datos técnicos básicos del sitio web, como la página desde la que enviaste el formulario.",
            ]}
          />
          <p>
            No solicitamos datos sensibles. Si al describir tu solicitud decides compartir alguno (por ejemplo, una alergia
            alimentaria para preparar tu pedido), lo usaremos solo para atenderla y no es obligatorio suministrarlo.
          </p>
          <p>
            Nuestros servicios no están dirigidos a menores de edad. Si un menor desea inscribirse en un curso, la
            autorización debe darla su padre, madre o representante legal, respetando el interés superior del menor.
          </p>
        </>
      ),
    },
    {
      id: "finalidades",
      titulo: "Finalidades del tratamiento",
      contenido: (
        <>
          <p>Tus datos se usan para:</p>
          <Lista
            items={[
              "Responder tus cotizaciones y preparar, confirmar y entregar tus pedidos.",
              "Enviarte información sobre fechas, valores y cupos de los cursos que te interesan.",
              "Atender, tramitar y responder peticiones, quejas, reclamos, sugerencias y felicitaciones (PQRS).",
              "Hacer seguimiento a tu solicitud y volver a contactarte sobre ella.",
              "Enviarte información de productos, cursos, novedades y promociones de Daliza, cuando lo hayas autorizado. Puedes pedir que dejemos de hacerlo en cualquier momento.",
              "Elaborar estadísticas internas para mejorar nuestros productos y servicio.",
              "Cumplir obligaciones legales, contables y tributarias.",
            ]}
          />
        </>
      ),
    },
    {
      id: "autorizacion",
      titulo: "Autorización",
      contenido: (
        <p>
          Al marcar la casilla de autorización en nuestros formularios, o al darnos tus datos por WhatsApp o en una sede,
          autorizas de manera previa, expresa e informada el tratamiento de tus datos para las finalidades descritas. Daliza
          conserva prueba de esa autorización (por ejemplo, el registro de tu solicitud con su fecha). No se requiere
          autorización en los casos previstos en el artículo 10 de la Ley 1581 de 2012.
        </p>
      ),
    },
    {
      id: "derechos",
      titulo: "Tus derechos como titular",
      contenido: (
        <>
          <p>Como titular de tus datos tienes derecho a:</p>
          <Lista
            items={[
              "Conocer, actualizar y rectificar tus datos personales.",
              "Solicitar prueba de la autorización que nos diste.",
              "Ser informado, previa solicitud, sobre el uso que les hemos dado.",
              "Presentar quejas ante la Superintendencia de Industria y Comercio (SIC) por infracciones a la ley, una vez agotado el trámite de consulta o reclamo ante Daliza.",
              "Revocar la autorización y/o solicitar la supresión de tus datos, cuando no exista un deber legal o contractual de conservarlos.",
              "Acceder gratuitamente a tus datos personales.",
            ]}
          />
        </>
      ),
    },
    {
      id: "consultas-reclamos",
      titulo: "Cómo hacer consultas y reclamos",
      contenido: (
        <>
          <p>
            Puedes ejercer tus derechos escribiendo a <strong>{NEGOCIO.email}</strong>, por el{" "}
            <Link href="/contacto?formulario=pqrs#contacto" className="font-medium text-primary underline-offset-2 hover:underline">
              formulario de PQRS
            </Link>
            , por WhatsApp o en cualquiera de nuestras sedes. Tu solicitud debe incluir tu nombre, un medio de contacto, la
            descripción de lo que pides y, si aplica, los documentos que la soporten.
          </p>
          <Lista
            items={[
              <><strong>Consultas:</strong> se responden en máximo diez (10) días hábiles desde su recibo. Si no es posible, te informaremos el motivo y la nueva fecha, que no superará cinco (5) días hábiles adicionales.</>,
              <><strong>Reclamos</strong> (corrección, actualización, supresión o incumplimiento): se atienden en máximo quince (15) días hábiles, prorrogables hasta ocho (8) días hábiles más, informándote el motivo. Si el reclamo está incompleto, te pediremos completarlo dentro de los cinco (5) días siguientes; si pasan dos (2) meses sin respuesta, se entenderá que desististe.</>,
            ]}
          />
        </>
      ),
    },
    {
      id: "encargados",
      titulo: "Encargados y transferencia de datos",
      contenido: (
        <>
          <p>
            Para operar el sitio web usamos proveedores tecnológicos que actúan como encargados del tratamiento: el
            alojamiento del sitio (Vercel) y la base de datos donde se guardan las solicitudes (Supabase). Estos servicios
            pueden almacenar la información en servidores ubicados fuera de Colombia, con medidas de seguridad adecuadas y
            solo para prestarnos el servicio.
          </p>
          <p>
            Daliza no vende, alquila ni comparte tus datos con terceros para fines comerciales ajenos a los aquí
            descritos. Solo los entregaremos a autoridades cuando una norma o una orden judicial lo exija.
          </p>
        </>
      ),
    },
    {
      id: "seguridad",
      titulo: "Seguridad de la información",
      contenido: (
        <p>
          Aplicamos medidas técnicas, humanas y administrativas razonables para proteger tus datos contra pérdida, consulta,
          uso o acceso no autorizado: conexión cifrada (HTTPS), acceso al panel de solicitudes restringido a personal
          autorizado con usuario y contraseña, y reglas de la base de datos que impiden que el público lea la información
          enviada.
        </p>
      ),
    },
    {
      id: "conservacion",
      titulo: "Conservación de los datos",
      contenido: (
        <p>
          Conservamos tus datos mientras sean necesarios para las finalidades descritas, mientras mantengas una relación
          con Daliza o hasta que solicites su supresión, salvo que una norma nos obligue a conservarlos por más tiempo.
        </p>
      ),
    },
    {
      id: "vigencia",
      titulo: "Vigencia y cambios",
      contenido: (
        <p>
          Esta política rige desde la fecha indicada en esta página. Si la modificamos de forma sustancial, publicaremos la
          nueva versión aquí y, cuando sea necesario, solicitaremos de nuevo tu autorización.
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
            { nombre: "Tratamiento de datos", ruta: "/tratamiento-de-datos" },
          ]),
        )}
      />
      <DocumentoLegal
        titulo="Tratamiento de"
        tituloDestacado="datos personales."
        descripcion="Cómo recolectamos, usamos y protegemos tus datos, y cómo puedes ejercer tus derechos (Ley 1581 de 2012)."
        imagen={BANNERS.paginas.contacto}
        secciones={secciones}
        relacionado={{ href: "/politica-de-privacidad", label: "Política de privacidad" }}
        principal={principal}
      />
    </LayoutShell>
  )
}
