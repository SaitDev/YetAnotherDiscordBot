const Command = require('../Command');
const RamMoe = require('../../services/ramMoe');
const ramMoe = new RamMoe();

const Embed = require('../../util/embed');

const info = {
    name: "owo",
    aliases: [],
    description: "owo what is this command",
    runIn: ["text", "dm"],
    ownerOnly: false
}

class OwO extends Command {
    constructor(client, module) {
		super(client, info, module);
	}

    run(msg, args) {
        this.sendFromMessage(msg, {
            embed: Embed.create(ramMoe.image('owo'), msg.author.tag)
        });
    }
}

module.exports = OwO;