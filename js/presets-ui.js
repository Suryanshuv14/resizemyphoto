/* ── ICONS ── */
const ICONS = {
  jee: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
  neet: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
  cat: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
  ssc: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>',
  railway: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 16v-6"/><path d="M15 16v-6"/><path d="M8 21h8"/></svg>',

  photo: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
  signature: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
  thumb: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2h-5a1 1 0 0 0-1 1v9.5L5 11l-2 2 5 5V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-3l2-5V4a2 2 0 0 0-2-2h-2"/></svg>',
  cert: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
  id: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2" ry="2"/><circle cx="8" cy="10" r="2"/><line x1="14" y1="8" x2="19" y2="8"/><line x1="14" y1="12" x2="19" y2="12"/><line x1="14" y1="16" x2="19" y2="16"/><line x1="5" y1="16" x2="11" y2="16"/></svg>'
};

/* ── EXAM META ── */
const EXAM_META = {
  jee: {
    icon: ICONS.jee, title: 'JEE Main / Advanced', badge: 'NTA Portal',
    desc: 'Joint Entrance Examination conducted by NTA. White background, formal attire mandatory. Photo must be recent (within 6 months).',
    docs: [
      { id: 'photo',     label: 'Passport Photo',    icon: ICONS.photo, spec: 'photo' },
      { id: 'signature', label: 'Signature',          icon: ICONS.signature, spec: 'signature' },
      { id: 'thumb',     label: 'Left Thumb Impression', icon: ICONS.thumb, spec: null, note: 'Photograph the thumb on white paper' },
      { id: 'cert',      label: 'Category Certificate',  icon: ICONS.cert, spec: null, note: 'Scan at 200 DPI, PDF preferred' },
    ],
    specs: [
      { label: 'Photo Size', value: '200×240 px' },
      { label: 'Photo File', value: '10–200 KB' },
      { label: 'Signature',  value: '200×80 px'  },
      { label: 'Sign File',  value: '1–30 KB'    },
      { label: 'Format',     value: 'JPG'        },
      { label: 'Background', value: 'White'      },
    ],
  },
  neet: {
    icon: ICONS.neet, title: 'NEET UG', badge: 'NTA Portal',
    desc: 'National Eligibility cum Entrance Test. Passport-size photo with light blue or white background, formal attire.',
    docs: [
      { id: 'photo',     label: 'Passport Photo', icon: ICONS.photo, spec: 'photo' },
      { id: 'signature', label: 'Signature',       icon: ICONS.signature, spec: 'signature' },
      { id: 'thumb',     label: 'Left Thumb Impression', icon: ICONS.thumb, spec: null, note: 'Photograph on white paper' },
    ],
    specs: [
      { label: 'Photo Size', value: '200×240 px' },
      { label: 'Photo File', value: '10–100 KB' },
      { label: 'Signature',  value: '200×80 px'  },
      { label: 'Sign File',  value: '1–30 KB'    },
      { label: 'Format',     value: 'JPG'        },
      { label: 'Background', value: 'White/Blue' },
    ],
  },
  cat: {
    icon: ICONS.cat, title: 'CAT', badge: 'IIM Portal',
    desc: 'Common Admission Test for IIM admission. Light background, formal attire. Signature must be on white paper.',
    docs: [
      { id: 'photo',     label: 'Passport Photo', icon: ICONS.photo, spec: 'photo' },
      { id: 'signature', label: 'Signature',       icon: ICONS.signature, spec: 'signature' },
      { id: 'marksheet', label: 'Marksheet / Degree', icon: ICONS.cert, spec: null, note: 'Scan at 150+ DPI, PDF or JPG' },
    ],
    specs: [
      { label: 'Photo Size', value: '120×150 px' },
      { label: 'Photo File', value: '20–100 KB' },
      { label: 'Signature',  value: '280×80 px'  },
      { label: 'Sign File',  value: '20–50 KB'   },
      { label: 'Format',     value: 'JPG'        },
      { label: 'Background', value: 'White'      },
    ],
  },
  ssc: {
    icon: ICONS.ssc, title: 'SSC CGL / CHSL', badge: 'SSC Portal',
    desc: 'Staff Selection Commission. Recent passport photo with white background. Signature on white/cream paper.',
    docs: [
      { id: 'photo',     label: 'Passport Photo', icon: ICONS.photo, spec: 'photo' },
      { id: 'signature', label: 'Signature',       icon: ICONS.signature, spec: 'signature' },
      { id: 'cert',      label: 'Category Certificate', icon: ICONS.cert, spec: null, note: 'OBC/SC/ST/EWS certificate scan' },
    ],
    specs: [
      { label: 'Photo Size', value: '100×120 px' },
      { label: 'Photo File', value: '20–50 KB'  },
      { label: 'Signature',  value: '140×60 px'  },
      { label: 'Sign File',  value: '10–20 KB'   },
      { label: 'Format',     value: 'JPG'        },
      { label: 'Background', value: 'White'      },
    ],
  },
  railway: {
    icon: ICONS.railway, title: 'Railway RRB / NTPC', badge: 'RRB Portal',
    desc: 'Railway Recruitment Board. Clear passport-size photo on white background. Signature in blue or black ink.',
    docs: [
      { id: 'photo',     label: 'Passport Photo', icon: ICONS.photo, spec: 'photo' },
      { id: 'signature', label: 'Signature',       icon: ICONS.signature, spec: 'signature' },
      { id: 'id',        label: 'Photo ID Proof',  icon: ICONS.id, spec: null, note: 'Aadhaar / PAN scan both sides' },
    ],
    specs: [
      { label: 'Photo Size', value: '100×120 px' },
      { label: 'Photo File', value: '20–100 KB' },
      { label: 'Signature',  value: '140×60 px'  },
      { label: 'Sign File',  value: '10–20 KB'   },
      { label: 'Format',     value: 'JPG'        },
      { label: 'Background', value: 'White'      },
    ],
  },
};

