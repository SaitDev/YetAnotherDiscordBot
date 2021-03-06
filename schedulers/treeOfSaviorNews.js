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

                //TODO update logic latestNew -> latestNewses
                var latestNews = this.client.database.latestTosNewManager.latestNew;
                var sortedNews = news.sort((a, b) => b.id - a.id);
                if (latestNews > 0) {
                    sortedNews.filter(
                        val => val.id > latestNews
                    ).forEach(val => {
                        var channels = this.client.database.autoTosNewManager.subscriber.get(val.category).keys();
                        for (let channel of channels) {
                            var discordChannel = this.client.channels.resolve(channel)
                            if (discordChannel) {
                                this.client.messageUtil.sendFromChannel(
                                    discordChannel,
                                    val.url
                                );
                            }
                        }
                    })
                }
                var sortedNews = news.sort((a, b) => b.id - a.id);
                this.client.database.latestTosNewManager.crawled(sortedNews[0].id);
            })
            .catch(e => {
                this.client.errorLogger.error(e);
            })
        } catch (err) {
            this.client.errorLogger.error(err);
        }
    }
}

module.exports = TreeOfSaviorNews;