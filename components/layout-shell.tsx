import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"

export function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen w-full min-w-0 overflow-x-hidden">{children}</main>
      <WhatsAppFloat />
      <Footer />
    </>
  )
}
