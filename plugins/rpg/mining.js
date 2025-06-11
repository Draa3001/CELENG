module.exports = {
  name: 'mining',
  tags: ['rpg'],
  run: async (m, { conn, usedPrefix }) => {
    let user = global.db.data.users[m.sender]
    let hasil = {
      batu: Math.floor(Math.random() * 5),
      besi: Math.floor(Math.random() * 3),
      emas: Math.floor(Math.random() * 2)
    }
    user.batu = (user.batu || 0) + hasil.batu
    user.besi = (user.besi || 0) + hasil.besi
    user.emas = (user.emas || 0) + hasil.emas

    let teks = `⛏️ *Hasil Menambang:*
`
    teks += `🪨 Batu: ${hasil.batu}
`
    teks += `⛓️ Besi: ${hasil.besi}
`
    teks += `💰 Emas: ${hasil.emas}`
    m.reply(teks)
  }
}
