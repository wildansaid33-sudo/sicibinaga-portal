// =========================================================================
// SICIBINAGA • TKA READY (SMP NEGERI 3 BANGIL)
// MINIMALIST DASHBOARD CONTROLLER & GROQ AI ASSISTANT (OPENAI/GPT-OSS-120B)
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

// 2. KONFIGURASI GROQ AI API (ASISTEN QnA SICIBINAGA)
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

Tugas Anda adalah menjawab pertanyaan siswa, guru, pengawas ujian, dan orang tua secara ramah, singkat, padat, terstruktur, dan sangat akurat mengenai pengoperasian aplikasi SICIBINAGA secara keseluruhan.

PANDUAN PENGETAHUAN MENDALAM APLIKASI SICIBINAGA:

1. STRUKTUR PORTAL & AKSES JENJANG KELAS (ARSITEKTUR 3 SERVER MANDIRI):
- Portal Utama: https://sicibinaga.my.id
- Setiap jenjang kelas dipisahkan server, database Google Spreadsheet, Supabase Realtime, dan kuota AI-nya agar bebas lag/down saat ribuan siswa ujian serentak:
  • Kelas 7 (Rombel 7A s.d. 7H): https://sicibinaga.my.id/kelas7 — Tema: Hijau Zamrud (Emerald Green). Fokus: Fondasi literasi-numerasi & eksplorasi.
  • Kelas 8 (Rombel 8A s.d. 8H): https://sicibinaga.my.id/kelas8 — Tema: Kuning Emerald (Gold-Emerald). Fokus: Penalaran kritis & persiapan AKM/ANBK.
  • Kelas 9 (Rombel 9A s.d. 9H): https://sicibinaga.my.id/kelas9 — Tema: Crimson Red. Fokus: Pemantapan materi, simulasi TKA Ready & Ujian Sekolah.
- Penting: Siswa WAJIB masuk ke link jenjang kelasnya masing-masing karena akun dan nilai terisolasi per angkatan.

2. PENGOPERASIAN SISTEM UJIAN CBT (COMPUTER-BASED TEST) & ANTI-CHEAT:
- Cara Masuk CBT: Buka portal kelas (Kelas 7/8/9) -> Login dengan akun/NISN siswa -> Pilih menu "Portal Ujian CBT" -> Pilih mata pelajaran yang aktif -> Masukkan "Token Mulai Ujian" dari pengawas.
- 6 Tipe Soal AKM & TKA yang Didukung:
  1) Pilihan Ganda (PG Biasa - 1 jawaban benar)
  2) Pilihan Ganda Kompleks (PGK - centang lebih dari 1 jawaban benar)
  3) Benar / Salah (Pernyataan tabel B/S)
  4) Menjodohkan (Memasangkan premis kiri dan kanan)
  5) Sebab - Akibat (Analisis hubungan pernyataan dan alasan)
  6) Isian Singkat (Mengetik jawaban singkat/angka/kata kunci)
- Sistem Keamanan Anti-Cheat Ketat:
  • Fullscreen Lockdown: Saat ujian berlangsung, layar perangkat otomatis terkunci dalam mode layar penuh.
  • Deteksi Pelanggaran Real-time: Sistem mendeteksi jika siswa keluar dari layar penuh, berpindah tab browser, membuka aplikasi lain, split-screen, atau membuka jendela mengambang (floating app).
  • Sanksi Pelanggaran: Setiap kecurangan tercatat di layar Live Monitoring Guru/Pengawas dan memicu peringatan hingga penguncian ujian otomatis.
  • Solusi Jika Terkunci: Siswa harus melapor ke Pengawas/Guru di ruangan agar dibukakan kunci (Reset Status) melalui dashboard Live Monitoring Guru.
  • Pengumpulan Ujian: Jawaban tersimpan otomatis (auto-save). Untuk mengakhiri ujian, masukkan "Token Selesai Ujian" (jika diaktifkan pengawas) lalu klik Kumpulkan.
- Rekomendasi Perangkat & Browser: Gunakan Google Chrome (Android/PC) atau Safari (iOS) versi terbaru. Jangan membuka link ujian dari browser bawaan WhatsApp.

