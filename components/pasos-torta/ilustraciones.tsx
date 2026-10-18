/** Ilustraciones de línea para "Diseña tu torta en 3 pasos". SVG en línea, colores de la marca. */

const DORADO = "#C9A96E"
const CAFE = "#8A5A3C"
const VINO = "#8B2E2E"

/** Destello: tres trazos cortos, como "chispas" dibujadas a mano. */
export function Destello({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden focusable="false">
      <g fill="none" stroke={DORADO} strokeWidth="3" strokeLinecap="round">
        <path d="M20 4 L22 14" />
        <path d="M34 12 L26 19" />
        <path d="M37 28 L27 27" />
      </g>
    </svg>
  )
}

/** Adorno de tres hojas que corona el título. */
export function Flor({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" className={className} aria-hidden focusable="false">
      <g fill="none" stroke={DORADO} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 34 H112" />
        <path d="M60 33 C52 26,50 16,60 6 C70 16,68 26,60 33 Z" fill={DORADO} fillOpacity="0.25" />
        <path d="M58 32 C46 32,38 26,36 18 C46 18,54 24,58 32 Z" />
        <path d="M62 32 C74 32,82 26,84 18 C74 18,66 24,62 32 Z" />
      </g>
    </svg>
  )
}

/** Paso 2: libreta de espiral con una torta dibujada, lista de chequeo y lápiz dorado. */
export function Libreta({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 220" className={className} aria-hidden focusable="false">
      <g transform="rotate(-8 100 110)">
        {/* Hoja */}
        <rect x="38" y="30" width="118" height="160" rx="8" fill="#FFFDF8" stroke="#E5D6C3" strokeWidth="2" />
        <rect x="44" y="36" width="118" height="160" rx="8" fill="none" stroke="#EFE3D4" strokeWidth="1.5" />
        {/* Espiral */}
        <g fill="none" stroke={CAFE} strokeWidth="2.4" strokeLinecap="round">
          {[52, 64, 76, 88, 100, 112, 124, 136].map((x) => (
            <path key={x} d={`M${x} 38 C${x - 3} 30,${x + 5} 22,${x + 4} 32`} />
          ))}
        </g>
        {/* Torta de dos pisos */}
        <g fill="none" stroke={CAFE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M72 108 h52 v22 h-52 Z" />
          <path d="M72 116 c8 5,13 -5,20 0 c7 5,12 -5,20 0 c6 4,9 -2,12 0" />
          <path d="M80 92 h36 v16 h-36 Z" />
          <path d="M80 98 c6 4,10 -4,15 0 c5 4,9 -4,14 0 c3 2,5 0,7 0" />
          <path d="M98 92 v-8" />
          <path d="M98 78 c-3 3,-2 6,0 6 c2 0,3 -3,0 -6" fill={VINO} fillOpacity="0.5" />
          <path d="M66 132 h64" />
        </g>
        {/* Lista */}
        <g fill="none" stroke={CAFE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {[148, 162, 176].map((y) => (
            <g key={y}>
              <rect x="64" y={y - 6} width="9" height="9" rx="1.5" />
              <path d={`M65.5 ${y - 1.5} l2.5 2.5 l4.5 -5.5`} stroke={VINO} />
              <path d={`M80 ${y} h${y === 176 ? 36 : 50}`} strokeDasharray="5 4" />
            </g>
          ))}
        </g>
      </g>
      {/* Lápiz dorado */}
      <g transform="rotate(28 150 120)">
        <rect x="143" y="40" width="13" height="120" rx="3" fill={DORADO} />
        <rect x="143" y="40" width="5" height="120" fill="#E3C98F" opacity="0.7" />
        <rect x="143" y="34" width="13" height="10" rx="2" fill="#B08A4A" />
        <path d="M143 160 L149.5 182 L156 160 Z" fill="#E9D7B4" />
        <path d="M147.6 175 L149.5 182 L151.4 175 Z" fill="#5A2E2E" />
      </g>
      {/* Ramita de flores */}
      <g fill="none" stroke="#BFA88A" strokeWidth="1.6" strokeLinecap="round">
        <path d="M30 210 C34 186,32 168,24 150" />
        <path d="M31 186 C24 182,20 176,18 168" />
        <path d="M31 176 C38 172,42 166,43 158" />
      </g>
      <g fill="#FFFFFF" stroke="#D9C9B3" strokeWidth="1">
        {[[24, 150], [18, 166], [43, 156], [28, 160], [36, 168]].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="3.4" />
        ))}
      </g>
    </svg>
  )
}

/** Paso 3: celular con el logo de WhatsApp en la pantalla. */
export function Celular({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 150 230" className={className} aria-hidden focusable="false">
      <g transform="rotate(-6 75 115)">
        <rect x="30" y="12" width="92" height="196" rx="18" fill="#1F1A19" />
        <rect x="35" y="17" width="82" height="186" rx="14" fill="#FBF6F0" />
        <rect x="58" y="22" width="36" height="9" rx="4.5" fill="#1F1A19" />
        <circle cx="76" cy="108" r="22" fill="#25D366" />
        <path
          d="M76.03 94.7c-7.35 0-13.33 5.97-13.33 13.31 0 2.36.62 4.64 1.78 6.65L62.7 121.3l6.84-1.79a13.3 13.3 0 0 0 6.48 1.65c7.35 0 13.33-5.97 13.33-13.31s-5.98-13.15-13.32-13.15Zm0 24.2c-2.05 0-4.05-.55-5.79-1.59l-.41-.25-4.05 1.06 1.09-3.95-.27-.41a10.87 10.87 0 0 1-1.67-5.8c0-6.02 4.9-10.92 10.93-10.92 6.02 0 10.92 4.9 10.92 10.92 0 6.03-4.9 10.99-10.75 10.99Zm5.99-8.17c-.33-.16-1.94-.95-2.23-1.06-.3-.11-.52-.16-.74.16-.21.33-.85 1.06-1.03 1.28-.2.22-.38.25-.71.08-.33-.16-1.38-.51-2.63-1.63-.97-.87-1.64-1.95-1.83-2.27-.19-.33-.02-.5.14-.67.15-.14.33-.38.49-.57.16-.19.22-.33.33-.54.1-.22.05-.41-.03-.57-.08-.16-.74-1.77-1.01-2.43-.27-.63-.53-.55-.74-.56h-.62c-.22 0-.57.08-.87.41-.3.33-1.15 1.12-1.15 2.72s1.17 3.15 1.33 3.38c.16.22 2.3 3.51 5.58 4.92.78.34 1.39.54 1.86.69.79.25 1.5.21 2.06.13.63-.09 1.94-.79 2.21-1.56.27-.76.27-1.41.19-1.56-.08-.13-.3-.21-.62-.37Z"
          fill="#fff"
        />
        <rect x="52" y="186" width="48" height="4" rx="2" fill="#1F1A19" opacity="0.25" />
      </g>
    </svg>
  )
}
