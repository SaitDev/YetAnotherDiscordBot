/**======= Copy right
    Sait 2017-2018
=====================*/
const Discord = require('discord.js');
const client = new Discord.Client();
const path = require('path');

const config = require('./config.json');
const CommandManager = require('./commands/CommandManager.js');

client.ready = false;
const prefix = config.prefix;
const cmdPath = path.join(__dirname, 'commands');

let commandManager;

client.once('ready', () => {
  commandManager = new CommandManager(client, cmdPath);
});

client.on('ready', () => {
  console.log('[Info] Connected!');
});

client.on('reconnecting', () => {
  console.log('[Warn] Attempt to reconnect');
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
  commandManager.handleMessage(message);
} catch (err) {
  console.error(err.stack);
}
});

client.login(config.token);
