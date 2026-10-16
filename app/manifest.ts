import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Daliza Pastelería Fina",
    short_name: "Daliza",
    description: "Tortas personalizadas, postres y panadería artesanal en Bosa, Bogotá.",
    start_url: "/",
    display: "standalone",
    background_color: "#F8F5F2",
    theme_color: "#5A2E2E",
    lang: "es-CO",
    icons: [{ src: "/images/logo-dalizas-transparente.png", sizes: "any", type: "image/png" }],
  }
}
