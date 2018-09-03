const Discord = require('discord.js');

class CommandLog {
    /**
     * @param {import('../chitanda')} client 
     */
    constructor(client) {
        this.client = client;
        this.uses = 0;
        this.userUses = new Discord.Collection();
        this.guildUses = new Discord.Collection();
    }

    /**
     * 
     * @param {import('discord.js').Message} msg 
     */
    cmdRequested(msg) {
        console.log(
            `[Log] Command requested to ${this.client.user.username} ` +
            `by ${msg.author.username} ` +
            `in ${msg.guild ? msg.guild.name : '(Dirrect messages)'}:\n` +
            msg.content
        )

        this.uses++;
        var userId = msg.author.id;
        this.userUses.set(userId, this.userUses.has(userId) ? this.userUses.get(userId) + 1 : 1);
        var guildId = msg.guild ? msg.guild.id : 0;
        this.guildUses.set(guildId, this.guildUses.has(guildId) ? this.guildUses.get(guildId) + 1 : 1);
    }
}

module.exports = CommandLog;