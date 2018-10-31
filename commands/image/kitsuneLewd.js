const Command = require('../Command');
const NekoLife = require('../../services/nekoLife');
const nekoLife = new NekoLife();

const Embed = require('../../util/embed');

const info = {
    name: "kitsunelewd",
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
        var link = nekoLife.image('erok');
        this.sendFromMessage(msg, {
            embed: Embed.create(link, msg.author.tag)
        });
    }
}

module.exports = Kitsune16;