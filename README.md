# pendaftaran-mahasiswa

---

# 📘 Pendaftaran Mahasiswa Baru

Sebuah aplikasi pendaftaran mahasiswa baru berbasis web yang dibangun dengan HTML, CSS, dan JavaScript, serta menggunakan **Netlify Functions** (serverless) untuk menghasilkan **PDF bukti pendaftaran** secara otomatis.

---

## ✨ Fitur Utama

- Formulir pendaftaran lengkap (nama, tanggal lahir, jenis kelamin, alamat, email, no. telpon, program studi, pas foto).
- Upload pas foto langsung dari browser.
- Setelah submit, pengguna diarahkan ke halaman **success**.
- Tombol untuk mengunduh **bukti pendaftaran berformat PDF**.
- PDF dibuat secara **dinamis menggunakan `pdf-lib`** dan disediakan via **Netlify Functions**.

---

## 🛠️ Teknologi yang Digunakan

- HTML5, CSS3, Vanilla JavaScript
- [Lucide Icons](https://lucide.dev/)
- [pdf-lib](https://pdf-lib.js.org/) untuk generate PDF
- [Netlify Functions](https://docs.netlify.com/functions/overview/)
- Hosted dan dideploy dengan [Netlify](https://netlify.com)

---

## 📁 Struktur Direktori

```

pendaftaran-netlify/
├── index.html              # Halaman form pendaftaran
├── success.html            # Halaman konfirmasi dan download PDF
├── style.css               # Styling halaman
├── script.js               # Logika interaksi dan Netlify call
├── netlify.toml            # Konfigurasi fungsi Netlify
├── package.json            # Dependency utama (pdf-lib)
└── netlify/
└── functions/
└── prosesPendaftaran.js   # Netlify Function untuk generate PDF

````

---

## 🚀 Cara Menjalankan di Lokal

1. Pastikan sudah menginstall [Node.js](https://nodejs.org)
2. Clone repo ini:
   ```bash
   git clone https://github.com/username/pendaftaran-netlify.git
   cd pendaftaran-netlify
   ````

3. Install dependency:

   ```bash
   npm install
   ```
4. Jalankan secara lokal dengan [Netlify CLI](https://docs.netlify.com/cli/get-started/):

   ```bash
   npm install -g netlify-cli
   netlify dev
   ```

---

## 🌐 Cara Deploy ke Netlify

1. Login ke Netlify dan buat project baru.
2. Hubungkan ke repo GitHub ini.
3. Set konfigurasi build:

   * **Build Command**: (kosongkan)
   * **Publish Directory**: `.`
4. Netlify akan otomatis membaca `netlify/functions/` sebagai serverless functions.
5. Selesai! Aplikasi siap digunakan dan PDF bisa di-generate live!

---

## 📌 Catatan

* PDF hanya bisa diunduh setelah submit berhasil.
* PDF tidak akan auto-download, tapi hanya saat klik tombol **"Unduh PDF"** di `success.html`.

---
