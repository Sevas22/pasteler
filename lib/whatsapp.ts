/** Enlace de WhatsApp con mensaje prellenado. El número se limpia a solo dígitos (con indicativo 57). */
export function waLink(numero: string, mensaje: string): string {
  return `https://wa.me/${numero.replace(/\D/g, "")}?text=${encodeURIComponent(mensaje)}`
}

/** Número de respaldo si una sede aún no tiene WhatsApp configurado (sede principal). */
export const WHATSAPP_RESPALDO = "573108336425"
