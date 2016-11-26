var twit = require('twit');
var config = require('../../config');

var T = new twit(config.twit);

function connect() {
    return T.get('account/verify_credentials', {
        skip_status: true
    }).then(function (result) {
        return T.post('statuses/update', {
            status: 'We\'re online! #bot'
        });
    }).then(function () {
        console.log('successfully connected.')
    })
}

function fetchDirectMessages(since) {
    return T.get('direct_messages', {
        since_id: since,
        include_entities: false
    }).then((result) => {
        if (result.data.length !== 0) {
            var i = 0;
            while (result.data[i] != null && result.data[i].id <= since) {
                result.data.shift()

                i++
            }
        }

        return result.data;
    })
}

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