const Command = require('../Command');
const RamMoe = require('../../services/ramMoe');
const ramMoe = new RamMoe();

const Embed = require('../../util/embed');
const confusedSelfSmug = 'https://cdn.weeb.sh/images/rJeS2GIXP-.jpeg';

const info = {
    name: "smug",
    aliases: [],
    description: "Smugs",
    runIn: ["text", "dm"],
    ownerOnly: false
}

class Smug extends Command {
    constructor(client, module) {
		super(client, info, module);
	}

    run(msg, args) {
        var message, link;
        if (msg.mentions.members.size > 0) {
            if (msg.mentions.members.first().id == msg.author.id) {
                link = confusedSelfSmug;
            } else if (msg.mentions.members.first().id == this.client.user.id) {
                message = `${msg.author.toString()} is smug towards me :no_mouth:`;
            } else {
                message = `${msg.author.toString()} is smug towards ${msg.mentions.members.first().toString()}`
            }
        } else {
            message = `${msg.author.toString()} looks a bit smug`;
        }
        link = link ? link : ramMoe.image('smug');
        this.sendFromMessage(msg, {
            embed: Embed.create(link, msg.author.tag, message)
        });
    }
}

module.exports = Smug;