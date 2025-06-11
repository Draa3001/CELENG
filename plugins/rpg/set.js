module.exports = {
  name: 'set',
  tags: ['owner'],
  owner: true,
  run: async (m, { text, db, isOwner }) => {
    if (!isOwner) return m.reply('❌ Hanya owner yang bisa menggunakan perintah ini.')

    let [key, jumlahRaw, mentionRaw] = text.trim().split(/\s+/)
    let jumlah = parseInt(jumlahRaw)
    let target = (m.mentionedJid && m.mentionedJid[0]) || (mentionRaw && mentionRaw.replace(/[^\d]/g, '') + '@s.whatsapp.net') || m.sender
    if (!key || isNaN(jumlah)) return m.reply(`✏️ Format: .set [tipe] [jumlah] @user\nContoh:\n.set uang 100000 @628xxxx\n.set exp 20000`)

    let user = db.users[target]
    if (!user) return m.reply('❌ Pengguna tidak ditemukan di database.')

    switch (key.toLowerCase()) {
      case 'uang':
        user.uang = jumlah
        break
      case 'exp':
        user.exp = jumlah
        break
      case 'limit':
        user.limit = jumlah
        break
      case 'atm':
        user.atm = jumlah
        break
      case 'crypto':
        user.crypto = user.crypto || {}
        user.crypto.default = jumlah
        break
      default:
        return m.reply('❌ Tipe data tidak dikenal. Gunakan: uang, exp, limit, atm, crypto')
    }

    m.reply(`✅ Nilai '${key}' milik @${target.split('@')[0]} berhasil diatur menjadi ${jumlah}`, null, { mentions: [target] })
  }
}
