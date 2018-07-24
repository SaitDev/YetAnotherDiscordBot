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
        msg.channel.send({
            embed: Embed.create(ramMoe.image('lewd'), msg.author.tag)
        });
    }
}

module.exports = TooLewd;