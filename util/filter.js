function simplify(message) {
    return removeNonLatin(removeSpace(message))
        .replace('.', '').replace('-', '').replace('_', '')
        .toUpperCase();
}

function removeSpace(message) {
    return message.replace(/\s/g, '');
}

function removeNonLatin(message) {
    return message.replace( /([^\x00-\xFF]|\s)*$/g, '' );
}

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

        var content = simplify(args);

        var usernameParts = this.client.user.username.split(' ');
        for (var i = 0; i < usernameParts.length; i++) {
            if (content.includes(simplify(usernameParts[i]))) {
                return true;
            }
        }

        if (msg.guild && msg.guild.me.nickname) {
            var nicknameParts = msg.guild.me.nickname.split(' ');
            for (var i = 0; i < nicknameParts.length; i++) {
                if (content.includes(simplify(nicknameParts[i]))) {
                    return true;
                }
            }
        }

        return false;
    }

    containOwner(msg, args) {
        if (args && this.config.owner && this.config.owner.length > 0) {
            var content = simplify(args);
            
            for (var i = 0; i < this.config.owner.length; i++) {
                var contained = this.client.fetchUser(this.config.owner[i])
                .then(user => {
                    var usernameParts = user.username.split(' ');
                    for (var i = 0; i < usernameParts.length; i++) {
                        if (content.includes(simplify(usernameParts[i]))) {
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