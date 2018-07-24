const Command = require('../Command');
const cleverbot = require('../../services/cleverbot.io.js');

const Embed = require('../../util/embed');

const info = {
    name: "chat",
    aliases: [],
    description: "Chat with Chitanda",
    usage: [
        "/chat text",
        "@Mention#Chitanda text"
    ],
    runIn: ["text", "dm"],
    ownerOnly: false
}

class Chat extends Command {
    constructor(client, module) {
		super(client, info, module);
	}

    run(msg, args) {
        if (!args) return;
        msg.channel.startTyping();
        try {
            cleverbot.ask(args, response => {
                msg.channel.stopTyping();
                if (response) {
                    msg.channel.send({
                        embed: Embed.create(null, null, msg.author.toString() + `\n${response}`)
                    });
                }
            });
        } catch (err) {
            msg.channel.stopTyping();
        }
    }
}

module.exports = Chat;