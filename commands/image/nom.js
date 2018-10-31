const Command = require('../Command');
const RamMoe = require('../../services/ramMoe');
const ramMoe = new RamMoe();

const Embed = require('../../util/embed');

const info = {
    name: "nom",
    aliases: [],
    description: "Nom nom... eating",
    runIn: ["text", "dm"],
    ownerOnly: false
}

class Nom extends Command {
    constructor(client, module) {
		super(client, info, module);
	}

    run(msg, args) {
        var link = ramMoe.image('nom');
        this.sendFromMessage(msg, {
            embed: Embed.create(link, msg.author.tag)
        });
    }
}

module.exports = Nom;