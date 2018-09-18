const Command = require('../Command.js')
const Embed = require('../../util/embed')
const config = require('../../config')
const common = require('../../util/commonUtil')

const info = {
    name: "help",
    aliases: ["h", "?"],
    description: "Helping to use commands",
    usages: [
        common.prefixPattern + "help",
        common.mentionBotPattern + " help", //there is one space
        common.prefixPattern + "help command-name",
        common.prefixPattern + "help module-name"
    ],
    runIn: ["text", "dm"],
    ownerOnly: false
}

class Help extends Command {
    constructor(client, module) {
        super(client, info, module);
    }

	/**
	 * 
	 * @param {import('discord.js').Message} msg 
	 * @param {sting} args 
	 */
    run(msg, args) {
        var title;
        var message;
        var fields;
        var prefix = config.prefix; 
        if (msg.guild) {
            if (this.client.database.guildSettingManager.customPrefix.has(msg.guild.id)) {
                prefix = this.client.database.guildSettingManager.customPrefix.get(msg.guild.id);
            }
        }

        if (args) {
            if (this.client.commandManager.modules.has(args)) {
                fields = this.generateModuleHelp(args);
                if (!this.client.commandManager.modules.get(args)) {
                    title = `Module ${args}`;
                }
            } else if (this.client.commandManager.commands.has(args)) {
                fields = this.generateCommandHelp(args, prefix);
                title = `Command ${args}`;
                message = this.client.commandManager.commands.get(args).description;
            } else if (this.client.commandManager.aliases.has(args)) {
                fields = this.generateCommandHelp(args, prefix);
                title = `Command ${this.client.commandManager.aliases.get(args).name}`;
                message = this.client.commandManager.aliases.get(args).description;
            }
        }
        if (!fields) {
            fields = this.generateGeneralHelp();
            message = config.support ? `[Support server](${config.support})\n` : '';
            message += `Version: \`${config.version}\`` +
                `\nPrefix: \`${prefix}\`` +
                `\nUse \`${prefix}help name\` to get more details`;
        }
        this.sendFromMessage(msg, {
            embed: Embed.create(null, null, message, title, fields)
        });
    }

    generateGeneralHelp() {
        var fields = [];
        this.client.commandManager.modules.keyArray().forEach(moduleId => {
            var moduleInfo = this.client.commandManager.modules.get(moduleId);
            var name = moduleInfo ? `${moduleInfo.name}` : `${moduleId}`;
            var value = '';
            var commandCount = 0;
            this.client.commandManager.commands.forEach(cmd => {
                if (cmd.module == moduleId) {
                    value += `\`${cmd.name}\`, `;
                    commandCount++;
                }
            });
            value = value.slice(0, value.length - 2);
            name += ` (${commandCount})\n`;
            fields.push(Embed.createField(name, value));
        });
        return fields;
    }

    generateModuleHelp(moduleId) {
        var fields = [];
        var moduleInfo = this.client.commandManager.modules.get(moduleId);
        if (moduleInfo) {
            fields.push(Embed.createField(moduleInfo.name, moduleInfo.description));
        }

        var commands = '';
        this.client.commandManager.commands.forEach(cmd => {
            if (cmd.module == moduleId) {
                //cmd.name.padEnd(this.client.commandManager.longestName.length, ' ')
                commands += `\`${cmd.name}\`: ${cmd.description}\n`;
            }
        });
        fields.push(Embed.createField('Commands', commands));

        return fields;
    }

    generateCommandHelp(commandId, prefix) {
        var fields = [];
        var command = this.client.commandManager.commands.get(commandId);
        if (!command) {
            command = this.client.commandManager.aliases.get(commandId);
        }
        if (!command) {
            return null;
        }

        if (command.aliases && command.aliases.length > 0) {
            fields.push(Embed.createField('Aliases', command.aliases.join(', ')));
        }
        if (command.usages && command.usages.length > 0) {
            fields.push(Embed.createField('Usages', 
                command.usages.join('\n')
                .replaceAll('%prefix%', prefix)
                .replaceAll('%mentionBot%', this.client.user.toString())
            ));
        }
        return fields;
    }
}

module.exports = Help;
