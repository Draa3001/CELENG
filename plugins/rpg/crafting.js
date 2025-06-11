module.exports = {
  name: 'crafting',
  tags: ['rpg'],
  run: async (m, { conn, args, usedPrefix }) => {
    let user = global.db.data.users[m.sender]
    let item = (args[0] || '').toLowerCase()
    if (!item) return m.reply(`Gunakan seperti ini:
${usedPrefix}crafting pedang`)

    let hasil = ''
    if (item === 'pedang') {
      if ((user.kayu || 0) >= 5 && (user.besi || 0) >= 3) {
        user.kayu -= 5
        user.besi -= 3
        user.pedang = (user.pedang || 0) + 1
        hasil = '🗡️ Kamu berhasil membuat 1 Pedang!'
      } else {
        hasil = 'Bahan tidak cukup! Butuh 5 Kayu & 3 Besi.'
      }
    } else {
      hasil = 'Item tidak dikenali. Contoh: pedang'
    }

    m.reply(hasil)
  }
}
