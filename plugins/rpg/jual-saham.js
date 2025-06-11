module.exports = {
  name: 'jual saham',
  tags: ['rpg'],
  run: async (m, { text, db }) => {
    const [kode, jumlahStr] = text.trim().split(' ')
    const jumlah = parseInt(jumlahStr)
    if (!kode || isNaN(jumlah) || jumlah <= 0) return m.reply('⚠️ Format salah!
Contoh: .jual saham BBRI 5')

    const user = db.users[m.sender]
    if (!user || !user.saham || !user.saham[kode.toUpperCase()] || user.saham[kode.toUpperCase()] < jumlah)
      return m.reply('❌ Kamu tidak punya cukup saham untuk dijual.')

    try {
      const fetch = require('node-fetch')
      const res = await fetch(`https://api.stockapi.co.id/v1/quotes/idx?symbols=${kode.toUpperCase()}`, {
        headers: { 'x-api-key': 'd0toeo9r01qlvahde9l0d0toeo9r01qlvahde9lg' }
      });
      const json = await res.json()
      if (!json || !json.data || json.data.length === 0) return m.reply('❌ Saham tidak ditemukan.')
      const harga = json.data[0].price
      const total = harga * jumlah

      user.saham[kode.toUpperCase()] -= jumlah
      if (user.saham[kode.toUpperCase()] <= 0) delete user.saham[kode.toUpperCase()]
      user.uang += total

      m.reply(`✅ Berhasil jual ${jumlah} lembar saham ${kode.toUpperCase()} seharga Rp ${harga.toLocaleString()} per lembar.
💰 Total diterima: Rp ${total.toLocaleString()}`)
    } catch (e) {
      console.error(e)
      m.reply('❌ Gagal menjual saham.')
    }
  }
}
