const config = require('../config.json');

class Command {
  constructor(client, info, module) {
    Command.validateInfo(client, info, module);

    this.client = client;
    this.name = info.name;
    this.description = info.description;
    this.runIn = info.runIn;
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
      if (this.ownerOnly && !config.owner.includes(msg.author.id)) {
        msg.channel.send('You dont have permission to use this command');
      } else {
        this.run(msg, args);
      }
    }
  }

  checkChannel(msg) {
    return this.runIn.includes(msg.channel.type);
  }
}

module.exports = Command;
