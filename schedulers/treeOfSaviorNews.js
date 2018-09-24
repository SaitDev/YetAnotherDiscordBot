const service = require('../services/treeOfSavior.com')

const checkNewsDelay = 60000 //60 sec

class TreeOfSaviorNews {
    /**
     * @param {import('../chitanda')} client 
     */
    constructor(client) {
        this.started = false;
        this.client = client;
    }

    start() {
        this.crawl();
        if (!this.started) {
            this.started = true;
            setInterval(this.crawl.bind(this), checkNewsDelay);
        }
    }

    crawl() {
        try {
            service.fetchNews()
            .then(news => {
                if (!news || news.length < 1) return;
                if (!this.client.database.latestTosNewManager.loaded) return;
                
                if (this.client.database.latestTosNewManager.latestNew > 0) {
                    news.filter(
                        val => val.id > this.client.database.latestTosNewManager.latestNew
                    ).forEach(val => {
                        var channels = this.client.database.autoTosNewManager.subscriber.get(val.category).keys();
                        for (let channel of channels) {
                            if (this.client.channels.has(channel)) {
                                this.client.messageUtil.sendFromChannel(
                                    this.client.channels.get(channel),
                                    val.url
                                );
                            }
                        }
                    })
                }
                this.client.database.latestTosNewManager.crawled(news[0].id);
            })
        } catch (err) {
            this.client.errorLogger.error(err);
        }
    }
}

module.exports = TreeOfSaviorNews;