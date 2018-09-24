const Discord = require('discord.js')

const config = require('./config.json')
const DatabaseFactory = require('./database/databaseFactory')
const CommandManager = require('./managers/commandManager.js')
const PresenceManager = require('./managers/presenceManager.js')
const BotListingManager = require('./managers/botListingManager')
const SchedulerManager = require('./managers/schedulerManager')
const ErrorLog = require('./logger/errorlog')
const CommandLog = require('./logger/commandLog')
const ChatLog = require('./logger/chatLog')
const GuildLog = require('./logger/guildLog')
const MessageUtil = require('./util/messageUtil')
const stringUtil = require('./util/stringUtil') //inject some utilities to all String

class Chitanda extends Discord.Client {
    /**
     * @param {string} cmdPath 
     * @param {*} options 
     */
    constructor(cmdPath, options) {
        super(options);
        /**
         * @description When client connected to discord and commands are loaded
         */
        this.ready = false;
        this.errorLogger = new ErrorLog(this);
        this.messageUtil = new MessageUtil(this);
        this.database = new DatabaseFactory(this);
        this.commandManager = new CommandManager(this, cmdPath);
        this.presenceManager = new PresenceManager(this, config);
        this.delayCreateBotListingManager();
        this.commandLogger = new CommandLog(this);
        this.chatLogger = new ChatLog(this);
        this.guildLogger = new GuildLog(this);
        this.schedulerManager = new SchedulerManager(this);
    }

    delayCreateBotListingManager() {
        this.once('ready', () => {
            this.botListingManager = new BotListingManager(this);;
        });
    }
}

module.exports = Chitanda;