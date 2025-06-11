module.exports = {
  name: 'beli saham',
  tags: ['rpg'],
  run: async (m, { text, db }) => {
    const [kode, jumlahStr] = text.trim().split(' ')
    const jumlah = parseInt(jumlahStr)
    if (!kode || isNaN(jumlah) || jumlah <= 0) return m.reply('⚠️ Format salah!
Contoh: .beli saham BBRI 10')

    const user = db.users[m.sender]
    if (!user) return m.reply('❌ Data pengguna tidak ditemukan.')

    try {
      const fetch = require('node-fetch')
      const res = await fetch(`https://api.stockapi.co.id/v1/quotes/idx?symbols=${kode.toUpperCase()}`, {
        headers: { 'x-api-key': 'd0toeo9r01qlvahde9l0d0toeo9r01qlvahde9lg' }
      });
      const json = await res.json()
      if (!json || !json.data || json.data.length === 0) return m.reply('❌ Saham tidak ditemukan.')
      const harga = json.data[0].price
      const total = harga * jumlah

      if (user.uang < total) return m.reply(`💸 Uang kamu tidak cukup. Butuh Rp ${total.toLocaleString()}`)

      user.uang -= total
      user.saham = user.saham || {}
      user.saham[kode.toUpperCase()] = (user.saham[kode.toUpperCase()] || 0) + jumlah

      m.reply(`✅ Berhasil beli ${jumlah} lembar saham ${kode.toUpperCase()} seharga Rp ${harga.toLocaleString()} per lembar.
💰 Total: Rp ${total.toLocaleString()}`)
    } catch (e) {
      console.error(e)
      m.reply('❌ Gagal membeli saham.')
    }
  }
}
