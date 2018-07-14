const config = require('../config.json');

class ChatLog {
    constructor(client) {
        this.client = client;
        if (!this.trackings) {
            this.trackings = config.tracking;
        }
    }

    track(id) {
        if (!this.trackings.includes(id)) {
            this.trackings.push(id);
        }
    }

    untrack(id) {
        if (this.trackings.includes(id)) {
            this.trackings.splice(this.trackings.indexOf(id), 1);
        }
    }

    deleted(msg) {
        if (msg.author.id == this.client.user.id || msg.author.bot) return;
        if (msg.channel.guild && !config.guilds.includes(msg.channel.guild.id)) return;
        if (this.trackings.includes(msg.author.id)) {
            msg.channel.send('`' + msg.author.username + ' \'s message is deleted:` ' + msg.content);
            var links = '';
            if (msg.attachments.size != 0) {
                msg.attachments.forEach(element => {
                    links += element.proxyURL + '\n'
                });
                if (links) msg.channel.send(links);
            }
        }
    }

    edit(oldMsg, newMsg) {
        if (oldMsg.author.id == this.client.user.id || oldMsg.author.bot) return;
        if (oldMsg.channel.guild && !config.guilds.includes(oldMsg.channel.guild.id)) return;
        if (!newMsg || !newMsg.editedAt) return;
        if (this.trackings.includes(oldMsg.author.id)) {
            oldMsg.channel.send('`' + oldMsg.author.username + ' \'s message(' + oldMsg.id + ') is editted:` ' + oldMsg.content);
            var links = '';
            if (oldMsg.attachments.size != 0) {
                oldMsg.attachments.forEach(element => {
                    links += element.proxyURL + '\n'
                });
                if (links) oldMsg.channel.send(links);
            }
        }
    }
}

module.exports = ChatLog;