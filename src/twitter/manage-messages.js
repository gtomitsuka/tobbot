/*
  support file for direct message support
 */

//frameworks
var async = require('async');

var twitter = require('./contact')
var database = require('../database/core');
var reactionManager = require('../reaction-manager/core.js');

function processMessages() {
    function repeat() {
        database.queryLastSavedMessage()
            .then((lastMessageID) => {
                return twitter.fetchDirectMessages(lastMessageID + 1)
            }).then((messages) => {
                console.log(messages)

                return async.each(messages, (message) => {
                    var response;
                    return database.addDirectMessage(message.id,
                            message.sender_id,
                            message.sender_screen_name,
                            message.text,
                            message.created_at)
                        .then(() => {
                            return twitter.replyToDirectMessage(reactionManager(message), message.sender.screen_name, message.sender.id)
                        }).then((result) => {
                            return console.log(result); //database.addResponse()
                        }).catch((err) => {
                            console.error(err);
                            throw err;
                        })
                });
            }).then(() => {
                return setTimeout(repeat, 61 * 1000);
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