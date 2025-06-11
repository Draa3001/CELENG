module.exports = {
  name: 'jual crypto',
  tags: ['rpg'],
  run: async (m, { text, db }) => {
    const [jenis, jumlahStr] = text.trim().split(' ')
    const jumlah = parseFloat(jumlahStr)
    if (!jenis || isNaN(jumlah) || jumlah <= 0) return m.reply('⚠️ Format salah!
Contoh: .jual crypto bitcoin 0.1')

    const user = db.users[m.sender]
    if (!user || !user.crypto || !user.crypto[jenis] || user.crypto[jenis] < jumlah)
      return m.reply('❌ Kamu tidak punya cukup crypto untuk dijual.')

    try {
      const fetch = require('node-fetch')
      const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${jenis}&vs_currencies=idr`)
      const json = await res.json()
      if (!json || !json[jenis]) return m.reply('❌ Crypto tidak ditemukan.')
      const harga = json[jenis].idr
      const total = harga * jumlah

      user.crypto[jenis] -= jumlah
      if (user.crypto[jenis] <= 0) delete user.crypto[jenis]
      user.uang += total

      m.reply(`✅ Berhasil jual ${jumlah} ${jenis.toUpperCase()} seharga Rp ${harga.toLocaleString()} / unit
💰 Total diterima: Rp ${total.toLocaleString()}`)
    } catch (e) {
      console.error(e)
      m.reply('❌ Gagal menjual crypto.')
    }
  }
}
