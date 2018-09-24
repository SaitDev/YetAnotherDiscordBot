const BaseFactory = require('../baseFactory')
const tosService = require('../../services/treeOfSavior.com')

class AutoTosNews extends BaseFactory {
    constructor(factory) {
        super(factory);
        this.AutoTosNew = require('../../models/autoTosNew');
        /**
         * @type Map<Number, Map<String, Object[]>>
         * @description Primary key is category id. Sub-map is settings mapped by channel id. Object contain channel (and guild) subscribe to
         */
        this.subscriber = new Map();
        tosService.uniqueCategories.lastKey(
            tosService.uniqueCategories.size - 1
        ).forEach(cate => {
            this.subscriber.set(cate, new Map());
        })
    }

    loadSettings() {
        return this.safeQuery(
            this.AutoTosNew.find({
                // guild: {$exists: true},
                channel: {$exists: true},
                categories: {$exists: true, $ne: null}
            }).then(autoNews => {
                if (autoNews && autoNews.length > 0) {
                    autoNews.forEach(auto => {
                        if (auto.categories && auto.categories.length > 0) {
                            auto.categories.forEach(category => {
                                this.subscriber.get(category).set(auto.channel, {
                                    guild: auto.guild,
                                    channel: auto.channel
                                });
                            })
                        }
                    })
                }
            })
        )
    }

    addSubscriber(category, channelId, guildId) {
        var conditions = {
            channel: channelId
        }
        if (typeof guildId != 'undefined' && guildId != null) {
            conditions.guild = guildId;
        }

        if (category == tosService.uniqueCategories.firstKey()) {
            return this.safeQuery(this.AutoTosNew.updateOne(
                conditions,
                {
                    guild: guildId, 
                    channel: channelId, 
                    categories: tosService.allCategoriesId
                },
                {upsert: true}
            ).then(() => {
                tosService.allCategoriesId.forEach(cate => {
                    this.subscriber.get(cate).set(channelId, {
                        guild: guildId,
                        channel: channelId
                    });
                })
            }))
        } else {
            return this.safeQuery(this.AutoTosNew.updateOne(
                conditions,
                {guild: guildId, channel: channelId, $addToSet: {categories: category}},
                {upsert: true}
            ).then(() => {
                this.subscriber.get(category).set(channelId, {
                    guild: guildId,
                    channel: channelId
                });
            }))
        }
    }

    removeSubscriber(category, channelId, guildId) {
        var conditions = {
            channel: channelId
        }
        if (typeof guildId != 'undefined' && guildId != null) {
            conditions.guild = guildId
        }

        if (category == tosService.uniqueCategories.firstKey()) {
            return this.safeQuery(this.AutoTosNew.updateOne(
                conditions,
                {$unset : {categories: null}} //null or any value, doesnt matter for $unset
            ).then(() => {
                tosService.allCategoriesId.forEach(cate => {
                    this.subscriber.get(cate).delete(channelId);
                })
            }))
        } else {
            return this.safeQuery(this.AutoTosNew.updateOne(
                conditions,
                {$pull: {categories: category}}
            ).then(() => {
                this.subscriber.get(category).delete(channelId);
            }))
        }
    }
}

module.exports = AutoTosNews;