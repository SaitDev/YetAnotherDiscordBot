const mongoose = require('mongoose');
const _ = require('lodash');

const BaseFactory = require('../baseFactory');
const LatestGenshinNews = require('../../models/latestGenshinNews');

class LatestGenshinNewsFactory extends BaseFactory {
    constructor(factory) {
        super(factory);
        this.loaded = false;
        this.latestNewses = [];
        /**
         * @type Date
         */
        this.lastCrawlTime = null;
    }

    loadHistory() {
        return this.safeQuery(
            LatestGenshinNews.findOne(
                {newsIds: {$exists: true}}
            ).then(latest => {
                if (latest) {
                    this.latestNewses = latest.newsIds;
                    this.lastCrawlTime = latest.time;
                }
                this.loaded = true;
            })
        )
    }
    
    /**
     * 
     * @param {import('../../services/genshin.mihoyo.com').News[]} newses 
     */
    crawled(newses) {
        if (!newses || !newses.length) {
            throw new TypeError('Newses should not be empty')
        }
        if (newses.some((news, i, array) => isNaN(news.id))) {
            throw new TypeError('Genshin news id must be number');
        }
        var lastCrawl = Date.now();
        var newsIds = newses.map(n => n.id);
        var newsDoc = {
            newsIds: newsIds, 
            lastCheck: lastCrawl
        }
        if (!this.latestNewses.length || _.isEqual(this.latestNewses.slice(), newsIds.slice()) == false) {
            newsDoc.time = lastCrawl;
        }
        this.safeQuery(
            LatestGenshinNews.updateOne(
                {newsIds: {$exists: true}, time: {$exists: true}},
                newsDoc,
                {upsert: true}
            ).then(() => {
                this.lastCrawlTime = lastCrawl;
                this.latestNewses = newsIds;
            })
        )
    }
}

module.exports = LatestGenshinNewsFactory;