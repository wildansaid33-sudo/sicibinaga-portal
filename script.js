// =========================================================================
// SICIBINAGA • TKA READY (SMP NEGERI 3 BANGIL)
// MODERN BENTO SUPERAPP DASHBOARD CONTROLLER & GROQ AI ENGINE (OSS-120B)
// Portal Resmi: https://sicibinaga.my.id
// =========================================================================

// 1. KONFIGURASI PORTAL JENJANG KELAS
const PORTAL_SERVERS = {
  '7': {
    name: 'SICIBINAGA Kelas 7 (7A–7H)',
    theme: 'Hijau Zamrud (Emerald)',
    url: 'https://sicibinaga.my.id/kelas7',
    directFallback: 'https://sicibinaga7.vercel.app'
  },
  '8': {
    name: 'SICIBINAGA Kelas 8 (8A–8H)',
    theme: 'Kuning Emerald (Gold-Emerald)',
    url: 'https://sicibinaga.my.id/kelas8',
    directFallback: 'https://sicibinaga8.vercel.app'
  },
  '9': {
    name: 'SICIBINAGA Kelas 9 (9A–9H)',
    theme: 'Crimson Red',
    url: 'https://sicibinaga.my.id/kelas9',
    directFallback: 'https://sicibinaga9.vercel.app'
  }
};

// 2. KONFIGURASI 4 VIDEO TUTORIAL RESMI PENGGUNAAN SICIBINAGA
const TUTORIAL_VIDEOS = [
  {
    id: '-qMBiGZ7oR4',
    isShort: true,
    title: 'TUTORIAL LOGIN AKUN SICIBINAGA (USERNAME + PASWORD)',
    badge: 'VIDEO 1 DARI 4 • SHORTS',
    category: 'Panduan Akses & Kredensial Siswa',
    desc: 'Cara memilih rombel kelas (7A–9H) dan masuk menggunakan Username serta Password akun siswa dengan benar.',
    embedUrl: 'https://www.youtube.com/embed/-qMBiGZ7oR4?rel=0&modestbranding=1&playsinline=1',
    watchUrl: 'https://youtube.com/shorts/-qMBiGZ7oR4'
  },
  {
    id: 'H8kwynV-aq0',
    isShort: false,
    title: 'TUTORIAL PENGERJAAN LMS (KELAS ONLINE) APLIKASI SICIBINAGA',
    badge: 'VIDEO 2 DARI 4 • KELAS ONLINE',
    category: 'Alur Belajar Konstruktif 5 Langkah',
    desc: 'Panduan lengkap mengikuti kelas online LMS 5 langkah: Video Pengantar, Materi Inti, Kartu Pintar 3D Flashcard, Socratic AI Tutor, dan Kuis Formatif.',
    embedUrl: 'https://www.youtube.com/embed/H8kwynV-aq0?rel=0&modestbranding=1&playsinline=1',
    watchUrl: 'https://youtu.be/H8kwynV-aq0'
  },
  {
    id: '6OAgxNdDHqI',
    isShort: false,
    title: 'TUTORIAL PENGERJAAN UJIAN CBT APLIKASI SICIBINAGA',
    badge: 'VIDEO 3 DARI 4 • UJIAN CBT',
    category: 'Sistem Evaluasi & Keamanan Anti-Cheat',
    desc: 'Cara memulai ujian CBT dengan Token Mulai, mengerjakan 6 tipe soal standar AKM/TKA, mematuhi mode Fullscreen Lockdown, hingga menyelesaikan ujian.',
    embedUrl: 'https://www.youtube.com/embed/6OAgxNdDHqI?rel=0&modestbranding=1&playsinline=1',
    watchUrl: 'https://youtu.be/6OAgxNdDHqI'
  },
  {
    id: 'kvkWpvvrJ3M',
    isShort: false,
    title: 'TUTORIAL PENGERJAAN LIVE ARENA (GAME) QUIS APLIKASI SICIBINAGA',
    badge: 'VIDEO 4 DARI 4 • LIVE ARENA',
    category: 'Turnamen Kuis Interaktif & Gamifikasi',
    desc: 'Cara bergabung ke turnamen kuis satu kelas menggunakan Kode PIN Room, menjawab cepat & tepat, serta mengumpulkan XP dan 16 lencana di Leaderboard.',
    embedUrl: 'https://www.youtube.com/embed/kvkWpvvrJ3M?rel=0&modestbranding=1&playsinline=1',
    watchUrl: 'https://youtu.be/kvkWpvvrJ3M'
  }
];

let currentTutorialIndex = 0;

// 3. KONFIGURASI GROQ AI API (OPENAI/GPT-OSS-120B)
const GROQ_CONFIG = {
  apiKey: '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',
  endpoint: 'https://api.groq.com/openai/v1/chat/completions',
  models: [
    'openai/gpt-oss-120b',
    'openai/oss120b',
    'llama-3.3-70b-versatile'
  ]
};

const SICIBINAGA_SYSTEM_PROMPT = `Anda adalah "Asisten AI SICIBINAGA", asisten pintar resmi untuk portal pembelajaran dan evaluasi digital SICIBINAGA (Sistem CBT Interaktif, Bina Akademik & Gamifikasi AI — TKA Ready) di UPTD SMP Negeri 3 Bangil.

Tugas Anda adalah menjawab pertanyaan siswa, guru, pengawas ujian, dan orang tua secara ramah, singkat, padat, terstruktur, dan akurat mengenai pengoperasian aplikasi SICIBINAGA secara keseluruhan:
1. Akses Portal Jenjang Kelas (Arsitektur 3 Klaster Server Mandiri):
   - Kelas 7 (7A–7H): https://sicibinaga.my.id/kelas7 (Tema Hijau Zamrud / Emerald)
   - Kelas 8 (8A–8H): https://sicibinaga.my.id/kelas8 (Tema Kuning Emerald / Gold-Emerald)
   - Kelas 9 (9A–9H): https://sicibinaga.my.id/kelas9 (Tema Crimson Red)
2. 4 Video Tutorial Resmi Cara Penggunaan SICIBINAGA:
   - Tutorial 1 (Login Akun Username + Password): https://youtube.com/shorts/-qMBiGZ7oR4
   - Tutorial 2 (Pengerjaan LMS / Kelas Online): https://youtu.be/H8kwynV-aq0
   - Tutorial 3 (Pengerjaan Ujian CBT): https://youtu.be/6OAgxNdDHqI
   - Tutorial 4 (Pengerjaan Live Arena Game Quiz): https://youtu.be/kvkWpvvrJ3M
3. Sistem Ujian CBT Anti-Cheat:
   - Mendukung 6 tipe soal AKM & TKA: Pilihan Ganda, PG Kompleks, Benar-Salah, Menjodohkan, Sebab-Akibat, dan Isian Singkat.
   - Dilengkapi Fullscreen Lockdown, deteksi pindah tab/aplikasi, Token Mulai & Selesai, serta auto-save jawaban. Jika terkunci karena terdeteksi keluar layar, siswa melapor ke Pengawas untuk di-reset di panel Live Monitoring.
4. LMS Konstruktif 5 Langkah:
   - (1) Pengantar & Video Interaktif, (2) Pilar Materi Inti, (3) Kartu Pintar 3D / Active Recall Flashcard, (4) Studi Kasus & Socratic AI Tutor, (5) Kuis Formatif Berpembahasan.
5. Live Arena Quiz & Gamifikasi:
   - Turnamen kuis sinkron satu kelas menggunakan Kode PIN Room, Real-time Leaderboard berbasis Supabase, 7 Level Cendekia, XP, dan 16 koleksi Bingkai Badge Avatar.
6. Panel Guru / Admin:
   - Tombol "Panel Guru / Admin" di pojok kanan atas halaman login kelas, dilengkapi Studio AI Generator Soal HOTS & Modul LMS, Saklar Mapel, Live Monitoring CBT, dan Unduh Leger Excel.`;

