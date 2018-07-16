const request = require('sync-request');

const baseUrl = 'https://rra.ram.moe';
const imagePath = '/i/r?type=';
const httpMethod = 'GET';

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
        var res = request(httpMethod, baseUrl + imagePath + tag);
        return baseUrl + JSON.parse(res.getBody('utf8')).path;
    }
}

module.exports = RamMoe;