let currentExam = null;
const docState  = {};  // docId → { blob, name, processed }

window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const exam   = params.get('exam');
  if (exam && EXAM_META[exam]) selectExam(exam);
});

document.querySelectorAll('[data-exam]').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('[data-exam]').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    selectExam(chip.dataset.exam);
  });
});

function selectExam(examId) {
  currentExam = examId;
  const meta  = EXAM_META[examId];
  document.querySelectorAll('[data-exam]').forEach(c => {
    c.classList.toggle('active', c.dataset.exam === examId);
  });

  document.getElementById('empty-exam-state').style.display = 'none';
  document.getElementById('exam-content').style.display = 'block';

  document.getElementById('exam-icon').innerHTML = meta.icon;
  document.getElementById('exam-title').textContent = meta.title;
  document.getElementById('exam-badge').textContent = meta.badge;
  document.getElementById('exam-desc').textContent  = meta.desc;

  const grid = document.getElementById('exam-specs-grid');
  grid.innerHTML = meta.specs.map(s => `
    <div class="exam-spec-item">
      <div class="exam-spec-value">${s.value}</div>
      <div class="exam-spec-label">${s.label}</div>
    </div>
  `).join('');

  const steps = document.getElementById('gauge-steps');
  steps.innerHTML = meta.docs.map(d => `<div class="gauge-step" data-gauge-doc="${d.id}">${d.label.split(' ')[0]}</div>`).join('');

  renderDocRows(meta.docs, examId);
  updateGauge();
}