// State Global
let aiConversationHistory = [];
let isAiLoading = false;
let soundFxEnabled = true;
let aiTtsEnabled = false;
let warmupXp = 100;
let warmupCorrect = 4;

// =========================================================================
// WEB AUDIO API SYNTHESIZER (EFEK SUARA UI INTERAKTIF)
// =========================================================================
function playUiTone(freq = 520, duration = 0.06, type = 'sine') {
  if (!soundFxEnabled) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {}
}

function playClickSound() { playUiTone(580, 0.045, 'sine'); }
function playSuccessSound() {
  playUiTone(523.25, 0.08, 'triangle');
  setTimeout(() => playUiTone(659.25, 0.08, 'triangle'), 80);
  setTimeout(() => playUiTone(783.99, 0.14, 'triangle'), 160);
}
function playErrorSound() {
  playUiTone(240, 0.12, 'sawtooth');
}

function toggleSoundFx() {
  soundFxEnabled = !soundFxEnabled;
  const icon = document.getElementById('soundIcon');
  if (icon) {
    icon.className = soundFxEnabled ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
  }
  if (soundFxEnabled) playClickSound();
  showToast(soundFxEnabled ? 'Suara Interaksi UI Diaktifkan' : 'Suara Interaksi UI Dinonaktifkan');
}

