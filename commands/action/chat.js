const Command = require('../Command')
const cleverbot = require('../../services/cleverbot.io.js')

const Embed = require('../../util/embed')
const common = require('../../util/commonUtil')

const info = {
    name: "chat",
    aliases: [],
    description: "Chat with Chitanda",
    usages: [
        common.prefixPattern + "chat text",
        common.mentionBotPattern + " text"
    ],
    runIn: ["text", "dm"],
    ownerOnly: false
}

class Chat extends Command {
    constructor(client, module) {
		super(client, info, module);
	}

    /**
     * 
     * @param {import('discord.js').Message} msg 
     * @param {string} args 
     */
    run(msg, args) {
        if (!args || !(this.client.messageUtil.removeMentions(msg, args).removeSpace())) {
            args = this.name;
            var helpCommand = this.client.commandManager.commands.get('help');
            if (helpCommand) {
                helpCommand.execute(msg, args)
            } else {
                this.sendFromMessage(msg, 'Invalid arguments. Use command help to see usages');
            }
            return;
        }

        msg.channel.startTyping();
        try {
            args = this.client.messageUtil.replaceMentionMemberName(msg, args);
            cleverbot.ask(args, response => {
                msg.channel.stopTyping();
                if (response) {
                    this.sendFromMessage(msg, {
                        embed: Embed.create(null, null, msg.author.toString() + ` ${response}`)
                    });
                }
            });
        } catch (err) {
            msg.channel.stopTyping();
            this.client.errorLogger.commandFail(err);
        }
    }
}

module.exports = Chat;