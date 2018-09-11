const Command = require('../Command');

const Embed = require('../../util/embed');

const info = {
    name: "kupole",
    aliases: [],
    description: "ToS emoji, kupole set",
    runIn: ["text", "dm"],
    ownerOnly: false,
    emoji: new Map([
        ['surprise', 'https://i.imgur.com/fJuQuN2.png'],
        ['angry', 'https://i.imgur.com/2bn9pfQ.png'],
        ['scary', 'https://i.imgur.com/mKIhlwy.png'],
        ['sigh', 'https://i.imgur.com/orWrYTS.png'],
        ['teehee', 'https://i.imgur.com/Vzr9Q13.png']
    ])
}

class Kupole extends Command {
    constructor(client, module) {
        super(client, info, module);
        this.emoji = info.emoji;
	}

    run(msg, args) {
        if (!args || !this.emoji.has(args)) {
            this.sendFromMessage(msg, this.emojiList());
        } else {
            this.sendFromMessage(msg, {
                embed: Embed.create(this.emoji.get(args), msg.author.tag)
            })
        }
    }

    emojiList() {
        var list = 'Emoji set: ';
        for (let emoji of this.emoji) {
            list += `\`${emoji["0"]}\`, `;
        }
        list = list.substring(0, list.length - 2);
        
        return list;
    }
}

module.exports = Kupole;