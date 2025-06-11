module.exports = {
  name: 'jual hp',
  tags: ['rpg'],
  run: async (m, { db }) => {
    const user = db.users[m.sender]
    if (!user || !user.hp || !user.hp.tipe) return m.reply('❌ Kamu tidak punya HP untuk dijual.')

    const harga = user.hp.tipe === 'android' ? 750000 : 3500000
    user.uang += harga
    const tipe = user.hp.tipe
    delete user.hp

    m.reply(`✅ HP ${tipe.toUpperCase()} berhasil dijual dan kamu mendapatkan Rp ${harga.toLocaleString()}`)
  }
}
