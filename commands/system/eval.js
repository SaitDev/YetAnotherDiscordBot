const Command = require('../Command');

const info = {
    name: "eval",
    aliases: ["sudo"],
    description: "Im curious!!",
    runIn: ["text", "dm"],
    ownerOnly: true
}

class Eval extends Command {
    constructor(client, moduleName) {
		super(client, info, moduleName);
	}

    /**
     * @param {import('discord.js').Message} msg 
     * @param {string} args 
     */
    run(msg, args) {
        try {
            eval(args);
        } catch (err) {
            this.sendFromMessage(msg, `:skull_crossbones: \`${err.name}\` ${err.message}`);
        }
    }
}

module.exports = Eval;