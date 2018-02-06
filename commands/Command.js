class Command {
  constructor(client, info) {
    Object.defineProperty(this, 'client', { value: client });

    Command.validateInfo(client, info);

    this.name = info.name;
    this.description = info.description;
    this.runIn = info.runIn;
    this.ownerOnly = info.ownerOnly;
  }

  static validateInfo(client, info) {
    if(!client) throw new Error('A client must be specified.');
    if(typeof info !== 'object') throw new TypeError('Command info must be an Object.');
    if(typeof info.name !== 'string') throw new Error('Command name must be a string.');
    if(info.name.includes(' ')) throw new Error('Command name must not have space.');
    if(info.name !== info.name.toLowerCase()) throw new Error('Command name must be lowercase.');
  }

  execute(msg, args) {
    if (this.checkChannel(msg)) this.run(msg, args);
  }

  checkChannel(msg) {
    return this.runIn.includes(msg.channel.type);
  }
}

module.exports = Command;
