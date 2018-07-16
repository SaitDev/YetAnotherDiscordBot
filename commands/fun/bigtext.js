const Command = require('../Command.js')
const emoji = require('../../util/emoji.js')

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
	}

  run(msg, args) {
    if (args) {
      msg.channel.send(emoji.textToIcon(args));
    } else {
      msg.channel.send('Error: Invalid arguments')
    }
  }
}

module.exports = BigText;
