const Command = require('../Command');
const NekoLife = require('../../services/nekoLife');
const nekoLife = new NekoLife();

const Embed = require('../../util/embed');

const info = {
    name: "wallpaper",
    aliases: [],
    description: "Suggesting wallpaper (may be #nsfw)",
    runIn: ["text", "dm"],
    isNSFW: true,
    ownerOnly: false
}

class Wallpaper extends Command {
    constructor(client, module) {
		super(client, info, module);
	}

    run(msg, args) {
        msg.channel.send({
            embed: Embed.create(nekoLife.image('wallpaper'), msg.author.tag)
        });
    }
}

module.exports = Wallpaper;