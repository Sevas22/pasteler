/** Decoraciones de "Nuestras sedes": todo SVG en línea (sin imágenes), con los colores de la marca. */

const DORADO = "#C9A96E"
const DORADO_CLARO = "#D9B77D"
const VINO = "#7A2028"
const VINO_PROFUNDO = "#711D26"

/** Fondo completo: crema, manchas suaves, curvas doradas y las masas vino arriba a la derecha y abajo. */
export function FondoSedes({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1920 900" preserveAspectRatio="none" aria-hidden focusable="false">
      <rect width="1920" height="900" fill="#F8F5F2" />

      {/* Manchas crema orgánicas, muy sutiles */}
      <path
        d="M0 0 H1920 V155 C1650 205,1470 95,1210 145 C960 195,780 85,510 150 C300 200,140 145,0 175 Z"
        fill="#F3EAE2"
        opacity="0.7"
      />
      <path
        d="M-40 520 C220 455,430 560,700 505 C980 450,1180 560,1470 500 C1660 460,1800 510,1960 480 L1960 760 L-40 760 Z"
        fill="#FBF6F0"
        opacity="0.9"
      />
      <path
        d="M1120 0 C1180 120,1320 210,1500 230 C1650 248,1780 200,1920 230 L1920 0 Z"
        fill="#F1E6DC"
        opacity="0.55"
      />

      {/* Masa vino, esquina superior derecha */}
      <path
        d="M1585 -20 C1640 70,1725 115,1830 120 C1880 122,1910 112,1960 98 L1960 -20 Z"
        fill={VINO_PROFUNDO}
      />
      <path d="M1520 -20 C1590 90,1700 150,1960 140" fill="none" stroke={DORADO} strokeWidth="2" opacity="0.85" />

      {/* Curvas doradas que cruzan el diseño (salen del borde para no cortarse) */}
      <path
        d="M-80 430 C185 303,340 332,510 390 C720 462,940 365,1160 398 C1390 434,1585 332,1990 375"
        fill="none"
        stroke={DORADO}
        strokeWidth="2"
      />
      <path
        d="M-80 446 C190 322,345 350,515 408 C722 480,945 384,1165 416 C1392 452,1590 352,1990 394"
        fill="none"
        stroke={DORADO_CLARO}
        strokeWidth="1.3"
        opacity="0.65"
      />
      <path
        d="M-80 250 C160 300,300 210,470 245 C620 276,700 330,820 300"
        fill="none"
        stroke={DORADO_CLARO}
        strokeWidth="1.2"
        opacity="0.5"
      />
      <path
        d="M1380 60 C1450 160,1560 230,1700 250 C1790 262,1870 245,1990 205"
        fill="none"
        stroke={DORADO}
        strokeWidth="1.4"
        opacity="0.6"
      />

      {/* Masa vino inferior (marco) con su línea dorada */}
      <path
        d="M-50 815 C185 748,365 855,560 814 C770 767,923 845,1120 814 C1350 776,1550 855,1970 792 L1970 950 L-50 950 Z"
        fill={VINO}
      />
      <path
        d="M-50 800 C185 733,365 840,560 799 C770 752,923 830,1120 799 C1350 761,1550 840,1970 777"
        fill="none"
        stroke={DORADO}
        strokeWidth="2"
      />
    </svg>
  )
}

/** Corazón "dibujado a mano" (trazo, sin relleno). */
export function Corazon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 80" aria-hidden focusable="false">
      <path
        d="M40 67 C34 57,15 45,15 29 C15 19,23 14,31 16 C36 17,39 22,40 27 C42 21,46 16,53 16 C62 16,67 23,65 32 C62 45,49 58,40 67"
        fill="none"
        stroke={DORADO}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Ramita con dos hojas abiertas, lineal y dorada. */
export function Hoja({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 90" aria-hidden focusable="false">
      <g fill="none" stroke={DORADO} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M30 86 C28 64,31 40,36 8" />
        <path d="M31 52 C18 50,10 40,9 28 C21 30,29 39,31 52" />
        <path d="M33 34 C44 30,51 21,52 10 C41 13,34 22,33 34" />
      </g>
    </svg>
  )
}
