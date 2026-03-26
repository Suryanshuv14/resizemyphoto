/* ============================================================
   Resize My Photo — Shared App Utilities
   Navigation, Toast, Drag helpers, Dark Mode, shared state
   ============================================================ */

'use strict';

// ── Dark Mode (init before DOM to avoid flash) ───────────────
(function () {
  const saved = localStorage.getItem('resizemyphoto-theme');
  if (saved === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
})();

// ── Nav active link ──────────────────────────────────────────
(function () {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && (href === current || (current === '' && href === 'index.html'))) {
      a.classList.add('active');
    }
  });

  // Hamburger menu
  const ham = document.getElementById('hamburger');
  const nav = document.getElementById('navbar-nav');
  if (ham && nav) {
    ham.addEventListener('click', () => {
      nav.classList.toggle('open');
      ham.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        ham.classList.remove('open');
      });
    });
    document.addEventListener('click', e => {
      if (!ham.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('open');
        ham.classList.remove('open');
      }
    });
  }

  // Dark mode toggle button
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    const updateIcon = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      themeBtn.title = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
      const moon = themeBtn.querySelector('.icon-moon');
      const sun = themeBtn.querySelector('.icon-sun');
      if (moon && sun) {
        moon.style.display = isDark ? 'none' : 'block';
        sun.style.display = isDark ? 'block' : 'none';
      }
    };
    updateIcon();
    themeBtn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('resizemyphoto-theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('resizemyphoto-theme', 'dark');
      }
      updateIcon();
    });
  }
})();

// ── Toast ────────────────────────────────────────────────────
window.showToast = function (message, type = 'info', duration = 3500) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'toastOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, duration);
};

// ── File validation ──────────────────────────────────────────
const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB

window.isValidImage = function (file) {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
  return allowed.includes(file.type.toLowerCase());
};

window.validateFile = function (file) {
  if (!window.isValidImage(file)) {
    showToast('Only JPG, PNG, WebP supported', 'error', 4000);
    return false;
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    showToast('File too large. Max 20MB', 'error', 4000);
    return false;
  }
  return true;
};

// ── Drag & Drop helpers ──────────────────────────────────────
window.initDropzone = function (dropzoneEl, inputEl, onFiles) {
  if (!dropzoneEl) return;

  dropzoneEl.addEventListener('click', e => {
    // Don't trigger if user clicked a button inside the dropzone
    if (e.target.tagName === 'BUTTON') return;
    inputEl.click();
  });

  dropzoneEl.addEventListener('dragover', e => {
    e.preventDefault();
    dropzoneEl.classList.add('dragover');
  });
  dropzoneEl.addEventListener('dragleave', () => {
    dropzoneEl.classList.remove('dragover');
  });
  dropzoneEl.addEventListener('drop', e => {
    e.preventDefault();
    dropzoneEl.classList.remove('dragover');
    const files = Array.from(e.dataTransfer.files);
    const valid = files.filter(f => {
      if (!window.isValidImage(f)) { showToast('Only JPG, PNG, WebP supported', 'error', 4000); return false; }
      if (f.size > MAX_FILE_SIZE_BYTES) { showToast('File too large. Max 20MB', 'error', 4000); return false; }
      return true;
    });
    if (valid.length) onFiles(valid);
  });

  inputEl.addEventListener('change', () => {
    const files = Array.from(inputEl.files).filter(f => window.validateFile(f));
    if (files.length) onFiles(files);
    inputEl.value = '';
  });
};

// ── File size formatter ──────────────────────────────────────
window.formatBytes = function (bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
};

// ── Accordion ────────────────────────────────────────────────
window.initAccordion = function () {
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.accordion-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
};

// ── Smooth scroll ────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ── Intersection observer for fade-up animations ─────────────
(function () {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.animate-fade-up').forEach(el => io.observe(el));
})();
