const Command = require('../Command');
const NekoLife = require('../../services/nekoLife');
const nekoLife = new NekoLife();

const Embed = require('../../util/embed');

const info = {
    name: "wallpaper",
    aliases: [],
    description: "Suggesting wallpaper (could be #nsfw)",
    runIn: ["text", "dm"],
    isNSFW: true,
    ownerOnly: false
}

class Wallpaper extends Command {
    constructor(client, module) {
		super(client, info, module);
	}

    run(msg, args) {
        var link = nekoLife.image('wallpaper');
        this.sendFromMessage(msg, {
            embed: Embed.create(link, msg.author.tag)
        });
    }
}

module.exports = Wallpaper;