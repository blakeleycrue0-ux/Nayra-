// Motor de puntuación: compara el dibujo del usuario contra la bandera objetivo.
// Funciona sobre arrays RGBA planos (Uint8ClampedArray o Array normal) del mismo tamaño,
// para poder testearse sin DOM/canvas real.

function colorDistance(r1, g1, b1, r2, g2, b2) {
  const dr = r1 - r2, dg = g1 - g2, db = b1 - b2;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

function labelFor(pct) {
  if (pct < 72) return 'BAD..';
  if (pct < 80) return 'NOT GOOD';
  if (pct < 85) return 'DANGG';
  if (pct < 90) return 'NOT THAT BAD';
  if (pct < 96) return 'GOOD';
  return 'SOOO GOOD...';
}

// Por debajo de este número de píxeles de tinta se considera que no hubo
// un intento real de dibujar (lienzo en blanco o un simple toque accidental).
// En ese caso no se aplica el suelo de 65: el score cae a un valor bajo de verdad.
const MIN_INK_PIXELS = 40;

// tolerance: distancia euclídea máxima en RGB (0-441) para considerar "mismo color"
function computeScore(userPixels, targetPixels, tolerance) {
  tolerance = tolerance == null ? 90 : tolerance;
  const n = Math.min(userPixels.length, targetPixels.length) / 4;
  let inter = 0, union = 0, colorMatch = 0, userInk = 0;

  for (let i = 0; i < n; i++) {
    const o = i * 4;
    const uInk = userPixels[o + 3] > 10;
    const tInk = targetPixels[o + 3] > 10;

    if (uInk) userInk++;
    if (uInk || tInk) union++;
    if (uInk && tInk) {
      inter++;
      const dist = colorDistance(
        userPixels[o], userPixels[o + 1], userPixels[o + 2],
        targetPixels[o], targetPixels[o + 1], targetPixels[o + 2]
      );
      if (dist <= tolerance) colorMatch++;
    }
  }

  const iou = union === 0 ? 0 : inter / union;
  const colorScore = inter === 0 ? 0 : colorMatch / inter;
  const raw = 0.7 * iou + 0.3 * colorScore;

  const attempted = userInk >= MIN_INK_PIXELS;
  const displayed = attempted ? Math.round(65 + raw * 35) : Math.round(raw * 40);

  return { iou, colorScore, raw, displayed, label: labelFor(displayed), attempted };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { computeScore, labelFor, colorDistance };
}
