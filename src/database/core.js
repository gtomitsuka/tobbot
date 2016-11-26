/*
 database's core - manages connection to google cloud datastore,
 keeps methods for writing or querying datastore.
 */

/* connect to Google Cloud Datastore */

var config = require('../../config');

//external apis

// recommended docs: https://googlecloudplatform.github.io/google-cloud-node/#/docs/datastore/0.5.1/datastore
var Datastore = require('@google-cloud/datastore');

// Instantiate a datastore client
var datastore = Datastore(config.google);

/**
 * add direct message to database
 * @param {String} id - twitter direct message id, send as
 * string because JS isn't precise with large numbers
 * @param {Number} senderId - saves senderId to DB for avoiding ambigous
 * sender name. precision isn't important
 * @param {String} senderName - for readability and contact purposes.
 * @param {String} content - DM's text
 * @param {Date} created - when the message was created
 * @returns {Promise}
 */
function addDirectMessage(id, senderId, senderName, content, created) {
    var messageKey = datastore.key('Message');

    return datastore.save({
        key: messageKey,
        data: {
            twitter_id: id,
            content,
            senderId,
            senderName,
            created: new Date(created)
        }
    });
}

/**
 * add Tobbot's response to a DM to database
 * @param {String} id - Twitter's direct message ID
 * @param {String} content - response's text
 * @param {Date} created - when was it responded
 * @returns {Promise}
 */
function addResponse(id, content, created) {
    var responseKey = datastore.key('Response');

    return datastore.save({
        key: responseKey,
        data: {
            twitter_id: id,
            content,
            created: new Date(created)
        }
    });
}

/**
 * used before fetching DMs and for testing connection
 * @returns {Object} - with Twitter ID and created at properties. 
 * */
function queryLastSavedMessage() {
    var query = datastore.createQuery('Message');
    query.order('created', {
        descending: true
    });
    query.limit(1);

    return datastore.runQuery(query).then((results) => {
        if (results[0].length === 0)
            return

        return {
            id: results[0][0].twitter_id,
            created: results[0][0].created
        };
    });
}

module.exports = {
    addDirectMessage,
    addResponse,
    queryLastSavedMessage
}