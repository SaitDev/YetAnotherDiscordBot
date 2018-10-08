const mongoose = require('mongoose')
const Schema = mongoose.Schema

const util = require('../util/commonUtil')

const latestTosNewCrawled = new Schema({
    newsId: Number,
    url : String,
    time: Date,
    lastCheck: Date
}, {
    collection: util.isProduction() ? "prod_autoTosNews" : "test_autoTosNews"
})

module.exports = mongoose.model('LatestTosNewCrawled', latestTosNewCrawled);