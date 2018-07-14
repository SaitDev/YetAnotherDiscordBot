const Command = require('../Command');
const NekoLife = require('../../services/nekoLife');
const nekoLife = new NekoLife();

const Colors = require('../../util/colors');

const info = {
    name: "neko",
    aliases: [],
    description: "Catgirls",
    runIn: ["text", "dm"],
    ownerOnly: false
}

class Neko extends Command {
    constructor(client) {
        super(client, info)
    }

    run(msg, args) {
        msg.channel.send({
            embed: {
                image: {
                    url: nekoLife.image('neko')
                },
                color: Colors.getHex(Colors.list[Math.floor(Math.random() * Colors.list.length)])
            }
        });
    }
}

module.exports = Neko;