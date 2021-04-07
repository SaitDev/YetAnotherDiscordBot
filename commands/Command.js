const Discord = require('discord.js')

const config = require('../config.json')
const Embed = require('../util/embed')
const MessageUtil = require('../util/messageUtil')

const nsfwGuide = 'https://i.imgur.com/cdakHFu.png'

class Command {
	/**
	 * @param {import('../chitanda')} client 
	 * @param {*} info 
	 * @param {string} moduleId
	 */
	constructor(client, info, moduleId) {
		Command.validateInfo(client, info, moduleId);

		this.client = client;
		this.messageUtil = new MessageUtil(client);
		this.name = info.name;
		this.aliases = info.aliases;
		this.description = info.description;
		this.usages = info.usages;
		this.runIn = info.runIn;
		this.isNSFW = info.isNSFW;
		this.ownerOnly = info.ownerOnly;
		if (typeof info.enabled == "boolean") {
			this.enabled  = info.enabled;
		} else {
			this.enabled  = true;
		}
		this.module = moduleId;
		/**
		 * @type {import('discord.js').PermissionFlags[]}
		 * @description Has at least one of these permissions to use this command
		 */
		this.requirePermissions = info.requirePermissions;
		if (this.requirePermissions && !Array.isArray(this.requirePermissions)) {
			this.requirePermissions = [info.requirePermissions];
		}
		/**
		 * @description Must be guild owner to use this command. Only apply to requests from guild channels not dm
		 */
		this.requireGuildOwner = false;
		this.hidden = false;
	}

	static validateInfo(client, info) {
		if (!client) throw new Error('A client must be specified.');

		if (typeof info !== 'object') throw new TypeError('Command info must be an Object.');

		if (typeof info.name !== 'string') throw new Error('Command name must be a string.');
		if (info.name.includes(' ')) throw new Error('Command name must not have space.');
		if (info.name !== info.name.toLowerCase()) throw new Error('Command name must be lowercase.');

		if (!module) throw new Error('Module should not be empty');
	}

	/**
	 * @param {import('discord.js').Message} msg 
	 * @param {string} args 
	 */
	execute(msg, args) {
		if (this.checkChannel(msg)) {
			if (this.checkNsfw(msg)) {
				if (!this.hidden) {
					this.sendFromMessage(msg, {
						embed: Embed.create(nsfwGuide, null, 'This command can only be used in nsfw channel')
					});
				}
			} else if ((this.ownerOnly && !config.owner.includes(msg.author.id)) || 
						(this.requireGuildOwner && msg.guild && msg.guild.ownerID != msg.author.id)) {
				if (!this.hidden) {
					this.sendFromMessage(msg, 'You dont have permission to use this command');
				}
			} else {
				var canRun = true;
				if (this.requirePermissions) {
					canRun = false;
					if (Array.isArray(this.requirePermissions) && this.requirePermissions.length > 0) {
						this.requirePermissions.forEach(perm => {
							if (msg.member.hasPermission(perm)) {
								canRun = true;
							}
						})
					}
				}
				if (canRun) {
					this.run(msg, args);
				} else {
					if (!this.hidden) {
						this.sendFromMessage(msg, 'You dont have permission to use this command');
					}
				}
			}
		}
	}

	/**
	 * 
	 * @param {import('discord.js').Message} msg 
	 * @param {*} content 
	 */
	sendFromMessage(msg, content) {
		return this.sendFromChannel(msg.channel, content);
	}

	/**
	 * 
	 * @param {import('discord.js').TextChannel | import('discord.js').DMChannel | import('discord.js').GroupDMChannel} channel 
	 * @param {*} content 
	 */
	sendFromChannel(channel, content) {
		return channel.send(content)
        .catch((err) => {
            var msg = 'Error! Please report to the support server if something went wrong';
            msg += err.message ? (': `' + err.message + '`') : '';
            channel.send(msg).catch(() => {});
            this.client.errorLogger.commandFail(err);
        })
	}

	checkChannel(msg) {
		return !this.runIn || (Array.isArray(this.runIn) && this.runIn.includes(msg.channel.type));
	}

	checkNsfw(msg) {
		return this.isNSFW && !msg.channel.nsfw;
	}
}

module.exports = Command;
