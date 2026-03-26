/* ============================================================
   Resize My Photo — Image Editor Engine
   Compression, format conversion, adjustments, BG removal
   ============================================================ */

'use strict';

/* ── Exam Presets (Full spec table) ──────────────────────── */
const EXAM_PRESETS = {
  'JEE Main / Advanced': {
    format: 'image/jpeg', minKB: 10, maxKB: 200, targetKB: 100,
    width: 413, height: 531, background: '#ffffff',
    notes: 'White/light background, face must be 80% visible',
  },
  'NEET UG — Passport Photo': {
    format: 'image/jpeg', minKB: 10, maxKB: 200, targetKB: 100,
    width: 413, height: 531, background: '#ffffff',
    notes: 'White background, name & date on photo required',
  },
  'NEET UG — Signature': {
    format: 'image/jpeg', minKB: 4, maxKB: 30, targetKB: 20,
    width: 207, height: 77, background: '#ffffff',
    notes: 'Black ink on white paper',
  },
  'CAT (IIM)': {
    format: 'image/jpeg', minKB: 10, maxKB: 80, targetKB: 50,
    width: 413, height: 531, background: '#ffffff',
    notes: 'JPG under 80KB, light background',
  },
  'SSC CGL / CHSL': {
    format: 'image/jpeg', minKB: 20, maxKB: 50, targetKB: 35,
    width: 413, height: 531, background: '#ffffff',
    notes: 'White background, name & date printed on photo',
  },
  'SSC — Signature': {
    format: 'image/jpeg', minKB: 10, maxKB: 20, targetKB: 15,
    width: 236, height: 79, background: '#ffffff',
    notes: 'Black ink, white paper, NOT in capitals',
  },
  'UPSC CSE (IAS/IPS)': {
    format: 'image/jpeg', minKB: 20, maxKB: 300, targetKB: 150,
    width: 350, height: 350, background: '#ffffff',
    notes: 'Square photo, face covers 75% of frame, both ears visible',
  },
  'IBPS PO / Clerk / SO': {
    format: 'image/jpeg', minKB: 20, maxKB: 50, targetKB: 35,
    width: 200, height: 230, background: '#ffffff',
    notes: 'Light/white background, no selfies',
  },
  'RRB NTPC / Group D': {
    format: 'image/jpeg', minKB: 20, maxKB: 50, targetKB: 35,
    width: 200, height: 230, background: '#ffffff',
    notes: 'White background mandatory, date on photo required',
  },
  'GATE': {
    format: 'image/jpeg', minKB: 5, maxKB: 200, targetKB: 100,
    width: 480, height: 640, background: '#ffffff',
    notes: 'White background, face clearly visible',
  },
  'CUET (UG/PG)': {
    format: 'image/jpeg', minKB: 10, maxKB: 200, targetKB: 80,
    width: 413, height: 531, background: '#ffffff',
    notes: 'JPG format, white background, recent photo',
  },
};

window.EXAM_PRESETS = EXAM_PRESETS;

/* ── Legacy short-key presets (used by presets.html) ──────── */
const EXAM_PRESETS_LEGACY = {
  jee: {
    label: 'JEE',
    photo:      { w: 413, h: 531, minKB: 10, maxKB: 200, format: 'jpeg', bg: '#ffffff' },
    signature:  { w: 207, h: 77,  minKB: 4,  maxKB: 30,  format: 'jpeg', bg: '#ffffff' },
    info: 'JEE Advanced / Main — NTA portal. White background mandatory.',
  },
  neet: {
    label: 'NEET',
    photo:      { w: 413, h: 531, minKB: 10, maxKB: 200, format: 'jpeg', bg: '#ffffff' },
    signature:  { w: 207, h: 77,  minKB: 4,  maxKB: 30,  format: 'jpeg', bg: '#ffffff' },
    info: 'NEET UG — NTA portal. White background, name & date on photo.',
  },
  cat: {
    label: 'CAT',
    photo:      { w: 413, h: 531, minKB: 10, maxKB: 80,  format: 'jpeg', bg: '#ffffff' },
    signature:  { w: 236, h: 79,  minKB: 10, maxKB: 20,  format: 'jpeg', bg: '#ffffff' },
    info: 'CAT — IIM portal. JPG under 80KB, light background.',
  },
  ssc: {
    label: 'SSC',
    photo:      { w: 413, h: 531, minKB: 20, maxKB: 50,  format: 'jpeg', bg: '#ffffff' },
    signature:  { w: 236, h: 79,  minKB: 10, maxKB: 20,  format: 'jpeg', bg: '#ffffff' },
    info: 'SSC CGL/CHSL — White background, name & date printed on photo.',
  },
  railway: {
    label: 'Railway',
    photo:      { w: 200, h: 230, minKB: 20, maxKB: 50,  format: 'jpeg', bg: '#ffffff' },
    signature:  { w: 236, h: 79,  minKB: 10, maxKB: 20,  format: 'jpeg', bg: '#ffffff' },
    info: 'RRB — White background. Recent clear passport photo.',
  },
};
window.EXAM_PRESETS_LEGACY = EXAM_PRESETS_LEGACY;

