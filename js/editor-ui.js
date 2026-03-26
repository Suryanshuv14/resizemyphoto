/* ── Editor UI Logic ─────────────────────────────────── */

let srcImage   = null;
let srcFile    = null;
let currentCanvas = null;
let selectedFormat = 'jpeg';
let bgColor = '#ffffff';
let apiKey  = sessionStorage.getItem('resizemyphoto_apikey') || '';
let processedBlob = null;
let processTimeout = null;

const overlay = document.getElementById('processing-overlay');
const processingText = document.getElementById('processing-text');

// ── Load pending image from home page ──
window.addEventListener('DOMContentLoaded', () => {
  const pending = sessionStorage.getItem('resizemyphoto_pending_image');
  const pendingName = sessionStorage.getItem('resizemyphoto_pending_name') || 'photo.jpg';
  
  if (pending) {
    sessionStorage.removeItem('resizemyphoto_pending_image');
    sessionStorage.removeItem('resizemyphoto_pending_name');
    sessionStorage.removeItem('resizemyphoto_pending_size');
    
    fetch(pending).then(res => res.blob()).then(blob => {
      srcFile = new File([blob], pendingName, { type: blob.type });
      loadFromDataURL(pending, pendingName);
    });
  }
  initAccordion();
});

function loadFromDataURL(dataUrl, name) {
  const img = new Image();
  img.onload = () => {
    srcImage = img;
    showPreview();
    updateFileMeta(name, null);
  };
  img.src = dataUrl;
}

// ── Dropzones & Browse ──
document.getElementById('browse-files-btn').addEventListener('click', e => {
  e.stopPropagation();
  document.getElementById('center-file-input').click();
});

initDropzone(document.getElementById('center-dropzone'), document.getElementById('center-file-input'), files => handleFiles(files));

document.getElementById('btn-new-upload').addEventListener('click', () => {
  document.getElementById('center-file-input').click();
});

// Process Another
document.getElementById('btn-add-another').addEventListener('click', () => {
  sessionStorage.removeItem('resizemyphoto_pending_image');
  sessionStorage.removeItem('resizemyphoto_pending_name');
  window.location.href = 'index.html';
});

function handleFiles(files) {
  if (!files.length) return;
  const file = files[0];
  srcFile = file;
  loadImageFromFile(file).then(img => {
    srcImage = img;
    showPreview();
    updateFileMeta(file.name, file.size);
    showToast('Image loaded successfully!', 'success');
  }).catch(() => showToast('Failed to load image', 'error'));
}

function showPreview() {
  document.getElementById('empty-state').style.display = 'none';
  document.getElementById('add-another-wrap').style.display = 'block';
  document.getElementById('preview-wrap').style.display = 'flex';
  document.getElementById('compliance-wrap').style.display = 'block';
  document.getElementById('btn-process').disabled = false;
  document.getElementById('btn-process-side').disabled = false;
  document.getElementById('btn-remove-bg').disabled = false;
  document.getElementById('btn-remove-bg-side').disabled = false;
  queueRender();
}

// ── Debounced Render ──
function queueRender() {
  if (!srcImage) return;
  if (processTimeout) clearTimeout(processTimeout);
  processTimeout = setTimeout(renderPreview, 300);
}

// Sliders
const sliders = [
  { id: 'sl-brightness', val: 'val-brightness' },
  { id: 'sl-contrast',   val: 'val-contrast' },
  { id: 'sl-saturation', val: 'val-saturation' },
  { id: 'sl-sharpness',  val: 'val-sharpness' },
  { id: 'sl-quality',    val: 'val-quality' }
];

sliders.forEach(({ id, val }) => {
  const sl = document.getElementById(id);
  const lbl = document.getElementById(val);
  if (sl && lbl) {
    sl.addEventListener('input', () => {
      lbl.textContent = sl.value;
      queueRender();
    });
  }
});

document.getElementById('btn-reset-adj').addEventListener('click', () => {
  document.getElementById('sl-brightness').value = 100;
  document.getElementById('sl-contrast').value   = 100;
  document.getElementById('sl-saturation').value = 100;
  document.getElementById('sl-sharpness').value  = 0;
  
  sliders.forEach(({ id, val }) => {
    if (id !== 'sl-quality') document.getElementById(val).textContent = (id==='sl-sharpness') ? 0 : 100;
  });
  queueRender();
});

['target-kb', 'min-kb', 'out-width', 'out-height'].forEach(id => {
  document.getElementById(id)?.addEventListener('input', () => {
    updateExportInfo();
    queueRender();
  });
});

