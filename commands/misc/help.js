const Command = require('../Command.js')

const info = {
	name: "help",
	aliases: [],
	description: "Get the list of commands",
	runIn: ["text", "dm"],
	ownerOnly: false
}


class Help extends Command {
	constructor(client, module) {
		super(client, info, module);
	}

	run(msg, args) {
		var message = '```markdown\n';
		this.client.commandManager.modules.forEach(module => {
			message += `# ${module}\n`;
			this.client.commandManager.commands.forEach(cmd => {
				if (cmd.module == module) {
					message += cmd.name + ': ' + cmd.description + '\n';
				}
			});
		});
		message += '```';
		msg.channel.send(message);
	}
}

module.exports = Help;
