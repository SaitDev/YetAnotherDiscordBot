const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');
const Discord = require('discord.js');
const Collection = Discord.Collection;

class CommandManager {
	constructor(client, cmdPath, customConfig) {
		if (customConfig) this.config = customConfig;
		else this.config = require('../config.json');
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

		if (msg.content.startsWith(this.config.prefix)) {
			var cmd = msg.content.substring(1, msg.content.length);
		} else if (msg.content.startsWith(this.client.user.toString())) {
			var cmd = 'chat ' + msg.content.substring(this.client.user.toString().length, msg.content.length)
		} else if (this.config.dmCommand && msg.channel.type === 'dm') {
			var cmd = msg.content;
		} else return;

		var result = this.parse(cmd);
		if (result.isCommand) {
			if (this.config.logging) {
				console.log('[Log] Command requested by ' + msg.author.username);
				console.log('[Log] ' + msg.content);
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
