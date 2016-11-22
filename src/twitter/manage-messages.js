/*
  support file for direct message support
 */

//frameworks
var twitter = require('./contact')
var database = require('../database/core');
var reactionManager = require('../reaction-manager/core.js');

import each from 'async/each';

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
                return each(messages, (message, cb) => {
                    reactionManager(message)
                });
            }).then(() => {
                setTimeout(repeat, 30 * 1000);
            }).catch((err) => {
                console.error(err);
                throw err;
            })
    }

    repeat()
}

module.exports = {
    processMessages
}