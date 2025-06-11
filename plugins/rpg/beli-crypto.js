module.exports = {
  name: 'beli crypto',
  tags: ['rpg'],
  run: async (m, { text, db }) => {
    const [jenis, jumlahStr] = text.trim().split(' ')
    const jumlah = parseFloat(jumlahStr)
    if (!jenis || isNaN(jumlah) || jumlah <= 0) return m.reply('⚠️ Format salah!
Contoh: .beli crypto bitcoin 0.05')

    const user = db.users[m.sender]
    if (!user) return m.reply('❌ Data pengguna tidak ditemukan.')

    try {
      const fetch = require('node-fetch')
      const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${jenis}&vs_currencies=idr`)
      const json = await res.json()
      if (!json || !json[jenis]) return m.reply('❌ Crypto tidak ditemukan.')
      const harga = json[jenis].idr
      const total = harga * jumlah

      if (user.uang < total) return m.reply(`💸 Uang kamu tidak cukup. Butuh Rp ${total.toLocaleString()}`)

      user.uang -= total
      user.crypto = user.crypto || {}
      user.crypto[jenis] = (user.crypto[jenis] || 0) + jumlah

      m.reply(`✅ Berhasil beli ${jumlah} ${jenis.toUpperCase()} seharga Rp ${harga.toLocaleString()} / unit
💰 Total: Rp ${total.toLocaleString()}`)
    } catch (e) {
      console.error(e)
      m.reply('❌ Gagal membeli crypto.')
    }
  }
}
