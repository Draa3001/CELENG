module.exports = {
  name: 'pvp',
  tags: ['rpg'],
  run: async (m, { conn, args }) => {
    let user = global.db.data.users[m.sender]
    let target = m.mentionedJid[0]
    if (!target) return m.reply('Tag pemain yang ingin kamu tantang!
Contoh: .pvp @user')

    let enemy = global.db.data.users[target]
    if (!enemy) return m.reply('Pemain tidak ditemukan.')

    let myAtk = (user.pedang || 1) * 10
    let enAtk = (enemy.pedang || 1) * 10

    let result = Math.random() < 0.5
    if (result) {
      user.uang += 500
      enemy.uang = Math.max((enemy.uang || 0) - 500, 0)
      m.reply(`⚔️ Kamu menang melawan musuh dan mendapat Rp500!
🪙 Uang sekarang: Rp${user.uang}`)
    } else {
      user.uang = Math.max((user.uang || 0) - 300, 0)
      enemy.uang += 300
      m.reply(`💥 Kamu kalah! Uangmu berkurang Rp300
🪙 Sisa uang: Rp${user.uang}`)
    }
  }
}
