// Logos: siluetas simples inline (SVG), sin wordmarks ni letras, sin peticiones de red.
// Cada logo: { nombre, svg, colores: [] } -- colores son los únicos disponibles en la paleta.

const LOGOS = [
  {
    nombre: 'NIKE',
    colores: ['#111111'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <path fill="#111111" d="M18,152 C46,150 78,132 108,108 C140,82 162,58 186,40
        C158,74 132,116 92,150 C70,169 46,176 28,168 C21,165 17,159 18,152 Z"/>
    </svg>`
  },
  {
    nombre: 'APPLE',
    colores: ['#111111'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <path fill="#111111" fill-rule="evenodd" d="
        M100,58 C72,58 48,84 48,122 C48,158 70,182 94,182
        C104,182 111,176 122,176 C133,176 139,182 149,182
        C175,182 198,155 198,120 C198,90 178,68 152,64
        C140,62 130,70 120,70 C111,70 106,58 100,58 Z
        M162,72 a16,16 0 1,0 32,0 a16,16 0 1,0 -32,0 Z
      "/>
      <path fill="#111111" d="M116,58 C116,42 127,29 145,26 C147,42 135,57 116,58 Z"/>
    </svg>`
  },
  {
    nombre: 'MERCEDES',
    colores: ['#0a0a0a'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <path fill="#0a0a0a" fill-rule="evenodd" d="
        M100,20 a80,80 0 1,0 0.1,0 Z
        M100,34 a66,66 0 1,1 -0.1,0 Z
      "/>
      <g fill="#0a0a0a">
        <rect x="94" y="24" width="12" height="76" />
        <rect x="94" y="24" width="12" height="76" transform="rotate(120 100 100)"/>
        <rect x="94" y="24" width="12" height="76" transform="rotate(240 100 100)"/>
      </g>
    </svg>`
  },
  {
    nombre: "MCDONALD'S",
    colores: ['#FFC72C'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <path fill="#FFC72C" d="M40,175 L40,90 a24,24 0 0,1 48,0 L88,140 L112,140
        L112,90 a24,24 0 0,1 48,0 L160,175 L136,175 L136,110 L120,150 L80,150
        L64,110 L64,175 Z"/>
    </svg>`
  },
  {
    nombre: 'PUMA',
    colores: ['#111111'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <g fill="#111111">
        <path d="M155,95 C175,85 186,64 178,48 C188,58 192,80 172,96 C168,100 159,99 155,95 Z"/>
        <ellipse cx="105" cy="106" rx="55" ry="20" transform="rotate(-16 105 106)"/>
        <circle cx="46" cy="92" r="18"/>
        <polygon points="34,77 42,58 51,79"/>
        <polygon points="55,75 63,57 70,78"/>
        <rect x="40" y="103" width="14" height="46" rx="6" transform="rotate(24 47 103)"/>
        <rect x="146" y="98" width="14" height="46" rx="6" transform="rotate(-34 153 98)"/>
      </g>
    </svg>`
  },
  {
    nombre: 'SHELL',
    colores: ['#FFCE00', '#ED1C24'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <path fill="#FFCE00" stroke="#ED1C24" stroke-width="5" stroke-linejoin="round" d="
        M100,22
        C68,22 50,50 52,80
        C36,90 26,108 28,128
        C40,120 50,118 58,126
        C62,112 74,104 88,106
        C86,94 92,84 100,80
        C108,84 114,94 112,106
        C126,104 138,112 142,126
        C150,118 160,120 172,128
        C174,108 164,90 148,80
        C150,50 132,22 100,22 Z"/>
    </svg>`
  },
  {
    nombre: 'PLAYSTATION',
    colores: ['#003791'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <path fill="#003791" fill-rule="evenodd" d="
        M40,80 a30,30 0 0,1 30,-28 L130,52 a30,30 0 0,1 30,28
        L166,140 a20,20 0 0,1 -36,10 L120,120 L80,120 L70,150 a20,20 0 0,1 -36,-10 Z
        M72,74 a12,12 0 1,0 24,0 a12,12 0 1,0 -24,0 Z
        M116,74 a12,12 0 1,0 24,0 a12,12 0 1,0 -24,0 Z
        M94,70 h12 v10 h10 v12 h-10 v10 h-12 v-10 h-10 v-12 h10 Z
      "/>
    </svg>`
  },
  {
    nombre: 'ANDROID',
    colores: ['#3DDC84'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <path fill="#3DDC84" fill-rule="evenodd" d="
        M55,150 L55,90 a45,45 0 0,1 90,0 L145,150 Z
        M78,72 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0 Z
        M114,72 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0 Z
      "/>
      <line x1="65" y1="60" x2="58" y2="45" stroke="#3DDC84" stroke-width="6" stroke-linecap="round"/>
      <line x1="135" y1="60" x2="142" y2="45" stroke="#3DDC84" stroke-width="6" stroke-linecap="round"/>
    </svg>`
  },
  {
    nombre: 'MASTERCARD',
    colores: ['#EB001B', '#F79E1B'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <circle cx="85" cy="100" r="45" fill="#EB001B"/>
      <circle cx="115" cy="100" r="45" fill="#F79E1B"/>
    </svg>`
  },
  {
    nombre: 'WINDOWS',
    colores: ['#F25022', '#7FBA00', '#00A4EF', '#FFB900'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <rect x="35" y="35" width="60" height="60" fill="#F25022"/>
      <rect x="105" y="35" width="60" height="60" fill="#7FBA00"/>
      <rect x="35" y="105" width="60" height="60" fill="#00A4EF"/>
      <rect x="105" y="105" width="60" height="60" fill="#FFB900"/>
    </svg>`
  },
  {
    nombre: 'ADIDAS',
    colores: ['#111111'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <polygon fill="#111111" points="30,170 55,170 100,60 75,60"/>
      <polygon fill="#111111" points="80,170 105,170 140,85 115,85"/>
      <polygon fill="#111111" points="130,170 155,170 178,112 153,112"/>
    </svg>`
  },
  {
    nombre: 'XBOX',
    colores: ['#107C10'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <path fill="#107C10" fill-rule="evenodd" d="
        M172,100 a72,72 0 1,0 -144,0 a72,72 0 1,0 144,0 Z
        M100,100 C70,130 55,150 45,158 C70,168 90,150 100,135
        C110,150 130,168 155,158 C145,150 130,130 100,100 Z
        M100,100 C70,70 55,50 45,42 C70,32 90,50 100,65
        C110,50 130,32 155,42 C145,50 130,70 100,100 Z
      "/>
    </svg>`
  },
  {
    nombre: 'INSTAGRAM',
    colores: ['#C13584'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <rect x="35" y="35" width="130" height="130" rx="36" fill="none" stroke="#C13584" stroke-width="12"/>
      <circle cx="100" cy="100" r="32" fill="none" stroke="#C13584" stroke-width="12"/>
      <circle cx="140" cy="62" r="8" fill="#C13584"/>
    </svg>`
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LOGOS };
}
