// =========================================================================
// SICIBINAGA • TKA READY (SMP NEGERI 3 BANGIL)
// MAIN PORTAL CONTROLLER & UNIFIED DOMAIN LAUNCHER (sicibinaga.my.id)
// =========================================================================

const PORTAL_SERVERS = {
  '7': {
    name: 'SICIBINAGA Kelas 7 (7A–7H)',
    url: 'https://sicibinaga7.vercel.app',
    rewritePath: '/kelas7'
  },
  '8': {
    name: 'SICIBINAGA Kelas 8 (8A–8H)',
    url: 'https://sicibinaga8.vercel.app',
    rewritePath: '/kelas8'
  },
  '9': {
    name: 'SICIBINAGA Kelas 9 (9A–9H)',
    url: 'https://sicibinaga9.vercel.app',
    rewritePath: '/kelas9'
  }
};

// 1. Live Clock di Header
function updatePortalClock() {
  const el = document.getElementById('live-clock-header');
  if (!el) return;
  const now = new Date();
  const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'][now.getDay()];
  const tgl = now.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  const jam = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  el.innerHTML = `<i class="fa-regular fa-clock"></i> ${hari}, ${tgl} • ${jam} WIB`;
}
setInterval(updatePortalClock, 1000);
updatePortalClock();

// 2. Dark / Light Theme Switcher
function toggleColorTheme() {
  const isDark = document.body.classList.toggle('dark-theme');
  const icon = document.getElementById('themeToggleIcon');
  if (icon) {
    icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
  localStorage.setItem('sicibinaga_portal_theme', isDark ? 'dark' : 'light');
}

// 3. Mobile Drawer
function toggleMobileDrawer() {
  const drawer = document.getElementById('mobileNavDrawer');
  if (drawer) drawer.classList.toggle('hidden');
}
function closeMobileDrawer() {
  const drawer = document.getElementById('mobileNavDrawer');
  if (drawer) drawer.classList.add('hidden');
}

// 4. Quick Rombel Selector (7A - 9H)
function launchFromRombelSelect() {
  const sel = document.getElementById('quickRombelSelect');
  if (!sel || !sel.value) {
    showPortalToast('Pilih Rombel Kelas kamu terlebih dahulu (contoh: Kelas 8A)!', 'warning');
    if (sel) sel.focus();
    return;
  }
  const [grade, rombel] = sel.value.split('|');
  const target = PORTAL_SERVERS[grade];
  if (!target) return;

  saveLastVisitedGrade(grade, rombel);
  showPortalToast(`Mengarahkan ke Server Kelas ${grade} (${rombel})...`);
  window.open(target.url, '_blank', 'noopener,noreferrer');
}

// 5. Simpan Jejak Jenjang Terakhir
function saveLastVisitedGrade(grade, rombel = '') {
  try {
    localStorage.setItem('sicibinaga_last_grade', JSON.stringify({
      grade,
      rombel,
      timestamp: new Date().toISOString()
    }));
  } catch (e) {}
}

// 6. Fullscreen In-Page Portal Launcher (Iframe)
function openPortalPreviewModal(grade) {
  const target = PORTAL_SERVERS[grade] || PORTAL_SERVERS['8'];
  const overlay = document.getElementById('iframePortalOverlay');
  const iframe = document.getElementById('portalMainIframe');
  const titleEl = document.getElementById('iframeActiveTitle');
  const extLink = document.getElementById('iframeExternalLink');

  if (!overlay || !iframe) return;
  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  if (titleEl) titleEl.textContent = target.name;
  if (extLink) extLink.href = target.url;
  if (iframe.src !== target.url) {
    iframe.src = target.url;
  }

  ['7', '8', '9'].forEach(g => {
    const btn = document.getElementById('iframeBtn' + g);
    if (btn) btn.classList.toggle('active', g === String(grade));
  });

  saveLastVisitedGrade(String(grade));
}

function closePortalPreviewModal() {
  const overlay = document.getElementById('iframePortalOverlay');
  const iframe = document.getElementById('portalMainIframe');
  if (overlay) overlay.classList.add('hidden');
  if (iframe) iframe.src = 'about:blank';
  document.body.style.overflow = '';
}

// 7. Quick Class Finder Modal
function openQuickClassFinderModal() {
  const modal = document.getElementById('quickFinderModal');
  if (modal) modal.classList.remove('hidden');
}
function closeQuickClassFinderModal() {
  const modal = document.getElementById('quickFinderModal');
  if (modal) modal.classList.add('hidden');
}

// 8. Switch Tab Panduan Domain sicibinaga.my.id
function switchDomainMethodTab(paneId, btnEl) {
  ['metode1', 'metode2', 'metode3'].forEach(id => {
    const pane = document.getElementById('pane-' + id);
    if (pane) pane.classList.toggle('hidden', id !== paneId);
  });
  document.querySelectorAll('.method-tab-btn').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
}

// 9. Salin Link & Snippet Kode
function copyPortalLink(url, label) {
  navigator.clipboard.writeText(url).then(() => {
    showPortalToast(`Tautan ${label} (${url}) berhasil disalin!`);
  });
}

function copyCodeSnippet(elId) {
  const el = document.getElementById(elId);
  if (!el) return;
  navigator.clipboard.writeText(el.innerText).then(() => {
    showPortalToast('Konfigurasi vercel.json berhasil disalin ke clipboard!');
  });
}

// 10. Accordion FAQ
function toggleFaqItem(btnEl) {
  const item = btnEl.closest('.faq-item');
  if (item) item.classList.toggle('open');
}

// 11. Toast Helper
let toastTimer = null;
function showPortalToast(msg) {
  const t = document.getElementById('portalToast');
  if (!t) return;
  t.textContent = msg;
  t.classList.remove('hidden');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    t.classList.add('hidden');
  }, 3200);
}

// 12. Inisialisasi Awal & Deteksi Parameter URL (?jenjang=7 / 8 / 9)
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('sicibinaga_portal_theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    const icon = document.getElementById('themeToggleIcon');
    if (icon) icon.className = 'fa-solid fa-sun';
  }

  // Buka otomatis jika diakses dengan ?jenjang=7, ?jenjang=8, atau ?jenjang=9
  const params = new URLSearchParams(window.location.search);
  const jenjangParam = params.get('jenjang') || params.get('kelas');
  if (jenjangParam && PORTAL_SERVERS[jenjangParam]) {
    openPortalPreviewModal(jenjangParam);
  }
});
