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

    /**
     * 
     * @param {import('discord.js').Message} msg 
     * @param {string} content 
     */
    removeMentions(msg, content) {
        return this.removeMentionMember(
            msg, this.removeMentionChannel(
                msg, this.removeMentionRole(
                    msg, content //this.removeMentionUser(msg, content)
                    //TODO: why a user not guild member isnt in `msg.mentions.users`
                )
            )
        );
    }

    /**
     * 
     * @param {import('discord.js').Message} msg 
     * @param {string} content 
     */
    removeMentionMember(msg, content) {
        if (msg.mentions.members && msg.mentions.members.size > 0) {
            msg.mentions.members.forEach((member, id) => {
                content = content.replace(member.toString(), "");
            });
        }
        return content;
    }

    /**
     * 
     * @param {import('discord.js').Message} msg 
     * @param {string} content 
     */
    removeMentionChannel(msg, content) {
        if (msg.mentions.channels && msg.mentions.channels.size > 0) {
            msg.mentions.channels.forEach((channel, id) => {
                content = content.replace(channel.toString(), "");
            });
        }
        return content;
    }
    
    /**
     * 
     * @param {import('discord.js').Message} msg 
     * @param {string} content 
     */
    removeMentionRole(msg, content) {
        if (msg.mentions.roles && msg.mentions.roles.size > 0) {
            msg.mentions.roles.forEach((role, id) => {
                content = content.replace(role.toString(), "");
            });
        }
        return content;
    }

    /**
     * 
     * @param {import('discord.js').Message} msg 
     * @param {string} content 
     */
    removeMentionUser(msg, content) {
        if (msg.mentions.users && msg.mentions.users.size > 0) {
            msg.mentions.users.forEach((user, id) => {
                content = content.replace(user.toString(), "");
            });
        }
        return content;
    }

    /**
     * 
     * @param {import('discord.js').Message} msg 
     * @param {string} content 
     */
    replaceMentionMemberName(msg, content) {
        if (msg.mentions.members && msg.mentions.members.size > 0) {
            msg.mentions.members.forEach((member, id) => {
                content = content.replace(member.toString(), member.displayName)
            });
        }
        return content;
    }
}

module.exports = MessageUtil;