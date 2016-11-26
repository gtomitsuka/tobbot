/*
  support file for direct message support
 */

// frameworks
var async = require('async');

var twitter = require('./contact')
var database = require('../database/core');
var reactionManager = require('../reaction-manager/core.js');

// variables
var interval = 61 * 1000; // every 61 seconds, because Twitter API's limits.

/**
 * process messages
 * gets last saved message, fetches new messages, reacts to them
 * repeats itself in ´interval´
 */
function repeat() {
    database.queryLastSavedMessage()
        .then((message) => {
            return twitter.fetchDirectMessages(message.id, message.created)
        }).then((messages) => {
            return reactToMessages(messages)
        }).then(() => {
            return setTimeout(repeat, interval);
        }).catch((err) => {
            console.error(err);
            throw err;
        })
}

/**
 * Adds direct message to database, replies to message using reactionManager
 * and saves response in DB.
 * @param {Object[]} messages - messages to be processed (for unprocessed messages)
 * @param {string} messages[].text - Message's text
 * @param {string} messages[].sender_id - Sender's id, for saving user in DB
 * @param {string} messages[].sender_screen_name - Sender's screen name, same purpose
 * @param {string} messages[].id_str - ID as a string - IMPORTANT: JS keeps no precision for high numbers as Twitter IDs
 * @param {string} messages[].created_at - for no duplicate messages.
 * try not to process a message twice!
 */
function reactToMessages(messages) {
    return async.each(messages, (message) => {
        console.log('@' + message.sender_screen_name + ': ' + message.text)
        var response;
        return database.addDirectMessage(message.id_str,
                message.sender_id,
                message.sender_screen_name,
                message.text,
                message.created_at)
            .then(() => {
                var reply = reactionManager(message)
                console.log('@tobbot_gt: ' + reply)

                return twitter.replyToDirectMessage(reply, message.sender.screen_name, message.sender.id)
            }).then((result) => {
                return database.addResponse(result.id_str, result.text, result.created_at)
            }).catch((err) => {
                console.error(err);
                throw err;
            })
    });
}

module.exports = {
    processMessages: repeat
}