const DiscordBotOrg = require('../services/discordBots.org')
const BotDiscordPw = require('../services/botsDiscord.Pw')

const messages = [
    'Hey hey. I just got voted. I\'m curious, who did vote me?',
    'Thank for voting me. Please keep the flame'
]

class BotListingManager {
    /**
     * @param {import('../chitanda')} client 
     */
    constructor(client) {
        this.client = client;
        this.discordBotOrg = new DiscordBotOrg(client);
        this.botDiscordPw = new BotDiscordPw(client);

        this.discordBotOrg.onVote((userId, isWeekend) => {
            try {
                this.thankVote(userId, isWeekend);
            } catch (err) {
                this.client.errorLogger.error(err);
            }
        });
    }

    thankVote(userId, isWeekend) {
        //TODO: remove these debug after success on production
        console.log(userId)
        console.log(isWeekend)
        this.client.fetchUser(userId)
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

/**
 * 
 * @param {import('../chitanda')} client
 * @param {import('discord.js').DMChannel} dmChannel 
 * @param {import('discord.js').User} user 
 */
var sendThank = function(client, dmChannel, user) {
    client.messageUtil.sendFromChannel(
        dmChannel, 
        messages[Math.floor(Math.random() * messages.length)]
    );
}

module.exports = BotListingManager;