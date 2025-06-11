module.exports = {
  name: 'kebun',
  tags: ['rpg'],
  run: async (m, { conn }) => {
    let user = global.db.data.users[m.sender]
    let hasil = {
      apel: Math.floor(Math.random() * 5),
      jagung: Math.floor(Math.random() * 3)
    }
    user.apel = (user.apel || 0) + hasil.apel
    user.jagung = (user.jagung || 0) + hasil.jagung

    let teks = `🌾 *Hasil Berkebun:*
🍎 Apel: ${hasil.apel}
🌽 Jagung: ${hasil.jagung}`
    m.reply(teks)
  }
}
