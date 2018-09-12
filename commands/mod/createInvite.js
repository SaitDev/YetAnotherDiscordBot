const Command = require('../Command.js')
const common = require('../../util/commonUtil')

const info = {
    name: "createinvite",
    aliases: ["newinvite", "invitecreate"],
    description: "Create an invite to a channel",
    usages: [
        common.prefixPattern + "createinvite",
        common.prefixPattern + "createinvite #channel",
        common.prefixPattern + "createinvite #channel number-expire-after-secends number-limited-uses",
        common.prefixPattern + "createinvite #channel 86400 10",
        common.prefixPattern + "createinvite #channel never"
    ],
    runIn: ["text", "dm"],
    ownerOnly: true
}

class CreateInvite extends Command {
    constructor(client, module) {
		super(client, info, module);
	}
  
    run(msg, args) {
        if (args) {
            var channel = msg.channel;
            if (msg.mentions && msg.mentions.channels.size > 0)
            {
                var mention = msg.mentions.channels.first()
                if (mention.type === "text") {
                    channel = mention;
                }
                msg.mentions.channels.forEach((value, key) => {
                    args = args.replace("<#" + key + ">", "");
                });
            }

            args = args.trim();
            args = args.replace(/ +(?= )/,'');
            var parse = args.split(/ |\|/)
            if (!args || parse.length < 1)
            {
                this.create(channel, msg.channel); return
            }
            
            var option = {
                maxAge : 86400, // 1 day
                maxUses : 0
            }

            if (parse.length > 2 
                || (parse[0] !== "never" && parse[0] !== "unexpire" && !isNaN(parse[0]))
                || (parse.length > 1 && !isNaN(parse[1])))
            {
                this.sendFromMessage(msg, "Error: Invalid arguments");
                return;
            }

            if (parse[0] == 0 || parse[0] === "never" || parse[0] === "unexpire") {
                option.maxAge = 0;
            }
            else {
                option.maxAge = parseInt(parse[0]) * 86400;
            }

            if (parse.length > 1) {
                option.maxUses = parseInt(parse[1]);
            }

            this.create(channel, msg.channel, option);
        } else {
            this.create(msg.channel, msg.channel);
        }
    }

    create(inviteChannel, requestChannel, option)
    {
        inviteChannel.createInvite(option)
            .then(invite => this.sendFromChannel(requestChannel, "Invite created " + invite.url))
            .catch(reason => this.sendFromChannel(requestChannel, ["Error: Can not create invite", reason]));
    }
}

module.exports = CreateInvite;