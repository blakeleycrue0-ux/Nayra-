// Modo "Completa el logo": cada entrada tiene una parte YA dibujada (baseSvg,
// se muestra de fondo, no interactiva) y una parte que FALTA (missingSvg, la
// que el jugador tiene que dibujar). El score solo compara contra missingSvg.
// Mismo formato de colores que flags.js: solo los tonos que hay que pintar.

const COMPLETAR = [
  {
    nombre: 'MERCEDES',
    colores: ['#0a0a0a'],
    baseSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <path fill="#0a0a0a" fill-rule="evenodd" d="
        M100,20 a80,80 0 1,0 0.1,0 Z
        M100,34 a66,66 0 1,1 -0.1,0 Z
      "/>
    </svg>`,
    missingSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <g fill="#0a0a0a">
        <rect x="94" y="24" width="12" height="76"/>
        <rect x="94" y="24" width="12" height="76" transform="rotate(120 100 100)"/>
        <rect x="94" y="24" width="12" height="76" transform="rotate(240 100 100)"/>
      </g>
    </svg>`
  },
  {
    nombre: 'ADIDAS',
    colores: ['#111111'],
    baseSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <polygon fill="#111111" points="30,170 55,170 100,60 75,60"/>
      <polygon fill="#111111" points="80,170 105,170 140,85 115,85"/>
    </svg>`,
    missingSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <polygon fill="#111111" points="130,170 155,170 178,112 153,112"/>
    </svg>`
  },
  {
    nombre: 'WINDOWS',
    colores: ['#FFB900'],
    baseSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <rect x="35" y="35" width="60" height="60" fill="#F25022"/>
      <rect x="105" y="35" width="60" height="60" fill="#7FBA00"/>
      <rect x="35" y="105" width="60" height="60" fill="#00A4EF"/>
    </svg>`,
    missingSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <rect x="105" y="105" width="60" height="60" fill="#FFB900"/>
    </svg>`
  },
  {
    nombre: 'MASTERCARD',
    colores: ['#F79E1B'],
    baseSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <circle cx="85" cy="100" r="45" fill="#EB001B"/>
    </svg>`,
    missingSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <circle cx="115" cy="100" r="45" fill="#F79E1B"/>
    </svg>`
  },
  {
    nombre: 'AMAZON',
    colores: ['#FF9900'],
    baseSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <text x="100" y="112" font-family="Arial, sans-serif" font-weight="900" font-size="44"
        text-anchor="middle" fill="#111111">amazon</text>
    </svg>`,
    missingSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <path fill="#FF9900" d="M56,128 C80,148 122,148 146,128 L146,119
        C122,136 80,136 58,119 Z"/>
      <polygon fill="#FF9900" points="140,117 156,121 143,133"/>
    </svg>`
  },
  {
    nombre: 'VOLKSWAGEN',
    colores: ['#15151a'],
    baseSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <path fill="#15151a" fill-rule="evenodd" d="
        M100,18 a82,82 0 1,0 0.1,0 Z
        M100,30 a70,70 0 1,1 -0.1,0 Z
      "/>
      <path fill="none" stroke="#15151a" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"
        d="M72,52 L100,96 L128,52"/>
    </svg>`,
    missingSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <path fill="none" stroke="#15151a" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"
        d="M60,100 L80,142 L100,112 L120,142 L140,100"/>
    </svg>`
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { COMPLETAR };
}
