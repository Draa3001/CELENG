module.exports = {
  name: 'leaderboard',
  tags: ['rpg'],
  run: async (m, { conn }) => {
    let users = Object.entries(global.db.data.users).map(([jid, data]) => {
      return { jid, uang: data.uang || 0 }
    }).sort((a, b) => b.uang - a.uang).slice(0, 10)

    let teks = `🏆 *Top 10 Pemain Terkaya:*

`
    for (let i = 0; i < users.length; i++) {
      teks += `${i + 1}. @${users[i].jid.split('@')[0]} — Rp${users[i].uang}
`
    }
    m.reply(teks, null, { mentions: users.map(v => v.jid) })
  }
}
