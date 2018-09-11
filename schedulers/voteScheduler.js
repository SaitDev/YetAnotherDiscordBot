const agenda = require('agenda')
const mongoose = require('mongoose')
const bluebird = require('bluebird')

const util = require('../util/commonUtil')
const jobName = 'voteReceived';
const collection = (util.isProduction() ? 'prod_' : 'test_') + 'voteQueue'
const messages = [
    'Hey hey. I just got voted. I\'m curious, who did vote me?',
    'Thank for voting me. Please keep the flame',
    'Watashi, kininarimasu! Who is the one that vote me'
]
const delayStart = 10000 //10 secends
const checkJobEvery = 3000 //3 secends

class VoteScheduler {
    /**
     * @param {import('../chitanda')} client 
     */
    constructor(client) {
        this.client = client;
        this.scheduler = new agenda();
        this.started = false;

        this.scheduler.on('error', err => {
            this.client.errorLogger.error(err);
        })

        this.scheduler.define(jobName, (job, done) => {
            var userId = job.attrs.data.body.user;
            var isWeekend = job.attrs.data.body.isWeekend;
            var botId = job.attrs.data.body.bot;
            var type = job.attrs.data.body.type;

            this.thankVote(userId, isWeekend)
            .then(() => {
                done();
            })
        })
    }

    async start() {
        if (this.started) {
            await this.stop();
        }

        this.scheduler.mongo(mongoose.connection.db, collection);
        //first time start delay to reduce heavy load
        if (!this.started) {
            await bluebird.delay(delayStart);
        }
        this.scheduler.processEvery(checkJobEvery);
        await this.scheduler.start()
        .then(() => {
            this.started = true;
            this.client.errorLogger.info('Vote scheduler started', true)
        }).catch(err => {
            this.client.errorLogger.error(err);
        })
    }

    async stop() {
        await this.scheduler.stop()
        .catch(err => {
            this.client.errorLogger.error(err);
        })
    }

    thankVote(userId, isWeekend) {
        return this.client.fetchUser(userId)
        .then(user => {
            if (user.dmChannel) {
                sendThank(this.client, user.dmChannel, user);
            } else {
                user.createDM().then(dm => {
                    sendThank(this.client, dm, user);
                })
            }
        })
        .catch(err => {
            this.client.errorLogger.error(err);
        })
    }
}

VoteScheduler.voteJob = jobName;
VoteScheduler.voteCollection = collection;

/**
 * 
 * @param {import('../chitanda')} client
 * @param {import('discord.js').DMChannel} dmChannel 
 * @param {import('discord.js').User} user 
 */
var sendThank = function (client, dmChannel, user) {
    client.messageUtil.sendFromChannel(
        dmChannel,
        messages[Math.floor(Math.random() * messages.length)]
    );
}

module.exports = VoteScheduler;