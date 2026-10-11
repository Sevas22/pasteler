import Image from "next/image"
import { BANNERS } from "@/lib/media"
import { FlourishDivider } from "@/components/ornaments/flourish-divider"
import { SoftCircle } from "@/components/ornaments/soft-circle"

/**
 * Historia de marca: solo lo que es verificable (sede principal real, 4 sedes reales,
 * cursos reales) contado como narrativa — sin años ni nombres inventados.
 */
export function NuestraHistoria() {
  return (
    <section data-no-section-divider className="relative overflow-hidden bg-background px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
      <SoftCircle color="gold" size={300} className="-left-24 bottom-0" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl shadow-[0_30px_60px_-25px_rgba(58,38,32,0.45)] lg:mx-0">
          <Image
            src={BANNERS.historia}
            alt="Canasta de panadería recién horneada de Daliza"
            fill
            className="object-cover object-[40%_50%]"
            sizes="(max-width: 1024px) 100vw, 480px"
          />
        </div>

        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-primary/80">Nuestra historia</p>
          <p
            className="mt-2 max-w-lg text-balance text-3xl font-normal leading-tight text-heading sm:text-4xl"
            style={{ fontFamily: "var(--font-serif), ui-serif, Georgia, serif" }}
          >
            De un mostrador en Bosa a <span className="italic text-primary">cuatro sedes</span> que siguen
            horneando igual.
          </p>
          <FlourishDivider className="mt-4 justify-start" />

          <div className="mt-6 max-w-lg space-y-4 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            <p>
              Daliza empezó en un solo local de Bosa — el mismo que hoy es nuestra sede principal. Con el
              tiempo llegaron tres sedes más, pero la forma de trabajar no cambió: todo se sigue horneando,
              rellenando y decorando a mano, sin atajos ni recetas de fábrica.
            </p>
            <p>
              Por eso, además de vender, enseñamos. En nuestros cursos formamos a quienes quieren aprender el
              oficio desde cero, para que ese mismo cuidado se multiplique en cada cocina.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
