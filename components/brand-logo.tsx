import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { BRANDING } from "@/lib/branding"

type BrandLogoProps = {
  variant?: "header" | "footer" | "hero"
  className?: string
  onClick?: () => void
}

export function BrandLogo({ variant = "header", className, onClick }: BrandLogoProps) {
  const src = BRANDING.logoPrincipal

  if (variant === "hero") {
    return (
      <div className={cn("flex w-full flex-col items-center", className)}>
        <Link
          href="/"
          onClick={onClick}
          className="inline-flex w-full max-w-[min(90vw,340px)] justify-center transition-opacity hover:opacity-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F5F2] md:max-w-[360px]"
        >
          <Image
            src={src}
            alt={BRANDING.logoAlt}
            width={360}
            height={140}
            priority
            sizes="(max-width: 768px) 90vw, 360px"
            className="h-auto w-full max-h-[min(28vh,160px)] object-contain object-center drop-shadow-[0_2px_8px_rgba(90,46,46,0.12)] md:max-h-[min(30vh,180px)]"
          />
        </Link>
      </div>
    )
  }

  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md",
        className,
      )}
    >
      {variant === "footer" ? (
        <span className="inline-block rounded-xl border border-brand-gold/40 bg-brand-cream p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
          <Image
            src={src}
            alt={BRANDING.logoAlt}
            width={320}
            height={120}
            className="h-auto max-h-[88px] w-auto max-w-[240px] object-contain object-center md:max-h-[100px] md:max-w-[280px]"
          />
        </span>
      ) : (
        <Image
          src={src}
          alt={BRANDING.logoAlt}
          width={220}
          height={80}
          priority
          className="h-[3rem] w-auto max-h-[3.5rem] max-w-[min(168px,42vw)] rounded-md object-contain object-left ring-1 ring-brand-gold/35 md:h-[3.5rem] md:max-h-[4rem] md:max-w-[192px]"
        />
      )}
    </Link>
  )
}
