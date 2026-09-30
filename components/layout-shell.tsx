import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StickyActionBar } from "@/components/sticky-action-bar"
import { ScrollProgress } from "@/components/motion/scroll-progress"
import { getLocations } from "@/lib/data/locations"

export async function LayoutShell({ children }: { children: React.ReactNode }) {
  const locations = await getLocations()

  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="min-h-screen w-full min-w-0 overflow-x-hidden">{children}</main>
      <StickyActionBar locations={locations} />
      <Footer locations={locations} />
    </>
  )
}
