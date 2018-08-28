const defaultPresenceActivity = "PLAYING";
const changePresenceDelay = 100000; //100sec

class PresenceManager {
    constructor(client, customConfig) {
        this.client = client;
        if (customConfig) {
            this.config = customConfig;
        } else {
            this.config = require('../config.json');
        }
        this.started = false;
    }

    start() {
        this.updatePrecense();
        if (!this.started) {
            setInterval(this.updatePrecense.bind(this), changePresenceDelay);
            this.started = true;
        }
    }

    updatePrecense() {
        try {
            if (this.config.presence) {
                if (!Array.isArray(this.config.presence)) {
                    this.setPresence(this.config.presence);
                } else {
                    if (this.config.presence.length < 1) return;
                    var presence = this.config.presence[Math.floor(Math.random() * this.config.presence.length)];
                    if (!Array.isArray(presence)) {
                        this.setPresence(presence);
                    } else if (presence.length > 1) {
                        this.setPresence(presence[0], presence[1]);
                    } else if (presence.length > 0) {
                        this.setPresence(presence[0]);
                    }
                }
            }
        } catch (err) {
            console.error(err.stack);
        }
    }

    setPresence(text, activity) {
        if (text.trim() == 'help') text = this.config.prefix + text;
        this.client.user.setPresence({
            game: {
                name: text,
                type: activity ? activity : defaultPresenceActivity
            }
        })
    }
}

module.exports = PresenceManager;