const Command = require('../Command');

const info = {
    name: "track",
    aliases: [],
    description: 'Track any message editting from someone',
    runIn: ["text"],
    ownerOnly: true
}

class Track extends Command {
    constructor(client, module) {
		super(client, info, module);
	}

    run(msg, args) {
        if (msg.mentions.members.size > 0) {
            if (msg.mentions.members.first().id == this.client.user.id) {
                msg.channel.send('what?');
                return;
            }
            this.client.chatLogger.track(msg.mentions.members.first().id);
            msg.channel.send('OK ( ͡° ͜ʖ ͡°)');
        } else {
            msg.channel.send('Error: Invalid arguments');
        }
    }
}

module.exports = Track;