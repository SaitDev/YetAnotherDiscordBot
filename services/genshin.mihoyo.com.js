const Discord = require('discord.js');
const got = require('got');

const BASE_URL = "https://genshin.mihoyo.com/";
const API_GET_NEWS = "content/yuanshen/getContentList"
const WEB_DETAIL_NEWS = "en/news/detail/";

const genshinAPI = got.default.extend({
    prefixUrl: BASE_URL,
    responseType: 'json',
    hooks: {
        beforeRequest: [
            options => {
                // console.log(options)
                //console.log(options.url.toString())
            }
        ]
    }
})

const uniqueChannels = new Discord.Collection([
    [10, 'All'], //always keep category All as first element
    [11, 'Info'],
    [12, 'Updates'],
    [13, 'Events']
])
const channels = new Discord.Collection([
    ['all', 10],
    ['any', 10],
    ['info', 11],
    ['update', 12],
    ['updates', 12],
    ['event', 13],
    ['events', 13],
])

class News {
    /**
     * 
     * @param {number} id 
     * @param {string} url 
     * @param {number[]} channelIds 
     * @param {string} title 
     */
    constructor(id, url, channelIds, title) {
        this.id = id;
        this.url = url;
        this.channelIds = channelIds;
        this.title = title;
    }
}

getWebNewsDetail = (id) => {
    return BASE_URL + WEB_DETAIL_NEWS + id;
}

/**
 * @type Promise<News[]>
 */
exports.fetchNews = async (channelId) => {
    var response = await genshinAPI.get(API_GET_NEWS, {
        searchParams: {
            pageSize: 20, 
            pageNum: 1, 
            channelId: channelId || uniqueChannels.firstKey()
        }
    })
    var body = response.body;
    /**
        * @type News[]
        */
    var newses = [];
    if (body && body.data && body.data.list && body.data.list.length > 0) {
        body.data.list.forEach(content => {
            var id = content.id;
            // content.contentId
            var channels = content.channelId;
            // content.start_time
            var title = content.title;
            // content.intro
            // content.ext[1].value[0] //image
            var news = new News(id, getWebNewsDetail(id), channels, title);
            newses.push(news);
        });
    }
    return newses;
}

exports.uniqueChannels = uniqueChannels;
exports.channels = channels;
exports.channelAll = uniqueChannels.firstKey(); //id of channel "All"
exports.channelIds = uniqueChannels.lastKey(uniqueChannels.size - 1); //all channels (except "All")

exports.News = News;
