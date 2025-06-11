module.exports = {
  name: 'beli hp',
  tags: ['rpg'],
  run: async (m, { text, db }) => {
    const tipe = text.trim().toLowerCase()
    if (!tipe || (tipe !== 'android' && tipe !== 'iphone')) return m.reply('⚠️ Pilih tipe HP yang tersedia:
• android (Rp 1.500.000)
• iphone (Rp 7.000.000)

Contoh: .beli hp android')

    const user = db.users[m.sender]
    if (!user) return m.reply('❌ Data pengguna tidak ditemukan.')

    const harga = tipe === 'android' ? 1500000 : 7000000
    if (user.uang < harga) return m.reply(`💸 Uang kamu tidak cukup. Butuh Rp ${harga.toLocaleString()}`)

    if (user.hp && user.hp.tipe) return m.reply(`📱 Kamu sudah punya HP (${user.hp.tipe}). Jual dulu sebelum beli yang baru.`)

    user.uang -= harga
    user.hp = { tipe }

    m.reply(`✅ Berhasil membeli HP tipe ${tipe.toUpperCase()} seharga Rp ${harga.toLocaleString()}`)
  }
}
