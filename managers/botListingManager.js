const DiscordBotOrg = require('../services/discordBots.org')
const BotDiscordPw = require('../services/botsDiscord.Pw')

class BotListingManager {
    /**
     * @param {import('../chitanda')} client 
     */
    constructor(client) {
        this.client = client;
        this.discordBotOrg = new DiscordBotOrg(client);
        this.botDiscordPw = new BotDiscordPw(client);
    }
}

module.exports = BotListingManager;