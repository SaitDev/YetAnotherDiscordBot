class CommandLog {
    /**
     * @param {import('discord.js').Client} client 
     */
    constructor(client) {
        this.client = client;
        this.userUses = new Map();
        this.guildUses = new Map();
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

        this.userUses[msg.author.id] = (this.userUses[msg.author.id] + 1) || 1;
        var guildId = msg.guild ? msg.guild.id : 0;
        this.guildUses[guildId] = (this.guildUses[guildId] + 1) || 1;
    }
}

module.exports = CommandLog;