/**======= Copy right
    Sait 2017-2018
=====================*/
const Discord = require('discord.js');
const client = new Discord.Client();
const path = require('path');

const config = require('./config.json');
const CommandManager = require('./managers/commandManager.js');
const PresenceManager = require('./managers/presenceManager.js');
const ChatLog = require('./logger/chatLog');
const GuildLog = require('./logger/guildLog');
const ErrorLog = require('./logger/errorlog');

client.ready = false;
const cmdPath = path.join(__dirname, 'commands');

client.once('ready', () => {
    client.errorLog = new ErrorLog(client);
    client.errorLog.info(`Login as ${client.user.username}`);
    client.commandManager = new CommandManager(client, cmdPath);
    client.presenceManager = new PresenceManager(client, config);
    client.chatLogger = new ChatLog(client);
    client.guildLogger = new GuildLog(client);

    client.presenceManager.start();
});

client.on('ready', () => {
    client.errorLog.info('Connected!', true);
});

client.on('reconnecting', () => {
    client.errorLog.warn('Reconnecting', true);
});

client.on('disconnect', () => {
    client.errorLog.error(new Error('Disconnected'), true);
});

client.on('warn', mess => {
    client.errorLog.warn(mess, true);
});

client.on('error', error => {
    client.errorLog.error(error);
});


client.on('message', message => {
    try {
        if (!client.ready) return;
        client.commandManager.handleMessage(message);
    } catch (err) {
        client.errorLog.commandFail(err);
    }
});

client.on('messageDelete', message => {
    try {
        client.chatLogger.deleted(message);
    } catch (err) {
        client.errorLog.error(err);
    }
});

client.on('messageUpdate', (oldMsg, newMsg) => {
    try {
        client.chatLogger.edit(oldMsg, newMsg);
    } catch (err) {
        client.errorLog.error(err);
    }
});

client.on('guildCreate', (guild) => {
    try {
        client.guildLogger.joined(guild);
    } catch (err) {
        client.errorLog.error(err);
    }
});

client.on('guildDelete', (guild) => {
    try {
        client.guildLogger.left(guild);
    } catch (err) {
        client.errorLog.error(err);
    }
});

client.login(config.token);