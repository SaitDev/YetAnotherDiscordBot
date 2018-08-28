const Command = require('../Command.js')
const emoji = require('../../util/emoji.js')
const Filter = require('../../util/filter')

const info = {
	name: "bigtext",
	aliases: [],
	description: 'Make your message bigggger',
	runIn: ["text", "dm"],
	ownerOnly: false
}


class BigText extends Command {
	constructor(client, module) {
		super(client, info, module);
		this.filter = new Filter(this.client);
	}

	async run(msg, args) {
		if (args) {
			if ((this.filter.containBot(msg, args) || await this.filter.containOwner(msg, args)) && 
				msg.author.id != this.client.user.id
			) {
				msg.channel.send(':thinking:');
			} else {
				msg.channel.send(emoji.textToIcon(args));
			}
		} else {
			msg.channel.send('Error: Invalid arguments')
		}
	}
}

module.exports = BigText;
