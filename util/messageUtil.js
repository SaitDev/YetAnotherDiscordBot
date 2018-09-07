import discord from 'discord.js';

class MessageUtil {
    /**
     * @param {import('../chitanda')} client 
     */
    constructor(client) {
        this.client = client;
    }

    /**
     * Safely send a message to the same channel of another message
     * @param {discord.Message} msg 
     * @param {*} content 
     */
    sendFromMessage(msg, content) {
        sendFromChannel(msg.channel, content);
    }

    /**
     * Safely send a message to a channel
     * @param {discord.TextChannel | discord.DMChannel | discord.GroupDMChannel} channel 
     * @param {*} content 
     */
    sendFromChannel(channel, content) {
        channel.send(content)
        .catch((err) => {
            this.client.errorLogger.error(err);
        })
    }
}

export default MessageUtil;