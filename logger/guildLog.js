const config = require('../config.json');
const textChat = ['text', 'dm', 'group'];

class GuildLog {
    /**
     * @param {import('discord.js').Client} client 
     */
    constructor(client) {
        this.client = client;
    }

    /**
     * 
     * @param {import('discord.js').Guild} guild
     */
    joined(guild) {
        if (config.log.logging && config.log.channel.guilds) {
            if (this.client.channels.has(config.log.channel)) {
                var channel = this.client.channels.get(config.log.channel);
                if (textChat.includes(channel.type)) {
                    channel.send(`:tada: :new: Joined guild ${guild.name} \`${guild.id}\``);
                }
            }
        }
    }

    /**
     * 
     * @param {import('discord.js').Guild} guild
     */
    left(guild) {
        if (config.log.logging && config.log.channel.guilds) {
            if (this.client.channels.has(config.log.channel)) {
                var channel = this.client.channels.get(config.log.channel);
                if (textChat.includes(channel.type)) {
                    channel.send(`:footprints: Left guild ${guild.name} \`${guild.id}\``);
                }
            }
        }
    }
}

module.exports = GuildLog;