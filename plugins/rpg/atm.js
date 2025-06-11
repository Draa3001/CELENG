module.exports = {
  name: 'atm',
  tags: ['rpg'],
  run: async (m, { conn, args, usedPrefix }) => {
    let user = global.db.data.users[m.sender]
    let cmd = args[0]
    let jumlah = parseInt(args[1])
    user.uang = user.uang || 0
    user.bank = user.bank || 0

    if (!cmd) return m.reply(`Gunakan:
${usedPrefix}bank simpan 1000
${usedPrefix}bank tarik 500
${usedPrefix}bank cek`)

    if (cmd === 'nabung') {
      if (isNaN(jumlah) || jumlah <= 0) return m.reply('Jumlah tidak valid.')
      if (user.uang < jumlah) return m.reply('Uang kamu tidak cukup.')
      user.uang -= jumlah
      user.bank += jumlah
      m.reply(`💰 Berhasil menyimpan Rp${jumlah} ke bank.`)
    } else if (cmd === 'tarik') {
      if (isNaN(jumlah) || jumlah <= 0) return m.reply('Jumlah tidak valid.')
      if (user.bank < jumlah) return m.reply('Saldo bank tidak cukup.')
      user.bank -= jumlah
      user.uang += jumlah
      m.reply(`💸 Berhasil menarik Rp${jumlah} dari bank.`)
    } else if (cmd === 'cek') {
      m.reply(`🏦 Saldo Bank:
💰 Uang: Rp${user.uang}
🏛️ Bank: Rp${user.bank}`)
    } else {
      m.reply('Perintah tidak dikenali.')
    }
  }
}
