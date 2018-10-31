const Command = require('../Command');
const RamMoe = require('../../services/ramMoe');
const ramMoe = new RamMoe();

const Embed = require('../../util/embed');
const confusedSelfStare = 'https://cdn.weeb.sh/images/rJeS2GIXP-.jpeg';

const info = {
    name: "stare",
    aliases: [],
    description: "Stareee~~ zzzz",
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
                link = confusedSelfStare;
                if (msg.author.id != this.client.user.id) {
                    message = 'Why are you staring at yourself';
                }
            } else if (msg.mentions.members.first().id == this.client.user.id) {
                message = `${msg.author.toString()} is staring at me.. 〳 •́ ﹏ •̀ 〵 *Kowai desu*`;
            } else {
                message = `${msg.author.toString()} is staring at ${msg.mentions.members.first().toString()} (⊙_⊙)`
            }
        } else {
            message = `${msg.author.toString()} is staring at something :eyes:`;
        }
        link = link ? link : ramMoe.image('stare');
        this.sendFromMessage(msg, {
            embed: Embed.create(link, msg.author.tag, message)
        });
    }
}

module.exports = Slap;