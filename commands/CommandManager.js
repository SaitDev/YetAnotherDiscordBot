const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const Discord = require('discord.js');
const Collection = Discord.Collection;

const config = require('../config.json');

class CommandManager {
  constructor(client, cmdPath) {
    this.client = client;
    this.modules = [];
    this.commands = new Collection();
    this.loadCommands(cmdPath);
  }

  loadCommands(cmdPath) {
    if (!fs.existsSync(cmdPath)) {
      console.error('commands not found');
      return;
    }

    const modules = fs.readdirSync(cmdPath).filter(f => fs.statSync(path.join(cmdPath, f)).isDirectory());

    Promise.each(modules, (module) => {
      this.modules.push(module);
      fs.readdirSync(path.join(cmdPath, module)).forEach((file) => {
        if (!file.endsWith('.js')) return;
        const command = require(path.join(cmdPath, module, file));
        var cmd = new command(this.client, module);

        if (!cmd.run || typeof cmd.run !== 'function') {
          throw new TypeError('Command doesnt have run function');
        }

        this.commands.set(cmd.name, cmd);
      });
    })
    .then(() => {
      this.client.ready = true;
      console.log('[Info] All commands loaded!');
    })
    .catch((err) => {
      console.error(err.stack);;
    });
  }

  handleMessage(msg) {
    if (!this.shouldHandle(msg)) return;

    if (msg.content.startsWith(config.prefix)) {
      var cmd = msg.content.substring(1, msg.content.length);
    } else if (msg.channel.type === 'dm') {
      var cmd = msg.content;
    } else return;

    var result = this.parse(cmd);
    if (result.isCommand) this.commands.get(result.name).execute(msg, result.args);
  }

  shouldHandle(msg) {
    if (msg.author.bot || (config.guilds && config.guilds.length > 0 && msg.guild && !config.guilds.includes(msg.guild.id))) return false;
    return true;
  }

  parse(cmd) {
    let isCommand, name, args;
    if (cmd.includes(' ')) {
      var pos = cmd.indexOf(' ');
      name = cmd.substring(0, pos);
      args = cmd.substring(pos + 1)
    } else {
      name = cmd;
      args = '';
    }
    isCommand = this.commands.has(name);

    return {isCommand, name, args};
  }
}

module.exports = CommandManager;
