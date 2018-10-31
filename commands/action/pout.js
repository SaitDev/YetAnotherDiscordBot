const Command = require('../Command');
const RamMoe = require('../../services/ramMoe');
const ramMoe = new RamMoe();

const Embed = require('../../util/embed');
const confusedSelfPout = 'https://cdn.weeb.sh/images/rJeS2GIXP-.jpeg';

const info = {
    name: "pout",
    aliases: [],
    description: "Pouts",
    runIn: ["text", "dm"],
    ownerOnly: false
}

class Pout extends Command {
    constructor(client, module) {
		super(client, info, module);
	}

    run(msg, args) {
        var message, link;
        if (msg.mentions.members.size > 0) {
            if (msg.mentions.members.first().id == msg.author.id) {
                link = confusedSelfPout;
                if (msg.author.id != this.client.user.id) {
                    message = 'Why do you pout on yourself';
                }
            } else if (msg.mentions.members.first().id == this.client.user.id) {
                message = `It seems like ${msg.author.toString()} pouts on me (´・﹏・\`) What wrong did I do`;
            } else {
                message = `${msg.author.toString()} pouts on ${msg.mentions.members.first().toString()}. What did you do? BAKA`
            }
        } else {
            message = `${msg.author.toString()} pouts. I wonder why`;
        }
        link = link ? link : ramMoe.image('pout');
        this.sendFromMessage(msg, {
            embed: Embed.create(link, msg.author.tag, message)
        });
    }
}

module.exports = Pout;