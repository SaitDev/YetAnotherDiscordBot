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

client.ready = false;
const cmdPath = path.join(__dirname, 'commands');

client.once('ready', () => {
    console.log(`[Info] Login as ${client.user.username}`);
    client.commandManager = new CommandManager(client, cmdPath);
    client.presenceManager = new PresenceManager(client, config);
    client.chatLogger = new ChatLog(client);
    client.guildLogger = new GuildLog(client);

    client.presenceManager.start();
});

client.on('ready', () => {
    console.log('[Info] Connected!');
});

client.on('reconnecting', () => {
    console.warn('[Warn] Reconnecting');
});

client.on('disconnect', () => {
    console.error('[Error] Disconnected.');
});

client.on('warn', info => {
    console.warn('[Warn] ' + info);
});

client.on('error', error => {
    console.error('[Error] ' + error.message);
});


client.on('message', message => {
    try {
        if (!client.ready) return;
        client.commandManager.handleMessage(message);
    } catch (err) {
        console.error(err.stack);
    }
});

client.on('messageDelete', message => {
    try {
        client.chatLogger.deleted(message);
    } catch (err) {
        console.error(err.stack);
    }
});

client.on('messageUpdate', (oldMsg, newMsg) => {
    try {
        client.chatLogger.edit(oldMsg, newMsg);
    } catch (err) {
        console.error(err.stack);
    }
});

client.on('guildCreate', (guild) => {
    try {
        client.guildLogger.joined(guild);
    } catch (err) {
        console.error(err.stack);
    }
});

client.on('guildDelete', (guild) => {
    try {
        client.guildLogger.left(guild);
    } catch (err) {
        console.error(err.stack);
    }
});

client.login(config.token);