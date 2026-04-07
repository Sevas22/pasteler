import { MessageCircle } from "lucide-react"

const WHATSAPP_NUMBER = "573108336425"
const WHATSAPP_TEXT = "Hola, quiero más información sobre Dalizas."

export function WhatsAppFloat() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_TEXT)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir WhatsApp"
      className="fixed right-4 z-[60] inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#8B2E2E]/95 bg-[#8B2E2E] text-white shadow-[0_10px_25px_rgba(139,46,46,0.35)] transition-all duration-200 hover:scale-[1.06] hover:bg-[#D64545] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B2E2E]/55 focus-visible:ring-offset-2"
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <MessageCircle className="h-6 w-6" />
      <span className="sr-only">WhatsApp</span>
    </a>
  )
}
