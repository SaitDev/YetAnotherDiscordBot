const Command = require('../Command');

const info = {
    name: "shutdown",
    aliases: [],
    description: "Shutdown bot",
    runIn: ["text", "dm"],
    ownerOnly: true
}

class Shutdown extends Command {
    constructor(client, module) {
		super(client, info, module);
	}

    run(msg, args) {
        this.sendFromMessage(msg, 'Bye world ಥʖ̯ಥ')
        .then(message => process.exit(0));
    }
}

module.exports = Shutdown;