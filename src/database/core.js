/* connect to Google Cloud Datastore */

var config = require('../../config');

//external apis
var Datastore = require('@google-cloud/datastore');

// Instantiate a datastore client
var datastore = Datastore(config.google);

/*
 database.addDirectMessage(id, senderId, senderName, content, created)
 database.addResponse(id, content, created)
*/

function addDirectMessage(id, senderId, senderName, content, created) {
    var messageKey = datastore.key('Message');

    return datastore.save({
        key: messageKey,
        data: {
            id,
            content,
            senderId,
            senderName,
            created
        }
    });
}

function addResponse(id, content, created) {
    var responseKey = datastore.key('Response');

    return datastore.save({
        key: responseKey,
        data: {
            id,
            content,
            created
        }
    });
}

module.exports = {
    addDirectMessage,
    addResponse
}