const Command = require('../Command');
const NekoLife = require('../../services/nekoLife');
const nekoLife = new NekoLife();

const Embed = require('../../util/embed');

const info = {
    name: "feed",
    aliases: [],
    description: "Feed them",
    runIn: ["text", "dm"],
    ownerOnly: false
}

class Feed extends Command {
    constructor(client, module) {
		super(client, info, module);
	}

    run(msg, args) {
        var message;
        if (msg.mentions.members.size > 0) {
            if (msg.mentions.members.first().id == this.client.user.id) {
                if (msg.author.id == this.client.user.id) {
                    message = 'Im eating'
                } else {
                    message = 'aaaaaaaa'
                }
            } else {
                message = `${msg.mentions.members.first().toString()}, say aaaaaaaaaa`
            }
        } else {
            if (msg.author.id == this.client.user.id) {
                message = 'Im eating'
            } else {
                message = `${msg.author.toString()}, say aaaaaaaaaa`
            }
        }
        msg.channel.send({
            embed: Embed.create(nekoLife.image('feed'), msg.author.tag, message)
        });
    }
}

module.exports = Feed;