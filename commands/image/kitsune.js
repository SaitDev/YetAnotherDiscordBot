const Command = require('../Command');
const NekoLife = require('../../services/nekoLife');
const nekoLife = new NekoLife();

const Embed = require('../../util/embed');
const info = {
    name: "kitsune",
    aliases: [],
    description: "Fox girls",
    runIn: ["text", "dm"],
    ownerOnly: false
}

class Kitsune extends Command {
    constructor(client, module) {
		super(client, info, module);
	}

    run(msg, args) {
        var link = nekoLife.image('fox_girl');
        this.sendFromMessage(msg, {
            embed: Embed.create(link, msg.author.tag)
        });
    }
}

module.exports = Kitsune;