const request = require('sync-request');

const baseUrl = 'https://rra.ram.moe';
const imagePath = '/i/r';
const imageTypeParam = '?type=';
const httpMethod = 'GET';

const imageEndpoint = baseUrl + imagePath + imageTypeParam;

class RamMoe {
    constructor() {
        this.tags = [
            "cry", "cuddle", "hug", "kiss", "lewd",
            "lick", "nom", "nyan", "owo", "pat",
            "pout", "rem", "slap", "smug", "stare",
            "tickle", "triggered", "nsfw-gtn",
            "potato", "kermit"
        ];
    }

    image(tag) {
        if (!tag) return null;
        var res = request(httpMethod, imageEndpoint + tag);
        return baseUrl + JSON.parse(res.getBody('utf8')).path;
    }
}

module.exports = RamMoe;