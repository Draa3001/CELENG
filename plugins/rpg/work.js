module.exports = {
    name: 'work',
    tags: ['rpg'],
    cooldown: 3600000, // 1 hour
    run: async (m, { conn }) => {
        const user = global.db.data.users[m.sender] = global.db.data.users[m.sender] || {};
        const earned = Math.floor(Math.random() * 100) + 100;
        user.money = (user.money || 0) + earned;
        m.reply(`💼 You worked and earned $${earned}!`);
    }
};
