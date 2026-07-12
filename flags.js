// Banderas: siluetas simples inline (SVG), sin escudos con texto, sin peticiones de red.
// Cada bandera: { nombre, svg, colores: [] } -- colores son los únicos disponibles en la paleta.
//
// Convención de color: las zonas "blancas" de una bandera (una franja blanca, una cruz
// blanca, una estrella blanca) se dejan TRANSPARENTES en vez de pintarlas de blanco.
// El lienzo de dibujo ya es blanco, así que no pintar ahí es la forma correcta de
// reproducirlas, y el motor de IoU no penaliza dejarlas en blanco. Solo se listan en
// `colores` los tonos que realmente hay que pintar.

// Agujeros circulares (para estrellas, etc.) combinables con fill-rule evenodd.
function circleHoles(points, r) {
  return points.map(([cx, cy]) =>
    ` M${cx + r},${cy} a${r},${r} 0 1,0 ${-2 * r},0 a${r},${r} 0 1,0 ${2 * r},0 Z`
  ).join('');
}

// Cruz (plus) centrada en (cx,cy), brazos de longitud "arm" y grosor "thick".
function crossPath(cx, cy, arm, thick) {
  const h = thick / 2;
  return `M${cx - h},${cy - arm} H${cx + h} V${cy - h} H${cx + arm} V${cy + h}
    H${cx + h} V${cy + arm} H${cx - h} V${cy + h} H${cx - arm} V${cy - h} H${cx - h} Z`;
}

// Rayo triangular fino apuntando hacia afuera desde (cx,cy), rotado angleDeg.
function sunRay(cx, cy, angleDeg, innerR, outerR, width) {
  return `<g transform="translate(${cx},${cy}) rotate(${angleDeg})">
    <polygon points="${-width / 2},${-innerR} ${width / 2},${-innerR} 0,${-outerR}"/>
  </g>`;
}

function sunRays(cx, cy, innerR, outerR, width, count) {
  let out = '';
  for (let i = 0; i < count; i++) {
    out += sunRay(cx, cy, (360 / count) * i, innerR, outerR, width);
  }
  return out;
}

// Estrella de 5 puntas como subpath (para usar como agujero evenodd o relleno).
function starPath(cx, cy, outerR, innerR, rotationDeg) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = (Math.PI / 180) * (rotationDeg + i * 36 - 90);
    pts.push(`${(cx + r * Math.cos(angle)).toFixed(2)},${(cy + r * Math.sin(angle)).toFixed(2)}`);
  }
  return `M${pts.join(' L')} Z`;
}

