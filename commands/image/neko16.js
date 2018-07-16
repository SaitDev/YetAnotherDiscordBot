const Command = require('../Command');
const NekoLife = require('../../services/nekoLife');
const nekoLife = new NekoLife();

const Embed = require('../../util/embed');
const Util = require('../../util/commonUtil')

const info = {
    name: "neko16+",
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
        msg.channel.send({
            embed: Embed.create(nekoLife.image('eron'))
        });
    }
}

module.exports = Neko16;