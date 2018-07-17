const os = require('os');
const moment = require('moment');

const Command = require('../Command');

const config = require('../../config.json');

const info = {
    name: "stats",
    aliases: [],
    description: "Check bot statistics",
    runIn: ["text", "dm"],
    ownerOnly: true
}

class Stats extends Command {
    constructor(client, module) {
		super(client, info, module);
	}

    run(msg, args) {
        msg.channel.send(`\`\`\`
Serving ${(config.guilds && config.guilds.length > 0) ? config.guilds.length : this.client.guilds.size} guilds
Stalking ${this.client.users.size} humans
Up time ${moment.duration(this.client.uptime).humanize()}
RAM usage ${Math.round(process.memoryUsage().rss / 1048576)}MB/${Math.round(os.totalmem() / 1048576)}MB
\`\`\``);
    }
}

module.exports = Stats;