import { HeroClient } from "@/components/hero-client"
import { MEDIA } from "@/lib/media"

export function Hero() {
  return (
    <HeroClient
      bannerSrc={MEDIA.heroBannerPrincipal}
      bannerAlt="Daliza — pastelería fina, torta de chocolate y detalles en oro"
    />
  )
}