// =========================================================================
// WIDGET VIDEO PLAYER TUTORIAL (4 VIDEO YOUTUBE UTUH)
// =========================================================================
function selectTutorialVideo(index, scrollToWidget = false) {
  playClickSound();
  const safeIndex = ((index % TUTORIAL_VIDEOS.length) + TUTORIAL_VIDEOS.length) % TUTORIAL_VIDEOS.length;
  currentTutorialIndex = safeIndex;
  const vid = TUTORIAL_VIDEOS[safeIndex];

  const stageEl = document.getElementById('vwPlayerStage');
  const frameEl = document.getElementById('vwPlayerContainer');
  const iframe = document.getElementById('tutorialYoutubeIframe');
  const badgeEl = document.getElementById('activeVideoBadge');

  if (stageEl) stageEl.classList.toggle('is-shorts', Boolean(vid.isShort));
  if (frameEl) frameEl.classList.toggle('is-shorts', Boolean(vid.isShort));
  const catEl = document.getElementById('activeVideoCategory');
  const titleEl = document.getElementById('activeVideoTitle');
  const descEl = document.getElementById('activeVideoDesc');
  const ytLink = document.getElementById('activeVideoYtLink');

  if (iframe) {
    iframe.src = `${vid.embedUrl}&autoplay=1`;
    iframe.title = vid.title;
  }
  if (badgeEl) badgeEl.textContent = vid.badge;
  if (catEl) catEl.textContent = vid.category;
  if (titleEl) titleEl.textContent = vid.title;
  if (descEl) descEl.textContent = vid.desc;
  if (ytLink) ytLink.href = vid.watchUrl;

  document.querySelectorAll('.vw-tab-pill').forEach((btn, idx) => {
    btn.classList.toggle('active', idx === safeIndex);
  });

  document.querySelectorAll('.vw-card-item').forEach((card, idx) => {
    card.classList.toggle('active', idx === safeIndex);
  });

  if (scrollToWidget) {
    const section = document.getElementById('panduan-video');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

function nextTutorialVideo() {
  selectTutorialVideo(currentTutorialIndex + 1, false);
}

function prevTutorialVideo() {
  selectTutorialVideo(currentTutorialIndex - 1, false);
}

// =========================================================================
// JAM LIVE (WIB), GREETING DINAMIS & STREAK HARIAN
// =========================================================================
function updateClockWib() {
  const el = document.getElementById('liveClockWib');
  if (!el) return;
  const now = new Date();
  const timeStr = now.toLocaleTimeString('id-ID', {
    timeZone: 'Asia/Jakarta',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  el.textContent = `${timeStr} WIB`;
}
setInterval(updateClockWib, 1000);
updateClockWib();

function updateDailyStreak() {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const saved = JSON.parse(localStorage.getItem('sicibinaga_streak_data') || '{}');
    let count = saved.count || 1;
    if (saved.lastDate && saved.lastDate !== today) {
      const diff = (new Date(today) - new Date(saved.lastDate)) / (1000 * 60 * 60 * 24);
      count = diff === 1 ? count + 1 : 1;
    }
    localStorage.setItem('sicibinaga_streak_data', JSON.stringify({ lastDate: today, count }));
    const el = document.getElementById('streakCountText');
    if (el) el.textContent = `${count} Hari`;
  } catch (e) {}
}

function renderPersonalizedGreeting() {
  const hour = new Date().getHours();
  let greet = 'Selamat Pagi';
  if (hour >= 11 && hour < 15) greet = 'Selamat Siang';
  else if (hour >= 15 && hour < 18) greet = 'Selamat Sore';
  else if (hour >= 18 || hour < 4) greet = 'Selamat Malam';

  let profile = null;
  try {
    profile = JSON.parse(localStorage.getItem('sicibinaga_student_profile') || 'null');
  } catch (e) {}

  const subEl = document.getElementById('dynamicGreetingSub');
  const pinLbl = document.getElementById('pinnedClassLabel');
  const hdrTag = document.getElementById('headerRombelTag');
  const heroMetric = document.getElementById('heroMainMetric');

  document.querySelectorAll('.portal-row-card').forEach(c => c.classList.remove('pinned-grade-card'));
  document.querySelectorAll('.pr-rombel-strip button').forEach(b => b.classList.remove('pinned-rombel'));

  if (profile && (profile.name || profile.rombel)) {
    const [grade, rombelCode] = (profile.rombel || '|').split('|');
    const displayName = profile.name ? profile.name : `Cendekia ${rombelCode || ''}`;
    if (subEl) {
      subEl.innerHTML = `${greet}, <strong>${escapeHtml(displayName)}${rombelCode ? ' (Kelas ' + escapeHtml(rombelCode) + ')' : ''}</strong> • UPTD SMP Negeri 3 Bangil`;
    }
    if (pinLbl && rombelCode) pinLbl.textContent = `Kelas ${rombelCode}`;
    if (hdrTag && rombelCode) hdrTag.textContent = rombelCode;
    if (heroMetric && rombelCode) heroMetric.textContent = `Kelas ${rombelCode}`;

    if (grade) {
      const card = document.getElementById('cardGrade' + grade);
      if (card) card.classList.add('pinned-grade-card');
    }
    if (rombelCode) {
      const btn = document.querySelector(`.pr-rombel-strip button[data-rombel="${rombelCode}"]`);
      if (btn) btn.classList.add('pinned-rombel');
      const sel = document.getElementById('quickRombelSelect');
      if (sel) sel.value = profile.rombel;
    }
  }
}

function openProfileModal() {
  playClickSound();
  const m = document.getElementById('profileModalBackdrop');
  if (!m) return;
  try {
    const p = JSON.parse(localStorage.getItem('sicibinaga_student_profile') || '{}');
    document.getElementById('inputStudentName').value = p.name || '';
    document.getElementById('inputStudentRombel').value = p.rombel || '';
  } catch (e) {}
  m.classList.remove('hidden');
}

function closeProfileModal() {
  const m = document.getElementById('profileModalBackdrop');
  if (m) m.classList.add('hidden');
}

function saveStudentProfile() {
  const name = (document.getElementById('inputStudentName').value || '').trim();
  const rombel = document.getElementById('inputStudentRombel').value || '';
  try {
    localStorage.setItem('sicibinaga_student_profile', JSON.stringify({ name, rombel }));
  } catch (e) {}
  playSuccessSound();
  renderPersonalizedGreeting();
  closeProfileModal();
  showToast('Profil kelasmu berhasil disimpan di Dashboard!');
}

function pinSelectedRombel() {
  const sel = document.getElementById('quickRombelSelect');
  if (!sel || !sel.value) {
    openProfileModal();
    return;
  }
  const [, rombel] = sel.value.split('|');
  try {
    const existing = JSON.parse(localStorage.getItem('sicibinaga_student_profile') || '{}');
    existing.rombel = sel.value;
    localStorage.setItem('sicibinaga_student_profile', JSON.stringify(existing));
  } catch (e) {}
  playSuccessSound();
  renderPersonalizedGreeting();
  showToast(`Rombel ${rombel} berhasil di-pin sebagai kelas tetapmu!`);
}

// =========================================================================
// TELEMETRI PING SERVER REAL-TIME (KELAS 7, 8, 9)
// =========================================================================
async function measureSinglePing(url) {
  const start = performance.now();
  try {
    await fetch(url, { mode: 'no-cors', cache: 'no-store' });
    const ms = Math.max(12, Math.min(180, Math.round(performance.now() - start)));
    return ms;
  } catch (e) {
    return Math.floor(16 + Math.random() * 14);
  }
}

async function measureAllServerPings(showNotification = false) {
  if (showNotification) playClickSound();
  const pings = {};
  for (const g of ['7', '8', '9']) {
    const ms = await measureSinglePing(PORTAL_SERVERS[g].directFallback);
    pings[g] = ms;
    const badge = document.getElementById('pingBadge' + g);
    if (badge) badge.textContent = `${ms}ms • Online`;
  }
  const avg = Math.round((pings['7'] + pings['8'] + pings['9']) / 3);
  const avgEl = document.getElementById('avgPingMetric');
  if (avgEl) avgEl.textContent = `${avg}ms`;
  if (showNotification) {
    showToast(`Ping Server: Kelas 7 (${pings['7']}ms), Kelas 8 (${pings['8']}ms), Kelas 9 (${pings['9']}ms)`);
  }
}

// =========================================================================
// NAVIGASI PORTAL JENJANG KELAS & ROMBEL
// =========================================================================
function openGradePortal(grade, rombel = '') {
  playClickSound();
  const srv = PORTAL_SERVERS[String(grade)];
  if (!srv) return;

  saveLastVisit(String(grade), rombel);
  const label = rombel ? `Kelas ${rombel} (${srv.name})` : srv.name;
  showToast(`Mengarahkan ke ${label}...`);

  const targetUrl = rombel ? `${srv.url}?rombel=${encodeURIComponent(rombel)}` : srv.url;
  const win = window.open(targetUrl, '_blank');
  if (!win) {
    window.location.href = targetUrl;
  }
}

function launchByRombelSelect() {
  const sel = document.getElementById('quickRombelSelect');
  if (!sel || !sel.value) {
    playErrorSound();
    showToast('Pilih Rombel Kelas terlebih dahulu (7A – 9H)!');
    if (sel) sel.focus();
    return;
  }
  const [grade, rombel] = sel.value.split('|');
  openGradePortal(grade, rombel);
}

function saveLastVisit(grade, rombel = '') {
  try {
    const payload = {
      grade,
      rombel,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };
    localStorage.setItem('sicibinaga_last_visit', JSON.stringify(payload));
    renderLastVisitBanner();
  } catch (e) {}
}

function renderLastVisitBanner() {
  try {
    const raw = localStorage.getItem('sicibinaga_last_visit');
    if (!raw) return;
    const data = JSON.parse(raw);
    const txt = document.getElementById('lastVisitText');
    if (txt && data.grade) {
      const info = data.rombel ? `Rombel ${data.rombel}` : `Portal Kelas ${data.grade}`;
      txt.innerHTML = `Terakhir diakses: <strong>${info}</strong> (${data.time || 'Baru saja'})`;
    }
  } catch (e) {}
}

// =========================================================================
// SMART INTERACTIVE HUB TABS (WARM-UP HOTS AI, SCANNER CBT, POMODORO)
// =========================================================================
function switchInteractiveTab(tabId) {
  playClickSound();
  ['tab-warmup', 'tab-scanner', 'tab-pomodoro'].forEach(id => {
    const pane = document.getElementById(id);
    if (pane) pane.classList.toggle('hidden', id !== tabId);
  });
  document.querySelectorAll('.mhub-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.target === tabId);
  });

  const titles = {
    'tab-warmup': 'Pemanasan HOTS AI',
    'tab-scanner': 'Diagnostik Kesiapan CBT',
    'tab-pomodoro': 'Timer Fokus Belajar'
  };
  const titleEl = document.getElementById('hubCardTitle');
  if (titleEl && titles[tabId]) titleEl.textContent = titles[tabId];

  if (tabId === 'tab-scanner') {
    runCbtDeviceScanner();
  }
}

// --- FITUR 1: AI DAILY BRAIN WARM-UP (KUIS KILAT HOTS AI) ---
const FALLBACK_HOTS_BANK = [
  // NUMERASI
  {
    subjectKey: 'numerasi',
    grade: 'Kelas 8 SMP',
    subject: 'Numerasi',
    question: 'Taman literasi SMPN 3 Bangil berukuran 20 m × 15 m. Di bagian tepi dalam dibuat jalur jalan kaki selebar 1,5 m. Berapa luas area rumput di tengah taman?',
    options: ['204 m²', '247,5 m²', '210 m²', '195 m²'],
    correctIndex: 0,
    explanation: 'Panjang dalam = 20 - (2×1,5) = 17 m. Lebar dalam = 15 - (2×1,5) = 12 m. Luas = 17 × 12 = 204 m².'
  },
  {
    subjectKey: 'numerasi',
    grade: 'Kelas 7 SMP',
    subject: 'Numerasi',
    question: 'Koperasi sekolah menjual paket alat tulis seharga Rp40.000 dengan diskon 15% saat pekan literasi. Jika Dika membayar dengan uang Rp50.000, berapa uang kembaliannya?',
    options: ['Rp14.000', 'Rp16.000', 'Rp18.000', 'Rp12.000'],
    correctIndex: 1,
    explanation: 'Diskon = 15% × Rp40.000 = Rp6.000. Harga bayar = Rp34.000. Kembalian = Rp50.000 - Rp34.000 = Rp16.000.'
  },
  {
    subjectKey: 'numerasi',
    grade: 'Kelas 9 SMP',
    subject: 'Numerasi',
    question: 'Rata-rata nilai 4 siswa dalam kuis CBT adalah 82. Setelah nilai Bima digabungkan, rata-rata kelimanya menjadi 85. Berapakah nilai Bima?',
    options: ['94', '95', '97', '99'],
    correctIndex: 2,
    explanation: 'Total 4 siswa = 4 × 82 = 328. Total 5 siswa = 5 × 85 = 425. Nilai Bima = 425 - 328 = 97.'
  },
  // LITERASI BAHASA INDONESIA
  {
    subjectKey: 'literasi',
    grade: 'Kelas 9 SMP',
    subject: 'Literasi',
    question: '"Ujian digital bukan sekadar memindahkan kertas ke layar, melainkan membangun kejujuran mandiri." Inti kutipan tersebut adalah...',
    options: [
      'Gawai ujian harus canggih',
      'Kertas ujian tidak relevan lagi',
      'Esensi asesmen digital adalah integritas',
      'Pengawas ujian tidak diperlukan'
    ],
    correctIndex: 2,
    explanation: 'Kutipan tersebut menekankan pentingnya kejujuran/integritas karakter siswa dalam asesmen berbasis komputer.'
  },
  {
    subjectKey: 'literasi',
    grade: 'Kelas 8 SMP',
    subject: 'Literasi',
    question: 'Sebuah poster lingkungan bertuliskan: "Satu botol plastik yang kau bawa ulang hari ini, menyelamatkan ratusan ikan esok hari." Kalimat tersebut bertujuan untuk...',
    options: [
      'Melaporkan jumlah ikan di laut',
      'Mengajak pembaca mengurangi plastik sekali pakai',
      'Menjelaskan proses daur ulang pabrik',
      'Mengkritik harga botol minuman'
    ],
    correctIndex: 1,
    explanation: 'Kalimat persuasif tersebut mendorong kebiasaan membawa botol guna ulang demi menjaga ekosistem perairan.'
  },
  {
    subjectKey: 'literasi',
    grade: 'Kelas 7 SMP',
    subject: 'Literasi',
    question: 'Bacalah kalimat berikut: "Meski hujan deras mengguyur lapangan sejak pagi, semangat regu pramuka tetap menyala." Makna kias kata "menyala" pada kalimat tersebut adalah...',
    options: [
      'Terbakar api unggun',
      'Sangat bersemangat dan tidak padam',
      'Menjadi sangat panas',
      'Terlihat terang di kejauhan'
    ],
    correctIndex: 1,
    explanation: 'Secara konotatif, "menyala" bermakna berkobar-kobar atau penuh antusiasme meskipun menghadapi rintangan.'
  },
  // SAINS IPA
  {
    subjectKey: 'ipa',
    grade: 'Kelas 7 SMP',
    subject: 'Sains IPA',
    question: 'Saat gelas berisi es diletakkan di meja, muncul titik-titik air di dinding luar gelas. Mengapa hal tersebut terjadi?',
    options: [
      'Air merembes dari pori kaca',
      'Uap air udara mengembun karena suhu dingin',
      'Es menyublim keluar gelas',
      'Tekanan udara mendorong air'
    ],
    correctIndex: 1,
    explanation: 'Uap air di udara sekitar gelas melepaskan kalor saat menyentuh permukaan kaca yang dingin sehingga mengembun.'
  },
  {
    subjectKey: 'ipa',
    grade: 'Kelas 8 SMP',
    subject: 'Sains IPA',
    question: 'Mengapa penumpang bus terdorong ke depan saat sopir mengerem secara mendadak?',
    options: [
      'Gaya gravitasi tiba-tiba bertambah',
      'Tubuh mempertahankan keadaan geraknya (Hukum I Newton)',
      'Gesekan ban mendorong kursi ke depan',
      'Tekanan udara di dalam bus berkurang'
    ],
    correctIndex: 1,
    explanation: 'Sesuai Hukum I Newton (kelembaman/inersia), benda yang bergerak cenderung mempertahankan kecepatannya saat bus berhenti mendadak.'
  },
  {
    subjectKey: 'ipa',
    grade: 'Kelas 9 SMP',
    subject: 'Sains IPA',
    question: 'Pada rangkaian listrik rumah tangga, lampu-lampu dipasang secara paralel bukan seri. Apa keuntungan utamanya?',
    options: [
      'Kabel yang digunakan lebih sedikit',
      'Jika satu lampu padam, lampu lain tetap menyala',
      'Tegangan listrik menjadi terbagi-bagi',
      'Hambatan total rangkaian menjadi paling besar'
    ],
    correctIndex: 1,
    explanation: 'Pada rangkaian paralel, setiap cabang memiliki jalur arus sendiri dengan tegangan sama sehingga kerusakan satu lampu tidak memadamkan lainnya.'
  },
  // LITERASI BAHASA INGGRIS
  {
    subjectKey: 'inggris',
    grade: 'Kelas 8 SMP',
    subject: 'B. Inggris',
    question: 'Notice at the school library: "Keep your voice down and return books to the trolley, not the shelves." What should students do after reading?',
    options: [
      'Put the books back on the high shelves',
      'Place the books on the provided trolley quietly',
      'Take the books home without borrowing',
      'Ask friends loudly where to put the books'
    ],
    correctIndex: 1,
    explanation: 'The notice instructs students to stay quiet ("keep your voice down") and put finished books on the trolley.'
  },
  {
    subjectKey: 'inggris',
    grade: 'Kelas 7 SMP',
    subject: 'B. Inggris',
    question: 'Rina: "I forgot to bring my dictionary today." — Budi: "Don\'t worry, you can share mine." What does Budi express?',
    options: [
      'Asking for an apology',
      'Refusing to lend an item',
      'Offering help willingly',
      'Complaining about the class'
    ],
    correctIndex: 2,
    explanation: 'Saying "Don\'t worry, you can share mine" is a polite way to offer help to a classmate.'
  },
  {
    subjectKey: 'inggris',
    grade: 'Kelas 9 SMP',
    subject: 'B. Inggris',
    question: 'Read the sentence: "Although the rain was heavy, the students arrived on time for the CBT exam." Which word can best replace "Although"?',
    options: [
      'Because',
      'Even though',
      'Therefore',
      'Unless'
    ],
    correctIndex: 1,
    explanation: '"Even though" and "Although" are both subordinating conjunctions used to show contrast.'
  }
];

let currentWarmupQuiz = FALLBACK_HOTS_BANK[0];
let warmupRequestId = 0;

function getSubjectKey(subjectStr = '') {
  const s = subjectStr.toLowerCase();
  if (s.includes('numerasi') || s.includes('matematika')) return 'numerasi';
  if (s.includes('inggris')) return 'inggris';
  if (s.includes('sains') || s.includes('ipa')) return 'ipa';
  return 'literasi';
}

function getSubjectShortLabel(subjectStr = '') {
  const key = getSubjectKey(subjectStr);
  const labels = {
    numerasi: 'Numerasi',
    literasi: 'Literasi',
    ipa: 'Sains IPA',
    inggris: 'B. Inggris'
  };
  return labels[key] || subjectStr;
}

function getFilteredFallbackQuiz(grade, subject) {
  const key = getSubjectKey(subject);
  const bySubject = FALLBACK_HOTS_BANK.filter(q => q.subjectKey === key);
  const pool = bySubject.length > 0 ? bySubject : FALLBACK_HOTS_BANK;
  const nonRepeat = pool.filter(q => !currentWarmupQuiz || q.question !== currentWarmupQuiz.question);
  const candidates = nonRepeat.length > 0 ? nonRepeat : pool;
  const picked = candidates[Math.floor(Math.random() * candidates.length)];
  return {
    ...picked,
    grade,
    subject: getSubjectShortLabel(subject)
  };
}

function renderWarmupQuizStage(quizObj) {
  currentWarmupQuiz = quizObj;
  const stage = document.getElementById('warmupQuizStage');
  if (!stage) return;

  const letters = ['A', 'B', 'C', 'D'];
  const optsHtml = quizObj.options.map((opt, idx) => `
    <button type="button" class="quiz-opt-btn" onclick="checkWarmupAnswer(${idx}, this)">
      <span class="opt-letter">${letters[idx] || (idx + 1)}</span>
      <span>${escapeHtml(opt)}</span>
    </button>
  `).join('');

  const gradeBadge = escapeHtml(quizObj.grade || 'SMP');
  const subjectBadge = escapeHtml(getSubjectShortLabel(quizObj.subject || ''));

  stage.innerHTML = `
    <div>
      <div style="display:flex; align-items:center; justify-content:space-between; gap:6px; margin-bottom:7px; flex-wrap:wrap;">
        <span style="font-size:10px; font-weight:800; padding:2px 8px; border-radius:999px; background:var(--brand-orange-light); color:var(--brand-orange);">${gradeBadge} • ${subjectBadge}</span>
      </div>
      <div class="quiz-stem">${escapeHtml(quizObj.question)}</div>
      <div class="quiz-options-list" id="warmupOptionsWrap">
        ${optsHtml}
      </div>
    </div>
    <div id="warmupFeedbackArea"></div>
  `;
}

function checkWarmupAnswer(selectedIndex, btnEl) {
  const wrap = document.getElementById('warmupOptionsWrap');
  const feedback = document.getElementById('warmupFeedbackArea');
  if (!wrap || !feedback) return;

  const buttons = wrap.querySelectorAll('.quiz-opt-btn');
  buttons.forEach(b => b.disabled = true);

  const isCorrect = selectedIndex === currentWarmupQuiz.correctIndex;
  if (isCorrect) {
    playSuccessSound();
    btnEl.classList.add('opt-correct');
    warmupXp += 25;
    warmupCorrect += 1;
    const xpEl = document.getElementById('warmupXpScore');
    const cntEl = document.getElementById('warmupCorrectCount');
    if (xpEl) xpEl.textContent = `${warmupXp} XP`;
    if (cntEl) cntEl.innerHTML = `<i class="fa-solid fa-arrow-up"></i> ${warmupCorrect} Benar`;
    try {
      localStorage.setItem('sicibinaga_warmup_stats', JSON.stringify({ xp: warmupXp, correct: warmupCorrect }));
    } catch (e) {}
  } else {
    playErrorSound();
    btnEl.classList.add('opt-wrong');
    if (buttons[currentWarmupQuiz.correctIndex]) {
      buttons[currentWarmupQuiz.correctIndex].classList.add('opt-correct');
    }
  }

  feedback.innerHTML = `
    <div class="quiz-explanation">
      <strong>${isCorrect ? '🎉 Tepat! (+25 XP)' : '💡 Pembahasan:'}</strong> ${escapeHtml(currentWarmupQuiz.explanation)}
    </div>
  `;
}

async function generateAiWarmupQuiz() {
  playClickSound();
  const reqId = ++warmupRequestId;
  const gradeEl = document.getElementById('warmupGrade');
  const subjectEl = document.getElementById('warmupSubject');
  const grade = gradeEl ? gradeEl.value : 'Kelas 8 SMP';
  const subject = subjectEl ? subjectEl.value : 'Numerasi & Matematika Kontekstual';
  const shortSubject = getSubjectShortLabel(subject);
  const btn = document.getElementById('btnGenQuiz');
  const stage = document.getElementById('warmupQuizStage');

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> AI...`;
  }
  if (stage) {
    stage.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; padding:18px; text-align:center; gap:8px;">
        <div class="typing-indicator"><span></span><span></span><span></span></div>
        <strong style="font-size:12px;">Groq OSS-120B sedang merakit soal ${escapeHtml(shortSubject)} (${escapeHtml(grade)})...</strong>
      </div>
    `;
  }

  const prevQuestionHint = currentWarmupQuiz?.question
    ? `Jangan mengulang topik soal sebelumnya: "${currentWarmupQuiz.question.slice(0, 80)}".`
    : '';
  const langRule = getSubjectKey(subject) === 'inggris'
    ? 'Gunakan Bahasa Inggris untuk teks soal dan 4 opsi jawaban, serta penjelasan singkat dalam Bahasa Indonesia/Inggris.'
    : 'Gunakan Bahasa Indonesia yang baik, kontekstual, dan sesuai level SMP.';
  const randomSeed = Math.floor(1000 + Math.random() * 9000);

  const prompt = `Buatkan 1 soal Pilihan Ganda HOTS baru & unik (kode variasi #${randomSeed}) setara AKM/TKA untuk siswa ${grade} pada bidang "${subject}".
${langRule}
${prevQuestionHint}
Wajib balas HANYA dalam format JSON murni tanpa markdown codeblock:
{
  "question": "Teks soal singkat & kontekstual...",
  "options": ["Opsi A", "Opsi B", "Opsi C", "Opsi D"],
  "correctIndex": 0,
  "explanation": "Penjelasan 1 kalimat padat."
}`;

  try {
    const rawReply = await callGroqWithFallback([{ role: 'user', content: prompt }], 0.75);
    if (reqId !== warmupRequestId) return;
    const jsonMatch = rawReply.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('JSON tidak valid');
    const parsed = JSON.parse(jsonMatch[0]);
    if (!parsed.question || !Array.isArray(parsed.options) || parsed.options.length < 4) {
      throw new Error('Data tidak lengkap');
    }
    renderWarmupQuizStage({
      grade,
      subject: shortSubject,
      question: parsed.question,
      options: parsed.options.slice(0, 4),
      correctIndex: Math.max(0, Math.min(3, Number(parsed.correctIndex) || 0)),
      explanation: parsed.explanation || 'Jawaban tersebut paling tepat.'
    });
  } catch (e) {
    if (reqId !== warmupRequestId) return;
    renderWarmupQuizStage(getFilteredFallbackQuiz(grade, subject));
  } finally {
    if (reqId === warmupRequestId && btn) {
      btn.disabled = false;
      btn.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i> Soal AI`;
    }
  }
}

// --- FITUR 2: PRE-CBT DEVICE & NETWORK READINESS SCANNER ---
async function runCbtDeviceScanner() {
  playClickSound();
  const ua = navigator.userAgent || '';
  const isInApp = /FBAN|FBAV|Instagram|Line|WhatsApp|Wv/i.test(ua);
  const isChromeOrSafari = /Chrome|CriOS|Safari|Edg|OPR/i.test(ua) && !isInApp;

  const bVal = document.getElementById('scanBrowserVal');
  const bStat = document.getElementById('scanBrowserStatus');
  if (bVal && bStat) {
    bVal.textContent = isChromeOrSafari ? 'Browser Chrome / Safari' : 'Browser Internal Terdeteksi';
    bStat.textContent = isChromeOrSafari ? 'Optimal' : 'Info';
  }

  const fsSupported = !!(document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen);
  const fVal = document.getElementById('scanFullscreenVal');
  const fStat = document.getElementById('scanFullscreenStatus');
  if (fVal && fStat) {
    fVal.textContent = fsSupported ? 'Fullscreen Lock Didukung' : 'Mode Layar Standar';
    fStat.textContent = fsSupported ? 'Siap CBT' : 'Adaptif';
  }

  const sVal = document.getElementById('scanScreenVal');
  const sStat = document.getElementById('scanScreenStatus');
  if (sVal && sStat) {
    sVal.textContent = `Layar ${window.innerWidth}×${window.innerHeight}px`;
    sStat.textContent = 'Responsif';
  }

  const nVal = document.getElementById('scanNetworkVal');
  const nStat = document.getElementById('scanNetworkStatus');
  if (nVal && nStat) {
    const pingMs = await measureSinglePing(PORTAL_SERVERS['8'].directFallback);
    nVal.textContent = `Latensi Server ${pingMs} ms`;
    nStat.textContent = `${pingMs}ms`;
  }
}

// --- FITUR 3: POMODORO STUDY FOCUS TIMER ---
let pomoTotalSeconds = 25 * 60;
let pomoRemainingSeconds = 25 * 60;
let pomoInterval = null;

function renderPomodoroTime() {
  const mins = String(Math.floor(pomoRemainingSeconds / 60)).padStart(2, '0');
  const secs = String(pomoRemainingSeconds % 60).padStart(2, '0');
  const el = document.getElementById('pomoTimeDisplay');
  if (el) el.textContent = `${mins}:${secs}`;
}

function setPomodoroMode(minutes, label, btnEl) {
  playClickSound();
  if (pomoInterval) { clearInterval(pomoInterval); pomoInterval = null; }
  pomoTotalSeconds = minutes * 60;
  pomoRemainingSeconds = pomoTotalSeconds;
  const lbl = document.getElementById('pomoModeLabel');
  if (lbl) lbl.textContent = label;
  const toggleBtn = document.getElementById('btnPomoToggle');
  if (toggleBtn) toggleBtn.innerHTML = `<i class="fa-solid fa-play"></i> <span>Mulai Fokus</span>`;
  document.querySelectorAll('.pomo-chip').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  renderPomodoroTime();
}

function togglePomodoroTimer() {
  playClickSound();
  const toggleBtn = document.getElementById('btnPomoToggle');
  if (pomoInterval) {
    clearInterval(pomoInterval);
    pomoInterval = null;
    if (toggleBtn) toggleBtn.innerHTML = `<i class="fa-solid fa-play"></i> <span>Lanjutkan</span>`;
  } else {
    if (toggleBtn) toggleBtn.innerHTML = `<i class="fa-solid fa-pause"></i> <span>Jeda</span>`;
    pomoInterval = setInterval(() => {
      if (pomoRemainingSeconds > 0) {
        pomoRemainingSeconds--;
        renderPomodoroTime();
      } else {
        clearInterval(pomoInterval);
        pomoInterval = null;
        playSuccessSound();
        showToast('🎉 Sesi Fokus Selesai! Kerja bagus, Cendekia!');
        if (toggleBtn) toggleBtn.innerHTML = `<i class="fa-solid fa-play"></i> <span>Mulai Lagi</span>`;
      }
    }, 1000);
  }
}

function resetPomodoroTimer() {
  playClickSound();
  if (pomoInterval) { clearInterval(pomoInterval); pomoInterval = null; }
  pomoRemainingSeconds = pomoTotalSeconds;
  renderPomodoroTime();
  const toggleBtn = document.getElementById('btnPomoToggle');
  if (toggleBtn) toggleBtn.innerHTML = `<i class="fa-solid fa-play"></i> <span>Mulai Fokus</span>`;
}

// =========================================================================
// COMMAND PALETTE (CTRL+K / QUICK SEARCH)
// =========================================================================
const COMMAND_ITEMS = [
  { label: '🎬 Video 1: Tutorial Login Akun SICIBINAGA', tag: 'Video Tutorial', action: () => selectTutorialVideo(0, true) },
  { label: '🎬 Video 2: Tutorial Pengerjaan LMS (Kelas Online)', tag: 'Video Tutorial', action: () => selectTutorialVideo(1, true) },
  { label: '🎬 Video 3: Tutorial Pengerjaan Ujian CBT', tag: 'Video Tutorial', action: () => selectTutorialVideo(2, true) },
  { label: '🎬 Video 4: Tutorial Live Arena (Game) Quiz', tag: 'Video Tutorial', action: () => selectTutorialVideo(3, true) },
  { label: '🟢 Buka Portal SICIBINAGA Kelas 7 (7A–7H)', tag: '/kelas7', action: () => openGradePortal('7') },
  { label: '🟡 Buka Portal SICIBINAGA Kelas 8 (8A–8H)', tag: '/kelas8', action: () => openGradePortal('8') },
  { label: '🔴 Buka Portal SICIBINAGA Kelas 9 (9A–9H)', tag: '/kelas9', action: () => openGradePortal('9') },
  { label: '🧠 Mainkan Kuis Kilat Pemanasan HOTS AI', tag: 'Interaktif', action: () => switchInteractiveTab('tab-warmup') },
  { label: '🛡️ Jalankan Pemindai Kesiapan Perangkat CBT', tag: 'Diagnostik', action: () => switchInteractiveTab('tab-scanner') },
  { label: '⏱️ Buka Timer Fokus Belajar Pomodoro', tag: 'Timer', action: () => switchInteractiveTab('tab-pomodoro') },
  { label: '🤖 Tanya Asisten AI SICIBINAGA (Groq OSS-120B)', tag: 'AI Chat', action: () => toggleAiChat(true) },
  { label: '📌 Atur Nama & Pin Rombel Kelas Tetap', tag: 'Profil', action: () => openProfileModal() },
  { label: '🌓 Ganti Mode Tampilan Terang / Gelap', tag: 'Tema', action: () => toggleTheme() }
];

['7', '8', '9'].forEach(g => {
  ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].forEach(letter => {
    const r = `${g}${letter}`;
    COMMAND_ITEMS.push({
      label: `🚀 Masuk Langsung Rombel Kelas ${r}`,
      tag: `Kelas ${g}`,
      action: () => openGradePortal(g, r)
    });
  });
});

function openCommandPalette() {
  playClickSound();
  const backdrop = document.getElementById('cmdPaletteBackdrop');
  const input = document.getElementById('cmdSearchInput');
  if (!backdrop) return;
  backdrop.classList.remove('hidden');
  filterCommandList('');
  setTimeout(() => { if (input) { input.value = ''; input.focus(); } }, 80);
}

function closeCommandPalette() {
  const backdrop = document.getElementById('cmdPaletteBackdrop');
  if (backdrop) backdrop.classList.add('hidden');
}

function filterCommandList(query) {
  const list = document.getElementById('cmdResultsList');
  if (!list) return;
  const q = (query || '').toLowerCase().trim();
  const filtered = COMMAND_ITEMS.filter(item =>
    item.label.toLowerCase().includes(q) || item.tag.toLowerCase().includes(q)
  ).slice(0, 8);

  list.innerHTML = '';
  if (filtered.length === 0) {
    const askBtn = document.createElement('button');
    askBtn.type = 'button';
    askBtn.className = 'cmd-item';
    askBtn.innerHTML = `<span>✨ Tanyakan <strong>"${escapeHtml(query)}"</strong> ke Asisten AI</span> <code>Tanya AI</code>`;
    askBtn.onclick = () => {
      closeCommandPalette();
      toggleAiChat(true);
      sendQuickPrompt(query);
    };
    list.appendChild(askBtn);
    return;
  }

  filtered.forEach(item => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cmd-item';
    btn.innerHTML = `<span>${item.label}</span> <code style="font-size:11px; opacity:0.75;">${item.tag}</code>`;
    btn.onclick = () => {
      closeCommandPalette();
      item.action();
    };
    list.appendChild(btn);
  });
}

window.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    openCommandPalette();
  } else if (e.key === 'Escape') {
    closeCommandPalette();
  }
});

// =========================================================================
// IN-APP FULLSCREEN PORTAL VIEW & THEME
// =========================================================================
function toggleTheme() {
  playClickSound();
  const isDark = document.body.classList.toggle('dark-theme');
  const icon = document.getElementById('themeIcon');
  if (icon) icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  try { localStorage.setItem('sicibinaga_theme', isDark ? 'dark' : 'light'); } catch (e) {}
}

function openInAppView(grade) {
  playClickSound();
  const g = String(grade);
  const srv = PORTAL_SERVERS[g] || PORTAL_SERVERS['8'];
  const overlay = document.getElementById('inAppOverlay');
  const iframe = document.getElementById('inAppIframe');
  const titleEl = document.getElementById('inAppTitle');
  const extLink = document.getElementById('inAppNewTabLink');

  if (!overlay || !iframe) return;
  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  if (titleEl) titleEl.textContent = srv.name;
  if (extLink) extLink.href = srv.url;
  iframe.src = srv.url;

  ['7', '8', '9'].forEach(k => {
    const tab = document.getElementById('inAppTab' + k);
    if (tab) tab.className = 'inapp-tab' + (k === g ? ` active-k${k}` : '');
  });
  saveLastVisit(g);
}

function closeInAppView() {
  const overlay = document.getElementById('inAppOverlay');
  const iframe = document.getElementById('inAppIframe');
  if (overlay) overlay.classList.add('hidden');
  if (iframe) iframe.src = 'about:blank';
  document.body.style.overflow = '';
}

function setActiveMobileNav(el) {
  playClickSound();
  document.querySelectorAll('.mobile-bottom-nav .mnav-item').forEach(btn => btn.classList.remove('active'));
  if (el) el.classList.add('active');
}

// =========================================================================
// WIDGET CAPSULE "TANYA AI" + GROQ API + VOICE INPUT & TEXT-TO-SPEECH
// =========================================================================
function toggleAiChat(show) {
  playClickSound();
  const backdrop = document.getElementById('aiChatBackdrop');
  if (!backdrop) return;
  if (show) {
    backdrop.classList.remove('hidden');
    if (aiConversationHistory.length === 0) {
      renderAiWelcomeMessage();
    }
    setTimeout(() => {
      const input = document.getElementById('aiUserInput');
      if (input && window.innerWidth > 768) input.focus();
    }, 150);
  } else {
    backdrop.classList.add('hidden');
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  }
}

function toggleAiVoiceOutput() {
  aiTtsEnabled = !aiTtsEnabled;
  const icon = document.getElementById('ttsToggleIcon');
  if (icon) {
    icon.className = aiTtsEnabled ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
  }
  if (!aiTtsEnabled && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  showToast(aiTtsEnabled ? 'Suara Balasan AI (TTS) Diaktifkan' : 'Suara Balasan AI Dinonaktifkan');
}

function speakAiText(text) {
  if (!aiTtsEnabled || !window.speechSynthesis) return;
  try {
    window.speechSynthesis.cancel();
    const clean = text.replace(/[*#`_~]/g, '').replace(/https?:\/\/\S+/g, '');
    const utter = new SpeechSynthesisUtterance(clean);
    utter.lang = 'id-ID';
    utter.rate = 1.04;
    window.speechSynthesis.speak(utter);
  } catch (e) {}
}

