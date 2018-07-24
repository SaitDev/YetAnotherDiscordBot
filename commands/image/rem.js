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
        msg.channel.send({
            embed: Embed.create(ramMoe.image('rem'), msg.author.tag)
        });
    }
}

module.exports = Rem;