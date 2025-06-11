module.exports = {
  name: 'berburu',
  tags: ['rpg'],
  run: async (m, { conn }) => {
    let user = global.db.data.users[m.sender]
    let hewan = ['🦌 Rusa', '🐗 Babi Hutan', '🐇 Kelinci', '🐍 Ular', '🐓 Ayam Hutan']
    let hasil = hewan[Math.floor(Math.random() * hewan.length)]
    user.hewan = (user.hewan || [])
    user.hewan.push(hasil)
    m.reply(`🏹 Kamu berburu dan mendapatkan: ${hasil}`)
  }
}
