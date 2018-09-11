const Command = require('../Command');

const info = {
    name: "untrack",
    aliases: [],
    description: 'Stop tracking someone from editting messages',
    runIn: ["text"],
    ownerOnly: true
}

class Untrack extends Command {
    constructor(client, module) {
		super(client, info, module);
	}

    run(msg, args) {
        if (msg.mentions.members.size > 0) {
            this.client.chatLogger.untrack(msg.mentions.members.first().id);
            this.sendFromMessage(msg, ':ok:');
        } else {
            this.sendFromMessage(msg, 'Error: Invalid arguments');
        }
    }
}

module.exports = Untrack;