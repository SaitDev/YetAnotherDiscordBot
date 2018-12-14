const DiscordBotOrg = require('../services/discordBots.org')
const DiscordBotGG = require('../services/discordBots.gg')

class BotListingManager {
    /**
     * @param {import('../chitanda')} client 
     */
    constructor(client) {
        this.client = client;
        this.discordBotOrg = new DiscordBotOrg(client);
        this.discordBotGG = new DiscordBotGG(client);
    }
}

module.exports = BotListingManager;