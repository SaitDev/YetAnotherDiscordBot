const Command = require('../Command');
const NekoLife = require('../../services/nekoLife');
const nekoLife = new NekoLife();
const RamMoe = require('../../services/ramMoe');
const ramMoe = new RamMoe();

const Embed = require('../../util/embed');
const Util = require('../../util/commonUtil');
const confusedGif = 'https://media.giphy.com/media/kaq6GnxDlJaBq/giphy.gif';

const info = {
    name: "tickle",
    aliases: [],
    description: "Tickle your friend",
    runIn: ["text", "dm"],
    ownerOnly: false
}

class Tickle extends Command {
    constructor(client, module) {
		super(client, info, module);
	}

    run(msg, args) {
        var message, link;
        if (msg.mentions.members.size > 0) {
            if (msg.mentions.members.first().id == msg.author.id) {
                link = confusedGif;
                message = '*confused*';
            } else if (msg.mentions.members.first().id == this.client.user.id) {
                message = '*giggle* stop, dont do that'
            } else {
                message = `${msg.mentions.members.first().toString()} got tickled by ${msg.author.toString()} uwu`
            }
        } else {
            if (msg.author.id == this.client.user.id) {
                //self-bot wrong usage
                link = confusedGif;
            } else {
                message = `${msg.author.toString()} got tickled by ${this.client.user.toString()} uwu`
            }
        }
        link = link ? link : (Util.randomTrue() ? nekoLife.image('tickle') : ramMoe.image('tickle'));
        this.sendFromMessage(msg, {
            embed: Embed.create(link, 
                msg.author.tag, message)
        });
    }
}

module.exports = Tickle;