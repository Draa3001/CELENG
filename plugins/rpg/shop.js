module.exports = {
    name: 'shop',
    tags: ['rpg'],
    run: async (m) => {
        const items = [
            { name: 'Potion', price: 100 },
            { name: 'Sword', price: 500 },
            { name: 'Armor', price: 750 }
        ];
        const list = items.map(i => `• ${i.name} - $${i.price}`).join('\n');
        m.reply(`🛒 RPG SHOP\n${list}`);
    }
};
