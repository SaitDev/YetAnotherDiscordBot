const Command = require('../Command');
const NekoLife = require('../../services/nekoLife');
const nekoLife = new NekoLife();

const Embed = require('../../util/embed');

const info = {
    name: "shoujoai",
    aliases: [],
    description: "#nsfw",
    runIn: ["text", "dm"],
    isNSFW: true,
    ownerOnly: false
}

class ShoujoAi extends Command {
    constructor(client, module) {
		super(client, info, module);
	}

    run(msg, args) {
        msg.channel.send({
            embed: Embed.create(nekoLife.image('eroyuri'))
        });
    }
}

module.exports = ShoujoAi;