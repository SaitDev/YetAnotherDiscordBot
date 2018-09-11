const mongoose = require('mongoose')

const config = require('../config.json')
const GuildSettings = require('./user/guildSettings')

class DatabaseFactory {
    /**
     * @param {import('../chitanda')} client 
     */
    constructor(client) {
        this.client = client;
        this.guildSettingManager = new GuildSettings(this);
    }

    connect() {
        return mongoose.connect(config.database, { useNewUrlParser: true })
        .then(() => {
            this.client.errorLogger.info('Connected to mongodb', true);
            return true;
        })
        .catch(err => {
            this.client.errorLogger.error(err);
            process.exit(1);
        });
    }
}

module.exports = DatabaseFactory;