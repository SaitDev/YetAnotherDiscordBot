const request = require('sync-request');

const baseUrl = 'https://nekos.life';
const imagePath = '/api/v2/img/';
const chatPath = '/api/v2/chat?text=';
const catPath = '/api/v2/cat';
const httpMethod = 'GET';

class NekoLife {
    constructor() {
    }

    chat(message) {
        var res = request(httpMethod, baseUrl + chatPath + message);
        return JSON.parse(res.getBody('utf8')).response;
    }

    cat() {
        var res = request(httpMethod, baseUrl + catPath);
        return JSON.parse(res.getBody('utf8')).cat;
    }

    image(tag) {
        if (!tag) return null;
        var res = request(httpMethod, baseUrl + imagePath + tag);
        return JSON.parse(res.getBody('utf8')).url; //toString('utf-8')
    }
}

module.exports = NekoLife;