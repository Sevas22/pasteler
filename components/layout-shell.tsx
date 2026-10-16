import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StickyActionBar } from "@/components/sticky-action-bar"
import { ScrollProgress } from "@/components/motion/scroll-progress"
import { LocationsProvider } from "@/components/locations-context"
import { getLocations } from "@/lib/data/locations"

export async function LayoutShell({ children }: { children: React.ReactNode }) {
  const locations = await getLocations()

  return (
    <LocationsProvider locations={locations}>
      <ScrollProgress />
      <Header />
      <main className="min-h-screen w-full min-w-0 overflow-x-clip">{children}</main>
      <StickyActionBar />
      <Footer locations={locations} />
    </LocationsProvider>
  )
}
