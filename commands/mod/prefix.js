const Command = require('../Command.js')

const Filter = require('../../util/filter')
const EmbedUtil = require('../../util/embed')
const config = require('../../config.json')

const info = {
    name: 'prefix',
    aliases: [],
    description: 'Custom prefix for this guild',
    runIn: ['text'],
    ownerOnly: false
}


class Prefix extends Command {
    constructor(client, module) {
        super(client, info, module);
        this.filter = new Filter(this.client);
    }

    /**
     * 
     * @param {import('discord.js').Message} msg 
     * @param {string} args 
     */
    async run(msg, args) {
        if (args) {
            args = args.trim();
            //TODO move max length prefix to config.json
            var maxLength = 30;
            if (args.length > maxLength) {
                this.sendFromMessage(msg, 'Error: Prefix is too long. Maximum characters allowed is ' + maxLength);
            }
            this.client.database.guildSettingManager.updatePrefix(msg.guild, args)
            .then(_ => {
                this.sendFromMessage(msg, `Changed prefix to \`${args}\` for ${msg.guild.name}`);
            })
        } else {
            var hasCustomPrefix = this.client.database.guildSettingManager.customPrefix.has(msg.guild.id);
            this.sendFromMessage(msg, 
                'Command prefix of this guild is: ' + 
                `${hasCustomPrefix ? this.client.database.guildSettingManager.customPrefix.get(msg.guild.id) : config.prefix}`
            );
        }
    }
}

module.exports = Prefix;
