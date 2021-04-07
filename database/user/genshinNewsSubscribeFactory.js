const BaseFactory = require('../baseFactory');
const GenshinNewsSubscribe = require('../../models/genshinNewsSubscribe');
const genshinService = require('../../services/genshin.mihoyo.com');

class GenshinNewsSubscribeFactory extends BaseFactory {
    constructor(factory) {
        super(factory);
        this.loaded = false;
        /**
         * @type Map<Number, Map<String, Object[]>>
         * @description Primary key is channel id of genshin news. Sub-map is settings mapped by discord channel. Object contain discord channel (and guild) subscribe to
         */
        this.subscriber = new Map();
        genshinService.uniqueChannels.lastKey(
            genshinService.uniqueChannels.size - 1
        ).forEach(ch => {
            this.subscriber.set(ch, new Map());
        })
    }

    loadSettings() {
        return this.safeQuery(
            GenshinNewsSubscribe.find({
                discordChannel: {$exists: true},
                newsChannels: {$exists: true, $ne: null}
            }).then(subscribers => {
                if (subscribers && subscribers.length > 0) {
                    subscribers.forEach(subs => {
                        if (subs.newsChannels && subs.newsChannels.length > 0) {
                            subs.newsChannels.forEach(newsChannel => {
                                if (newsChannel == genshinService.channelAll) {
                                    genshinService.channelIds.forEach(ch => {
                                        this.subscriber.get(ch).set(subs.discordChannel, {
                                            guild: subs.guild,
                                            channel: subs.discordChannel
                                        });
                                    })
                                } else {
                                    this.subscriber.get(newsChannel).set(subs.discordChannel, {
                                        guild: subs.guild,
                                        channel: subs.discordChannel
                                    });
                                }
                            })
                        }
                    })
                }
            })
        )
    }

    addSubscriber(genshinNewsChannelId, discordChannelId, guildId) {
        var conditions = {
            discordChannel: discordChannelId
        }
        if (typeof guildId != 'undefined' && guildId != null) {
            conditions.guild = guildId;
        }

        if (genshinNewsChannelId == genshinService.channelAll) {
            return this.safeQuery(GenshinNewsSubscribe.updateOne(
                conditions,
                {
                    guild: guildId, 
                    discordChannel: discordChannelId, 
                    newsChannels: genshinService.channelIds
                },
                {upsert: true}
            ).then(() => {
                genshinService.channelIds.forEach(ch => {
                    this.subscriber.get(ch).set(discordChannelId, {
                        guild: guildId,
                        channel: discordChannelId
                    });
                })
            }))
        } else {
            return this.safeQuery(GenshinNewsSubscribe.updateOne(
                conditions,
                {
                    guild: guildId, 
                    discordChannel: discordChannelId, 
                    $addToSet: {newsChannels: genshinNewsChannelId}
                },
                {upsert: true}
            ).then(() => {
                this.subscriber.get(genshinNewsChannelId).set(discordChannelId, {
                    guild: guildId,
                    channel: discordChannelId
                });
            }))
        }
    }

    removeSubscriber(genshinNewsChannelId, discordChannelId, guildId) {
        var conditions = {
            discordChannel: discordChannelId
        }
        if (typeof guildId != 'undefined' && guildId != null) {
            conditions.guild = guildId
        }

        if (genshinNewsChannelId == genshinService.channelAll) {
            return this.safeQuery(GenshinNewsSubscribe.updateOne(
                conditions,
                {$unset : {newsChannels: null}} //null or any value, doesnt matter for $unset
            ).then(() => {
                genshinService.channelIds.forEach(ch => {
                    if (this.subscriber.get(ch)) {
                        this.subscriber.get(ch).delete(discordChannelId);
                    }
                })
            }))
        } else {
            return this.safeQuery(GenshinNewsSubscribe.updateOne(
                conditions,
                {$pull: {newsChannels: genshinNewsChannelId}}
            ).then(() => {
                this.subscriber.get(genshinNewsChannelId).delete(discordChannelId);
            }))
        }
    }
}

module.exports = GenshinNewsSubscribeFactory;