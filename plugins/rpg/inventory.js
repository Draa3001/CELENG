module.exports = {
    name: 'inventory',
    tags: ['rpg'],
    run: async (m, { conn }) => {
        const user = global.db.data.users[m.sender] || {};
        const inventory = user.inventory || [];
        const items = inventory.length ? inventory.join(', ') : 'Your inventory is empty.';
        m.reply(`🎒 Inventory:\n${items}`);
    }
};
