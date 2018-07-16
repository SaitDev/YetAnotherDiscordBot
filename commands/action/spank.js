const Command = require('../Command');
const NekoLife = require('../../services/nekoLife');
const nekoLife = new NekoLife();

const Embed = require('../../util/embed');
const whyGif = 'https://media.giphy.com/media/s239QJIh56sRW/giphy.gif';

const info = {
    name: "spank",
    aliases: [],
    description: "Spank someone",
    runIn: ["text", "dm"],
    ownerOnly: false
}

class Spank extends Command {
    constructor(client, module) {
		super(client, info, module);
	}

    run(msg, args) {
        var message, link;
        if (msg.mentions.members.size > 0) {
            if (msg.mentions.members.first().id == this.client.user.id) {
                if (msg.author.id == this.client.user.id) {
                    link = whyGif;
                } else {
                    message = `Thats hurt, you baka ${msg.author.toString()}`;
                }
            } else {
                message = `${msg.author.toString()} spanks ${msg.mentions.members.first().toString()}, a real bad ass`;
            }
        } else {
            if (msg.author.id == this.client.user.id) {
                link = whyGif;
            } else {
                message = `Here you masochist ${msg.author.toString()}`;
            }
        }
        msg.channel.send({
            embed: Embed.create(link ? link : nekoLife.image('spank'), message)
        });
    }
}

module.exports = Spank;