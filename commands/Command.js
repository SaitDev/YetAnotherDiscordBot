const config = require('../config.json')
const Embed = require('../util/embed')
const MessageUtil = require('../util/messageUtil')

const nsfwGuide = 'https://i.imgur.com/cdakHFu.png'

class Command {
	/**
	 * @param {import('../chitanda')} client 
	 * @param {*} info 
	 * @param {string} module
	 */
	constructor(client, info, module) {
		Command.validateInfo(client, info, module);

		this.client = client;
		this.messageUtil = new MessageUtil(client);
		this.name = info.name;
		this.aliases = info.aliases;
		this.description = info.description;
		this.usages = info.usages;
		this.runIn = info.runIn;
		this.isNSFW = info.isNSFW;
		this.ownerOnly = info.ownerOnly;
		this.module = module;
	}

	static validateInfo(client, info) {
		if (!client) throw new Error('A client must be specified.');

		if (typeof info !== 'object') throw new TypeError('Command info must be an Object.');

		if (typeof info.name !== 'string') throw new Error('Command name must be a string.');
		if (info.name.includes(' ')) throw new Error('Command name must not have space.');
		if (info.name !== info.name.toLowerCase()) throw new Error('Command name must be lowercase.');

		if (!module) throw new Error('Module should not be empty');
	}

	execute(msg, args) {
		if (this.checkChannel(msg)) {
			if (this.checkNsfw(msg)) {
				this.sendFromMessage(msg, {
					embed: Embed.create(nsfwGuide, null, 'This command can only be used in nsfw channel')
				});
			} else if (this.ownerOnly && !config.owner.includes(msg.author.id)) {
				this.sendFromMessage(msg, 'You dont have permission to use this command');
			} else {
				this.run(msg, args);
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
		return this.runIn.includes(msg.channel.type);
	}

	checkNsfw(msg) {
		return this.isNSFW && !msg.channel.nsfw;
	}
}

module.exports = Command;
