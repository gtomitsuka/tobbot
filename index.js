/* tobbot API
  developed for research purposes.
  this file just runs the startup procedure and
  gets the interval-based repeater working.
  check README.md for more details
*/

//internal frameworks
var twitter = require('./src/twitter/contact');
var database = require('./src/database/core');
var messageManager = require('./src/twitter/manage-messages')

console.log('starting up...');

//statup procedure, connection checks. twitter.connect() tweets new status.
twitter.connect().then(() => {
    console.log('successfully connected to Twitter');
}).then(() => {
    //returns date
    return database.queryLastSavedMessage()
}).then((message) => {
    console.log('successfully connected to database, last saved message created at ' + message.created)

    return messageManager.processMessages();
}).then(() => {
    console.info('successful startup.');
}).catch(function (err) {
    console.error('caught error: ', err.stack);
    throw err;
});