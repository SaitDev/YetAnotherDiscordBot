const Command = require('../Command');
const NekoLife = require('../../services/nekoLife');
const nekoLife = new NekoLife();

const info = {
    name: "meow",
    aliases: [],
    description: "Meow~ im a cat",
    runIn: ["text", "dm"],
    ownerOnly: false
}

class Meow extends Command {
    constructor(client, module) {
		super(client, info, module);
	}

    run(msg, args) {
        msg.channel.send(nekoLife.cat());
    }
}

module.exports = Meow;