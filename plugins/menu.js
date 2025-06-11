module.exports = {
    name: 'menu',
    tags: ['main'],
    run: async (m, { conn, args, usedPrefix, command }) => {
        const plugins = Object.values(global.plugins).filter(p => !p.disabled);
        const tag = (args[0] || '').toLowerCase();
        const groups = {};

        // Group commands by tags
        for (let plugin of plugins) {
            for (let tag of plugin.tags || []) {
                if (!groups[tag]) groups[tag] = [];
                groups[tag].push(plugin);
            }
        }

        const categories = Object.keys(groups);
        const selected = tag && groups[tag] ? tag : null;

        let menuText = `╭━━━〔 *NEOXR RPG MENU* 〕━━⬣\n`;

        if (selected) {
            menuText += `┃ ✦ Category: *${selected.toUpperCase()}*\n`;
            for (let plugin of groups[selected]) {
                menuText += `┃ ⤷ ${usedPrefix}${plugin.name}\n`;
            }
        } else {
            for (let category of categories) {
                menuText += `┃ ✦ *${category.toUpperCase()}*\n`;
                for (let plugin of groups[category]) {
                    menuText += `┃   ⤷ ${usedPrefix}${plugin.name}\n`;
                }
            }
        }

        menuText += `╰━━━━━━〔 ✦ ᴇɴᴅ 〕━━━━⬣`;

        return m.reply(menuText);
    }
};
