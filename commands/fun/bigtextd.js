const Command = require('../Command.js')
const emoji = require('../../util/emoji.js')

const info = {
  name: "bigtextd",
  aliases: [],
  description: 'Delete your request then make your message bigggger',
  runIn: ["text", "dm"],
  ownerOnly: false
}


class BigTextD extends Command {
  constructor(client, module) {
		super(client, info, module);
	}

  run(msg, args) {
    msg.delete();

    if (args) {
      msg.channel.send(emoji.textToIcon(args));
    } else {
      msg.channel.send('Error: Invalid arguments')
    }
    
    if (!msg.deletable) {
      msg.channel.send('Error: require Manage Messages to delete your text')
    }
  }
}

module.exports = BigTextD;
