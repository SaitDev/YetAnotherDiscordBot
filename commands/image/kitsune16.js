const Command = require('../Command');
const NekoLife = require('../../services/nekoLife');
const nekoLife = new NekoLife();

const Embed = require('../../util/embed');

const info = {
    name: "kitsune16+",
    aliases: [],
    description: "#nsfw fox girls",
    runIn: ["text", "dm"],
    isNSFW: true,
    ownerOnly: false
}

class Kitsune16 extends Command {
    constructor(client, module) {
		super(client, info, module);
	}

    run(msg, args) {
        msg.channel.send({
            embed: Embed.create(nekoLife.image('erok'))
        });
    }
}

module.exports = Kitsune16;