module.exports = {
    name: 'hunt',
    tags: ['rpg'],
    cooldown: 60000, // 1 minute cooldown
    run: async (m, { conn }) => {
        const user = global.db.data.users[m.sender] = global.db.data.users[m.sender] || {};
        const foundItem = ['bone', 'feather', 'gold'].sort(() => 0.5 - Math.random())[0];
        user.inventory = user.inventory || [];
        user.inventory.push(foundItem);
        user.exp = (user.exp || 0) + 10;
        m.reply(`🗡️ You went hunting and found a ${foundItem}! (+10 EXP)`);
    }
};
