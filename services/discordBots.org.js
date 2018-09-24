const DBL = require('dblapi.js')

const config = require('../config.json')
const message = 'Updated server count to discordbots.org'
const updateInterval = 7200000 //2 hours

class DiscordBotOrg {
    /**
     * @param {import('../chitanda')} client 
     */
    constructor(client) {
        this.listeners = [];
        this.service = new DBL(config.discordBotOrg.token, {statsInterval: updateInterval}, client);

        this.service.on('posted', () => {
            client.errorLogger.info(message, true);
        });
        this.service.on('error', err => {
            client.errorLogger.error(err);
        });

        this.service.postStats(client.guilds.size)
        .then(() => {
            client.errorLogger.info(message, true);
        })
        .catch((err) => {
            client.errorLogger.error(err);
        });
    }
}

module.exports = DiscordBotOrg;