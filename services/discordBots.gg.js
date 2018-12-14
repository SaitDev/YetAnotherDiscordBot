const https = require('https');

const config = require('../config.json');
const BASE_HOST = "discord.bots.gg";
const BASE_URL = "https://" + BASE_HOST;
const API = "/api/v1";
const BOTS = "/bots";
const STATS = "/stats";
const ID = "{id}";
const PATH_ID = "/" + ID;

const PATH_POST_BOT_STATS = API + BOTS + PATH_ID + STATS;

const URL_GET_BOTS = BASE_URL + API + BOTS;
const URL_GET_BOT = BASE_URL + API + BOTS + PATH_ID;
const URL_GET_BOT_STATS = BASE_URL + API + BOTS + PATH_ID + STATS;
const URL_POST_BOT_STATS = BASE_URL + API + BOTS + PATH_ID + STATS;

class DiscordBotsGG {
    /**
     * @param {import('../chitanda')} client 
     */
    constructor(client) {
        this.client = client;
        this.updateServerCount();
    }

    updateServerCount() {
        var request = https.request(
            {
                hostname: BASE_HOST,
                path: PATH_POST_BOT_STATS.replace(ID, this.client.user.id),
                method: 'POST',
                headers: {
                    'Authorization': config.discordBotsGG.token,
                    'Content-Type': 'application/json'
                }
            },
            (res) => {
                res.setEncoding('utf8');
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('error', (err) => {
                    this.client.errorLogger.error(err);
                })
                res.on('end', () => {
                    if (res.statusCode >= 300) {
                        this.client.errorLogger.error(data != '' ? data : res.statusMessage);
                    } else {
                        this.client.errorLogger.info('Updated server count to ' + BASE_HOST, true);
                    }
                });
            }
        ).on('error', (err) => {
            this.client.errorLogger.error(err);
        });

        request.write(JSON.stringify({
            guildCount: this.client.guilds.size,
            shardCount: (this.client.shard && this.client.shard.count) ? this.client.shard.count : undefined,
            shardId: (this.client.shard && this.client.shard.id) ? this.client.shard.id : undefined
        }));
        
        request.end();
    }
}

module.exports = DiscordBotsGG;