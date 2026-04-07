import type { Metadata } from 'next'
import { Great_Vibes, Montserrat, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin', 'latin-ext'],
  variable: '--font-serif',
})

const montserrat = Montserrat({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-hero-title',
  weight: ['500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: 'Dalizas - Pastelería Fina | Cursos de Pastelería en Bogotá',
  description: 'Dalizas Pastelería Fina - Aprende el arte de la repostería con nuestros cursos profesionales. 4 sedes en Bogotá: Bosa Carbonell, Bosa Naranjos, Bosa Piamonte y Ciudadela Colsubsidio.',
  openGraph: {
    title: 'Dalizas — Pastelería Fina',
    description: 'Pastelería fina y cursos de repostería en Bogotá.',
    images: ['/images/logo-dalizas-marca.png'],
    locale: 'es_CO',
  },
  icons: {
    icon: [{ url: "/images/logo-dalizas-marca.png", type: "image/png" }],
    apple: "/images/logo-dalizas-marca.png",
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
        className={`${greatVibes.variable} ${montserrat.variable} ${playfairDisplay.variable} font-sans antialiased overflow-x-hidden`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
