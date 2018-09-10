/**======= Copy right
      Sait 2018
=====================*/
const express = require('express')
const bodyParser = require('body-parser')
const agenda = require('agenda')

const app = express()
const jobQueue = new agenda()

const config = require('./config.json')
const VoteScheduler = require('./schedulers/voteScheduler')
const path = '/dblwebhook'
const port = process.env.PORT || 5555

jobQueue.database(config.database, VoteScheduler.voteCollection, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('How did you find this owo');
})

app.use(path, async (req, res) => {
    var auth = config.discordBotOrg.webhookAuth;
    if (auth && auth !== req.headers.authorization) {
        res.status(401).end();
        return;
    }

    await jobQueue.start();
    jobQueue.now(VoteScheduler.voteJob, {
        header: {
            host: req.headers.host,
            origin: req.headers.origin,
            // authorization: req.headers.authorization
        },
        body: req.body
    }).then(() => {
        res.status(200).end();
    })
})

app.listen(port, () => {
    console.log(`[Info] Webhook running at ${path} on port ${port}`);
})