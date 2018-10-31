const Command = require('../Command');
const RamMoe = require('../../services/ramMoe');
const ramMoe = new RamMoe();

const Embed = require('../../util/embed');

const info = {
    name: "rem",
    aliases: [],
    description: "Best waifu?",
    runIn: ["text", "dm"],
    ownerOnly: false
}

class Rem extends Command {
    constructor(client, module) {
		super(client, info, module);
	}

    run(msg, args) {
        var link = ramMoe.image('rem');
        this.sendFromMessage(msg, {
            embed: Embed.create(link, msg.author.tag)
        });
    }
}

module.exports = Rem;