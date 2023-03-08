var express = require('express');
var router = express.Router();

// Import a logging library
const bunyan = require('bunyan');

// Imports the Google Cloud client library for Bunyan
const {LoggingBunyan} = require('@google-cloud/logging-bunyan');

// Creates a Bunyan Cloud Logging client
const loggingBunyan = new LoggingBunyan({
    redirectToStdout: true,    
  }
);

// Create a Bunyan logger that streams stdout
const logger = bunyan.createLogger({  
  name: "service",
  streams: [
    loggingBunyan.stream('info'), 
  ],
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  
  // ↓↓ UNCOMMENT TO WRITE Hello World TO LOGS 
   console.log("Hello World");
  // ↑↑
  
  // If you write logs to standard out in a specific JSON format, 
  // you get levels and extra metadata in Cloud Logging. This
  // example shows you how to use @google-cloud/logging-bunyan

  // ↓↓ UNCOMMENT FOR STRUCTURED LOGS 
   logger.error('Hello World at ERROR level');
   logger.info('Hello World at INFO level');
  // ↑↑                               

  res.type('text');
  res.send("OK");
});

module.exports = router;
