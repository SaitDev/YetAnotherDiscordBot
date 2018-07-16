const Command = require('../Command');
const NekoLife = require('../../services/nekoLife');
const nekoLife = new NekoLife();

const Embed = require('../../util/embed');

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
        msg.channel.send({
            embed: Embed.create(nekoLife.image('neko'))
        });
    }
}

module.exports = Neko;