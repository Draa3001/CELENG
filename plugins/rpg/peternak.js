module.exports = {
  name: 'peternak',
  tags: ['rpg'],
  run: async (m, { conn }) => {
    let user = global.db.data.users[m.sender]
    let hasil = {
      telur: Math.floor(Math.random() * 4),
      susu: Math.floor(Math.random() * 2)
    }
    user.telur = (user.telur || 0) + hasil.telur
    user.susu = (user.susu || 0) + hasil.susu

    let teks = `🐄 *Hasil Peternakan:*
🥚 Telur: ${hasil.telur}
🥛 Susu: ${hasil.susu}`
    m.reply(teks)
  }
}
