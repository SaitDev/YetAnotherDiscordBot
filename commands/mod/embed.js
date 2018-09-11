const Command = require('../Command.js')

const Filter = require('../../util/filter')
const EmbedUtil = require('../../util/embed')

const info = {
    name: "embed",
    aliases: [],
    description: 'Post a message as embedded',
    runIn: ["text", "dm"],
    ownerOnly: false
}


class Embed extends Command {
    constructor(client, module) {
        super(client, info, module);
        this.filter = new Filter(this.client);
    }

    async run(msg, args) {
        if (args) {
            if ((this.filter.containBot(msg, args) || await this.filter.containOwner(msg, args)) &&
                msg.author.id != this.client.user.id
            ) {
                this.sendFromMessage(msg, ':thinking:');
            } else {
                this.sendFromMessage(msg, {
                    embed: EmbedUtil.create(null, null, args)
                });
            }
        } else {
            this.sendFromMessage(msg, 'Error: Invalid arguments')
        }
    }
}

module.exports = Embed;
