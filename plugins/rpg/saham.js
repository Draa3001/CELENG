const fetch = require('node-fetch');

module.exports = {
  name: 'saham',
  tags: ['rpg'],
  run: async (m) => {
    try {
      const res = await fetch('https://api.stockapi.co.id/v1/quotes/idx?symbols=BBRI,BBCA,TLKM,BMRI,UNVR,ASII,ANTM,ADRO,MDKA,GOTO', {
        headers: {
          'x-api-key': 'd0toeo9r01qlvahde9l0d0toeo9r01qlvahde9lg'
        }
      });
      const json = await res.json();
      if (!json || !json.data) throw 'Gagal ambil data saham.'
      let msg = '📊 *Harga Saham Real-Time:*
'
      for (let saham of json.data) {
        msg += `- ${saham.symbol}: Rp ${saham.price.toLocaleString()} / lembar\n`
      }
      msg += '\n💡 Gunakan perintah: .beli saham [kode] [jumlah] / .jual saham [kode] [jumlah]'
      m.reply(msg)
    } catch (e) {
      console.error(e)
      m.reply('❌ Gagal mengambil data saham secara real-time.')
    }
  }
}
