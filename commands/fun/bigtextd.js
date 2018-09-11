const Command = require('../Command.js')
const emoji = require('../../util/emoji.js')
const Filter = require('../../util/filter')

const info = {
    name: "bigtextd",
    aliases: [],
    description: 'Delete your request then make your message bigggger',
    runIn: ["text", "dm"],
    ownerOnly: false
}


class BigTextD extends Command {
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
                if (!msg.deletable) {
                    this.sendFromMessage(msg, 'Error: Require `Manage Messages` to delete your text');
                } else {
                    msg.delete();
                    this.sendFromMessage(msg, emoji.textToIcon(args));
                }
            }
        } else {
            this.sendFromMessage(msg, 'Error: Invalid arguments')
        }


    }
}

module.exports = BigTextD;
