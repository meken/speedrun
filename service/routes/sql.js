var express = require('express');
var router = express.Router();

const { Client } = require('pg')


router.get('/', async function (req, res, next) {
    const {SQL_USER, SQL_INSTANCE_NAME, SQL_PASSWORD, SQL_DATABASE} = process.env
    if (!SQL_USER || !SQL_INSTANCE_NAME || !SQL_PASSWORD || !SQL_DATABASE) {
        res.type('text');
        res.status(500) 
        console.log("Missing environment variable. One of SQL_USER, SQL_INSTANCE_NAME, SQL_PASSWORD, SQL_DATABASE")
        res.send("Connection failed, check logs for the reason")
        return
    }
    // WARNING: In production, use pg.Pool and connect when initializing the app. 
    // This app builds a connection for every request to help with debugging.     
    const client = new Client({
        host: `/cloudsql/${SQL_INSTANCE_NAME}`,
        user: SQL_USER,
        database: SQL_DATABASE,
        password: SQL_PASSWORD,
      })
    try {
        await client.connect()    
    } catch (error) {
        res.status(500)        
        console.log(error);
        res.send("Connection failed, check logs for the reason")     
    }
    
    const result = await client.query('SELECT $1::text as message', ['OK'])
    res.type('text');
    res.send(result.rows[0].message) 
    await client.end()
});

module.exports = router;
