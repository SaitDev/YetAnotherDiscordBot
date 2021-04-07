const mongoose = require('mongoose')
const Schema = mongoose.Schema

const util = require('../util/commonUtil')

const genshinNewsSubscribe = new Schema({
    guild: String,
    discordChannel: String,
    newsChannels: [{type: Number}],
}, {
    collection: util.isProduction() ? "prod_genshinNews" : "test_genshinNews"
})

module.exports = mongoose.model('GenshinNewsSubscribe', genshinNewsSubscribe);