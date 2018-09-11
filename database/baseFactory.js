class BaseFactory {
    /**
     * @param {import('../database/databaseFactory')} factory 
     */
    constructor(factory) {
        this.database = factory;
    }

    /**
     * 
     * @param {Promise} promiseLike 
     */
    safeQuery(promiseLike) {
        return promiseLike.catch(err => {
            this.client.errorLogger.error(err);
        });
    }
}

module.exports = BaseFactory;