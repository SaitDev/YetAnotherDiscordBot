const Command = require('../Command');
const cleverbot = require('../../services/cleverbot.io.js');

const info = {
    name: "chat",
    aliases: [],
    description: "Chat with Chitanda",
    runIn: ["text", "dm"],
    ownerOnly: false
}

class Chat extends Command {
    constructor(client, module) {
		super(client, info, module);
	}

    run(msg, args) {
        msg.channel.startTyping();
        cleverbot.ask(args, response => {
            msg.channel.stopTyping();
            if (response) {
                msg.channel.send(response);
            }
        });
    }
}

module.exports = Chat;