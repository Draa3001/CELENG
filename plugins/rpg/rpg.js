module.exports = {
    name: 'rpg',
    tags: ['rpg'],
    run: async (m, { conn }) => {
        const user = global.db.data.users[m.sender] || {};
        const level = user.level || 1;
        const exp = user.exp || 0;
        m.reply(`🏅 RPG STATUS 🏅\nLevel: ${level}\nEXP: ${exp}`);
    }
};
