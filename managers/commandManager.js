const fs = require('fs');
const path = require('path');
const bluebird = require('bluebird');
const Discord = require('discord.js');
const Collection = Discord.Collection;

class CommandManager {
    /**
     * @param {import('../chitanda')} client 
     * @param {string} cmdPath
     */
    constructor(client, cmdPath) {
        this.config = require('../config.json');
        this.client = client;

        /**
         * @type {import('discord.js').Collection<string, *>}
         */
        this.modules = new Collection();
        /**
         * @type {import('discord.js').Collection<string, import('../commands/Command')>}
         */
        this.commands = new Collection();
        /**
         * @type {import('discord.js').Collection<string, import('../commands/Command')>}
         */
        this.aliases = new Collection();

        this.cmdPath = cmdPath;
        this.longestName = '';
    }

    loadCommands() {
        if (!fs.existsSync(this.cmdPath)) {
            this.client.errorLogger.error('commands not found');
            return;
        }

        const modules = fs.readdirSync(this.cmdPath).filter(f => fs.statSync(path.join(this.cmdPath, f)).isDirectory());

        //module id is folder name
        bluebird.each(modules, (moduleId) => {
            this.modules.set(moduleId, null);
            fs.readdirSync(path.join(this.cmdPath, moduleId)).forEach((file) => {
                if (file.toLowerCase() == 'module.json') {
                    const moduleInfo = require(path.join(this.cmdPath, moduleId, file));
                    if (this.isValidModuleConfig(moduleInfo)) {
                        this.modules.set(moduleId, moduleInfo);
                    }
                    return;
                }

                if (!file.endsWith('.js')) return;
                const Command = require(path.join(this.cmdPath, moduleId, file));
                var cmd = new Command(this.client, moduleId);

                if (!cmd.run || typeof cmd.run !== 'function') {
                    throw new TypeError('Command doesnt have run function');
                }

                if (this.commands.has(cmd.name)) {
                    throw new Error(`Duplicate command name [${cmd.name}]`);
                }
                this.commands.set(cmd.name, cmd);
                if (cmd.name.length > this.longestName.length) {
                    this.longestName = cmd.name;
                }
            });
        }).then(() => {
            for (let cmd of this.commands.values()) {
                if (cmd.aliases && Array.isArray(cmd.aliases) && cmd.aliases.length > 0) {
                    cmd.aliases.forEach(alias => {
                        if (this.commands.has(alias)) {
                            throw new Error(`Alias cannot be same with any command name ${alias}`);
                        } else {
                            if (this.aliases.has(alias)) {
                                this.client.errorLogger.warn('Overlap command alises will be overwritten');
                            }
                            this.aliases.set(alias, cmd);
                        }
                    });
                }
            }
        }).then(() => {
            this.client.ready = true;
            this.client.errorLogger.info(`All commands loaded for ${this.client.user.username}!`, true);
        }).catch((err) => {
            this.client.errorLogger.error(err.stack);
            process.exit(1);
        });
    }

    /**
     * 
     * @param {import('discord.js').Message} msg 
     * @returns {boolean}
     */
    handleMessage(msg) {
        if (!this.shouldHandle(msg)) return false;

        if (!this.config.dmCommand && (msg.channel.type === 'dm' || msg.channel.type === 'group')) {
            return false;
        }

        var cmd;
        if (msg.content.startsWith(this.client.user.toString())) {
            cmd = msg.content.substring(this.client.user.toString().length + 1, msg.content.length);
            if (!cmd) return false;
            if (!cmd.startsWith('help ') && cmd != 'help') {
                cmd = 'chat ' + cmd;
            }
        } else if (msg.guild) {
            var prefix = this.client.database.guildSettingManager.customPrefix.has(msg.guild.id) ? 
                        this.client.database.guildSettingManager.customPrefix.get(msg.guild.id) :
                        this.config.prefix;
            if (msg.content.startsWith(prefix)) {
                cmd = msg.content.substring(prefix.length, msg.content.length);
            } else return false;
        } else if (msg.content.startsWith(this.config.prefix)) {
            cmd = msg.content.substring(this.config.prefix.length, msg.content.length);
        } else if (msg.channel.type === 'dm' || msg.channel.type === 'group') {
            cmd = msg.content;
        } else return false;

        var result = this.parse(cmd);
        if (result.isCommand) {
            try {
                this.client.commandLogger.cmdRequested(msg);
            } catch (err) {
                this.client.errorLogger.error(err.stack);
            }
            //error here will be caught by main wrapper of command process
            if (result.isAlias) {
                this.aliases.get(result.name).execute(msg, result.args);
            } else {
                this.commands.get(result.name).execute(msg, result.args);
            }
            return true;
        } else {
            return false;
        }
    }

    shouldHandle(msg) {
        if (msg.author.bot || !this.isGuildEnabled(msg)) return false;
        return true;
    }

    isGuildEnabled(msg) {
        return !this.config.guilds || this.config.guilds.length < 1 ||
            !msg.guild || this.config.guilds.includes(msg.guild.id);
    }

    parse(cmd) {
        let isAlias, isCommand, name, args;
        if (cmd.includes(' ')) {
            var pos = cmd.indexOf(' ');
            name = cmd.substring(0, pos);
            args = cmd.substring(pos + 1)
        } else {
            name = cmd;
            args = '';
        }
        isAlias = this.aliases.has(name);
        isCommand = isAlias || this.commands.has(name);

        return { isAlias, isCommand, name, args };
    }

    isValidModuleConfig(moduleConfig) {
        return moduleConfig.name && moduleConfig.description;
    }
}

module.exports = CommandManager;
