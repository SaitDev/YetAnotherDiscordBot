const Discord = require('discord.js')

const config = require('./config.json')
const CommandManager = require('./managers/commandManager.js')
const PresenceManager = require('./managers/presenceManager.js')
const BotListingManager = require('./managers/botListingManager')
const ErrorLog = require('./logger/errorlog')
const CommandLog = require('./logger/commandLog')
const ChatLog = require('./logger/chatLog')
const GuildLog = require('./logger/guildLog')
const MessageUtil = require('./util/messageUtil')

class Chitanda extends Discord.Client {
    /**
     * @param {string} cmdPath 
     * @param {*} options 
     */
    constructor(cmdPath, options) {
        super(options);
        this.ready = false
        this.errorLogger = new ErrorLog(this);
        this.commandManager = new CommandManager(this, cmdPath);
        this.presenceManager = new PresenceManager(this, config);
        // this.botListingManager = new BotListingManager(this);
        this.delayCreateBotListingManager();
        this.commandLogger = new CommandLog(this);
        this.chatLogger = new ChatLog(this);
        this.guildLogger = new GuildLog(this);
        this.messageUtil = new MessageUtil(this);
    }

    delayCreateBotListingManager() {
        this.once('ready', () => {
            this.botListingManager = new BotListingManager(this);;
        });
    }
}

module.exports = Chitanda;