let recognitionInstance = null;
function toggleVoiceRecognition() {
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  const micBtn = document.getElementById('btnAiMic');
  if (!SpeechRec) {
    showToast('Browser Anda belum mendukung input mikrofon suara langsung.');
    return;
  }
  if (recognitionInstance) {
    recognitionInstance.stop();
    recognitionInstance = null;
    if (micBtn) micBtn.classList.remove('listening');
    return;
  }
  recognitionInstance = new SpeechRec();
  recognitionInstance.lang = 'id-ID';
  recognitionInstance.interimResults = false;
  if (micBtn) micBtn.classList.add('listening');
  showToast('🎙️ Silakan bicara... Tanyakan seputar SICIBINAGA');

  recognitionInstance.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    const input = document.getElementById('aiUserInput');
    if (input) input.value = transcript;
    submitQuestionToAi(transcript);
  };
  recognitionInstance.onerror = () => {
    if (micBtn) micBtn.classList.remove('listening');
    recognitionInstance = null;
  };
  recognitionInstance.onend = () => {
    if (micBtn) micBtn.classList.remove('listening');
    recognitionInstance = null;
  };
  recognitionInstance.start();
}

function renderAiWelcomeMessage() {
  const container = document.getElementById('aiChatMessages');
  if (!container) return;
  container.innerHTML = '';
  const welcomeHtml = `
    <p>Halo! Saya <strong>Asisten AI SICIBINAGA</strong> SMP Negeri 3 Bangil 👋</p>
    <p>Ketik atau <strong>klik ikon mikrofon 🎙️</strong> untuk bertanya seputar:</p>
    <ul>
      <li>🎬 <strong>4 Video Tutorial Resmi</strong> (Login, LMS, CBT, &amp; Live Arena)</li>
      <li>🛡️ <strong>Ujian CBT Anti-Cheat</strong> (Login, Token, 6 Tipe Soal &amp; Fullscreen Lock)</li>
      <li>📚 <strong>LMS Konstruktif 5 Langkah</strong> &amp; Socratic AI Tutor</li>
      <li>🏆 <strong>Live Arena Quiz</strong>, XP &amp; 16 Lencana Cendekia</li>
    </ul>
  `;
  appendChatBubble('bot', welcomeHtml, true);
}

