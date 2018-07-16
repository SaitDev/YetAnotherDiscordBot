const Command = require('../Command');
const NekoLife = require('../../services/nekoLife');
const nekoLife = new NekoLife();

const Embed = require('../../util/embed');

const info = {
    name: "tickle",
    aliases: [],
    description: "Tickle someone",
    runIn: ["text", "dm"],
    ownerOnly: false
}

class Tickle extends Command {
    constructor(client, module) {
		super(client, info, module);
	}

    run(msg, args) {
        var message;
        if (msg.mentions.members.size > 0) {
            if (msg.mentions.members.first().id == this.client.user.id) {
                if (msg.author.id == this.client.user.id) {
                    message = 'Imma tickle myself .-.'
                } else {
                    message = '*laughing* stop, dont do that'
                }
            } else {
                message = `${msg.mentions.members.first().toString()} got tickled by ${msg.author.toString()} uwu`
            }
        } else {
            if (msg.author.id == this.client.user.id) {
                message = 'Imma tickle myself .-.'
            } else {
                message = `${msg.author.toString()} got tickled by ${this.client.user.toString()} uwu`
            }
        }
        msg.channel.send({
            embed: Embed.create(nekoLife.image('tickle'), message)
        });
    }
}

module.exports = Tickle;