const os = require('os');
const moment = require('moment');

const Command = require('../Command');

const info = {
    name: "stats",
    aliases: [],
    description: "Check bot statistics",
    runIn: ["text", "dm"],
    ownerOnly: true
}

class Stats extends Command {
    /**
     * @param {import('../../chitanda')} client 
     * @param {string} module 
     */
    constructor(client, module) {
        super(client, info, module);
        this.config = client.commandManager.config;
	}

    run(msg, args) {
        var topGuilds = this.client.commandLogger.guildUses.sort((val1, val2, key1, key2) => val2 - val1).firstKey(3);
        var topUsers = this.client.commandLogger.userUses.sort((val1, val2, key1, key2) => val2 - val1).firstKey(3);

        var topGuildMessage = '';
        topGuilds.forEach(id => {
            topGuildMessage += `${this.guildName(id)} - ${this.client.commandLogger.guildUses.get(id)}, `;
        });
        topGuildMessage = topGuildMessage.slice(0, topGuildMessage.length - 2);

        var topUserMessage = '';
        topUsers.forEach(id => {
            topUserMessage += `${this.client.users.get(id).username} - ${this.client.commandLogger.userUses.get(id)}, `;
        });
        topUserMessage = topUserMessage.slice(0, topUserMessage.length - 2);
        
        this.sendFromMessage(msg, `\`\`\`
Version ${this.config.version}
Serving ${this.isLimitedActive() ? this.config.guilds.length : this.client.guilds.size} guilds
Stalking ${this.client.users.size} humans
Up time ${moment.duration(this.client.uptime).humanize()}
RAM usage ${Math.round(process.memoryUsage().rss / 1048576)}MB/${Math.round(os.totalmem() / 1048576)}MB

Processed commands ${this.client.commandLogger.uses} times
Most active guilds: ${topGuildMessage ? topGuildMessage : 'None'}
Most active users: ${topUserMessage ? topUserMessage : 'None'}
\`\`\``);
    }

    guildName(id) {
        if (id == 0) return '(Direct Message)'
        return this.client.guilds.has(id) ? this.client.guilds.get(id).name : `\`${id}\``;
    }

    isLimitedActive() {
        return this.config.guilds && this.config.guilds.length > 0;
    }
}

module.exports = Stats;