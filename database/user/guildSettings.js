const bluebird = require('bluebird')

const BaseFactory = require('../baseFactory')

class GuildSettings extends BaseFactory {
    constructor(factory) {
        super(factory);
        this.GuildSetting = require('../../models/guildSetting');
        this.customPrefix = new Map();
        this.disabledModule = new Map();
        this.disabledCommand = new Map();
    }

    loadSettings() {
        return this.safeQuery(
            this.GuildSetting.find({
                prefix: {$exists: true}
            })
        ).then(prefixs => {
            if (prefixs && prefixs.length > 0) {
                bluebird.each(prefixs, setting => {
                    if (typeof setting.prefix != 'undefined' && setting.prefix != null) {
                        this.customPrefix.set(setting.guild, setting.prefix)
                    }
                }).then(() => {
                    this.database.client.errorLogger.info('Prefix settings loaded', true);
                }).catch(err => {
                    this.database.client.errorLogger.error(err);
                })
            }
        })
    }

    /**
     * 
     * @param {import('discord.js').Guild} guild 
     * @param {string} prefix 
     */
    updatePrefix(guild, prefix) {
        return this.safeQuery(this.GuildSetting.updateOne(
            {guild: guild.id},
            {guild: guild.id, prefix: prefix},
            {upsert: true}
        ).exec(
        ).then(() => {
            this.customPrefix.set(guild.id, prefix);
        }));
    }

}

module.exports = GuildSettings;