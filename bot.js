/**======= Copy right
    Sait 2017-2018
=====================*/
const path = require('path');

const config = require('./config.json');
const Chitanda = require('./chitanda');

const cmdPath = path.join(__dirname, 'commands');
const client = new Chitanda(cmdPath);


client.once('ready', function() {
    client.errorLogger.info(`Login as ${client.user.username}`);
    client.commandManager.loadCommands();
    client.database.connect()
    .then(_ => {
        client.database.loadAll();
        client.schedulerManager.startAll();
    });
    client.presenceManager.start();
});

client.on('ready', () => {
    client.errorLogger.info('Connected!', true);
});

client.on('reconnecting', () => {
    client.errorLogger.warn('Reconnecting', true);
});

client.on('disconnect', () => {
    client.errorLogger.error(new Error('Disconnected'), true);
});

client.on('warn', mess => {
    client.errorLogger.warn(mess, true);
});

client.on('error', error => {
    client.errorLogger.error(error);
});


client.on('message', message => {
    try {
        if (!client.ready) return;
        client.commandManager.handleMessage(message);
    } catch (err) {
        client.errorLogger.commandFail(err);
    }
});

client.on('messageDelete', message => {
    try {
        client.chatLogger.deleted(message);
    } catch (err) {
        client.errorLogger.error(err);
    }
});

client.on('messageUpdate', (oldMsg, newMsg) => {
    try {
        client.chatLogger.edit(oldMsg, newMsg);
    } catch (err) {
        client.errorLogger.error(err);
    }
});

client.on('guildCreate', (guild) => {
    try {
        client.guildLogger.joined(guild);
    } catch (err) {
        client.errorLogger.error(err);
    }
});

client.on('guildDelete', (guild) => {
    try {
        client.guildLogger.left(guild);
    } catch (err) {
        client.errorLogger.error(err);
    }
});

client.login(config.token)
.catch(err => {
    client.errorLogger.error(err, true);
});