const service = require('../services/genshin.mihoyo.com');

const checkNewsDelay = 60000 //60 sec
const maxSubscribeNewsCount = 10;

class GenshinNewsScheduler {
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
            setInterval(this.crawl.bind(this), checkNewsDelay);
            this.started = true;
        }
    }

    async crawl() {
        try {
            /**
             * @type import('../services/genshin.mihoyo.com').News[]
             */
            var newses = await service.fetchNews();
            if (!newses || !newses.length) return;
            var newsCount = 0;

            for (let news of newses) {
                if (this.client.database.latestGenshinNewsFactory.latestNewses.includes(news.id)) {
                    continue;
                }

                if (newsCount > maxSubscribeNewsCount) break;

                newsCount++;
                var channelSent = [];
                for (let newChannelId of news.channelIds) {
                    var subscribedChannels = this.client.database.genshinNewsSubscribeFactory.subscriber.get(parseInt(newChannelId));
                    if (!subscribedChannels) continue;

                    var discordChannels = subscribedChannels.keys();
                    for (let channel of discordChannels) {
                        if (channelSent.includes(channel)) continue;

                        var discordChannel = this.client.channels.resolve(channel);
                        if (discordChannel) {
                            this.client.messageUtil.sendFromChannel(
                                discordChannel,
                                news.title + " \n" + news.url
                            );
                            channelSent.push(channel);
                        }
                    }
                }
            }

            this.client.database.latestGenshinNewsFactory.crawled(newses);
        } catch (error) {
            this.client.errorLogger.error(error);
        }
    }
}

module.exports = GenshinNewsScheduler;