const Command = require('../Command');
const RamMoe = require('../../services/ramMoe');
const ramMoe = new RamMoe();

const Embed = require('../../util/embed');

const info = {
    name: "cry",
    aliases: [],
    description: "Crying :((",
    runIn: ["text", "dm"],
    ownerOnly: false
}

class Cry extends Command {
    constructor(client, module) {
		super(client, info, module);
	}

    run(msg, args) {
        var message, link;
        message = `${msg.author.toString()} is crying ;-;`;
        link = link ? link : ramMoe.image('cry');
        this.sendFromMessage(msg, {
            embed: Embed.create(link, msg.author.tag, message)
        });
    }
}

module.exports = Cry;