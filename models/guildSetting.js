const mongoose = require('mongoose')
const Schema = mongoose.Schema

const util = require('../util/commonUtil')

const guildSetting = new Schema({
    guild: String,
    prefix: String,
    disabledModules: [{type: String}],
    trackings: [{type: Map}]
}, {
    collection: util.isProduction() ? "prod_guildSettings" : "test_guildSettings"
})

module.exports = mongoose.model('GuildSetting', guildSetting);