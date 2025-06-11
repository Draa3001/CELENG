
require('./system/config')
require('events').EventEmitter.defaultMaxListeners = 50
const pino = require('pino')
const path = require('path')
const colors = require('@colors/colors/safe')
const qrcode = require('qrcode-terminal')
const axios = require('axios')
const stable = require('json-stable-stringify')
const spinnies = new (require('spinnies'))()
const fs = require('fs')

const baileys = fs.existsSync('./node_modules/baileys') ? 'baileys' :
                fs.existsSync('./node_modules/@adiwajshing/baileys') ? '@adiwajshing/baileys' : 'bails'

const { useMultiFileAuthState, DisconnectReason, makeWASocket, makeInMemoryStore, fetchLatestBaileysVersion, useSingleFileAuthState } = require(baileys)

global.component = new (require('@neoxr/neoxr-js'))()
const { Extra, MongoDB, PostgreSQL } = component
const { Socket, Serialize, Scandir } = Extra

if (process.env.DATABASE_URL) MongoDB.db = global.database
global.props = /mongo/.test(process.env.DATABASE_URL || '') ? MongoDB :
               /postgres/.test(process.env.DATABASE_URL || '') ? PostgreSQL :
               new(require('./system/localdb'))(global.database)

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
store.readFromFile('./session/neoxr_store.json')
setInterval(() => store.writeToFile('./session/neoxr_store.json'), 10000)

const nomor = "6287831823978"  // Nomor default
// Tidak perlu kode pairing manual
const metode = process.env.PAIRING_METHOD || 'kode' // bisa diubah ke 'qr'

const connect = async () => {
   const { state, saveCreds } = await useMultiFileAuthState('session')
   const { version } = await fetchLatestBaileysVersion()
   const sock = makeWASocket({
      version,
      printQRInTerminal: metode === 'qr',
      auth: state,
      browser: ['MinNix', 'Chrome', '1.0.0'],
      logger: pino({ level: 'silent' }),
      syncFullHistory: true
   })

   store.bind(sock.ev)
   sock.ev.on('creds.update', saveCreds)

   if (metode === 'kode' && !sock.authState.creds.registered) {
      console.log(colors.green('📲 Memulai proses pairing via kode...'))
      let pairingCode = await sock.requestPairingCode(nomor)
      console.log(colors.cyan(`🔗 Masukkan kode ini di WhatsApp kamu: ${pairingCode}`))
   }

   sock.ev.on('connection.update', ({ connection, lastDisconnect }) => {
      if (connection === 'close') {
         let reason = new Boom(lastDisconnect?.error)?.output?.statusCode
         if (reason === DisconnectReason.loggedOut) {
            console.log(colors.red('🔌 Disconnected: Logged out.'))
            fs.rmSync('./session', { recursive: true, force: true })
         }
         connect()
      } else if (connection === 'open') {
         console.log(colors.green('✅ WhatsApp terhubung!'))
      }
   })
}

connect()
