const Command = require('../Command');
const NekoLife = require('../../services/nekoLife');
const nekoLife = new NekoLife();

const Embed = require('../../util/embed');
const Util = require('../../util/commonUtil')

const info = {
    name: "nekolewd",
    aliases: [],
    description: "#nsfw catgirls",
    runIn: ["text", "dm"],
    isNSFW: true,
    ownerOnly: false
}

class Neko16 extends Command {
    constructor(client, module) {
		super(client, info, module);
	}

    run(msg, args) {
        var link = nekoLife.image('eron');
        this.sendFromMessage(msg, {
            embed: Embed.create(link, msg.author.tag)
        });
    }
}

module.exports = Neko16;