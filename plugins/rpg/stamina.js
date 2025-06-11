module.exports = {
  name: 'stamina',
  tags: ['rpg'],
  run: async (m, { conn }) => {
    let user = global.db.data.users[m.sender]
    user.stamina = user.stamina || 100
    m.reply(`⚡ Stamina kamu saat ini: ${user.stamina}/100`)
  }
}
