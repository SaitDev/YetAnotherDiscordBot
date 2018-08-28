const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const Discord = require('discord.js');
const Collection = Discord.Collection;

const CommandLog = require('../logger/commandLog');

class CommandManager {
	constructor(client, cmdPath, customConfig) {
		if (customConfig) this.config = customConfig;
		else this.config = require('../config.json');
		this.client = client;
		this.modules = [];
		this.commands = new Collection();
		this.loadCommands(cmdPath);
		this.client.commandLog = new CommandLog(client);
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
				console.log(`[Info] All commands loaded for ${this.client.user.username}!`);
			})
			.catch((err) => {
				console.error(err.stack);;
			});
	}

	handleMessage(msg) {
		if (!this.shouldHandle(msg)) return;

		if (!this.config.dmCommand && msg.channel.type === 'dm') {
			return;
		}

		var cmd;
		if (msg.content.startsWith(this.config.prefix)) {
			cmd = msg.content.substring(1, msg.content.length);
		} else if (msg.content.startsWith(this.client.user.toString())) {
			cmd = msg.content.substring(this.client.user.toString().length + 1, msg.content.length);
			if (!cmd) return;
			if (!cmd.startsWith('help ') && cmd != 'help') {
				cmd = 'chat ' + cmd;
			}
		} else if (this.config.dmCommand && msg.channel.type === 'dm') {
			cmd = msg.content;
		} else return;

		var result = this.parse(cmd);
		if (result.isCommand) {
			try {
                this.client.commandLog.cmdRequested(msg);
            } catch (err) {
				console.error(err.stack)
            }
			this.commands.get(result.name).execute(msg, result.args)
		}
	}

	shouldHandle(msg) {
		if (msg.author.bot || !this.isGuildEnabled(msg)) return false;
		return true;
	}

	isGuildEnabled(msg) {
		return !this.config.guilds || this.config.guilds.length < 1 || 
				!msg.guild || this.config.guilds.includes(msg.guild.id);
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

		return { isCommand, name, args };
	}
}

module.exports = CommandManager;
