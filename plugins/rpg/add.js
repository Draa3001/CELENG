module.exports = {
  name: 'add',
  tags: ['owner'],
  owner: true,
  run: async (m, { text, db, isOwner }) => {
    if (!isOwner) return m.reply('❌ Hanya owner yang bisa menggunakan perintah ini.')

    let [key, jumlahRaw, mentionRaw] = text.trim().split(/\s+/)
    let jumlah = parseInt(jumlahRaw)
    let target = (m.mentionedJid && m.mentionedJid[0]) || (mentionRaw && mentionRaw.replace(/[^\d]/g, '') + '@s.whatsapp.net') || m.sender
    if (!key || isNaN(jumlah)) return m.reply(`✏️ Format: .add [tipe] [jumlah] @user\nContoh:\n.add uang 5000 @628xxxx\n.add exp 10000`)

    let user = db.users[target]
    if (!user) return m.reply('❌ Pengguna tidak ditemukan di database.')

    switch (key.toLowerCase()) {
      case 'uang':
        user.uang = (user.uang || 0) + jumlah
        break
      case 'exp':
        user.exp = (user.exp || 0) + jumlah
        break
      case 'limit':
        user.limit = (user.limit || 0) + jumlah
        break
      case 'atm':
        user.atm = (user.atm || 0) + jumlah
        break
      case 'crypto':
        user.crypto = user.crypto || {}
        user.crypto.default = (user.crypto.default || 0) + jumlah
        break
      default:
        return m.reply('❌ Tipe data tidak dikenal. Gunakan: uang, exp, limit, atm, crypto')
    }

    m.reply(`✅ Berhasil menambahkan ${jumlah} ke '${key}' milik @${target.split('@')[0]}`, null, { mentions: [target] })
  }
}
