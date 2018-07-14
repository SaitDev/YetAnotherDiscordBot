const Command = require('../Command');
const NekoLife = require('../../services/nekoLife');
const nekoLife = new NekoLife();

const Colors = require('../../util/colors');

const info = {
    name: "waifu",
    aliases: [],
    description: "Bring some waifu to your laifu",
    runIn: ["text", "dm"],
    ownerOnly: false
}

class Waifu extends Command {
    constructor(client) {
        super(client, info)
    }

    run(msg, args) {
        msg.channel.send({
            embed: {
                title: 'Here some waifu for your laifu',
                image: {
                    url: nekoLife.image('waifu')
                },
                color: Colors.getHex(Colors.list[Math.floor(Math.random() * Colors.list.length)])
            }
        });
    }
}

module.exports = Waifu;