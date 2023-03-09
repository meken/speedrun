var express = require('express');
var router = express.Router();

const { createClient } = require('redis')
const client = createClient({
    url: `redis://${process.env.REDISHOST || 'localhost'}`
});

client.on('error', err => console.log('Redis Client Error', err));

router.get('/', async function (req, res, next) {
    const { REDISHOST } = process.env

    if (!REDISHOST) {
        res.type('text')
        res.status(500)
        console.log("Set the environment variable REDISHOST with the internal IP of the redis host");
        res.send("Error, check logs for message")
        return
    }
    await client.connect();
    counter = await client.incr("counter")
    res.type('text');
    res.send(`Request to increment this counter: ${counter}`);
    await client.disconnect();

});

module.exports = router;
