const Command = require('../Command');
const NekoLife = require('../../services/nekoLife');
const nekoLife = new NekoLife();
const RamMoe = require('../../services/ramMoe');
const ramMoe = new RamMoe();

const Embed = require('../../util/embed');
const Util = require('../../util/commonUtil');
const confusedSelfPat = 'https://cdn.weeb.sh/images/HyOYf8XD-.gif';

const info = {
    name: "pat",
    aliases: [],
    description: "Head pat",
    runIn: ["text", "dm"],
    ownerOnly: false
}

class Pat extends Command {
    constructor(client, module) {
		super(client, info, module);
	}

    run(msg, args) {
        var message, link;
        if (msg.mentions.members.size > 0) {
            if (msg.mentions.members.first().id == msg.author.id) {
                link = confusedSelfPat;
                message = 'Dont be like that .-.'
            } else if (msg.mentions.members.first().id == this.client.user.id) {
                message = `${msg.author.toString()} is patting me (=・ω・=)`;
            } else {
                message = `${msg.mentions.members.first().toString()}, ${msg.author.toString()} is patting you`
            }
        } else {
            if (msg.author.id == this.client.user.id) {
                //self-bot wrong usage
                link = confusedSelfPat;
            } else {
                message = `${this.client.user.toString()} pats ${msg.author.toString()}`
            }
        }
        link = link ? link : (Util.randomTrue() ? nekoLife.image('pat') : ramMoe.image('pat'));
        this.sendFromMessage(msg, {
            embed: Embed.create(link,
                msg.author.tag, message)
        });
    }
}

module.exports = Pat;