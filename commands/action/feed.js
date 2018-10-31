const Command = require('../Command');
const NekoLife = require('../../services/nekoLife');
const nekoLife = new NekoLife();

const Embed = require('../../util/embed');
const confusedGif = 'https://media.giphy.com/media/kaq6GnxDlJaBq/giphy.gif';

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
            if (msg.mentions.members.first().id == msg.author.id) {
                link = confusedGif;
                message = '*confused*';
            } else if (msg.mentions.members.first().id == this.client.user.id) {
                message = 'AAAaaaaa'
            } else {
                message = `${msg.mentions.members.first().toString()}, say aaaaaaaaaa`
            }
        } else {
            if (msg.author.id == this.client.user.id) {
                //self-bot wrong usage
                link = confusedGif;
            } else {
                message = `${msg.author.toString()}, say aaaaaaaaaa`
            }
        }
        var link = nekoLife.image('feed');
        this.sendFromMessage(msg, {
            embed: Embed.create(link, msg.author.tag, message)
        });
    }
}

module.exports = Feed;