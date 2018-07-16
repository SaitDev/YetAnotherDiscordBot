const Command = require('../Command');
const NekoLife = require('../../services/nekoLife');
const nekoLife = new NekoLife();

const info = {
    name: "chat",
    aliases: [],
    description: "Chat with *simple* AI",
    runIn: ["text", "dm"],
    ownerOnly: false
}

class Chat extends Command {
    constructor(client, module) {
		super(client, info, module);
	}

    run(msg, args) {
        msg.channel.send(nekoLife.chat(args));
    }
}

module.exports = Chat;