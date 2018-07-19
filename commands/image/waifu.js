const Command = require('../Command');
const NekoLife = require('../../services/nekoLife');
const nekoLife = new NekoLife();

const Embed = require('../../util/embed');

const info = {
    name: "waifu",
    aliases: [],
    description: "Bring some waifu to your laifu",
    runIn: ["text", "dm"],
    ownerOnly: false
}

class Waifu extends Command {
    constructor(client, module) {
		super(client, info, module);
	}

    run(msg, args) {
        msg.channel.send({
            embed: Embed.create(nekoLife.image('waifu'), msg.author.tag, '**Here some waifu for your laifu**')
        });
    }
}

module.exports = Waifu;