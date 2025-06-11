const fetch = require('node-fetch');

module.exports = {
  name: 'crypto',
  tags: ['rpg'],
  run: async (m) => {
    try {
      const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin,solana,cardano,ripple,binancecoin,tron,litecoin,polkadot,stellar,chainlink&vs_currencies=idr');
      const json = await res.json();
      if (!json) throw 'Gagal ambil data crypto.'
      let msg = `📈 *Harga Crypto Real-Time (IDR):*\n`
      const toName = {
        bitcoin: "Bitcoin (BTC)",
        ethereum: "Ethereum (ETH)",
        dogecoin: "Dogecoin (DOGE)",
        solana: "Solana (SOL)",
        cardano: "Cardano (ADA)",
        ripple: "Ripple (XRP)",
        binancecoin: "Binance Coin (BNB)",
        tron: "TRON (TRX)",
        litecoin: "Litecoin (LTC)",
        polkadot: "Polkadot (DOT)",
        stellar: "Stellar (XLM)",
        chainlink: "Chainlink (LINK)"
      }
      for (let id in json) {
        let harga = json[id].idr.toLocaleString()
        msg += `- ${toName[id]}: Rp ${harga}\n`
      }
      msg += `\n💡 Gunakan perintah: .beli crypto [jenis] [jumlah] / .jual crypto [jenis] [jumlah]`
      m.reply(msg)
    } catch (e) {
      console.error(e)
      m.reply('❌ Gagal mengambil data crypto secara real-time.')
    }
  }
}
