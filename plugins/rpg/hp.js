
export const hpList = [
  {
    nama: "Android",
    harga: 1500000,
    spesifikasi: {
      ram: "6GB",
      storage: "128GB",
      kamera: "48MP",
      aplikasi: ["kamera", "pesan", "musik", "Dana", "GoPay", "OVO", "GoFood", "GrabFood"]
    }
  },
  {
    nama: "iPhone",
    harga: 20000000,
    spesifikasi: {
      ram: "8GB",
      storage: "256GB",
      kamera: "108MP",
      aplikasi: ["kamera", "pesan", "musik", "Dana", "GoPay", "OVO", "PayPal", "Apple Pay", "GoFood", "GrabFood", "ShopeeFood"]
    }
  },
  {
    nama: "iPhone Pro Max",
    harga: 50000000,
    spesifikasi: {
      ram: "12GB",
      storage: "1TB",
      kamera: "200MP",
      aplikasi: ["kamera", "pesan", "musik", "Dana", "GoPay", "OVO", "PayPal", "Apple Pay", "Google Pay", "Samsung Pay", "GoFood", "GrabFood", "ShopeeFood", "TravelokaEats"]
    }
  }
];

let inventoriHP = {}; // Simulasi penyimpanan HP milik pengguna

export function lihatHP() {
  return hpList.map(hp => {
    return `📱 ${hp.nama}\n💵 Harga: Rp${hp.harga.toLocaleString()}\n📊 RAM: ${hp.spesifikasi.ram}, Storage: ${hp.spesifikasi.storage}, Kamera: ${hp.spesifikasi.kamera}\n📱 Aplikasi: ${hp.spesifikasi.aplikasi.join(", ")}`;
  }).join("\n\n");
}

export function beliHP(namaHP, uang, userId) {
  const hp = hpList.find(item => item.nama.toLowerCase() === namaHP.toLowerCase());
  if (!hp) return "❌ Handphone tidak ditemukan.";
  if (uang < hp.harga) return `❌ Uang kamu tidak cukup untuk membeli ${hp.nama}.`;

  inventoriHP[userId] = hp;
  return `✅ Kamu berhasil membeli ${hp.nama} seharga Rp${hp.harga.toLocaleString()}`;
}

export function bukaAplikasi(userId, namaApp) {
  const hp = inventoriHP[userId];
  if (!hp) return "❌ Kamu belum memiliki handphone.";
  if (!hp.spesifikasi.aplikasi.map(a => a.toLowerCase()).includes(namaApp.toLowerCase())) {
    return `❌ Aplikasi '${namaApp}' tidak tersedia di ${hp.nama}.`;
  }
  return `📲 Kamu membuka aplikasi '${namaApp}' di ${hp.nama}.`;
}
