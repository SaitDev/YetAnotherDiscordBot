const Command = require('../Command');

const info = {
    name: "untrack",
    aliases: [],
    description: 'Untracking someone from editting messages',
    runIn: ["text"],
    ownerOnly: true
}

class Untrack extends Command {
    constructor(client) {
        super(client, info)
    }

    run(msg, args) {
        if (msg.mentions.members.size > 0) {
            this.client.chatLogger.untrack(msg.mentions.members.first().id);
            msg.channel.send(':ok:');
        } else {
            msg.channel.send('Error: Invalid arguments');
        }
    }
}

module.exports = Untrack;