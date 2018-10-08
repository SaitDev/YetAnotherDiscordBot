const BaseFactory = require('../baseFactory')
const BASE_NEWS_URL = 'https://treeofsavior.com/page/news/view.php?n=';

class LatestTosNew extends BaseFactory {
    constructor(factory) {
        super(factory);
        this.loaded = false;
        this.latestNew = 0;
        /**
         * @type Date
         */
        this.lastCrawl = null;
        this.LatestTosNewCrawled = require('../../models/latestTosNewCrawled');
    }

    loadHistory() {
        return this.safeQuery(
            this.LatestTosNewCrawled.findOne(
                {newsId: {$exists: true}}
            ).then(latest => {
                if (latest) {
                    this.latestNew = latest.newsId;
                    this.lastCrawl = latest.time;
                }
                this.loaded = true;
            })
        )
    }

    /**
     * 
     * @param {Number} newsId 
     */
    crawled(newsId) {
        if (isNaN(newsId)) {
            throw new TypeError('ToS news id must be number');
        }
        var lastCrawl = Date.now();
        var newDoc = {
            newsId: newsId, 
            url: BASE_NEWS_URL + newsId.toString(), 
            lastCheck: lastCrawl
        }
        if (newsId != this.latestNew) {
            newDoc.time = lastCrawl;
        }
        this.safeQuery(
            this.LatestTosNewCrawled.updateOne(
                {newsId: {$exists: true}, time: {$exists: true}},
                newDoc,
                {upsert: true}
            ).then(() => {
                this.lastCrawl = lastCrawl;
                this.latestNew = newsId;
            })
        )
    }
}

module.exports = LatestTosNew;