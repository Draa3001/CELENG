exports.run = {
   usage: ['owner'],
   category: 'special',
   async: async (m, {
      client
   }) => {
      client.sendContact(m.chat, [{
         name: global.owner_name,
         number: global.owner,
         about: 'Owner & Creator'
      }], m, {
         org: '𝙼𝚒𝚗𝙽𝚒𝚡 Network',
         website: 'https://neoxr.my.id',
         email: 'admin@neoxr.my.id'
      })
   },
   error: false,
   cache: true,
   location: __filename
}