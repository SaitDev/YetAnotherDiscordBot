const bluebird = require('bluebird');

const Command = require('../Command');
const genshinService = require('../../services/genshin.mihoyo.com');
const common = require('../../util/commonUtil')

const info = {
    name: 'genshinnews',
    aliases: ['genshinimpact', 'genshin'],
    description: "News from genshin.mihoyo.com",
    usages: [
        common.prefixPattern + "genshinnews category amount",
        "(categories are: `all`, `info`, `updates`, `events`)",
        "Example: " + common.prefixPattern + "genshinnews event 5",
        "",
        common.prefixPattern + "genshinnews subscribe category",
        "(subscribe to category, news will be auto posted to this channel)",
        "Example: " + common.prefixPattern + "genshinnews subscribe updates",
        "",
        // common.prefixPattern + "genshinnews unsubscribe category"
    ],
    runIn: ["text", "dm"],
    ownerOnly: false
}

const defaultNewsCount = 3;

class GINews extends Command {
    constructor(client, module) {
        super(client, info, module);
    }

    /**
     * 
     * @param {import('discord.js').Message} msg 
     * @param {string} args 
     */
    async run(msg, args) {
        var channelId;
        var params = [];
        if (!args) {
            params.push(genshinService.uniqueChannels.firstKey());
            channelId = genshinService.channelAll;
        } else {
            params = args.trim().removeDuplicateSpace().split(' ');
        }

        if (params[0] == 'subscribe') {
            channelId = genshinService.channelAll;
            if (params[1]) {
                params[1] = params[1].toLowerCase();
                var id = genshinService.channels.find((id, name, collection) => name == params[1]);
                if (typeof id != 'undefined' && id != null && id >= 0) {
                    channelId = id;
                } else {
                    this.sendFromMessage(msg, `Category \`${params[1]}\` not found`);
                    return;
                }
            } //else {
            //     this.sendFromMessage(msg, `Please chose category`);
            //     return;
            // }
            var guildId = msg.guild ? msg.guild.id : null;
            this.client.database.genshinNewsSubscribeFactory.addSubscriber(channelId, msg.channel.id, guildId)
            .then(() => {
                if (channelId == genshinService.channelAll) {
                    this.sendFromMessage(msg, `Subscribe to all categories`);
                } else {
                    this.sendFromMessage(msg, `Subscribe to category ${genshinService.uniqueChannels.get(channelId)}`);
                }
            })
        } else {
            var id = genshinService.channels.find((id, name, collection) => name == params[0].trim().toLowerCase());
            genshinService.fetchNews(id).then(newses => {
                var amount = defaultNewsCount;
                var sent = 0;
                if (params.length > 1) {
                    amount = params[1];
                    if (amount > 10) {
                        amount = 10;
                    }
                }
                bluebird.each(newses, news => {
                    if (sent < amount) {
                        sent++;
                        return this.sendFromMessage(msg, news.title + "\n" + news.url);
                    }
                })
            });
        }
    }
}

module.exports = GINews;