const FLAGS = [
  {
    nombre: 'ESPAÑA',
    colores: ['#AA151B', '#F1BF00'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <rect x="0" y="0" width="200" height="50" fill="#AA151B"/>
      <rect x="0" y="50" width="200" height="100" fill="#F1BF00"/>
      <rect x="0" y="150" width="200" height="50" fill="#AA151B"/>
    </svg>`
  },
  {
    nombre: 'FRANCIA',
    colores: ['#0055A4', '#EF4135'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <rect x="0" y="0" width="67" height="200" fill="#0055A4"/>
      <rect x="133" y="0" width="67" height="200" fill="#EF4135"/>
    </svg>`
  },
  {
    nombre: 'ITALIA',
    colores: ['#008C45', '#CD212A'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <rect x="0" y="0" width="67" height="200" fill="#008C45"/>
      <rect x="133" y="0" width="67" height="200" fill="#CD212A"/>
    </svg>`
  },
  {
    nombre: 'ALEMANIA',
    colores: ['#000000', '#DD0000', '#FFCE00'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <rect x="0" y="0" width="200" height="67" fill="#000000"/>
      <rect x="0" y="67" width="200" height="66" fill="#DD0000"/>
      <rect x="0" y="133" width="200" height="67" fill="#FFCE00"/>
    </svg>`
  },
  {
    nombre: 'ESTADOS UNIDOS',
    colores: ['#B31942', '#0A3161'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <rect x="80" y="0" width="120" height="15.4" fill="#B31942"/>
      <rect x="80" y="30.8" width="120" height="15.4" fill="#B31942"/>
      <rect x="80" y="61.5" width="120" height="15.4" fill="#B31942"/>
      <rect x="80" y="92.3" width="120" height="15.4" fill="#B31942"/>
      <rect x="0" y="123.1" width="200" height="15.4" fill="#B31942"/>
      <rect x="0" y="153.8" width="200" height="15.4" fill="#B31942"/>
      <rect x="0" y="184.6" width="200" height="15.4" fill="#B31942"/>
      <path fill="#0A3161" fill-rule="evenodd" d="
        M0,0 H80 V108 H0 Z
        ${circleHoles([
          [14, 14], [30, 14], [46, 14], [62, 14],
          [22, 30], [38, 30], [54, 30],
          [14, 46], [30, 46], [46, 46], [62, 46],
          [22, 62], [38, 62], [54, 62],
          [14, 78], [30, 78], [46, 78], [62, 78],
          [22, 94], [38, 94], [54, 94]
        ], 3.4)}
      "/>
    </svg>`
  },
  {
    nombre: 'JAPÓN',
    colores: ['#BC002D'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="52" fill="#BC002D"/>
    </svg>`
  },
  {
    nombre: 'BRASIL',
    colores: ['#009739', '#FEDD00', '#012169'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <rect x="0" y="0" width="200" height="200" fill="#009739"/>
      <polygon points="100,25 175,100 100,175 25,100" fill="#FEDD00"/>
      <circle cx="100" cy="100" r="48" fill="#012169"/>
    </svg>`
  },
  {
    nombre: 'ARGENTINA',
    colores: ['#75AADB', '#F6B40E'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <rect x="0" y="0" width="200" height="67" fill="#75AADB"/>
      <rect x="0" y="133" width="200" height="67" fill="#75AADB"/>
      ${sunRays(100, 100, 24, 38, 12, 16)}
      <circle cx="100" cy="100" r="24" fill="#F6B40E"/>
    </svg>`
  },
  {
    nombre: 'COLOMBIA',
    colores: ['#FCD116', '#003893', '#CE1126'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <rect x="0" y="0" width="200" height="100" fill="#FCD116"/>
      <rect x="0" y="100" width="200" height="50" fill="#003893"/>
      <rect x="0" y="150" width="200" height="50" fill="#CE1126"/>
    </svg>`
  },
  {
    nombre: 'SUECIA',
    colores: ['#006AA7', '#FECC00'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <rect x="0" y="0" width="200" height="200" fill="#006AA7"/>
      <rect x="65" y="0" width="28" height="200" fill="#FECC00"/>
      <rect x="0" y="86" width="200" height="28" fill="#FECC00"/>
    </svg>`
  },
  {
    nombre: 'SUIZA',
    colores: ['#D52B1E'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <path fill="#D52B1E" fill-rule="evenodd" d="
        M20,20 H180 V180 H20 Z
        ${crossPath(100, 100, 42, 26)}
      "/>
    </svg>`
  },
  {
    nombre: 'GRECIA',
    colores: ['#0D5EAF'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <rect x="0" y="0" width="200" height="22" fill="#0D5EAF"/>
      <rect x="0" y="44" width="200" height="22" fill="#0D5EAF"/>
      <rect x="0" y="88" width="200" height="22" fill="#0D5EAF"/>
      <rect x="0" y="132" width="200" height="22" fill="#0D5EAF"/>
      <rect x="0" y="176" width="200" height="22" fill="#0D5EAF"/>
      <path fill="#0D5EAF" fill-rule="evenodd" d="
        M0,0 H90 V90 H0 Z
        ${crossPath(45, 45, 38, 16)}
      "/>
    </svg>`
  },
  {
    nombre: 'TURQUÍA',
    colores: ['#E30A17'],
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <path fill="#E30A17" fill-rule="evenodd" d="
        M0,0 H200 V200 H0 Z
        M108,60 a42,42 0 1,0 0,80 a34,34 0 1,1 0,-80 Z
        ${starPath(158, 100, 14, 5.5, 0)}
      "/>
    </svg>`
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FLAGS };
}
