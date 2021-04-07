const VoteScheduler = require('../schedulers/voteScheduler')
const TreeOfSaviorNews = require('../schedulers/treeOfSaviorNews')
const GenshinNewsScheduler = require('../schedulers/genshinNewsScheduler')

class SchedulerManager {
    /**
     * @param {import('../chitanda')} client 
     */
    constructor(client) {
        this.client = client;
        this.voteScheduler = new VoteScheduler(client);
        this.treeOfSaviorNews = new TreeOfSaviorNews(client);
        this.genshinNewsScheduler = new GenshinNewsScheduler(client);
    }

    async startAll() {
        //TODO create base scheduler
        this.voteScheduler.start();
        this.treeOfSaviorNews.start();
        this.genshinNewsScheduler.start();
    }
}

module.exports = SchedulerManager;