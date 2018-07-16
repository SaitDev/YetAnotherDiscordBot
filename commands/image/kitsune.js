const Command = require('../Command');
const NekoLife = require('../../services/nekoLife');
const nekoLife = new NekoLife();

const Embed = require('../../util/embed');
const info = {
    name: "kitsune",
    aliases: [],
    description: "Kitsune girls",
    runIn: ["text", "dm"],
    ownerOnly: false
}

class Kitsune extends Command {
    constructor(client, module) {
		super(client, info, module);
	}

    run(msg, args) {
        msg.channel.send({
            embed: Embed.create(nekoLife.image('fox_girl'))
        });
    }
}

module.exports = Kitsune;