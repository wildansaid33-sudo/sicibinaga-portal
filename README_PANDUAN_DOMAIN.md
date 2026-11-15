# PORTAL UTAMA SICIBINAGA • TKA READY (`sicibinaga.my.id`)
**UPTD SMP Negeri 3 Bangil — Ekosistem Pembelajaran Konstruktif (LMS), Live Arena & Asesmen CBT**

Paket ini berisi kode sumber lengkap **Halaman Landing (Homepage) Resmi SICIBINAGA** beserta **Logo Resmi SICIBINAGA (TKA Ready)** dan konfigurasi penyatuan domain tunggal **`sicibinaga.my.id`** untuk ketiga klaster server:
- **Jenjang Kelas 7**: `https://sicibinaga7.vercel.app`
- **Jenjang Kelas 8**: `https://sicibinaga8.vercel.app`
- **Jenjang Kelas 9**: `https://sicibinaga9.vercel.app`

---

## Struktur File di Dalam ZIP
1. `index.html` — Halaman utama (Landing Page) berdesain modern, responsif, dilengkapi Pintasan Rombel (7A–9H), Pemilih 3 Klaster Jenjang, Diagram Arsitektur Multi-Database, dan Peluncur Portal Layar Penuh.
2. `style.css` — Stylesheet modern bernuansa *Royal Gold & Deep Emerald* (selaras dengan logo resmi SICIBINAGA TKA Ready) lengkap dengan dukungan *Dark Mode* dan *Mobile-First*.
3. `script.js` — Logika interaktif pemilihan rombel, pratinjau portal *in-page*, deteksi parameter URL (`?jenjang=7/8/9`), dan penyalin tautan cepat.
4. `vercel.json` — Konfigurasi *Reverse-Proxy Rewrites* otomatis untuk menyatukan ketiga aplikasi di bawah satu domain `sicibinaga.my.id`.
5. `assets/logo-sicibinaga.png` & `assets/logo-sicibinaga-hero.jpg` & `favicon.png` — Aset logo resmi SICIBINAGA yang sudah dioptimasi.

---

## Cara Menyatukan Ketiga Aplikasi ke Satu Domain `sicibinaga.my.id`

Anda **TIDAK PERLU** menggabungkan Spreadsheet, Supabase, ataupun API Key AI. Biarkan ketiga aplikasi (`sicibinaga7`, `sicibinaga8`, `sicibinaga9`) tetap terpisah agar kuota database dan AI tetap 3x lipat lebih lega.

Gunakan salah satu dari **2 skema penyatuan domain** berikut:

### Skema A: Satu Domain Utama dengan Sub-Path (`sicibinaga.my.id/kelas7`, `/kelas8`, `/kelas9`)
1. Buat project baru di Vercel (atau unggah ke GitHub lalu *Import Project* di Vercel) berisi seluruh file dari ZIP ini.
2. Buka project tersebut di Dashboard Vercel &rarr; klik tab **Settings** &rarr; **Domains**.
3. Ketik **`sicibinaga.my.id`** lalu klik **Add**.
4. Masuk ke panel manajemen DNS tempat Anda membeli domain `sicibinaga.my.id` (misalnya Rumahweb, Niagahoster, IDCloudHost, atau Cloudflare), lalu tambahkan record berikut:
   - **Type `A`** | Host: `@` | Value: `76.76.21.21`
   - **Type `CNAME`** | Host: `www` | Value: `cname.vercel-dns.com`
5. Karena di dalam paket ini sudah ada file `vercel.json`, maka otomatis:
   - `https://sicibinaga.my.id` menampilkan **Landing Page Utama SICIBINAGA**
   - `https://sicibinaga.my.id/kelas7` menampilkan aplikasi **`sicibinaga7.vercel.app`**
   - `https://sicibinaga.my.id/kelas8` menampilkan aplikasi **`sicibinaga8.vercel.app`**
   - `https://sicibinaga.my.id/kelas9` menampilkan aplikasi **`sicibinaga9.vercel.app`**

### Skema B: Satu Domain Utama + Subdomain per Jenjang (`kelas7.sicibinaga.my.id`, dll.)
Jika Anda ingin setiap project Vercel memiliki subdomain sendiri di bawah `sicibinaga.my.id`:
1. Pasang domain `sicibinaga.my.id` pada project Landing Page ini.
2. Buka project **`sicibinaga7`** di Vercel &rarr; **Settings** &rarr; **Domains** &rarr; tambahkan **`kelas7.sicibinaga.my.id`**.
3. Buka project **`sicibinaga8`** di Vercel &rarr; **Settings** &rarr; **Domains** &rarr; tambahkan **`kelas8.sicibinaga.my.id`**.
4. Buka project **`sicibinaga9`** di Vercel &rarr; **Settings** &rarr; **Domains** &rarr; tambahkan **`kelas9.sicibinaga.my.id`**.
5. Pada panel DNS domain `.my.id` Anda, tambahkan 3 `CNAME` record:
   - `CNAME` | Host: `kelas7` | Target: `cname.vercel-dns.com`
   - `CNAME` | Host: `kelas8` | Target: `cname.vercel-dns.com`
   - `CNAME` | Host: `kelas9` | Target: `cname.vercel-dns.com`