3. PENGOPERASIAN SISTEM LMS (RUANG BELAJAR KONSTRUKTIF 5 LANGKAH):
- Siswa tidak belajar pasif, melainkan menyelesaikan modul secara berurutan melalui 5 tahapan konstruktif:
  • Langkah 1 (Pengantar & Video Interaktif): Menonton video pembelajaran terintegrasi dan memahami tujuan materi.
  • Langkah 2 (Pilar Materi Inti): Membaca ringkasan konsep esensial yang terstruktur dan mudah dipahami.
  • Langkah 3 (Kartu Pintar 3D / Flashcard): Melatih daya ingat aktif (Active Recall) dengan membalik kartu tanya-jawab konsep penting.
  • Langkah 4 (Tantangan Studi Kasus & Socratic AI Tutor): Menganalisis masalah kontekstual. Siswa dibimbing oleh AI Tutor Sokratik yang memberikan pertanyaan pemantik agar siswa menemukan solusi sendiri (tanpa membocorkan kunci jawaban langsung).
  • Langkah 5 (Kuis Formatif Berpembahasan): Mengerjakan kuis evaluasi modul disertai pembahasan instan untuk meraih XP dan menaikkan progres belajar.

4. PENGOPERASIAN LIVE ARENA QUIZ & SISTEM GAMIFIKASI:
- Live Arena Quiz: Mode turnamen kuis interaktif sinkron (real-time) satu kelas.
  • Cara Ikut: Guru membuka room Live Arena di layar proyektor/kelas dan membagikan Kode PIN Room -> Siswa masuk ke menu "Live Arena", memasukkan PIN, dan menjawab soal secara serentak.
  • Papan Klasemen (Live Leaderboard): Didukung Supabase Realtime, menghitung skor berdasarkan ketepatan jawaban dan kecepatan waktu menjawab.
- Gamifikasi Cendekia:
  • Setiap aktivitas belajar di LMS dan kuis menghasilkan poin XP.
  • Terdapat 7 Level Cendekia dan 16 koleksi Bingkai Badge Avatar yang dapat dipasang di profil siswa untuk meningkatkan motivasi belajar.

5. PANDUAN PANEL GURU / ADMIN:
- Cara Masuk: Klik tombol "Panel Guru / Admin" di pojok kanan atas halaman login portal jenjang kelas yang diampu (/kelas7, /kelas8, atau /kelas9).
- Fitur Utama Guru:
  • Studio AI Otomatis: Membuat paket soal HOTS berstandar AKM/TKA beserta pembahasan dan merakit modul LMS 5 langkah secara otomatis dengan bantuan AI.
  • Kontrol Saklar Mapel: Mengaktifkan/menonaktifkan visibilitas modul LMS maupun jadwal sesi ujian CBT serta mengatur Token Ujian.
  • Live Monitoring CBT: Memantau status siswa yang sedang ujian secara real-time (Online, Mengerjakan, Jumlah Pelanggaran Anti-Cheat, Selesai) dan membuka kunci siswa yang terblokir.
  • Leger & Rekap Nilai: Mengunduh hasil nilai CBT dan progres penyelesaian LMS siswa per rombel (7A–9H) langsung ke format Excel / Google Spreadsheet.

