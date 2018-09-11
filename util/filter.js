const stringUtil = require('./stringUtil')

class Filter {
    constructor(client, config) {
        this.client = client;
        if (config) {
            this.config = config;
        } else {
            this.config = require('../config.json');
        }
    }

    containBot(msg, args) {
        if (!msg.content) return false;

        var content = stringUtil.simplify(args);

        var usernameParts = this.client.user.username.split(' ');
        for (var i = 0; i < usernameParts.length; i++) {
            if (content.includes(stringUtil.simplify(usernameParts[i]))) {
                return true;
            }
        }

        if (msg.guild && msg.guild.me.nickname) {
            var nicknameParts = msg.guild.me.nickname.split(' ');
            for (var i = 0; i < nicknameParts.length; i++) {
                if (content.includes(stringUtil.simplify(nicknameParts[i]))) {
                    return true;
                }
            }
        }

        return false;
    }

    async containOwner(msg, args) {
        if (args && this.config.owner && this.config.owner.length > 0) {
            var content = stringUtil.simplify(args);

            for (var i = 0; i < this.config.owner.length; i++) {
                var contained = await this.client.fetchUser(this.config.owner[i])
                    .then(user => {
                        if (!user || !user.username) return false;
                        var usernameParts = user.username.split(' ');
                        for (var i = 0; i < usernameParts.length; i++) {
                            var part = stringUtil.simplify(usernameParts[i]);
                            if (part && content.includes(part)) {
                                return true;
                            }
                        }
                        return false;
                    })
                    .catch(err => {
                        console.error(err.stack);
                        return false;
                    });

                if (contained) return true;
            }
        }
        return false;
    }
}

module.exports = Filter