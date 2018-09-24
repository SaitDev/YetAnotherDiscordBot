const mongoose = require('mongoose')
const Schema = mongoose.Schema

const util = require('../util/commonUtil')

const autoTosNew = new Schema({
    guild: String,
    channel: String,
    categories: [{type: Number}],
}, {
    collection: util.isProduction() ? "prod_autoTosNews" : "test_autoTosNews"
})

module.exports = mongoose.model('AutoTosNew', autoTosNew);