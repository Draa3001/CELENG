module.exports = {
    name: 'levelup',
    tags: ['rpg'],
    run: async (m) => {
        const user = global.db.data.users[m.sender] = global.db.data.users[m.sender] || {};
        const expNeeded = (user.level || 1) * 100;
        if ((user.exp || 0) >= expNeeded) {
            user.exp -= expNeeded;
            user.level = (user.level || 1) + 1;
            m.reply(`🎉 Level Up! You are now level ${user.level}`);
        } else {
            m.reply(`⏳ You need ${expNeeded - user.exp} more EXP to level up.`);
        }
    }
};
