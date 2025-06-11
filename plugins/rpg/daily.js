module.exports = {
  name: 'daily',
  tags: ['rpg'],
  cooldown: 86400000, // 24 jam
  run: async (m, { conn }) => {
    let user = global.db.data.users[m.sender]
    let hadiah = 2500
    user.uang = (user.uang || 0) + hadiah
    m.reply(`🎁 Kamu telah klaim harian dan mendapatkan Rp${hadiah.toLocaleString('id-ID')}`)
  }
}
