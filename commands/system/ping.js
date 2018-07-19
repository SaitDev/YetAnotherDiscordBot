const Command = require('../Command.js')

const Embed = require('../../util/embed');

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
    var message;
    if (Math.random() < 0.3) message = 'OK, worked!';
    else if (Math.random() < 0.6) message = 'Yep, Im working!';
    else message = 'Pong!';
    msg.channel.send({
      embed: Embed.create(null, null, message + `\n${Math.round(this.client.ping)}ms`)
    });
  }
}

module.exports = Ping;
