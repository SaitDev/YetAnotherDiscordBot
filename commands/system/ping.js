const Command = require('../Command.js')

const info = {
  name: "ping",
  aliases: [],
  description: 'Pong! Check bot\'s response',
  runIn: ["text", "dm"],
  ownerOnly: false
}


class Ping extends Command {
  constructor(client, module) {
		super(client, info, module);
	}

  run(msg, args) {
    if (Math.random() < 0.3) msg.channel.send('OK, worked!')
    else if (Math.random() < 0.6) msg.channel.send('Yep, Im working!')
    else msg.channel.send('Pong!');
  }
}

module.exports = Ping;
