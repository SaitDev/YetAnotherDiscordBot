const Command = require('../Command.js')

const info = {
    name: "createinvite",
    aliases: ["newinvite"],
    description: "Create new invite to a channel",
    runIn: ["text", "dm"],
    ownerOnly: true
}

class CreateInvite extends Command {
    constructor(client) {
      super(client, info);
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
                maxAge : 86400,
                maxUses : 0
            }

            if (parse.length > 2 
                || (parse[0] !== "never" && parse[0] !== "unexpire" && !isNaN(parse[0]))
                || (parse.length > 1 && !isNaN(parse[1])))
            {
                return msg.channel.send("Error: Invalid arguments");
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
            this.create(msg.channel. msg.channel);
        }
    }

    create(inviteChannel, requestChannel, option)
    {
        inviteChannel.createInvite(option)
            .then(invite => requestChannel.send("Invite created " + invite.url))
            .catch(reason => requestChannel.send(["Error: Can not create invite", reason]));
    }
}

module.exports = CreateInvite;