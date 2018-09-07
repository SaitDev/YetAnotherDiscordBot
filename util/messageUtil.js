class MessageUtil {
    /**
     * @param {import('../chitanda')} client 
     */
    constructor(client) {
        this.client = client;
    }

    /**
     * Safely send a message to the same channel of another message
     * @param {import('discord.js').Message} msg 
     * @param {*} content 
     */
    sendFromMessage(msg, content) {
        sendFromChannel(msg.channel, content);
    }

    /**
     * Safely send a message to a channel
     * @param {import('discord.js').TextChannel | import('discord.js').DMChannel | import('discord.js').GroupDMChannel} channel 
     * @param {*} content 
     */
    sendFromChannel(channel, content) {
        channel.send(content)
        .catch((err) => {
            this.client.errorLogger.error(err);
        })
    }
}

module.exports = MessageUtil;