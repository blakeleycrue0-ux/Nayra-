(function () {
  'use strict';

  const DRAW_SIZE = 320;
  const ROUND_SECONDS = 30;
  const MAX_UNDO = 40;

  const drawCanvas = document.getElementById('drawCanvas');
  const dctx = drawCanvas.getContext('2d', { willReadFrequently: true });
  drawCanvas.width = DRAW_SIZE;
  drawCanvas.height = DRAW_SIZE;
  dctx.lineCap = 'round';
  dctx.lineJoin = 'round';

  const hiddenFlagCanvas = document.getElementById('hiddenFlagCanvas');
  hiddenFlagCanvas.width = DRAW_SIZE;
  hiddenFlagCanvas.height = DRAW_SIZE;
  const hctx = hiddenFlagCanvas.getContext('2d', { willReadFrequently: true });

  const paletteEl = document.getElementById('palette');
  const brushSizeEl = document.getElementById('brushSize');
  const timerEl = document.getElementById('timerDisplay');
  const revealNameEl = document.getElementById('revealName');
  const verdictEl = document.getElementById('verdictText');
  const percentEl = document.getElementById('percentText');
  const countryNameResultEl = document.getElementById('countryNameResult');
  const yoursCanvas = document.getElementById('yoursCanvas');
  const flagCanvas = document.getElementById('flagCanvas');

  let currentFlag = null;
  let flagImage = null;
  let flagImageData = null;
  let currentColor = '#000000';
  let brushSize = parseInt(brushSizeEl.value, 10);
  let drawing = false;
  let lastX = 0, lastY = 0;
  let undoStack = [];
  let timerInterval = null;
  let timeLeft = ROUND_SECONDS;

  // ---------- Navegación entre pantallas ----------

  function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('screen-' + id).classList.add('active');
  }

  // ---------- Carga y rasterizado de banderas ----------

  function svgToImage(svgString) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
    });
  }

  async function prepareFlag(flag) {
    flagImage = await svgToImage(flag.svg);
    hctx.clearRect(0, 0, DRAW_SIZE, DRAW_SIZE);
    hctx.drawImage(flagImage, 0, 0, DRAW_SIZE, DRAW_SIZE);
    flagImageData = hctx.getImageData(0, 0, DRAW_SIZE, DRAW_SIZE).data;
  }

  function pickRandomFlag() {
    let pool = FLAGS;
    if (currentFlag && FLAGS.length > 1) {
      pool = FLAGS.filter(f => f !== currentFlag);
    }
    return pool[Math.floor(Math.random() * pool.length)];
  }

  // ---------- Paleta / pincel ----------

  function setupPalette(colores) {
    paletteEl.innerHTML = '';
    colores.forEach((color, i) => {
      const btn = document.createElement('button');
      btn.className = 'swatch' + (i === 0 ? ' selected' : '');
      btn.style.background = color;
      btn.setAttribute('aria-label', color);
      btn.addEventListener('click', () => {
        currentColor = color;
        paletteEl.querySelectorAll('.swatch').forEach(s => s.classList.remove('selected'));
        btn.classList.add('selected');
      });
      paletteEl.appendChild(btn);
    });
    currentColor = colores[0];
  }

  brushSizeEl.addEventListener('input', () => {
    brushSize = parseInt(brushSizeEl.value, 10);
  });

  // ---------- Canvas de dibujo ----------

  function getPos(e) {
    const rect = drawCanvas.getBoundingClientRect();
    const scaleX = DRAW_SIZE / rect.width;
    const scaleY = DRAW_SIZE / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }

  function pushUndo() {
    undoStack.push(dctx.getImageData(0, 0, DRAW_SIZE, DRAW_SIZE));
    if (undoStack.length > MAX_UNDO) undoStack.shift();
  }

  function undo() {
    if (!undoStack.length) return;
    const prev = undoStack.pop();
    dctx.putImageData(prev, 0, 0);
  }

  function clearAll() {
    pushUndo();
    dctx.clearRect(0, 0, DRAW_SIZE, DRAW_SIZE);
  }

  function resetCanvas() {
    dctx.clearRect(0, 0, DRAW_SIZE, DRAW_SIZE);
    undoStack = [];
  }

  function dot(x, y) {
    dctx.fillStyle = currentColor;
    dctx.beginPath();
    dctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
    dctx.fill();
  }

  drawCanvas.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    drawCanvas.setPointerCapture(e.pointerId);
    pushUndo();
    drawing = true;
    const p = getPos(e);
    lastX = p.x;
    lastY = p.y;
    dot(p.x, p.y);
  });

  drawCanvas.addEventListener('pointermove', (e) => {
    if (!drawing) return;
    e.preventDefault();
    const p = getPos(e);
    dctx.strokeStyle = currentColor;
    dctx.lineWidth = brushSize;
    dctx.beginPath();
    dctx.moveTo(lastX, lastY);
    dctx.lineTo(p.x, p.y);
    dctx.stroke();
    lastX = p.x;
    lastY = p.y;
  });

  ['pointerup', 'pointercancel', 'pointerleave'].forEach(ev => {
    drawCanvas.addEventListener(ev, () => { drawing = false; });
  });

  document.getElementById('btnUndo').addEventListener('click', undo);
  document.getElementById('btnClear').addEventListener('click', clearAll);

  // ---------- Timer ----------

  function updateTimerDisplay() {
    timerEl.textContent = timeLeft;
  }

  function startTimer() {
    timeLeft = ROUND_SECONDS;
    updateTimerDisplay();
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        finishDrawing();
      }
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
  }

  // ---------- Flujo de ronda ----------

  async function beginRound() {
    currentFlag = pickRandomFlag();
    await prepareFlag(currentFlag);
    revealNameEl.textContent = currentFlag.nombre;
    showScreen('reveal');
    setTimeout(beginDrawPhase, 2000);
  }

  function beginDrawPhase() {
    resetCanvas();
    setupPalette(currentFlag.colores);
    showScreen('draw');
    startTimer();
  }

  function finishDrawing() {
    stopTimer();
    const userData = dctx.getImageData(0, 0, DRAW_SIZE, DRAW_SIZE).data;
    const result = computeScore(userData, flagImageData);
    showResult(result);
  }

  function showResult(result) {
    yoursCanvas.width = DRAW_SIZE;
    yoursCanvas.height = DRAW_SIZE;
    flagCanvas.width = DRAW_SIZE;
    flagCanvas.height = DRAW_SIZE;

    const yctx = yoursCanvas.getContext('2d');
    const fctx = flagCanvas.getContext('2d');

    yctx.fillStyle = '#ffffff';
    yctx.fillRect(0, 0, DRAW_SIZE, DRAW_SIZE);
    yctx.drawImage(drawCanvas, 0, 0);

    fctx.fillStyle = '#ffffff';
    fctx.fillRect(0, 0, DRAW_SIZE, DRAW_SIZE);
    fctx.drawImage(flagImage, 0, 0, DRAW_SIZE, DRAW_SIZE);

    countryNameResultEl.textContent = currentFlag.nombre;
    verdictEl.textContent = result.label;
    percentEl.textContent = result.displayed + '% match';

    showScreen('result');
  }

  // ---------- Compartir ----------

  async function buildSharePng() {
    const W = 900, H = 850;
    const share = document.createElement('canvas');
    share.width = W;
    share.height = H;
    const ctx = share.getContext('2d');

    // fondo
    ctx.fillStyle = '#f4f1ea';
    ctx.fillRect(0, 0, W, H);

    // tarjeta
    const pad = 50;
    const cardX = pad, cardY = pad, cardW = W - pad * 2, cardH = H - pad * 2;
    ctx.save();
    ctx.shadowColor = 'rgba(20,20,10,0.25)';
    ctx.shadowBlur = 50;
    ctx.shadowOffsetY = 20;
    ctx.fillStyle = '#ffffff';
    roundRect(ctx, cardX, cardY, cardW, cardH, 36);
    ctx.fill();
    ctx.restore();

    const innerPad = 60;
    const boxSize = (cardW - innerPad * 2 - 30) / 2;
    const boxY = cardY + 70;

    ctx.drawImage(yoursCanvas, cardX + innerPad, boxY, boxSize, boxSize);
    ctx.strokeStyle = '#ece8dd';
    ctx.lineWidth = 2;
    ctx.strokeRect(cardX + innerPad, boxY, boxSize, boxSize);

    const rightX = cardX + innerPad + boxSize + 30;
    ctx.drawImage(flagCanvas, rightX, boxY, boxSize, boxSize);
    ctx.strokeRect(rightX, boxY, boxSize, boxSize);

    ctx.fillStyle = '#33321f';
    ctx.font = '800 26px "Arial Narrow", Impact, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('TUYO', cardX + innerPad + boxSize / 2, boxY + boxSize + 40);
    ctx.fillText(currentFlag.nombre, rightX + boxSize / 2, boxY + boxSize + 40);

    const verdictY = boxY + boxSize + 140;
    ctx.fillStyle = '#16150f';
    ctx.font = '900 82px "Arial Narrow", Impact, Arial, sans-serif';
    ctx.save();
    ctx.translate(cardX + cardW / 2, verdictY);
    ctx.scale(0.86, 1);
    ctx.fillText(verdictEl.textContent, 0, 0);
    ctx.restore();

    ctx.fillStyle = '#6b6e1f';
    ctx.font = '800 44px "Arial Narrow", Impact, Arial, sans-serif';
    ctx.save();
    ctx.translate(cardX + cardW / 2, verdictY + 64);
    ctx.scale(0.9, 1);
    ctx.fillText(percentEl.textContent, 0, 0);
    ctx.restore();

    ctx.fillStyle = '#7a7761';
    ctx.font = '600 24px Arial, sans-serif';
    ctx.fillText('DIBUJA LA BANDERA', cardX + cardW / 2, cardY + cardH - 40);

    return new Promise(resolve => share.toBlob(resolve, 'image/png'));
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  async function shareResult() {
    const blob = await buildSharePng();
    const filename = 'dibuja-la-bandera-' + currentFlag.nombre.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.png';
    const file = new File([blob], filename, { type: 'image/png' });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: 'Dibuja la bandera', text: percentEl.textContent });
        return;
      } catch (err) {
        // el usuario canceló o falló el share nativo -> fallback a descarga
      }
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  }

  // ---------- Botones ----------

  document.getElementById('btnEmpezar').addEventListener('click', beginRound);
  document.getElementById('btnListo').addEventListener('click', finishDrawing);
  document.getElementById('btnOtro').addEventListener('click', beginRound);
  document.getElementById('btnCompartir').addEventListener('click', shareResult);
})();
