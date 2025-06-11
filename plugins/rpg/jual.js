module.exports = {
  name: 'jual',
  tags: ['rpg'],
  run: async (m, { conn, args, usedPrefix }) => {
    let user = global.db.data.users[m.sender]
    let item = (args[0] || '').toLowerCase()
    let jumlah = parseInt(args[1])

    if (!item || isNaN(jumlah) || jumlah <= 0) {
      return m.reply(`Gunakan: ${usedPrefix}jual [item] [jumlah]
Contoh: ${usedPrefix}jual apel 3`)
    }

    let harga = {
      apel: 100,
      jagung: 150,
      telur: 120,
      susu: 300,
      batu: 50,
      besi: 120,
      emas: 500
    }

    if (!(item in harga)) return m.reply('Item tidak bisa dijual.')

    user[item] = user[item] || 0
    if (user[item] < jumlah) return m.reply(`Kamu tidak punya cukup ${item}`)

    let total = jumlah * harga[item]
    user[item] -= jumlah
    user.uang = (user.uang || 0) + total

    m.reply(`🛒 Kamu menjual ${jumlah} ${item} seharga Rp${total}`)
  }
}