function renderDocRows(docs, examId) {
  const container = document.getElementById('doc-rows');
  container.innerHTML = '';
  docs.forEach(doc => {
    if (!docState[`${examId}_${doc.id}`]) {
      docState[`${examId}_${doc.id}`] = { blob: null, name: null, processed: false };
    }
    const row = document.createElement('div');
    row.className = 'doc-row animate-fade';
    row.id = `doc-row-${doc.id}`;

    const preset = doc.spec ? EXAM_PRESETS[examId]?.[doc.spec] : null;
    const specText = preset
      ? `${preset.w}×${preset.h} px · ${preset.minKB}–${preset.maxKB} KB · ${preset.format.toUpperCase()}`
      : (doc.note || 'Scan clearly · PDF or JPG');

    row.innerHTML = `
      <div class="doc-icon">${doc.icon}</div>
      <img class="doc-thumb" id="thumb-${doc.id}" alt="${doc.label} preview" />
      <div class="doc-info">
        <div class="doc-name">${doc.label}</div>
        <div class="doc-spec">${specText}</div>
      </div>
      <div class="doc-actions">
        <div class="doc-processing" id="proc-${doc.id}">
          <div class="spinner" style="border-color:rgba(160,65,0,0.3);border-top-color:var(--primary)"></div>
          <span>Processing…</span>
        </div>
        <span class="badge badge-pending" id="badge-${doc.id}">Pending</span>
        ${preset ? `<button class="btn btn-outline btn-sm" id="process-btn-${doc.id}" data-doc="${doc.id}" data-exam="${examId}" disabled>Process</button>` : ''}
        <button class="btn btn-secondary btn-sm" id="upload-btn-${doc.id}" data-doc="${doc.id}">Upload</button>
        <input type="file" id="input-${doc.id}" class="dropzone-input" accept="image/jpeg,image/png,image/webp,image/heic,image/jpg" />
      </div>
    `;
    container.appendChild(row);

    const uploadBtn = row.querySelector(`#upload-btn-${doc.id}`);
    const input     = row.querySelector(`#input-${doc.id}`);
    uploadBtn.addEventListener('click', () => input.click());
    input.addEventListener('change', () => {
      const file = input.files[0];
      if (file) handleDocUpload(examId, doc, file);
      input.value = '';
    });

    if (preset) {
      const processBtn = row.querySelector(`#process-btn-${doc.id}`);
      processBtn.addEventListener('click', () => processDoc(examId, doc));
    }
  });
}

async function handleDocUpload(examId, doc, file) {
  const key = `${examId}_${doc.id}`;
  docState[key] = { blob: await file.arrayBuffer().then(ab => new Blob([ab], { type: file.type })), name: file.name, processed: false };
  
  const thumb = document.getElementById(`thumb-${doc.id}`);
  thumb.src = URL.createObjectURL(file);
  thumb.style.display = 'block';

  setBadge(doc.id, 'warning', 'Uploaded');
  const processBtn = document.getElementById(`process-btn-${doc.id}`);
  if (processBtn) processBtn.disabled = false;

  updateGauge();
  showToast(`${doc.label} uploaded`, 'success');

  if (!doc.spec) {
    docState[key].processed = true;
    docState[key].blob = new Blob([await docState[key].blob.arrayBuffer()], { type: file.type });
    setBadge(doc.id, 'success', 'Ready');
    updateGauge();
  } else {
    // Auto-process automatically as per feature requirement
    processDoc(examId, doc);
  }
}

