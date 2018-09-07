const DBL = require('dblapi.js');

const config = require('../config.json');
const message = 'Updated server count to discordbots.org';

class DiscordBotOrg {
    /**
     * @param {import('../chitanda')} client 
     */
    constructor(client) {
        this.listeners = [];
        this.service = new DBL(config.discordBotOrg.token,
            {
                webhookPort: process.env.PORT || 5000,
                webhookAuth: config.discordBotOrg.webhookAuth
            },
            client
        );

        this.service.on('posted', () => {
            client.errorLogger.info(message, true);
        });
        this.service.on('error', err => {
            client.errorLogger.error(err);
        });

        this.service.webhook.on('ready', hook => {
            client.errorLogger.info(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
        });
        this.service.webhook.on('vote', vote => {
            //TODO: remove these debug after success on production
            console.log(vote)
            this.listeners.forEach(listener => {
                try {
                    listener(vote.user, vote.isWeekend);
                } catch (err) {
                    client.errorLogger.error(err);
                }
            })
        });

        this.service.postStats(client.guilds.size)
        .then(() => {
            client.errorLogger.info(message, true);
        })
        .catch((err) => {
            client.errorLogger.error(err);
        });
    }

    onVote(listener) {
        if (typeof listener == 'function') {
            this.listeners.push(listener);
        }
    }
}

module.exports = DiscordBotOrg;