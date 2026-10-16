import type { Metadata } from 'next'
import { Montserrat, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { JsonLd } from '@/components/json-ld'
import { NEGOCIO, SITE_URL, grafo, organizacionSchema, sitioWebSchema } from '@/lib/seo'

/**
 * Tipografía de marca (manual Daliza): Playfair Display = "tipografía emocional" (titulares),
 * Montserrat = "tipografía funcional" (texto). Sin script/cursiva: el lettering "Daliza" vive
 * solo en el logo (imagen), no como fuente de uso general.
 */
const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-serif',
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Daliza Pastelería Fina | Tortas, postres y panadería en Bosa, Bogotá',
    template: '%s | Daliza Pastelería Fina',
  },
  description:
    'Tortas personalizadas con papel de azúcar, cheesecakes, postres, repostería y pan artesanal en Bosa, Bogotá. Sedes Carbonell, Naranjos, Piamonte y Ciudadela Colsubsidio. Pide por WhatsApp.',
  applicationName: NEGOCIO.nombre,
  keywords: [
    'pastelería en Bosa',
    'tortas personalizadas Bogotá',
    'tortas con papel de azúcar',
    'panadería en Bosa',
    'cheesecake Bogotá',
    'tortas de cumpleaños Bogotá',
    'repostería fina',
    'Daliza Pastelería',
  ],
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  openGraph: {
    type: 'website',
    siteName: NEGOCIO.nombre,
    title: 'Daliza Pastelería Fina | Tortas, postres y panadería en Bosa, Bogotá',
    description: 'Tortas personalizadas, cheesecakes, postres y pan artesanal en Bosa, Bogotá. Pide por WhatsApp.',
    url: '/',
    images: [{ url: NEGOCIO.imagenSocial, width: 1600, height: 900, alt: 'Pastelería fina Daliza en Bosa, Bogotá' }],
    locale: 'es_CO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daliza Pastelería Fina | Bosa, Bogotá',
    description: 'Tortas personalizadas, postres y panadería artesanal. Pide por WhatsApp.',
    images: [NEGOCIO.imagenSocial],
  },
  formatDetection: { telephone: true, address: true, email: false },
  category: 'food',
  icons: {
    icon: [{ url: "/images/logo-dalizas-transparente.png", type: "image/png" }],
    apple: "/images/logo-dalizas-transparente.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${montserrat.variable} ${playfairDisplay.variable} font-sans antialiased overflow-x-hidden`}
      >
        <JsonLd data={grafo(organizacionSchema(), sitioWebSchema())} />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
