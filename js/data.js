/**
 * Nasi Lemak Pak Din - Data Configuration
 * Menyimpan data menu, harga, promo voucher, dan informasi UMKM
 */

const CONFIG = {
  storeName: "Nasi Lemak Pak Din",
  tagline: "Nasi Lemak Number 1 Jakarta",
  location: "L Floor (Lobby), K-Link Tower, Jl. Gatot Subroto, Jakarta Selatan",
  locationDetail: "Gedung K-Link Tower, Lantai L (Lobby Utama), Jl. Jend. Gatot Subroto Kav. 59A, Kuningan Timur, Setiabudi, Jakarta Selatan 12950",
  hours: "Senin – Jumat, 08.00 – 19.00 WIB",
  hoursNote: "Sabtu, Minggu & Hari Libur Nasional Tutup",
  whatsappNumber: "6281234567890", // Ganti dengan nomor WhatsApp aktif UMKM Pak Din
  instagramHandle: "nasilemakpakdin",
  instagramUrl: "https://instagram.com/nasilemakpakdin",
  googleMapsUrl: "https://maps.google.com/?q=K-Link+Tower+Jakarta",
  gofoodUrl: "https://gofood.link/u/nasilemakpakdin", // Ganti dengan link GoFood resmi
  grabfoodUrl: "https://grab.onelink.me/nasilemakpakdin", // Ganti dengan link GrabFood resmi
  
  // Promo Spesial
  promo: {
    code: "KLINK10",
    discountPercent: 10,
    description: "Diskon 10% Khusus Karyawan Tenant & Mahasiswa K-Link Tower",
    minPurchase: 0
  },

  // Tim Pengelola UMKM
  team: [
    { name: "Tansri", role: "Co-Founder & Operasional" },
    { name: "Nizam", role: "Co-Founder & Resep Sambal" },
    { name: "Safwan", role: "Co-Founder & Quality Control" },
    { name: "Amir", role: "Co-Founder & Pelayanan Pelanggan" },
    { name: "Haziq", role: "Co-Founder & Manajemen Logistik" }
  ]
};

const MENU_ITEMS = [
  {
    id: "nl-chicken-egg",
    name: "Nasi Lemak + Chicken + Egg",
    category: "makanan",
    categoryLabel: "Makanan",
    price: 38000,
    badge: "Best Seller",
    isFavorite: true,
    description: "Menu signature paling laris! Nasi lemak kukus santan & pandan wangi, ayam goreng rempah berempah gurih renyah, telur rebus, sambal bilis pedas manis otentik, timun, kacang & ikan bilis.",
    image: "assets/img/nasi-lemak-chicken.svg",
    photoUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=700&q=80",
    prepTime: "5-10 menit"
  },
  {
    id: "nl-egg",
    name: "Nasi Lemak + Egg",
    category: "makanan",
    categoryLabel: "Makanan",
    price: 24000,
    badge: "Klasik Hemat",
    isFavorite: false,
    description: "Pilihan sarapan dan makan siang praktis bernutrisi. Nasi gurih pandan santan berlimpah sambal bilis khas Pak Din, disajikan dengan telur rebus segar, irisan timun, kacang goreng, dan ikan bilis garing.",
    image: "assets/img/nasi-lemak-egg.svg",
    photoUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=80",
    prepTime: "3-5 menit"
  },
  {
    id: "teh-tarik",
    name: "Teh Tarik",
    category: "minuman",
    categoryLabel: "Minuman",
    price: 15000,
    badge: "Khas Melayu",
    isFavorite: true,
    description: "Teh hitam pekat premium berbusa lembut khas kopitiam Melayu, ditarik sempurna dengan susu kental manis gurih legit. Pas dinikmati hangat atau dengan es batu segar.",
    image: "assets/img/teh-tarik.svg",
    photoUrl: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=700&q=80",
    prepTime: "2-3 menit"
  },
  {
    id: "coffee",
    name: "Coffee (Kopi O / Kopi Susu)",
    category: "minuman",
    categoryLabel: "Minuman",
    price: 15000,
    badge: "Booster Kerja",
    isFavorite: false,
    description: "Kopi robusta aromatik seduh tradisional kopitiam dengan aroma sangrai mendalam. Teman setia pengusir kantuk untuk rapat & kerja harian di K-Link Tower.",
    image: "assets/img/coffee.svg",
    photoUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80",
    prepTime: "2-3 menit"
  },
  {
    id: "iced-sweet-tea",
    name: "Iced Sweet Tea",
    category: "minuman",
    categoryLabel: "Minuman",
    price: 8000,
    badge: "Segar Dingin",
    isFavorite: false,
    description: "Es teh manis segar pelepas dahaga, diseduh dari daun teh wangi berkualitas dengan takaran manis pas dan es batu melimpah. Segar seketika di siang terik Jakarta.",
    image: "assets/img/iced-tea.svg",
    photoUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=700&q=80",
    prepTime: "1-2 menit"
  }
];

// Helper format Rupiah
function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(number);
}
