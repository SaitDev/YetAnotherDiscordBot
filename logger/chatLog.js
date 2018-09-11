class ChatLog {
    /**
     * @param {import('../chitanda')} client 
     */
    constructor(client) {
        this.config = require('../config.json');
        this.client = client;
        if (!this.trackings) {
            if (this.config.tracking && this.config.tracking.length > 0) {
                this.trackings = this.config.tracking;
            } else {
                this.trackings = [];
            }
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
        if (!msg.channel.guild || 
            (this.config.guilds && this.config.guilds.length > 0 && 
                !this.config.guilds.includes(msg.channel.guild.id))) {
            return;
        }

        if (this.config.debug) {
            console.log('delete=====')
            console.log('[' + new Date().toLocaleString() + '] ' + msg.author.username)
            console.log(msg.content)
            msg.attachments.forEach(element => {
                console.log('attachment: ' + element.proxyURL)
            });
        }

        if (this.trackings.includes(msg.author.id)) {
            this.client.messageUtil.sendFromMessage(msg, '`' + msg.author.username + ' \'s message is deleted:` ' + msg.content);
            var links = '';
            if (msg.attachments.size != 0) {
                msg.attachments.forEach(element => {
                    links += element.proxyURL + '\n'
                });
                if (links) this.client.messageUtil.sendFromMessage(msg, links);
            }
        }
    }

    edit(oldMsg, newMsg) {
        if (oldMsg.author.id == this.client.user.id || oldMsg.author.bot) return;
        if (!oldMsg.channel.guild || 
            (this.config.guilds && this.config.guilds.length > 0 &&
                !this.config.guilds.includes(oldMsg.channel.guild.id))) {
            return;
        }
        if (!newMsg || !newMsg.editedAt) return;
        
        if (this.config.debug) {
            console.log('edit-----')
            console.log('[' + new Date().toLocaleString() + '] ' + oldMsg.author.username)
            console.log(oldMsg.id + ': ' +  oldMsg.content)
            oldMsg.attachments.forEach(element => {
                console.log('attachment: ' + element.proxyURL);
            });
        }

        if (this.trackings.includes(oldMsg.author.id)) {
            this.client.messageUtil.sendFromMessage(
                oldMsg, 
                '`' + oldMsg.author.username + ' \'s message(' + oldMsg.id + ') is editted:` ' + oldMsg.content
            );
            var links = '';
            if (oldMsg.attachments.size != 0) {
                oldMsg.attachments.forEach(element => {
                    links += element.proxyURL + '\n'
                });
                if (links) {
                    this.client.messageUtil.sendFromMessage(oldMsg, links);
                }
            }
        }
    }
}

module.exports = ChatLog;