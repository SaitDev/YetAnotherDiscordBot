const mongoose = require('mongoose')

const config = require('../config.json')

class DatabaseFactory {
    /**
     * @param {import('../chitanda')} client 
     */
    constructor(client) {
        this.client = client;
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