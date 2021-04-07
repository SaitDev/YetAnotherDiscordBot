const mongoose = require('mongoose')
const Schema = mongoose.Schema

const util = require('../util/commonUtil');

const latestGenshinNews = new Schema({
    newsIds: [{type: Number}],
    time: Date,
    lastCheck: Date
}, {
    collection: util.isProduction() ? "prod_genshinNews" : "test_genshinNews"
})

module.exports = mongoose.model('LatestGenshinNews', latestGenshinNews);