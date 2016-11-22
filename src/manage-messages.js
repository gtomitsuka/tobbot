/*
  support file for direct message support
 */

//frameworks
var twitter = require('./twitter-contact')
var database = require('./database/core');

function processMessages(_lastMessageDate) {
    var lastMessageDate = _lastMessageDate;

    if (lastMessageDate == null) {
        //returns date
        database.queryLastSavedMessage()
            .then((result) => {
                lastMessageDate = result;
            });
    }

    function repeat() {
        twitter.fetchDirectMessages(lastMessageDate)
            .then((messages) => {
                console.log(JSON.stringify(messages));
            })

        setTimeout(repeat, 30 * 1000);
    }


    return;
}

module.exports = {
    processMessages
}