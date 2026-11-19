# Nasi Lemak Pak Din - Website UMKM Mobile-First & Responsif

> **"Nasi Lemak Number 1 Jakarta"**  
> 📍 L Floor (Lobby Utama), K-Link Tower, Jl. Jend. Gatot Subroto Kav. 59A, Jakarta Selatan  
> ⏰ **Jam Operasional:** Senin – Jumat, 08.00 – 19.00 WIB (Weekend Tutup)  
> 👥 **Dikelola oleh:** Tansri, Nizam, Safwan, Amir, dan Haziq

---

## 📌 Tentang Proyek

Website statis mobile-first dan responsif untuk **UMKM Nasi Lemak Pak Din**, dirancang khusus untuk mempermudah karyawan tenant, mahasiswa, dan pengunjung di lingkungan **K-Link Tower Jakarta** dalam melihat katalog menu, menggunakan voucher diskon, dan memesan makanan secara praktis melalui WhatsApp, GoFood, atau GrabFood.

Proyek ini dibangun tanpa framework berat (hanya HTML5 murni, CSS3, Bootstrap 5 CDN, dan Vanilla JavaScript) sehingga memuat sangat cepat di perangkat seluler dan mudah dikembangkan bersama tim melalui GitHub.

---

## 🎨 Tema & Skema Warna Brand

| Warna | Hex Code | Penggunaan |
|---|---|---|
| **Hijau Tua Khas Logo** | `#1B4D3E` | Warna primer, navbar, heading, kartu utama, dan tombol aksi |
| **Krem / Putih Hangat** | `#FAF8F5` | Latar belakang website dan kartu informasi |
| **Kuning Keemasan** | `#D99B26` | Aksen kontras tinggi, badge diskon, bintang, dan sorotan harga |
| **Hijau WhatsApp** | `#25D366` | Tombol CTA order WhatsApp & floating button |

---

## ✨ Fitur-Fitur Utama

1. **Mobile-First & Responsif**:
   - Tampilan optimal di smartphone (iPhone/Android), tablet, maupun layar desktop.
   - Dilengkapi **Floating WhatsApp Button** dan **Floating Cart Button** dengan badge jumlah item.
2. **Katalog Menu Interaktif**:
   - **Pencarian Real-Time**: Pencarian instan berdasarkan nama menu, deskripsi, atau kategori.
   - **Filter Kategori**: Tombol filter dinamis (`Semua`, `Makanan`, `Minuman`).
   - Kartu menu menarik dengan gambar SVG lokal, label favorit/best seller, harga Rupiah, dan tombol *Tambah ke Keranjang*.
3. **Keranjang Belanja (Offcanvas Cart Drawer)**:
   - Tambah/kurang kuantitas item (`+` / `-`) dan tombol hapus (`trash`).
   - Perhitungan subtotal otomatis secara real-time.
   - State keranjang tersimpan otomatis di `localStorage` (pesanan tidak hilang saat refresh).
4. **Sistem Promo Voucher `KLINK10`**:
   - Khusus karyawan tenant dan mahasiswa K-Link Tower.
   - Memasukkan kode **`KLINK10`** otomatis memberikan **diskon 10%** dan menampilkan rincian potongan harga.
   - Tombol salin kode satu-klik dan tombol *Gunakan Sekarang* langsung di banner promo.
5. **Generator Format Order WhatsApp Otomatis**:
   - Form data pemesan: Nama, Unit/Lantai K-Link Tower (opsional), dan Catatan pesanan.
   - Menyusun pesan WhatsApp terstruktur dan rapi dengan rincian pemesan, daftar item, kuantitas, subtotal, potongan diskon voucher, dan total pembayaran.
6. **Alternatif Pesan Antar**:
   - Tautan langsung ke layanan GoFood dan GrabFood.
7. **Profil Tim & Brand Story**:
   - Mengenalkan kisah UMKM yang diprakarsai oleh Tansri, Nizam, Safwan, Amir, dan Haziq.
8. **Lokasi & Jam Buka Lengkap**:
   - Detail alamat L Floor (Lobby) K-Link Tower.
   - Peta interaktif Google Maps Embed responsif dan tombol buka rute di Google Maps.
   - Tautan ke Instagram resmi `@nasilemakpakdin`.

---

## 📂 Struktur Direktori

```text
PakDin Nasi Lemak/
├── index.html              # Halaman web utama (Single Page Application)
├── README.md               # Dokumentasi proyek & panduan kustomisasi
├── css/
│   └── style.css           # Styling kustom, variabel warna & responsivitas
├── js/
│   ├── data.js             # Data konfigurasi UMKM, daftar menu, harga & promo
│   └── app.js              # Logika filter, pencarian, keranjang, voucher & WA generator
└── assets/
    └── img/                # Asset gambar & logo vektor lokal
        ├── logo.svg
        ├── nasi-lemak-chicken.svg
        ├── nasi-lemak-egg.svg
        ├── teh-tarik.svg
        ├── coffee.svg
        └── iced-tea.svg
```

