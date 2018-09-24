const Discord = require('discord.js')
const request = require('request-promise')
const cheerio = require('cheerio')
const url = require('url')

const BASE_URL = 'https://treeofsavior.com'
const PATH_NEWS = '/page/news?c='

const uniqueCategories = new Discord.Collection([
    [0, 'All'], //always keep category All as first element
    [2, 'Announcements'],
    [33, 'Event'],
    [3, 'Patch Note'],
    [31, 'Developer\'s Blog'],
    [32, 'Known Issues'],
])
const categories = new Discord.Collection([
    ['all', 0],                 //*
    ['any', 0],
    ['announcement', 2],
    ['announcements', 2],       //*
    ['event', 33],              //*
    ['events', 33],
    ['patch note', 3],          //*
    ['patch', 3],
    ['maintenance', 3],
    ['developer\'s blog', 31],  //*
    ['developer', 31],
    ['blog', 31],
    ['known issues', 32],       //*
    ['issue', 32],
    ['issues', 32]
])


exports.uniqueCategories = uniqueCategories;
exports.categories = categories;
exports.allCategoriesId = uniqueCategories.lastKey(uniqueCategories.size - 1);

class News {
    /**
     * 
     * @param {number} id 
     * @param {string} url 
     * @param {number} category 
     */
    constructor(id, url, category) {
        this.id = id;
        this.url = url;
        this.category = category;
    }
}

/**
 * 
 * @param {number} [category=0]
 */
exports.fetchNews = function(category) {
    if (isNaN(category)) {
        category = exports.categories.first();
    }
    return request(BASE_URL + PATH_NEWS + category.toString())
    .then(html => {
        var rawNews = cheerio.load(html)('.news_box');
        /**
         * @type News[]
         */
        var news = [];
        if (rawNews.length < 1) return news;

        rawNews.each((i, newBox) => {
            var aNew = cheerio(newBox)
            var path = aNew.find('a').attr('href');
            var categoryName = aNew.find('.category').text().trim().toLowerCase();
            // exports.categories.forEach()
            // console.log(categoryName)
            var categoryId = exports.categories.find((id, name, collection) => name == categoryName)
            // console.log(categoryId)
            // exports.categories.keys()
            // console.log(Object.keys(exports.categories).find(name => name == categoryName))
            // console.log(exports.categories.find((id, name, collection) => name == categoryName))
            var id = parseInt(new url.URL(BASE_URL + path).searchParams.get('n'));
            if (path && categoryId && id) {
                news.push(new News(id, BASE_URL + path, categoryId));
            }
        })

        return news;
    })
}