ATURAN GAYA JAWABAN:
- Gunakan Bahasa Indonesia yang sopan, jelas, terstruktur (gunakan poin-poin atau penomoran bila perlu), dan mudah dipahami siswa SMP maupun guru.
- Jawab langsung ke inti pertanyaan (ringkas, padat, dan solutif).`;

// State Percakapan AI
let aiConversationHistory = [];
let isAiLoading = false;

// =========================================================================
// FUNGSI JAM LIVE (WIB) & TEMA (DARK / LIGHT MODE)
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

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-theme');
  const icon = document.getElementById('themeIcon');
  if (icon) {
    icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
  try {
    localStorage.setItem('sicibinaga_theme', isDark ? 'dark' : 'light');
  } catch (e) {}
}

// =========================================================================
// FUNGSI NAVIGASI PORTAL JENJANG KELAS & ROMBEL (7A - 9H)
// =========================================================================
function openGradePortal(grade, rombel = '') {
  const srv = PORTAL_SERVERS[String(grade)];
  if (!srv) return;

  saveLastVisit(String(grade), rombel);
  closeQuickRombelModal();

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
    showToast('Silakan pilih Rombel Kelas terlebih dahulu (7A – 9H)!');
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
    const banner = document.getElementById('lastVisitBanner');
    const txt = document.getElementById('lastVisitText');
    if (banner && txt && data.grade) {
      const info = data.rombel ? `Rombel ${data.rombel}` : `Portal Kelas ${data.grade}`;
      txt.innerHTML = `Terakhir diakses: <strong>${info}</strong> (${data.time || 'Baru saja'})`;
      banner.classList.remove('hidden');
    }
  } catch (e) {}
}

function openQuickRombelModal() {
  const m = document.getElementById('quickRombelModal');
  if (m) m.classList.remove('hidden');
}

function closeQuickRombelModal() {
  const m = document.getElementById('quickRombelModal');
  if (m) m.classList.add('hidden');
}

// =========================================================================
// IN-APP FULLSCREEN PORTAL VIEW
// =========================================================================
function openInAppView(grade) {
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
    if (tab) {
      tab.className = 'inapp-tab' + (k === g ? ` active-k${k}` : '');
    }
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

function copyLink(url, label) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => {
      showToast(`Tautan ${label} (${url}) disalin!`);
    });
  } else {
    showToast(`Tautan ${label}: ${url}`);
  }
}

function setActiveMobileNav(el) {
  document.querySelectorAll('.mobile-bottom-nav .mnav-item').forEach(btn => {
    btn.classList.remove('active');
  });
  if (el) el.classList.add('active');
}

// =========================================================================
// WIDGET CAPSULE "TANYA AI" & INTEGRASI GROQ API (OPENAI/GPT-OSS-120B)
// =========================================================================
function toggleAiChat(show) {
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
  }
}

function renderAiWelcomeMessage() {
  const container = document.getElementById('aiChatMessages');
  if (!container) return;
  container.innerHTML = '';
  const welcomeHtml = `
    <p>Halo! Saya <strong>Asisten AI SICIBINAGA</strong> SMP Negeri 3 Bangil 👋</p>
    <p>Saya siap membantu menjelaskan penggunaan aplikasi secara menyeluruh:</p>
    <ul>
      <li>🛡️ <strong>Ujian CBT Anti-Cheat</strong> (Login, Token, 6 Tipe Soal &amp; Aturan Layar Penuh)</li>
      <li>📚 <strong>LMS Konstruktif 5 Langkah</strong> &amp; Tutor Sokratik AI</li>
      <li>🏆 <strong>Live Arena Quiz</strong>, XP &amp; Lencana Cendekia</li>
      <li>🔗 Akses Portal <strong>Kelas 7</strong>, <strong>Kelas 8</strong>, dan <strong>Kelas 9</strong></li>
    </ul>
    <p>Silakan pilih topik cepat di atas atau ketik pertanyaanmu di bawah!</p>
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
  } catch (err) {
    removeElementById(loadingId);
    const fallbackReply = generateSmartLocalAnswer(userText);
    aiConversationHistory.push({ role: 'assistant', content: fallbackReply });
    appendChatBubble('bot', formatMarkdownToHtml(fallbackReply), true);
  } finally {
    isAiLoading = false;
    if (sendBtn) sendBtn.disabled = false;
  }
}

