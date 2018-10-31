const Command = require('../Command');
const RamMoe = require('../../services/ramMoe');
const ramMoe = new RamMoe();

const Embed = require('../../util/embed');

const info = {
    name: "toolewd",
    aliases: [],
    description: "That is lewd >.>",
    runIn: ["text", "dm"],
    ownerOnly: false
}

class TooLewd extends Command {
    constructor(client, module) {
		super(client, info, module);
	}

    run(msg, args) {
        var link = ramMoe.image('lewd');
        this.sendFromMessage(msg, {
            embed: Embed.create(link, msg.author.tag)
        });
    }
}

module.exports = TooLewd;