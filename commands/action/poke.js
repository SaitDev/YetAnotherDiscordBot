const Command = require('../Command');
const NekoLife = require('../../services/nekoLife');
const nekoLife = new NekoLife();

const Embed = require('../../util/embed');
const confusedSelfPout = 'https://cdn.weeb.sh/images/rJeS2GIXP-.jpeg';

const info = {
    name: "poke",
    aliases: [],
    description: "Poke someone",
    runIn: ["text", "dm"],
    ownerOnly: false
}

class Poke extends Command {
    constructor(client, module) {
		super(client, info, module);
	}

    run(msg, args) {
        var message, link;
        if (msg.mentions.members.size > 0) {
            if (msg.mentions.members.first().id == msg.author.id) {
                link = confusedSelfPout;
                if (msg.author.id != this.client.user.id) {
                    message = 'Poke yourself???';
                }
            } else if (msg.mentions.members.first().id == this.client.user.id) {
                message = `Eyyyy ${msg.author.toString()} just poke me :wave:`;
            } else {
                message = `${msg.mentions.members.first().toString()} got poked by ${msg.author.toString()}`
            }
        } else {
            message = `Yoo. ${this.client.user.toString()} pokes ${msg.author.toString()}`;
        }
        link = link ? link : nekoLife.image('poke');
        this.sendFromMessage(msg, {
            embed: Embed.create(link, msg.author.tag, message)
        });
    }
}

module.exports = Poke;