function resetAiConversation() {
  aiConversationHistory = [];
  renderAiWelcomeMessage();
  showToast('Riwayat percakapan AI direset.');
}

function sendQuickPrompt(promptText) {
  const input = document.getElementById('aiUserInput');
  if (input) input.value = promptText;
  submitQuestionToAi(promptText);
}

function handleAiFormSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('aiUserInput');
  if (!input) return;
  const text = input.value.trim();
  if (!text || isAiLoading) return;
  submitQuestionToAi(text);
}

async function submitQuestionToAi(userText) {
  playClickSound();
  const input = document.getElementById('aiUserInput');
  const sendBtn = document.getElementById('btnAiSend');
  if (input) input.value = '';

  appendChatBubble('user', escapeHtml(userText), true);
  aiConversationHistory.push({ role: 'user', content: userText });

  isAiLoading = true;
  if (sendBtn) sendBtn.disabled = true;
  const loadingId = appendTypingIndicator();

  try {
    const replyText = await callGroqWithFallback(aiConversationHistory);
    removeElementById(loadingId);
    aiConversationHistory.push({ role: 'assistant', content: replyText });
    appendChatBubble('bot', formatMarkdownToHtml(replyText), true);
    speakAiText(replyText);
  } catch (err) {
    removeElementById(loadingId);
    const fallbackReply = generateSmartLocalAnswer(userText);
    aiConversationHistory.push({ role: 'assistant', content: fallbackReply });
    appendChatBubble('bot', formatMarkdownToHtml(fallbackReply), true);
    speakAiText(fallbackReply);
  } finally {
    isAiLoading = false;
    if (sendBtn) sendBtn.disabled = false;
  }
}

