module.exports = {
    name: 'buy',
    tags: ['rpg'],
    run: async (m, { conn, args }) => {
        const user = global.db.data.users[m.sender] = global.db.data.users[m.sender] || {};
        const item = args[0]?.toLowerCase();
        const shop = {
            potion: 100,
            sword: 500,
            armor: 750
        };
        if (!item || !(item in shop)) return m.reply('Please specify an item to buy: potion, sword, or armor.');
        if ((user.money || 0) < shop[item]) return m.reply('Not enough money.');
        user.money -= shop[item];
        user.inventory = user.inventory || [];
        user.inventory.push(item);
        m.reply(`✅ You bought a ${item}.`);
    }
};
