var express = require('express');
var router = express.Router();
const { Firestore } = require('@google-cloud/firestore');

router.get('/', async function (req, res, next) {
    try {
        const db = new Firestore();
        // You don't need to make changes here to solve
        // the test. Create the database (Native mode) and
        // add the record!
        const doc = await db.collection('cities').doc('Amsterdam').get();

        if (!doc.exists) {
            throw new Error(`Firestore document [${collection}/${id}] doesn't exist`);
        }

        res.type('text'); // Make the response readable for humans with a browser
        res.send(JSON.stringify(doc.data()));
    } catch (error) {
        console.log(error.details || error)
        res.type('text')
        res.status(500)
        res.send("Error. Check the logs for the message")
    }
});

module.exports = router;