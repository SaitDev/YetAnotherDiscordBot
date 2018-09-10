const VoteScheduler = require('../schedulers/voteScheduler')

class SchedulerManager {
    /**
     * @param {import('../chitanda')} client 
     */
    constructor(client) {
        this.client = client;
        this.voteScheduler = new VoteScheduler(client);
    }

    startAll() {
        this.voteScheduler.start();
    }
}

module.exports = SchedulerManager;