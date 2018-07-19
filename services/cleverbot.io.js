const cleverbot = require("cleverbot.io");

const config = require('../config.json');
var initialized = false;

bot = new cleverbot(config.cleverbot.user, config.cleverbot.key);
bot.setNick(config.botname);

bot.create((err, response) => {
    if (err) {
        console.error(err.stack);
    } else {
        initialized = true;
    }
})

exports.ask = async (message, callback) => {
    if (!initialized) {
        if (callback && typeof(callback) == "function") {
            callback(null)
        }
    } else bot.ask(message, (err, response) => {
        if (err) {
            console.error(err);
        }
        if (callback && typeof(callback) == "function") {
            callback(response)
        }
    });
}