/* ── Load image from File → HTMLImageElement ─────────────── */
function loadImageFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
window.loadImageFromFile = loadImageFromFile;

/* ── Build adjusted canvas (brightness/contrast/sat/sharp) ── */
function buildCanvas(img, opts = {}) {
  const {
    width      = img.naturalWidth,
    height     = img.naturalHeight,
    brightness = 100,
    contrast   = 100,
    saturation = 100,
    sharpness  = 0,
    bgColor    = null,
  } = opts;

  const canvas = document.createElement('canvas');
  canvas.width  = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  if (bgColor) {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);
  }

  ctx.filter = [
    `brightness(${brightness}%)`,
    `contrast(${contrast}%)`,
    `saturate(${saturation}%)`,
  ].join(' ');

  ctx.drawImage(img, 0, 0, width, height);
  ctx.filter = 'none';

  if (sharpness > 0) {
    applySharpness(ctx, width, height, sharpness / 100);
  }

  return canvas;
}
window.buildCanvas = buildCanvas;

/* ── Sharpness via unsharp mask ──────────────────────────── */
function applySharpness(ctx, w, h, amount) {
  const imageData = ctx.getImageData(0, 0, w, h);
  const d = imageData.data;
  const copy = new Uint8ClampedArray(d);
  const kernel = [
     0, -amount,          0,
    -amount, 1 + 4 * amount, -amount,
     0, -amount,          0,
  ];
  const kSize = 3;
  const half = Math.floor(kSize / 2);
  for (let y = half; y < h - half; y++) {
    for (let x = half; x < w - half; x++) {
      let r = 0, g = 0, b = 0;
      for (let ky = 0; ky < kSize; ky++) {
        for (let kx = 0; kx < kSize; kx++) {
          const px = ((y + ky - half) * w + (x + kx - half)) * 4;
          const kv = kernel[ky * kSize + kx];
          r += copy[px]     * kv;
          g += copy[px + 1] * kv;
          b += copy[px + 2] * kv;
        }
      }
      const idx = (y * w + x) * 4;
      d[idx]     = Math.max(0, Math.min(255, r));
      d[idx + 1] = Math.max(0, Math.min(255, g));
      d[idx + 2] = Math.max(0, Math.min(255, b));
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

/* ── Compress canvas to target KB (binary search on quality) ─ */
async function compressToTargetKB(canvas, format, targetKB, minKB) {
  const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
  if (mimeType === 'image/png') {
    return canvasToBlob(canvas, 'image/png');
  }
  const targetBytes = targetKB * 1024;
  const minBytes    = (minKB || 0) * 1024;
  let lo = 0.01, hi = 0.99, best = null;
  for (let i = 0; i < 30; i++) {
    const mid  = (lo + hi) / 2;
    const blob = await canvasToBlob(canvas, 'image/jpeg', mid);
    if (blob.size <= targetBytes && blob.size >= minBytes) {
      best = blob;
      lo = mid;
    } else if (blob.size > targetBytes) {
      hi = mid;
      best = best || blob;
    } else {
      lo = mid;
      best = blob;
    }
    if (hi - lo < 0.005) break;
  }
  if (!best || best.size > targetBytes) {
    best = await canvasToBlob(canvas, 'image/jpeg', Math.max(0.01, lo));
  }
  return best;
}
window.compressToTargetKB = compressToTargetKB;

/* ── Canvas → Blob (Promise) ─────────────────────────────── */
function canvasToBlob(canvas, mimeType, quality) {
  return new Promise(resolve => {
    if (quality !== undefined) {
      canvas.toBlob(resolve, mimeType, quality);
    } else {
      canvas.toBlob(resolve, mimeType);
    }
  });
}
window.canvasToBlob = canvasToBlob;

/* ── Trigger browser download ────────────────────────────── */
function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a   = document.createElement('a');
  a.href     = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
window.downloadBlob = downloadBlob;

/* ── Background Removal via Remove.bg API ────────────────── */
async function removeBackground(imageBlob, apiKey) {
  const formData = new FormData();
  formData.append('image_file', imageBlob, 'photo.jpg');
  formData.append('size', 'auto');
  const resp = await fetch('https://api.remove.bg/v1.0/removebg', {
    method: 'POST',
    headers: { 'X-Api-Key': apiKey },
    body: formData,
  });
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err?.errors?.[0]?.title || `Remove.bg error ${resp.status}`);
  }
  return await resp.blob();
}
window.removeBackground = removeBackground;

/* ── Apply solid background to transparent PNG ───────────── */
async function applyBgColor(imageBlob, colorHex) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width  = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = colorHex;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(resolve, 'image/jpeg', 0.92);
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(imageBlob);
  });
}
window.applyBgColor = applyBgColor;

/* ── Resize image to exact pixel dimensions ──────────────── */
function resizeCanvas(srcCanvas, targetW, targetH) {
  const canvas = document.createElement('canvas');
  canvas.width  = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(srcCanvas, 0, 0, targetW, targetH);
  return canvas;
}
window.resizeCanvas = resizeCanvas;
