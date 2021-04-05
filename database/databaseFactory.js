const mongoose = require('mongoose')
const bluebird = require('bluebird')

const config = require('../config.json')
const GuildSettings = require('./user/guildSettings')
const AutoTosNews = require('./user/autoTosNews')
const LatestTosNew = require('./system/latestTosNew')

class DatabaseFactory {
    /**
     * @param {import('../chitanda')} client 
     */
    constructor(client) {
        /**
         * @description When all necessary data is loaded from mongodb
         */
        this.ready = false;
        this.client = client;
        this.guildSettingManager = new GuildSettings(this);
        this.autoTosNewManager = new AutoTosNews(this);
        this.latestTosNewManager = new LatestTosNew(this);
    }

    connect() {
        let databaseUri;
        if (config.database.startsWith('${') && config.database.endsWith('}')) {
            databaseUri = config.database.substring(2, config.database.length - 1);
            databaseUri = process.env[databaseUri];
        } else {
            databaseUri = config.database;
        }
        return mongoose.connect(databaseUri, { useNewUrlParser: true })
        .then(() => {
            this.client.errorLogger.info('Connected to mongodb', true);
            return true;
        })
        .catch(err => {
            this.client.errorLogger.error(err);
            process.exit(1);
        });
    }

    loadAll() {
        bluebird.all([
            this.guildSettingManager.loadSettings(),
            this.autoTosNewManager.loadSettings(),
            this.latestTosNewManager.loadHistory()
        ]).then(() => {
            this.ready = true;
        }).catch(err => {
            this.client.errorLogger.error(err);
        })
    }
}

module.exports = DatabaseFactory;