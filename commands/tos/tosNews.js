const bluebird = require('bluebird')
const url = require('url')
const cheerio = require('cheerio')

const Command = require('../Command')
const tosService = require('../../services/treeOfSavior.com')
const common = require('../../util/commonUtil')

const defaultNewsCount = 3

const info = {
    name: 'tosnews',
    aliases: ['tosnew'],
    description: "News from treeofsavior.com",
    usages: [
        common.prefixPattern + "tosnews category amount",
        "(categories are: `all`, `patch`, `event`, `announcement`, `blog`, `issue`)",
        "Example: " + common.prefixPattern + "tosnews event 5",
        common.prefixPattern + "tosnews subscribe category",
        "(subscribe to category, news will be auto posted to this channel)",
        "Example: " + common.prefixPattern + "tosnews subscribe patch",
        common.prefixPattern + "tosnews unsubscribe category",
    ],
    runIn: ["text", "dm"],
    ownerOnly: false
}

class TosNew extends Command {
    constructor(client, module) {
        super(client, info, module);
    }

    /**
     * 
     * @param {import('discord.js').Message} msg 
     * @param {string} args 
     */
    run(msg, args) {
        var categoryId;
        var params = [];
        if (!args) {
            params.push(tosService.categories.firstKey());
            categoryId = tosService.categories.first();
        } else {
            params = args.trim().removeDuplicateSpace().split(' ');
        }

        if (params[0] == 'subscribe') {
            categoryId = tosService.categories.first();
            if (params[1]) {
                var id = tosService.categories.find((id, name, collection) => name == params[1]);
                if (typeof id != 'undefined' && id != null && id >= 0) {
                    categoryId = id;
                } else {
                    this.sendFromMessage(msg, `Category \`${params[1]}\` not found`);
                return;
                }
            }
            var guildId = msg.guild ? msg.guild.id : null;
            this.client.database.autoTosNewManager.addSubscriber(categoryId, msg.channel.id, guildId)
            .then(() => {
                if (categoryId == tosService.uniqueCategories.firstKey()) {
                    this.sendFromMessage(msg, `Subscribe to all categories`);
                } else {
                    this.sendFromMessage(msg, `Subscribe to category ${tosService.uniqueCategories.get(categoryId)}`);
                }
            })
        } else if (params[0] == 'unsubscribe') {
            categoryId = tosService.categories.first();
            if (params[1]) {
                var id = tosService.categories.find((id, name, collection) => name == params[1].toLowerCase());
                if (typeof id != 'undefined' && id != null && id >= 0) {
                    categoryId = id;
                } else {
                    this.sendFromMessage(msg, `Category \`${params[1]}\` not found`);
                    return;
                }
            }
            var guildId = msg.guild ? msg.guild.id : null;
            this.client.database.autoTosNewManager.removeSubscriber(categoryId, msg.channel.id, guildId)
            .then(() => {
                if (categoryId == tosService.uniqueCategories.firstKey()) {
                    this.sendFromMessage(msg, `Unsubscribe to all categories`);
                } else {
                    this.sendFromMessage(msg, `Unsubscribe to category ${tosService.uniqueCategories.get(categoryId)}`);
                }
            })
        } else {
            var id = tosService.categories.find((id, name, collection) => name == params[0].trim().toLowerCase());
            if (typeof id != 'undefined' && id != null && id >= 0) {
                categoryId = id;
            } else {
                this.sendFromMessage(msg, `Category \`${params[0]}\` not found`);
                return;
            }
            tosService.fetchNews(categoryId)
            .then(news => {
                var amount = defaultNewsCount;
                var sent = 0;
                if (params.length > 1) {
                    amount = params[1];
                    if (amount > 9) {
                        amount = 9;
                    }
                }
                bluebird.each(news, anew => {
                    if (sent < amount) {
                        sent++;
                        return this.sendFromMessage(msg, anew.url);
                    }
                })
            }).catch(err => {
                this.client.errorLogger.commandFail(err);
            })
        }
    }
}

module.exports = TosNew;