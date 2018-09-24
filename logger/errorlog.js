const config = require('../config.json')
const util = require('../util/commonUtil')
const textChat = ['text', 'dm', 'group']
const infoPrefix = '[Info] '
const warnPrefix = '[Warn] '
const errorPrefix = '[Error] '

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
        console.log(infoPrefix + message);

        try {
            if (consoleOnly || !util.isProduction()) {
                return;
            }

            if (config.log.logging && config.log.channel.info) {
                if (this.client.channels.has(config.log.channel.info)) {
                    var channel = this.client.channels.get(config.log.channel.info);
                    if (textChat.includes(channel.type)) {
                        channel.send(`:white_check_mark: ${message}`)
                        .catch(err => {
                            console.error(errorPrefix + err.stack);
                        })
                    }
                }
            }
        } catch (err) {
            console.error(errorPrefix + err.stack);
        }
    }

    warn(message, consoleOnly) {
        if (!message) return;
        console.warn(warnPrefix + message);

        try {
            if (consoleOnly || !util.isProduction()) {
                return;
            }

            if (config.log.logging && config.log.channel.warn) {
                if (this.client.channels.has(config.log.channel.warn)) {
                    var channel = this.client.channels.get(config.log.channel.warn);
                    if (textChat.includes(channel.type)) {
                        channel.send(`:warning: ${err}`)
                        .catch(err => {
                            console.error(errorPrefix + err.stack);
                        })
                    }
                }
            }
        } catch (e) {
            console.error(errorPrefix + e.stack);
        }
    }

    error(err, consoleOnly) {
        if (!err) return;
        if (err.stack) {
            console.error(errorPrefix + err.stack);
        } else if (err.message) {
            console.error(errorPrefix + (err.name ? `\`${err.name}\` ` : '') + err.message);
        } else {
            console.error(errorPrefix + err);
        }

        try {
            if (consoleOnly || !util.isProduction()) {
                return;
            }

            if (config.log.logging && config.log.channel.error) {
                if (this.client.channels.has(config.log.channel.error)) {
                    var channel = this.client.channels.get(config.log.channel.error);
                    if (textChat.includes(channel.type)) {
                        if (err.stack) {
                            channel.send(`:x: ${err.stack}`)
                            .catch(e => {
                                console.error(errorPrefix + e.stack);
                            })
                        } else if (err.message) {
                            if (!ignore.error.messages.includes(err.message)) {
                                channel.send(`:x: ${err.name ? `\`${err.name}\` ` : ''} ${err.message}`)
                                .catch(e => {
                                    console.error(errorPrefix + e.stack);
                                })
                            }
                        } else {
                            channel.send(`:x: ${err}`)
                            .catch(e => {
                                console.error(errorPrefix + e.stack);
                            })
                        }
                    }
                }
            }
        } catch (e) {
            console.error(errorPrefix + e.stack);
        }
    }

    commandFail(err, consoleOnly) {
        if (!err) return;
        console.error(errorPrefix + err.stack);

        try {
            if (consoleOnly || !util.isProduction()) {
                return;
            }

            if (config.log.logging && config.log.channel.cmdError) {
                if (this.client.channels.has(config.log.channel.cmdError)) {
                    var channel = this.client.channels.get(config.log.channel.cmdError);
                    if (textChat.includes(channel.type)) {
                        if (err.stack) {
                            channel.send(`:x: ${err.stack}`)
                            .catch(e => {
                                console.error(errorPrefix + e.stack);
                            })
                        } else if (err.name && err.message) {
                            channel.send(`:x: \`${err.name}\` ${err.message}`)
                            .catch(e => {
                                console.error(errorPrefix + e.stack);
                            })
                        } else {
                            channel.send(`:x: ${err}`)
                            .catch(e => {
                                console.error(errorPrefix + e.stack);
                            })
                        }
                    }
                }
            }
        } catch (e) {
            console.error(errorPrefix + e.stack);
        }
    }
}

module.exports = ErrorLog;