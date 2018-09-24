const util = require('../util/commonUtil')
const config = require('../config.json')
const textChat = ['text', 'dm', 'group']

class GuildLog {
    /**
     * @param {import('../chitanda')} client 
     */
    constructor(client) {
        this.client = client;
    }

    /**
     * 
     * @param {import('discord.js').Guild} guild
     */
    joined(guild) {
        if (!util.isProduction()) return;
        if (config.log.logging && config.log.channel.guilds) {
            if (this.client.channels.has(config.log.channel.guilds)) {
                var channel = this.client.channels.get(config.log.channel.guilds);
                if (textChat.includes(channel.type)) {
                    this.client.messageUtil.sendFromChannel(
                        channel, 
                        `:tada: :new: Joined guild ${guild.name} \`${guild.id}\``
                    );
                }
            }
        }
    }

    /**
     * 
     * @param {import('discord.js').Guild} guild
     */
    left(guild) {
        if (!util.isProduction()) return;
        if (config.log.logging && config.log.channel.guilds) {
            if (this.client.channels.has(config.log.channel.guilds)) {
                var channel = this.client.channels.get(config.log.channel.guilds);
                if (textChat.includes(channel.type)) {
                    this.client.messageUtil.sendFromChannel(
                        channel, 
                        `:footprints: Left guild ${guild.name} \`${guild.id}\``
                    );
                }
            }
        }
    }
}

module.exports = GuildLog;