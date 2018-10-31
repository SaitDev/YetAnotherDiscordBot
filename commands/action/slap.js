const Command = require('../Command');
const NekoLife = require('../../services/nekoLife');
const nekoLife = new NekoLife();
const RamMoe = require('../../services/ramMoe');
const ramMoe = new RamMoe();

const Embed = require('../../util/embed');
const Util = require('../../util/commonUtil');
const whyGif = 'https://media.giphy.com/media/s239QJIh56sRW/giphy.gif';

const info = {
    name: "slap",
    aliases: [],
    description: "Slap them in the *tsundere way*",
    runIn: ["text", "dm"],
    ownerOnly: false
}

class Slap extends Command {
    constructor(client, module) {
		super(client, info, module);
	}

    run(msg, args) {
        var message, link;
        if (msg.mentions.members.size > 0) {
            if (msg.mentions.members.first().id == msg.author.id) {
                if (msg.author.id == this.client.user.id) {
                    link = whyGif;
                } else {
                    message = 'Here, you masochist.\n' + 
                        `${this.client.user.toString()} slapped ${msg.author.toString()}`;
                }
            } else if (msg.mentions.members.first().id == this.client.user.id) {
                message = `*touch cheek* you baka. Take this ${msg.author.toString()}`;
            } else {
                message = `${msg.author.toString()} slapped ${msg.mentions.members.first().toString()}. BAKA`
            }
        } else {
            if (msg.author.id == this.client.user.id) {
                link = whyGif;
            } else {
                message = 'Here, you masochist.\n' + 
                    `${this.client.user.toString()} slapped ${msg.author.toString()}`;
            }
        }
        link = link ? link : (Util.randomTrue() ? nekoLife.image('slap') : ramMoe.image('slap'));
        this.sendFromMessage(msg, {
            embed: Embed.create(link, 
                msg.author.tag, message)
        });
    }
}

module.exports = Slap;