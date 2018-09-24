class BaseFactory {
    /**
     * @param {import('../database/databaseFactory')} factory 
     */
    constructor(factory) {
        this.database = factory;
    }

    /**
     * 
     * @param {import('mongoose').DocumentQuery} promiseLike 
     */
    safeQuery(promiseLike) {
        return promiseLike.catch(err => {
            this.database.client.errorLogger.error(err);
        });
    }
}

module.exports = BaseFactory;