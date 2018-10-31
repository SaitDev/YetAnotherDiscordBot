const Command = require('../Command');
const NekoLife = require('../../services/nekoLife');
const nekoLife = new NekoLife();
const RamMoe = require('../../services/ramMoe');
const ramMoe = new RamMoe();

const Embed = require('../../util/embed');
const Util = require('../../util/commonUtil');
const selfKiss = 'https://cdn.weeb.sh/images/H1tfQI7wZ.gif';

const info = {
    name: "kiss",
    aliases: [],
    description: "Kiss someone :3",
    runIn: ["text", "dm"],
    ownerOnly: false
}

class Kiss extends Command {
    constructor(client, module) {
		super(client, info, module);
	}

    run(msg, args) {
        var message, link;
        if (msg.mentions.members.size > 0) {
            if (msg.mentions.members.first().id == msg.author.id) {
                link = selfKiss;
                message = 'Dont be like that ;-;'
            } else if (msg.mentions.members.first().id == this.client.user.id) {
                message = `(´・ω・\`) *blushing*`;
            } else {
                message = `owo ${msg.author.toString()} kisses ${msg.mentions.members.first().toString()}. They are so cute`
            }
        } else {
            if (msg.author.id == this.client.user.id) {
                //self-bot wrong usage
                link = selfKiss;
            } else {
                message = `${this.client.user.toString()}.... kisses ${msg.author.toString()}... *run away*`
            }
        }
        link = link ? link : (Util.randomTrue() ? nekoLife.image('kiss') : ramMoe.image('kiss'));
        this.sendFromMessage(msg, {
            embed: Embed.create(link,
                msg.author.tag, message)
        });
    }
}

module.exports = Kiss;