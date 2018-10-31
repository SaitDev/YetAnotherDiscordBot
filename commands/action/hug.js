const Command = require('../Command');
const NekoLife = require('../../services/nekoLife');
const nekoLife = new NekoLife();
const RamMoe = require('../../services/ramMoe');
const ramMoe = new RamMoe();

const Embed = require('../../util/embed');
const Util = require('../../util/commonUtil');
const selfHug = 'https://i.imgur.com/WnPNzHy.gif';

const info = {
    name: "hug",
    aliases: [],
    description: "Give someone a hug",
    runIn: ["text", "dm"],
    ownerOnly: false
}

class Hug extends Command {
    constructor(client, module) {
		super(client, info, module);
	}

    run(msg, args) {
        var message, link;
        if (msg.mentions.members.size > 0) {
            if (msg.mentions.members.first().id == msg.author.id) {
                link = selfHug;
                message = 'Sorry to see you alone ;-;'
            } else if (msg.mentions.members.first().id == this.client.user.id) {
                message = `(´・ω・\`), hugs ${msg.author.toString()} back`;
            } else {
                message = `${msg.mentions.members.first().toString()}, you got hug by ${msg.author.toString()} uwu`
            }
        } else {
            if (msg.author.id == this.client.user.id) {
                //self-bot wrong usage
                link = selfHug;
            } else {
                message = `${this.client.user.toString()} hugs ${msg.author.toString()} (・ω・*)`
            }
        }
        link = link ? link : (Util.randomTrue() ? nekoLife.image('hug') : ramMoe.image('hug'));
        this.sendFromMessage(msg, {
            embed: Embed.create(link,
                msg.author.tag, message)
        });
    }
}

module.exports = Hug;