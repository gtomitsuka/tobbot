var twit = require('twit');
var config = require('../config');

var T = new twit(config.twit);

T.get('account/verify_credentials', {
    skip_status: true
}).then(function (result) {
    return T.post('statuses/update', {
        status: 'We\'re online! #bot'
    });
}).then(function () {
    console.log('successfully connected.')
}).catch(function (err) {
    console.error('caught error: ', err.stack);
    throw err;
});

function fetchDirectMessages(since) {
    return T.get('direct_messages', {
        since_id: since,
        max_id: 200
    })
}

module.exports = {
    fetchDirectMessages
}