// Format toggle
document.querySelectorAll('.format-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.format-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedFormat = btn.dataset.fmt;
    document.getElementById('info-format').textContent = selectedFormat === 'png' ? 'PNG' : 'JPG';
    updateExportInfo();
    queueRender();
  });
});

// Swatches
document.querySelectorAll('.swatch').forEach(sw => {
  sw.addEventListener('click', () => {
    document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
    sw.classList.add('active');
    bgColor = sw.dataset.color;
    queueRender();
  });
});

document.getElementById('custom-bg-color').addEventListener('input', e => {
  bgColor = e.target.value;
  document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
  queueRender();
});

// Preset Dropdown
document.getElementById('preset-select').addEventListener('change', e => {
  const examId = e.target.value;
  const p = EXAM_PRESETS[examId];
  const notesEl = document.getElementById('preset-info');
  
  if (!p) {
    notesEl.classList.remove('visible');
    queueRender();
    return;
  }
  
  document.getElementById('out-width').value  = p.width;
  document.getElementById('out-height').value = p.height;
  document.getElementById('target-kb').value  = p.targetKB;
  document.getElementById('min-kb').value     = p.minKB;
  document.getElementById('sl-quality').value = 80;
  document.getElementById('val-quality').textContent = 80;

  selectedFormat = p.format === 'image/png' ? 'png' : 'jpeg';
  document.querySelectorAll('.format-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`[data-fmt="${selectedFormat}"]`)?.classList.add('active');

  bgColor = p.background;
  document.querySelectorAll('.swatch').forEach(s => {
    s.classList.toggle('active', s.dataset.color === p.background);
  });
  
  notesEl.textContent = p.notes;
  notesEl.classList.add('visible');
  
  updateExportInfo();
  queueRender();
});

function updateExportInfo() {
  const examId = document.getElementById('preset-select').value;
  document.getElementById('ei-preset').textContent  = examId ? examId : 'Custom';
  const w = document.getElementById('out-width').value;
  const h = document.getElementById('out-height').value;
  document.getElementById('ei-size').textContent    = (w && h) ? `${w}×${h} px` : 'Original';
  document.getElementById('ei-format').textContent  = selectedFormat === 'png' ? 'PNG' : 'JPG';
  document.getElementById('ei-kb').textContent      = document.getElementById('target-kb').value + ' KB';
}

function updateFileMeta(name, size) {
  let text = name;
  if (size) text += ` · ${formatBytes(size)}`;
  document.getElementById('file-meta').textContent = text;
}

// ── Core Render & Compression ──
async function renderPreview() {
  if (!srcImage || !srcFile) return;

  const w = +document.getElementById('out-width').value  || srcImage.naturalWidth;
  const h = +document.getElementById('out-height').value || srcImage.naturalHeight;
  document.getElementById('info-dims').textContent = `${w}×${h} px`;
  document.getElementById('info-format').textContent = selectedFormat === 'png' ? 'PNG' : 'JPG';

  const brightness = +document.getElementById('sl-brightness').value;
  const contrast   = +document.getElementById('sl-contrast').value;
  const saturation = +document.getElementById('sl-saturation').value;
  const sharpness  = +document.getElementById('sl-sharpness').value;
  const bg = bgColor === 'transparent' ? null : bgColor;

  currentCanvas = buildCanvas(srcImage, { width: w, height: h, brightness, contrast, saturation, sharpness, bgColor: bg });
  
  const displayCanvas = document.getElementById('preview-canvas');
  const maxW = displayCanvas.parentElement.clientWidth - 40;
  const scale = Math.min(1, maxW / w, 460 / h);
  displayCanvas.width  = w * scale;
  displayCanvas.height = h * scale;
  const ctx = displayCanvas.getContext('2d');
  ctx.drawImage(currentCanvas, 0, 0, displayCanvas.width, displayCanvas.height);

  overlay.classList.add('active');
  processingText.textContent = 'Processing…';

  try {
    const targetKB = +document.getElementById('target-kb').value || 50;
    const minKB    = +document.getElementById('min-kb').value || 0;
    const quality  = +document.getElementById('sl-quality').value / 100;
    
    let formatType = selectedFormat === 'png' ? 'image/png' : 'image/jpeg';
    
    // browser-image-compression needs a File. Extract the canvas to a blob briefly.
    const rawBlob = await canvasToBlob(currentCanvas, formatType, 1.0);
    const fileToCompress = new File([rawBlob], srcFile.name, { type: formatType });

    if (window.imageCompression) {
      const options = {
        maxSizeMB: targetKB / 1024,
        maxWidthOrHeight: Math.max(w, h),
        useWebWorker: true,
        fileType: formatType,
        initialQuality: quality
      };
      processedBlob = await window.imageCompression(fileToCompress, options);
    } else {
      // Fallback
      processedBlob = await compressToTargetKB(currentCanvas, selectedFormat, targetKB, minKB);
    }

    const sizeKB = processedBlob.size / 1024;
    document.getElementById('info-size').textContent = sizeKB.toFixed(1) + ' KB (compressed)';
    
    const badge = document.getElementById('compliance-badge');
    if (sizeKB <= targetKB && sizeKB >= minKB) {
      badge.className = 'result-badge within';
      badge.innerHTML = `✓ Within spec (${sizeKB.toFixed(1)} KB)`;
    } else if (sizeKB > targetKB) {
      badge.className = 'result-badge over';
      badge.innerHTML = `✗ Too large (${sizeKB.toFixed(1)} KB) — reduce quality`;
    } else {
      badge.className = 'result-badge under';
      badge.innerHTML = `⚠ Below minimum (${sizeKB.toFixed(1)} KB) — increase quality`;
    }

  } catch (err) {
    showToast('Could not compress. Try a different image', 'error');
    console.error(err);
  } finally {
    overlay.classList.remove('active');
  }
}

// Download
function downloadFinal() {
  if (!processedBlob) return;
  const ext = selectedFormat === 'png' ? 'png' : 'jpg';
  const baseName = (srcFile?.name || 'pixprep-photo').replace(/\.[^.]+$/, '');
  
  if (window.saveAs) {
    window.saveAs(processedBlob, `${baseName}_pixprep.${ext}`);
  } else {
    downloadBlob(processedBlob, `${baseName}_pixprep.${ext}`);
  }
  showToast(`✓ Downloaded! ${(processedBlob.size/1024).toFixed(1)} KB`, 'success', 4000);
}
document.getElementById('btn-process').addEventListener('click', downloadFinal);
document.getElementById('btn-process-side').addEventListener('click', downloadFinal);

// Remove BG
function startRemoveBg() {
  if (!srcImage) return;
  if (apiKey) doRemoveBg(apiKey);
  else document.getElementById('apikey-modal').classList.add('open');
}
document.getElementById('btn-remove-bg').addEventListener('click', startRemoveBg);
document.getElementById('btn-remove-bg-side').addEventListener('click', startRemoveBg);
document.getElementById('apikey-close').addEventListener('click', () => document.getElementById('apikey-modal').classList.remove('open'));
document.getElementById('apikey-cancel').addEventListener('click', () => document.getElementById('apikey-modal').classList.remove('open'));
document.getElementById('apikey-confirm').addEventListener('click', () => {
  const key = document.getElementById('apikey-input').value.trim();
  if (!key) { showToast('Please enter an API key', 'error'); return; }
  apiKey = key;
  sessionStorage.setItem('resizemyphoto_apikey', key);
  document.getElementById('apikey-modal').classList.remove('open');
  doRemoveBg(key);
});

async function doRemoveBg(key) {
  overlay.classList.add('active');
  processingText.textContent = 'Removing background…';
  try {
    const blob = await canvasToBlob(currentCanvas || buildCanvas(srcImage, {}), 'image/jpeg', 0.92);
    const resultBlob = await removeBackground(blob, key);
    const img = new Image();
    img.onload = () => {
      srcImage = img;
      queueRender();
      showToast('Background removed! ✓', 'success');
    };
    img.src = URL.createObjectURL(resultBlob);
  } catch (e) {
    showToast('Remove.bg error: ' + e.message, 'error');
  } finally {
    overlay.classList.remove('active');
  }
}

// Reset All
document.getElementById('btn-reset-all').addEventListener('click', () => {
  document.getElementById('preset-select').value = '';
  selectedFormat = 'jpeg';
  bgColor = '#ffffff';
  document.getElementById('preset-info').classList.remove('visible');
  document.querySelectorAll('.format-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('fmt-jpg').classList.add('active');
  document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
  document.querySelector('[data-color="#ffffff"]').classList.add('active');
  
  document.getElementById('sl-brightness').value = 100;
  document.getElementById('sl-contrast').value   = 100;
  document.getElementById('sl-saturation').value = 100;
  document.getElementById('sl-sharpness').value  = 0;
  document.getElementById('sl-quality').value    = 80;
  
  sliders.forEach(({ id, val }) => {
    const lbl = document.getElementById(val);
    if(lbl) lbl.textContent = (id === 'sl-sharpness') ? 0 : (id === 'sl-quality') ? 80 : 100;
  });
  
  ['out-width','out-height','min-kb'].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.value = '';
  });
  document.getElementById('target-kb').value = 50;
  
  updateExportInfo();
  queueRender();
  showToast('Settings reset — image kept', 'success');
});
