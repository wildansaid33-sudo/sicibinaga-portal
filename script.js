// =========================================================================
// SICIBINAGA • TKA READY (SMP NEGERI 3 BANGIL)
// MAIN PORTAL CONTROLLER & UNIFIED DOMAIN LAUNCHER (V2 - ZERO BROKEN LINKS)
// =========================================================================

// =========================================================================
// KONFIGURASI UTAMA ALAMAT SERVER KELAS 7, KELAS 8, DAN KELAS 9
// Jika nama link Vercel Anda berbeda, Anda bisa mengubahnya langsung di sini
// atau melalui tombol ikon Rantai (Link) di pojok kanan atas halaman web.
// =========================================================================
const DEFAULT_PORTAL_SERVERS = {
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

let PORTAL_SERVERS = JSON.parse(JSON.stringify(DEFAULT_PORTAL_SERVERS));

function loadSavedServerUrls() {
  try {
    const saved = JSON.parse(localStorage.getItem('sicibinaga_custom_urls_v2') || 'null');
    if (saved) {
      ['7', '8', '9'].forEach(g => {
        if (saved[g] && saved[g].trim()) {
          PORTAL_SERVERS[g].url = saved[g].trim();
        }
      });
    }
  } catch (e) {}
  syncAllPortalLinksInDOM();
}

function syncAllPortalLinksInDOM() {
  ['7', '8', '9'].forEach(g => {
    const srv = PORTAL_SERVERS[g];
    if (!srv) return;
    const cleanHost = srv.url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');

    // Update Kartu Utama
    const card = document.querySelector(`.grade-portal-card[data-grade="${g}"]`);
    if (card) {
      const launchBtn = card.querySelector('.btn-portal-launch');
      if (launchBtn) {
        launchBtn.href = srv.url;
        launchBtn.onclick = function(e) {
          e.preventDefault();
          openGradePortalDirect(g);
        };
      }
      const domainChip = card.querySelector('.grade-domain-chip span');
      if (domainChip) domainChip.textContent = cleanHost;

      const copyBtn = card.querySelector('.btn-portal-copy');
      if (copyBtn) {
        copyBtn.onclick = function() {
          copyPortalLink(srv.url, `Kelas ${g}`);
        };
      }
    }

    // Update Telemetry Pill di Hero Kanan
    const pill = document.querySelector(`.telemetry-pill.pill-k${g}`);
    if (pill) {
      pill.href = srv.url;
      const urlDiv = pill.querySelector('.t-url');
      if (urlDiv) urlDiv.textContent = cleanHost;
      pill.onclick = function(e) {
        e.preventDefault();
        openGradePortalDirect(g);
      };
    }

    // Update Quick Finder Modal Item
    const qfItem = document.querySelector(`.qf-grade-item.item-k${g}`);
    if (qfItem) {
      qfItem.href = srv.url;
      qfItem.onclick = function(e) {
        e.preventDefault();
        openGradePortalDirect(g);
      };
    }
  });
}

// Fungsi Utama Membuka Portal Jenjang Kelas (Anti-Blokir & Responsif)
function openGradePortalDirect(grade, rombel = '') {
  const target = PORTAL_SERVERS[String(grade)];
  if (!target || !target.url) return;
  saveLastVisitedGrade(String(grade), rombel);

  let finalUrl = target.url;
  if (!/^https?:\/\//i.test(finalUrl)) {
    finalUrl = 'https://' + finalUrl;
  }

  showPortalToast(`Membuka ${target.name}...`);
  const win = window.open(finalUrl, '_blank');
  if (!win) {
    window.location.href = finalUrl;
  }
}

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
  openGradePortalDirect(grade, rombel);
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
  const target = PORTAL_SERVERS[String(grade)] || PORTAL_SERVERS['8'];
  const overlay = document.getElementById('iframePortalOverlay');
  const iframe = document.getElementById('portalMainIframe');
  const titleEl = document.getElementById('iframeActiveTitle');
  const extLink = document.getElementById('iframeExternalLink');

  if (!overlay || !iframe) return;
  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  let finalUrl = target.url;
  if (!/^https?:\/\//i.test(finalUrl)) finalUrl = 'https://' + finalUrl;

  if (titleEl) titleEl.textContent = target.name;
  if (extLink) extLink.href = finalUrl;
  iframe.src = finalUrl;

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

// 8. Modal Pengaturan URL Server Kelas 7, 8, 9
function openServerConfigModal() {
  const m = document.getElementById('serverConfigModal');
  if (!m) return;
  document.getElementById('cfgUrl7').value = PORTAL_SERVERS['7'].url;
  document.getElementById('cfgUrl8').value = PORTAL_SERVERS['8'].url;
  document.getElementById('cfgUrl9').value = PORTAL_SERVERS['9'].url;
  m.classList.remove('hidden');
}
function closeServerConfigModal() {
  const m = document.getElementById('serverConfigModal');
  if (m) m.classList.add('hidden');
}
function saveCustomServerUrls() {
  const u7 = (document.getElementById('cfgUrl7').value || '').trim();
  const u8 = (document.getElementById('cfgUrl8').value || '').trim();
  const u9 = (document.getElementById('cfgUrl9').value || '').trim();

  if (u7) PORTAL_SERVERS['7'].url = /^https?:\/\//i.test(u7) ? u7 : 'https://' + u7;
  if (u8) PORTAL_SERVERS['8'].url = /^https?:\/\//i.test(u8) ? u8 : 'https://' + u8;
  if (u9) PORTAL_SERVERS['9'].url = /^https?:\/\//i.test(u9) ? u9 : 'https://' + u9;

  localStorage.setItem('sicibinaga_custom_urls_v2', JSON.stringify({
    '7': PORTAL_SERVERS['7'].url,
    '8': PORTAL_SERVERS['8'].url,
    '9': PORTAL_SERVERS['9'].url
  }));
  syncAllPortalLinksInDOM();
  closeServerConfigModal();
  showPortalToast('Tautan server Kelas 7, 8, dan 9 berhasil diperbarui!');
}
function resetDefaultServerUrls() {
  localStorage.removeItem('sicibinaga_custom_urls_v2');
  PORTAL_SERVERS = JSON.parse(JSON.stringify(DEFAULT_PORTAL_SERVERS));
  syncAllPortalLinksInDOM();
  closeServerConfigModal();
  showPortalToast('Tautan server dikembalikan ke pengaturan awal.');
}

// 9. Switch Tab Panduan Domain sicibinaga.my.id
function switchDomainMethodTab(paneId, btnEl) {
  ['metode1', 'metode2', 'metode3'].forEach(id => {
    const pane = document.getElementById('pane-' + id);
    if (pane) pane.classList.toggle('hidden', id !== paneId);
  });
  document.querySelectorAll('.method-tab-btn').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
}

// 10. Salin Link & Snippet Kode
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

// 11. Accordion FAQ
function toggleFaqItem(btnEl) {
  const item = btnEl.closest('.faq-item');
  if (item) item.classList.toggle('open');
}

// 12. Toast Helper
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

// 13. Inisialisasi Awal
window.addEventListener('DOMContentLoaded', () => {
  loadSavedServerUrls();

  const savedTheme = localStorage.getItem('sicibinaga_portal_theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    const icon = document.getElementById('themeToggleIcon');
    if (icon) icon.className = 'fa-solid fa-sun';
  }

  const params = new URLSearchParams(window.location.search);
  const jenjangParam = params.get('jenjang') || params.get('kelas');
  if (jenjangParam && PORTAL_SERVERS[jenjangParam]) {
    openPortalPreviewModal(jenjangParam);
  }
});
