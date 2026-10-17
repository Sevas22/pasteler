import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollProgress } from "@/components/motion/scroll-progress"
import { AudioBienvenida } from "@/components/audio-bienvenida"
import { WhatsAppFlotante } from "@/components/whatsapp-flotante"
import { AnimarAlScroll } from "@/components/motion/animar-al-scroll"
import { LocationsProvider } from "@/components/locations-context"
import { getLocationsPublic } from "@/lib/data/locations"

export async function LayoutShell({ children }: { children: React.ReactNode }) {
  const locations = await getLocationsPublic()

  return (
    <LocationsProvider locations={locations}>
      <ScrollProgress />
      <Header />
      <main className="min-h-screen w-full min-w-0 overflow-x-clip">{children}</main>
      <Footer locations={locations} />
      <AudioBienvenida />
      <WhatsAppFlotante />
      <AnimarAlScroll />
    </LocationsProvider>
  )
}
