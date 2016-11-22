// index.js

//internal frameworks
var twitter = require('./src/twitter-contact');
var database = require('./src/database/core');
var messageManager = require('./src/manage-messages')

console.log('starting up...');

twitter.connect().then(() => {
    console.log('successfully connected to Twitter');
}).then(() => {
    //returns date
    return database.queryLastSavedMessage()
}).then((date) => {
    console.log('successfully connected to database, last saved message dates to ' + date)

    messageManager.processMessages();

    console.info('successful startup.');
}).catch(function (err) {
    console.error('caught error: ', err.stack);
    throw err;
});