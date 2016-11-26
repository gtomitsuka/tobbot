/*
 for contacting Twitter, receives and reacts to data on command. 
 */

var twit = require('twit');
var config = require('../../config');

var T = new twit(config.twit);

/**
 * authentify Twitter account, add status
 * for followers to know the bot is online.
 * will throw if connection or tweeting fails.
 * @async
 */
function connect() {
    return T.get('account/verify_credentials', {
        skip_status: true
    }).then(function (result) {
        return T.post('statuses/update', {
            status: 'I\'m online! Feel free to send a DM. #bot'
        });
    })
}

/**
 * fetch new direct messages. make sure only to fetch messages
 * younger than last message, because else the system breaks.
 * @param {String} since_id - ID of last message.
 * MUST BE string else there are precision problems.
 * @param {Date} since_date - Date of last message, for double check.
 * @async
 * @returns {Array} - with new direct messages
 */
function fetchDirectMessages(since_id, since_date) {
    return T.get('direct_messages', {
        since_id,
        include_entities: false
    }).then((result) => {
        console.log()
        if (result.data.length !== 0) {
            var i = 0;
            while (result.data[i] != null && result.data[i].created < since_date) {
                result.data.shift()

                i++
            }
        }

        return result.data;
    })
}

/**
 * replies to direct message
 * @async
 * @returns {Object} - with Tweet data, check Twitter REST API docs
 * for details.
 */
function replyToDirectMessage(content, sender_name, sender_id) {
    return T.post('direct_messages/new', {
        screen_name: sender_name,
        user_id: sender_id,
        text: content
    }).then((result) => {
        return result.data;
    });
}

module.exports = {
    connect,
    fetchDirectMessages,
    replyToDirectMessage
}