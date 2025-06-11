module.exports = {
    name: 'profile',
    tags: ['rpg'],
    run: async (m, { conn }) => {
        const user = global.db.data.users[m.sender] || {};
        const { level = 1, exp = 0, money = 0, role = 'Novice' } = user;
        m.reply(`👤 PROFILE\nRole: ${role}\nLevel: ${level}\nEXP: ${exp}\nMoney: $${money}`);
    }
};
