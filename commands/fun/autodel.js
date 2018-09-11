const Command = require('../Command.js')

const info = {
	name: "autodel",
	aliases: [],
	description: "Instantly delete this message",
	runIn: ["text", "dm"],
	ownerOnly: false
}


class AutoDel extends Command {
	constructor(client, module) {
		super(client, info, module);
	}

	run(msg, args) {
        if (msg.deletable) {
            msg.delete();
        } else {
            this.sendFromMessage(msg, 'Require `Manage Messages` permission to delete')
        }
	}
}

module.exports = AutoDel;
