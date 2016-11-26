/* connect to Google Cloud Datastore */

var config = require('../../config');

//external apis

// internal tip
// use https://googlecloudplatform.github.io/google-cloud-node/#/docs/datastore/0.5.1/datastore
// as documentation
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
            twitter_id: id,
            content,
            senderId,
            senderName,
            created: new Date(created)
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

/*
    database.fetchLastSavedMessage()
    last message ist required for not querying messages twice.
    also used to verify whether system is functioning.

    returns date, when last message was created
 */
function queryLastSavedMessage() {
    var query = datastore.createQuery('Message');
    query.order('created', {
        descending: true
    });
    query.limit(1);

    return datastore.runQuery(query).then((results) => {
        if (results[0].length === 0)
            return
        return results[0][0].twitter_id;
    });
}

module.exports = {
    addDirectMessage,
    addResponse,
    queryLastSavedMessage
}