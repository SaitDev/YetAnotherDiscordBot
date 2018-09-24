const VoteScheduler = require('../schedulers/voteScheduler')
const TreeOfSaviorNews = require('../schedulers/treeOfSaviorNews')

class SchedulerManager {
    /**
     * @param {import('../chitanda')} client 
     */
    constructor(client) {
        this.client = client;
        this.voteScheduler = new VoteScheduler(client);
        this.treeOfSaviorNews = new TreeOfSaviorNews(client);
    }

    startAll() {
        this.voteScheduler.start();
        this.treeOfSaviorNews.start();
    }
}

module.exports = SchedulerManager;