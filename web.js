/**======= Copy right
    Sait 2018
=====================*/
const express = require('express')
const proxy = require('express-http-proxy')

const app = express()
const config = require('./config.json')
const path = '/dblwebhook'
const port = process.env.PORT || 5555

app.use(path, proxy('localhost:5000'));

app.get('/', (req, res) => {
    res.send('How did you find this owo');
})

app.listen(port, () => {
    console.log(`[Info] Webhook running at ${path} on port ${port}`);
})