const Command = require('../Command');
const NekoLife = require('../../services/nekoLife');
const nekoLife = new NekoLife();

const Colors = require('../../util/colors');
const whyGif = 'https://media.giphy.com/media/s239QJIh56sRW/giphy.gif';

const info = {
    name: "slap",
    aliases: [],
    description: "Slap them ~~as a tsundere~~",
    runIn: ["text", "dm"],
    ownerOnly: false
}

class Slap extends Command {
    constructor(client) {
        super(client, info)
    }

    run(msg, args) {
        var message, link;
        if (msg.mentions.members.size > 0) {
            if (msg.mentions.members.first().id == this.client.user.id) {
                if (msg.author.id == this.client.user.id) {
                    link = whyGif;
                } else {
                    message = `*touch cheek* you baka ${msg.author.toString()}`;
                }
            } else {
                message = `${msg.author.toString()} slapped ${msg.mentions.members.first().toString()}. BAKA`
            }
        } else {
            if (msg.author.id == this.client.user.id) {
                link = whyGif;
            } else {
                message = `Here you masochist ${msg.author.toString()}`;
            }
        }
        msg.channel.send({
            embed: {
                description : message,
                image: {
                    url: link ? link : nekoLife.image('slap')
                },
                color: Colors.getHex(Colors.list[Math.floor(Math.random() * Colors.list.length)])
            }
        });
    }
}

module.exports = Slap;