async function processDoc(examId, doc) {
  const key  = `${examId}_${doc.id}`;
  const state = docState[key];
  if (!state?.blob) { showToast('Upload the document first', 'error'); return; }

  const procEl = document.getElementById(`proc-${doc.id}`);
  procEl.classList.add('active');
  setBadge(doc.id, 'pending', 'Processing…');

  try {
    const preset = EXAM_PRESETS[examId][doc.spec];
    const img    = await loadImageFromFile(state.blob instanceof Blob
      ? new File([state.blob], state.name || 'doc.jpg')
      : new File([state.blob], 'doc.jpg'));

    const canvas = buildCanvas(img, {
      width: preset.w, height: preset.h,
      brightness: 100, contrast: 100, saturation: 100, sharpness: 0,
      bgColor: preset.bg,
    });
    
    let blob;
    if (window.imageCompression) {
        const formatType = preset.format === 'png' ? 'image/png' : 'image/jpeg';
        const rawBlob = await canvasToBlob(canvas, formatType, 1.0);
        const fileToCompress = new File([rawBlob], state.name || 'doc.jpg', { type: formatType });
        
        blob = await window.imageCompression(fileToCompress, {
          maxSizeMB: preset.maxKB / 1024,
          maxWidthOrHeight: Math.max(preset.w, preset.h),
          useWebWorker: true,
          fileType: formatType
        });
    } else {
        blob = await compressToTargetKB(canvas, preset.format, preset.maxKB, preset.minKB);
    }

    docState[key].blob      = blob;
    docState[key].processed = true;

    const thumb = document.getElementById(`thumb-${doc.id}`);
    thumb.src = URL.createObjectURL(blob);

    setBadge(doc.id, 'success', 'Compliant ✓');
    const sizeKB = (blob.size / 1024).toFixed(1);
    showToast(`${doc.label} processed! ${sizeKB} KB`, 'success');
    updateGauge();
  } catch (e) {
    setBadge(doc.id, 'error', 'Error');
    showToast('Processing failed: ' + e.message, 'error');
  } finally {
    procEl.classList.remove('active');
  }
}

function setBadge(docId, type, text) {
  const badge = document.getElementById(`badge-${docId}`);
  badge.className = `badge badge-${type}`;
  badge.textContent = text;
}

function updateGauge() {
  if (!currentExam) return;
  const meta     = EXAM_META[currentExam];
  const total    = meta.docs.length;
  const done     = meta.docs.filter(d => {
    const state = docState[`${currentExam}_${d.id}`];
    return state?.blob;
  }).length;
  const compliant = meta.docs.filter(d => docState[`${currentExam}_${d.id}`]?.processed).length;
  const pct      = Math.round((compliant / total) * 100);

  document.getElementById('gauge-fill').style.width = pct + '%';
  document.getElementById('gauge-badge').textContent = pct + '%';
  document.getElementById('gauge-subtitle').textContent = `${compliant} of ${total} documents ready`;

  meta.docs.forEach(d => {
    const stepEl = document.querySelector(`[data-gauge-doc="${d.id}"]`);
    if (!stepEl) return;
    const state = docState[`${currentExam}_${d.id}`];
    stepEl.className = 'gauge-step' + (state?.processed ? ' completed' : state?.blob ? ' active' : '');
  });

  const zipBtn = document.getElementById('btn-batch-download');
  const zipStatus = document.getElementById('zip-status');
  if (done > 0) {
    zipBtn.disabled = false;
    zipStatus.textContent = `${done} document${done > 1 ? 's' : ''} ready for download. ${compliant} compliant.`;
  } else {
    zipBtn.disabled = true;
    zipStatus.textContent = 'Upload and process at least one document to enable download.';
  }
}

document.getElementById('btn-batch-download').addEventListener('click', async () => {
  if (!currentExam) return;
  const meta = EXAM_META[currentExam];
  const zip  = new JSZip();
  let count  = 0;

  for (const doc of meta.docs) {
    const state = docState[`${currentExam}_${doc.id}`];
    if (!state?.blob) continue;
    const ext  = state.blob.type?.includes('png') ? 'png' : 'jpg';
    const name = `${doc.id}.${ext}`;
    zip.file(name, state.blob);
    count++;
  }

  if (!count) { showToast('No documents to download', 'error'); return; }

  showToast('Building ZIP…', 'info');
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const fname   = `Resize My Photo_${EXAM_META[currentExam].title.replace(/\\s/g,'_')}_docs.zip`;

  if (window.saveAs) {
      window.saveAs(zipBlob, fname);
  } else {
      const a = document.createElement('a');
      a.href  = URL.createObjectURL(zipBlob);
      a.download = fname;
      a.click();
      URL.revokeObjectURL(a.href);
  }
  showToast(`✓ ZIP downloaded! ${count} document${count > 1 ? 's' : ''}.`, 'success', 4000);
});