async function callGroqWithFallback(historyMessages) {
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
          temperature: 0.35,
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

// Jawaban Cadangan Pintar (Offline-Resilient Fallback)
function generateSmartLocalAnswer(q) {
  const s = q.toLowerCase();
  if (s.includes('cbt') || s.includes('ujian') || s.includes('anti-cheat') || s.includes('terkunci') || s.includes('token')) {
    return `**Panduan Sistem Ujian CBT & Anti-Cheat SICIBINAGA:**
1. **Cara Mulai Ujian:** Masuk ke portal jenjang kelasmu (\`/kelas7\`, \`/kelas8\`, atau \`/kelas9\`), login dengan akun siswa, buka menu **Portal Ujian CBT**, pilih mata pelajaran, dan masukkan **Token Mulai** dari pengawas.
2. **Aturan Anti-Cheat:** Ujian wajib berjalan dalam mode **Layar Penuh (Fullscreen Lockdown)**. Dilarang keluar tab, membuka aplikasi lain, atau menggunakan *split-screen*.
3. **Solusi Jika Terkunci:** Jika layar ujian terkunci karena terdeteksi keluar layar, segera lapor ke **Pengawas / Guru** di kelas agar status akunmu di-*reset* melalui panel *Live Monitoring*.
4. **6 Tipe Soal:** Mendukung PG, PG Kompleks, Benar-Salah, Menjodohkan, Sebab-Akibat, dan Isian Singkat.`;
  }
  if (s.includes('lms') || s.includes('5 langkah') || s.includes('ruang belajar') || s.includes('modul')) {
    return `**Alur Belajar LMS Konstruktif 5 Langkah di SICIBINAGA:**
1. **Pengantar & Video Interaktif:** Menonton tayangan materi dan memahami konteks topik.
2. **Pilar Materi Inti:** Membaca poin-poin konsep utama yang ringkas dan terstruktur.
3. **Kartu Pintar 3D (Flashcard):** Melatih ingatan aktif (*Active Recall*) dengan membalik kartu tanya-jawab.
4. **Studi Kasus & Socratic AI Tutor:** Berdiskusi dengan AI yang memandu penalaran kritis lewat pertanyaan pemantik tanpa membocorkan kunci jawaban secara instan.
5. **Kuis Formatif Berpembahasan:** Evaluasi akhir modul untuk mendapatkan poin XP dan menaikkan progres belajar.`;
  }
  if (s.includes('arena') || s.includes('live') || s.includes('badge') || s.includes('level') || s.includes('pin')) {
    return `**Panduan Live Arena Quiz & Gamifikasi SICIBINAGA:**
- **Cara Gabung Live Arena:** Buka menu **Live Arena** di portal kelasmu, lalu masukkan **Kode PIN Room** yang ditampilkan Bapak/Ibu Guru di depan kelas.
- **Sistem Skor:** Kecepatan dan ketepatan menjawab menentukan posisimu di *Real-time Leaderboard*.
- **Gamifikasi Cendekia:** Kumpulkan XP dari LMS dan kuis untuk menaikkan **7 Level Cendekia** dan membuka **16 koleksi Bingkai Badge Avatar** keren di profilmu.`;
  }
  if (s.includes('guru') || s.includes('admin') || s.includes('soal') || s.includes('monitoring')) {
    return `**Panduan Panel Guru & Admin SICIBINAGA:**
1. Buka portal jenjang kelas yang diampu (\`/kelas7\`, \`/kelas8\`, atau \`/kelas9\`), lalu klik tombol **"Panel Guru / Admin"** di pojok kanan atas halaman login.
2. **Studio AI Guru:** Gunakan generator AI untuk merakit soal HOTS berstandar AKM/TKA beserta modul LMS 5 langkah secara otomatis.
3. **Kontrol & Live Monitoring:** Aktifkan saklar mapel CBT/LMS, kelola Token Ujian, pantau pelanggaran siswa secara *real-time*, dan unduh Leger Nilai ke Excel/Spreadsheet.`;
  }
  return `**Tentang Ekosistem Aplikasi SICIBINAGA (SMPN 3 Bangil):**
**SICIBINAGA** mengintegrasikan **Ruang Belajar 5 Langkah (LMS)**, **Ujian CBT Anti-Cheat**, dan **Live Arena Quiz** ke dalam 3 klaster portal mandiri:
- 🟢 **Kelas 7 (7A–7H):** [https://sicibinaga.my.id/kelas7](https://sicibinaga.my.id/kelas7) *(Tema Hijau Zamrud)*
- 🟡 **Kelas 8 (8A–8H):** [https://sicibinaga.my.id/kelas8](https://sicibinaga.my.id/kelas8) *(Tema Kuning Emerald)*
- 🔴 **Kelas 9 (9A–9H):** [https://sicibinaga.my.id/kelas9](https://sicibinaga.my.id/kelas9) *(Tema Crimson Red)*`;
}

// Helper Render Bubble Chat & Markdown
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
    <div class="msg-bubble">
      <div class="typing-indicator"><span></span><span></span><span></span></div>
    </div>
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

  // Code inline
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Bold & Italic
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  // Markdown Links [label](url)
  html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

  // Auto-link bare URLs
  html = html.replace(/(^|\s)(https?:\/\/[^\s<]+)/g, '$1<a href="$2" target="_blank" rel="noopener">$2</a>');

  // Process lines into paragraphs and lists
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
  toastTimeout = setTimeout(() => {
    t.classList.add('hidden');
  }, 2800);
}

window.addEventListener('DOMContentLoaded', () => {
  // Restore saved theme
  try {
    const savedTheme = localStorage.getItem('sicibinaga_theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
      const icon = document.getElementById('themeIcon');
      if (icon) icon.className = 'fa-solid fa-sun';
    }
  } catch (e) {}

  renderLastVisitBanner();

  // Check URL query parameter (?jenjang=7/8/9)
  const params = new URLSearchParams(window.location.search);
  const jenjang = params.get('jenjang') || params.get('kelas');
  if (jenjang && PORTAL_SERVERS[jenjang]) {
    openInAppView(jenjang);
  }
});
