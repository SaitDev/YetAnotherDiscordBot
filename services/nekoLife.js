const request = require('sync-request');

const baseUrl = 'https://nekos.life';
const imagePath = '/api/v2/img/';
const chatPath = '/api/v2/chat';
const catPath = '/api/v2/cat';
const chatParam = '?text=';
const httpMethod = 'GET';

const imageEndpoint = baseUrl + imagePath;
const chatEndpoint = baseUrl + chatPath + chatParam;
const catEndpoint = baseUrl + catPath;

class NekoLife {
    constructor() {
        this.tag = ['feet', 'yuri', 'trap', 'futanari', 'hololewd', 
            'lewdkemo', 'solog', 'feetg', 'cum', 'erokemo', 'les', 
            'wallpaper', 'lewdk', 'ngif', 'meow', 'tickle', 'lewd', 
            'feed', 'gecg', 'eroyuri', 'eron', 'cum_jpg', 'bj', 
            'nsf_neko_gif', 'solo', 'kemonomimi', 'nsfw_avatar', 
            'gasm', 'poke', 'anal', 'slap', 'hentai', 'avatar', 
            'erofeet', 'holo', 'keta', 'blowjob', 'pussy', 'tits', 
            'holoero', 'lizard', 'pussy_jpg', 'pwankg', 'classic', 
            'kuni', 'waifu', 'pat', '8ball', 'kiss', 'femdom', 'neko', 
            'spank', 'cuddle', 'erok', 'fox_girl', 'boobs', 
            'Random_hentai_gif', 'smallboobs', 'hug', 'ero'
        ];
    }

    chat(message) {
        var res = request(httpMethod, chatEndpoint + message);
        return JSON.parse(res.getBody('utf8')).response;
    }

    cat() {
        var res = request(httpMethod, catEndpoint);
        return JSON.parse(res.getBody('utf8')).cat;
    }

    image(tag) {
        if (!tag) return null;
        var res = request(httpMethod, imageEndpoint + tag);
        return JSON.parse(res.getBody('utf8')).url; //toString('utf-8')
    }
}

module.exports = NekoLife;