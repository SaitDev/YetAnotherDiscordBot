const Command = require('../Command');
const NekoLife = require('../../services/nekoLife');
const nekoLife = new NekoLife();

const Embed = require('../../util/embed');
const Util = require('../../util/commonUtil');

const info = {
    name: "neko",
    aliases: [],
    description: "Catgirls",
    runIn: ["text", "dm"],
    ownerOnly: false
}

class Neko extends Command {
    constructor(client, module) {
		super(client, info, module);
	}

    run(msg, args) {
        var link = Util.randomTrue() ? nekoLife.image('ngif') : nekoLife.image('neko');
        this.sendFromMessage(msg, {
            embed: Embed.create(link, msg.author.tag)
        });
    }
}

module.exports = Neko;