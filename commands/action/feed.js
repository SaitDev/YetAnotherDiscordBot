const Command = require('../Command');
const NekoLife = require('../../services/nekoLife');
const nekoLife = new NekoLife();

const Colors = require('../../util/colors');

const info = {
    name: "feed",
    aliases: [],
    description: "Feed them",
    runIn: ["text", "dm"],
    ownerOnly: false
}

class Feed extends Command {
    constructor(client) {
        super(client, info)
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
            embed: {
                description : message,
                image: {
                    url: nekoLife.image('feed')
                },
                color: Colors.getHex(Colors.list[Math.floor(Math.random() * Colors.list.length)])
            }
        });
    }
}

module.exports = Feed;