---

## 🚀 Cara Menjalankan Proyek Secara Lokal

Karena proyek ini merupakan website statis (HTML/CSS/JS), Anda dapat menjalankannya dengan beberapa cara mudah:

### Cara 1: Langsung Buka di Browser
Cukup klik ganda file `index.html` atau klik kanan lalu pilih **Open With Google Chrome / Microsoft Edge / Safari / Firefox**.

### Cara 2: Menggunakan VS Code Live Server (Direkomendasikan)
1. Buka folder proyek di **VS Code**.
2. Install ekstensi **Live Server**.
3. Klik kanan pada `index.html` lalu pilih **Open with Live Server**.
4. Website akan terbuka di `http://127.0.0.1:5500/`.

### Cara 3: Menggunakan Python HTTP Server
Buka terminal / PowerShell di direktori proyek, lalu jalankan:
```bash
python -m http.server 8000
```
Buka browser di `http://localhost:8000`.

---

## ⚙️ Panduan Kustomisasi untuk Tim UMKM

Seluruh data kontak, promo, harga, dan menu dipisahkan dengan rapi di dalam file **`js/data.js`**. Anda tidak perlu mengubah kode logika JavaScript yang rumit.

### 1. Mengganti Nomor WhatsApp Tujuan
Buka file `js/data.js` dan cari baris:
```javascript
whatsappNumber: "6281234567890", // Ganti dengan nomor WhatsApp UMKM Anda (gunakan awalan 62)
```
Ganti `"6281234567890"` dengan nomor WhatsApp admin yang aktif, misalnya `"6281298765432"`.

### 2. Mengubah / Menambah Menu & Harga
Buka file `js/data.js` pada array `MENU_ITEMS`:
```javascript
{
  id: "nl-chicken-egg",
  name: "Nasi Lemak + Chicken + Egg",
  category: "makanan",
  categoryLabel: "Makanan",
  price: 38000,                      // Ubah harga dalam Rupiah
  badge: "Best Seller",
  isFavorite: true,
  description: "Deskripsi menu lezat...",
  image: "assets/img/nasi-lemak-chicken.svg", // Path foto lokal
  photoUrl: "https://...link_foto_online...",
  prepTime: "5-10 menit"
}
```
Untuk menambahkan menu baru, cukup tambahkan objek baru ke dalam array `MENU_ITEMS`.

### 3. Mengganti Foto Produk dengan Foto Asli
1. Simpan foto produk Anda (format `.jpg`, `.png`, atau `.webp`) ke dalam folder `assets/img/`.
2. Ubah properti `image` di `js/data.js` sesuai nama file yang Anda simpan, contoh:
   ```javascript
   image: "assets/img/ayam-goreng-asli.jpg",
   ```

### 4. Mengubah Kode Voucher / Diskon
Buka file `js/data.js` pada bagian `promo`:
```javascript
promo: {
  code: "KLINK10",                  // Ganti kode voucher baru
  discountPercent: 10,             // Ganti persentase diskon
  description: "Diskon 10% Khusus Karyawan Tenant & Mahasiswa K-Link Tower"
}
```

### 5. Mengganti Tautan GoFood & GrabFood
Buka file `js/data.js`:
```javascript
gofoodUrl: "https://gofood.link/u/nasilemakpakdin",
grabfoodUrl: "https://grab.onelink.me/nasilemakpakdin",
```

---

## 🌐 Deploy ke GitHub Pages (Gratis & Cepat)

1. Buat repository baru di GitHub (misal: `nasilemak-pakdin`).
2. Push seluruh file proyek ke branch `main`:
   ```bash
   git init
   git add .
   git commit -m "feat: inisialisasi website UMKM Nasi Lemak Pak Din"
   git branch -M main
   git remote add origin https://github.com/USERNAME/nasilemak-pakdin.git
   git push -u origin main
   ```
3. Buka tab **Settings** di repository GitHub Anda.
4. Pilih menu **Pages** di sidebar kiri.
5. Pada bagian **Build and deployment > Branch**, pilih branch `main` dan folder `/ (root)`, lalu klik **Save**.
6. Dalam 1-2 menit website Anda sudah online di `https://USERNAME.github.io/nasilemak-pakdin/`!

---

## 📄 Hak Cipta & Lisensi

Proyek ini dibuat untuk mendukung digitalisasi UMKM **Nasi Lemak Pak Din**, K-Link Tower Jakarta.  
Hak Cipta &copy; 2024 **Nasi Lemak Pak Din**. Seluruh hak cipta dilindungi.
