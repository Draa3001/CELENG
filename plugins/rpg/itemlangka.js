module.exports = {
  name: 'itemlangka',
  tags: ['rpg'],
  run: async (m, { conn }) => {
    let user = global.db.data.users[m.sender]
    if (Math.random() < 0.3) {
      user.itemlangka = (user.itemlangka || 0) + 1
      m.reply('🎁 Selamat! Kamu menemukan 1 Item Langka!')
    } else {
      m.reply('🚫 Tidak menemukan item langka kali ini.')
    }
  }
}