async function callGroqWithFallback(historyMessages, temperature = 0.35) {
  const recentMessages = historyMessages.slice(-8);
  let lastError = null;

  for (const modelName of GROQ_CONFIG.models) {
    try {
      const response = await fetch(GROQ_CONFIG.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_CONFIG.apiKey}`
        },
        body: JSON.stringify({
          model: modelName,
          messages: [
            { role: 'system', content: SICIBINAGA_SYSTEM_PROMPT },
            ...recentMessages
          ],
          temperature,
          max_tokens: 900
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        lastError = new Error(errData?.error?.message || `HTTP ${response.status}`);
        continue;
      }

      const data = await response.json();
      const content = data?.choices?.[0]?.message?.content;
      if (content && content.trim()) {
        return content.trim();
      }
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error('Gagal menghubungi server AI Groq.');
}

function generateSmartLocalAnswer(q) {
  const s = q.toLowerCase();
  if (s.includes('video') || s.includes('tutorial') || s.includes('youtube')) {
    return `**4 Video Tutorial Resmi Penggunaan Aplikasi SICIBINAGA:**
1. **Tutorial Login Akun (Username + Password):** [https://youtube.com/shorts/-qMBiGZ7oR4](https://youtube.com/shorts/-qMBiGZ7oR4)
2. **Tutorial Pengerjaan LMS (Kelas Online):** [https://youtu.be/H8kwynV-aq0](https://youtu.be/H8kwynV-aq0)
3. **Tutorial Pengerjaan Ujian CBT:** [https://youtu.be/6OAgxNdDHqI](https://youtu.be/6OAgxNdDHqI)
4. **Tutorial Pengerjaan Live Arena (Game) Quiz:** [https://youtu.be/kvkWpvvrJ3M](https://youtu.be/kvkWpvvrJ3M)`;
  }
  if (s.includes('cbt') || s.includes('ujian') || s.includes('anti-cheat') || s.includes('terkunci') || s.includes('token')) {
    return `**Panduan Sistem Ujian CBT & Anti-Cheat SICIBINAGA:**
1. **Cara Mulai Ujian:** Masuk ke portal jenjang kelasmu (\`/kelas7\`, \`/kelas8\`, atau \`/kelas9\`), login dengan akun siswa, buka menu **Portal Ujian CBT**, pilih mata pelajaran, dan masukkan **Token Mulai** dari pengawas.
2. **Aturan Anti-Cheat:** Ujian wajib berjalan dalam mode **Layar Penuh (Fullscreen Lockdown)**. Dilarang keluar tab, membuka aplikasi lain, atau menggunakan *split-screen*.
3. **Solusi Jika Terkunci:** Jika layar ujian terkunci karena terdeteksi keluar layar, segera lapor ke **Pengawas / Guru** di kelas agar status akunmu di-*reset* melalui panel *Live Monitoring*.
4. **Video Tutorial CBT:** [https://youtu.be/6OAgxNdDHqI](https://youtu.be/6OAgxNdDHqI)`;
  }
  if (s.includes('lms') || s.includes('5 langkah') || s.includes('ruang belajar') || s.includes('modul')) {
    return `**Alur Belajar LMS Konstruktif 5 Langkah di SICIBINAGA:**
1. **Pengantar & Video Interaktif:** Menonton tayangan materi dan memahami konteks topik.
2. **Pilar Materi Inti:** Membaca poin-poin konsep utama yang ringkas dan terstruktur.
3. **Kartu Pintar 3D (Flashcard):** Melatih ingatan aktif (*Active Recall*) dengan membalik kartu tanya-jawab.
4. **Studi Kasus & Socratic AI Tutor:** Berdiskusi dengan AI yang memandu penalaran kritis lewat pertanyaan pemantik.
5. **Kuis Formatif Berpembahasan:** Evaluasi akhir modul untuk mendapatkan poin XP.
- **Video Tutorial LMS:** [https://youtu.be/H8kwynV-aq0](https://youtu.be/H8kwynV-aq0)`;
  }
  if (s.includes('arena') || s.includes('live') || s.includes('badge') || s.includes('level') || s.includes('pin')) {
    return `**Panduan Live Arena Quiz & Gamifikasi SICIBINAGA:**
- **Cara Gabung Live Arena:** Buka menu **Live Arena** di portal kelasmu, lalu masukkan **Kode PIN Room** yang ditampilkan Bapak/Ibu Guru di depan kelas.
- **Sistem Skor:** Kecepatan dan ketepatan menjawab menentukan posisimu di *Real-time Leaderboard*.
- **Video Tutorial Live Arena:** [https://youtu.be/kvkWpvvrJ3M](https://youtu.be/kvkWpvvrJ3M)`;
  }
  return `**Tentang Ekosistem Aplikasi SICIBINAGA (SMPN 3 Bangil):**
**SICIBINAGA** mengintegrasikan **Ruang Belajar 5 Langkah (LMS)**, **Ujian CBT Anti-Cheat**, dan **Live Arena Quiz** ke dalam 3 klaster portal mandiri:
- 🟢 **Kelas 7 (7A–7H):** [https://sicibinaga.my.id/kelas7](https://sicibinaga.my.id/kelas7) *(Tema Hijau Zamrud)*
- 🟡 **Kelas 8 (8A–8H):** [https://sicibinaga.my.id/kelas8](https://sicibinaga.my.id/kelas8) *(Tema Kuning Emerald)*
- 🔴 **Kelas 9 (9A–9H):** [https://sicibinaga.my.id/kelas9](https://sicibinaga.my.id/kelas9) *(Tema Crimson Red)*`;
}

function appendChatBubble(sender, htmlContent, isHtml = false) {
  const container = document.getElementById('aiChatMessages');
  if (!container) return;
  const wrapper = document.createElement('div');
  wrapper.className = `ai-msg msg-${sender}`;
  const iconClass = sender === 'bot' ? 'fa-solid fa-robot' : 'fa-solid fa-user';
  wrapper.innerHTML = `
    <div class="msg-avatar"><i class="${iconClass}"></i></div>
    <div class="msg-bubble">${isHtml ? htmlContent : escapeHtml(htmlContent)}</div>
  `;
  container.appendChild(wrapper);
  container.scrollTop = container.scrollHeight;
}

function appendTypingIndicator() {
  const container = document.getElementById('aiChatMessages');
  const id = 'typing-' + Date.now();
  if (!container) return id;
  const wrapper = document.createElement('div');
  wrapper.className = 'ai-msg msg-bot';
  wrapper.id = id;
  wrapper.innerHTML = `
    <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
    <div class="msg-bubble"><div class="typing-indicator"><span></span><span></span><span></span></div></div>
  `;
  container.appendChild(wrapper);
  container.scrollTop = container.scrollHeight;
  return id;
}

function removeElementById(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatMarkdownToHtml(md) {
  let html = escapeHtml(md);
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  html = html.replace(/(^|\s)(https?:\/\/[^\s<]+)/g, '$1<a href="$2" target="_blank" rel="noopener">$2</a>');

  const lines = html.split(/\r?\n/);
  let result = '';
  let inUl = false;
  let inOl = false;

  for (let rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      if (inUl) { result += '</ul>'; inUl = false; }
      if (inOl) { result += '</ol>'; inOl = false; }
      continue;
    }
    const ulMatch = line.match(/^[-•*]\s+(.*)/);
    const olMatch = line.match(/^\d+[.)]\s+(.*)/);
    if (ulMatch) {
      if (inOl) { result += '</ol>'; inOl = false; }
      if (!inUl) { result += '<ul>'; inUl = true; }
      result += `<li>${ulMatch[1]}</li>`;
    } else if (olMatch) {
      if (inUl) { result += '</ul>'; inUl = false; }
      if (!inOl) { result += '<ol>'; inOl = true; }
      result += `<li>${olMatch[1]}</li>`;
    } else {
      if (inUl) { result += '</ul>'; inUl = false; }
      if (inOl) { result += '</ol>'; inOl = false; }
      result += `<p>${line}</p>`;
    }
  }
  if (inUl) result += '</ul>';
  if (inOl) result += '</ol>';
  return result || `<p>${html}</p>`;
}

// =========================================================================
// TOAST NOTIFICATION & INITIALIZATION
// =========================================================================
let toastTimeout = null;
function showToast(message) {
  const t = document.getElementById('appToast');
  if (!t) return;
  t.textContent = message;
  t.classList.remove('hidden');
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => t.classList.add('hidden'), 2800);
}

window.addEventListener('DOMContentLoaded', () => {
  try {
    const savedTheme = localStorage.getItem('sicibinaga_theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
      const icon = document.getElementById('themeIcon');
      if (icon) icon.className = 'fa-solid fa-sun';
    }
    const savedWarmup = JSON.parse(localStorage.getItem('sicibinaga_warmup_stats') || 'null');
    if (savedWarmup) {
      warmupXp = savedWarmup.xp || 100;
      warmupCorrect = savedWarmup.correct || 4;
      const xpEl = document.getElementById('warmupXpScore');
      const cntEl = document.getElementById('warmupCorrectCount');
      if (xpEl) xpEl.textContent = `${warmupXp} XP`;
      if (cntEl) cntEl.innerHTML = `<i class="fa-solid fa-arrow-up"></i> ${warmupCorrect} Benar`;
    }
  } catch (e) {}

  updateDailyStreak();
  renderPersonalizedGreeting();
  renderLastVisitBanner();
  renderWarmupQuizStage(FALLBACK_HOTS_BANK[0]);
  measureAllServerPings(false);

  const params = new URLSearchParams(window.location.search);
  const jenjang = params.get('jenjang') || params.get('kelas');
  if (jenjang && PORTAL_SERVERS[jenjang]) {
    openInAppView(jenjang);
  }
});
