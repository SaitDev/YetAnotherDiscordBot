const config = require('../config.json');
const prodEnv = "PRODUCTION";
const textChat = ['text', 'dm', 'group'];

//not sending these log to discord channel
const ignore = {
    error: {
        names: null,
        messages: [
            'read ECONNRESET' //lost socket connection
        ]
    }
}

class ErrorLog {
    /**
     * @param {import('../chitanda')} client 
     */
    constructor(client) {
        this.client = client;
    }

    info(message, consoleOnly) {
        if (!message) return;
        console.log('[Info] ' + message);

        try {
            if (consoleOnly ||
                !process.env.CHITANDA_ENV ||
                process.env.CHITANDA_ENV.toUpperCase() != prodEnv
            ) {
                return;
            }

            if (config.log.logging && config.log.channel.info) {
                if (this.client.channels.has(config.log.channel.info)) {
                    var channel = this.client.channels.get(config.log.channel.info);
                    if (textChat.includes(channel.type)) {
                        channel.send(`:white_check_mark: ${message}`);
                    }
                }
            }
        } catch (err) {
            console.error(err.stack);
        }
    }

    warn(message, consoleOnly) {
        if (!message) return;
        console.warn('[Warn] ' + message);

        try {
            if (consoleOnly ||
                !process.env.CHITANDA_ENV ||
                process.env.CHITANDA_ENV.toUpperCase() != prodEnv
            ) {
                return;
            }

            if (config.log.logging && config.log.channel.warn) {
                if (this.client.channels.has(config.log.channel.warn)) {
                    var channel = this.client.channels.get(config.log.channel.warn);
                    if (textChat.includes(channel.type)) {
                        channel.send(`:x: ${err}`);
                    }
                }
            }
        } catch (e) {
            console.error(e.stack);
        }
    }

    error(err, consoleOnly) {
        if (!err) return;
        if (err.stack) {
            console.error(err.stack);
        } else if (err.message) {
            console.error('[Error] ' + (err.name ? `\`${err.name}\` ` : '') + err.message);
        } else {
            console.error('[Error] ' + err);
        }

        try {
            if (consoleOnly ||
                !process.env.CHITANDA_ENV ||
                process.env.CHITANDA_ENV.toUpperCase() != prodEnv
            ) {
                return;
            }

            if (config.log.logging && config.log.channel.error) {
                if (this.client.channels.has(config.log.channel.error)) {
                    var channel = this.client.channels.get(config.log.channel.error);
                    if (textChat.includes(channel.type)) {
                        if (err.message) {
                            if (!ignore.error.messages.includes(err.message)) {
                                channel.send(`:x: ${err.name ? `\`${err.name}\` ` : ''} ${err.message}`);
                            }
                        } else {
                            channel.send(`:x: ${err}`);
                        }
                    }
                }
            }
        } catch (e) {
            console.error(e.stack);
        }
    }

    commandFail(err, consoleOnly) {
        if (!err) return;
        console.error(err.stack);

        try {
            if (consoleOnly ||
                !process.env.CHITANDA_ENV ||
                process.env.CHITANDA_ENV.toUpperCase() != prodEnv
            ) {
                return;
            }

            if (config.log.logging && config.log.channel.cmdError) {
                if (this.client.channels.has(config.log.channel.cmdError)) {
                    var channel = this.client.channels.get(config.log.channel.cmdError);
                    if (textChat.includes(channel.type)) {
                        if (err.name && err.message) {
                            channel.send(`:x: \`${err.name}\` ${err.message}`);
                        } else {
                            channel.send(`:x: ${err}`);
                        }
                    }
                }
            }
        } catch (e) {
            console.error(e.stack);
        }
    }
}

module.exports = ErrorLog;