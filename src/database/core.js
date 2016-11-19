/* connect to Google Cloud Datastore */

var config = require('../../config');
var Datastore = require('@google-cloud/datastore');

// Instantiate a datastore client
var datastore = Datastore(config.google);

function addTask(description, callback) {
    var taskKey = datastore.key('Task');

    datastore.save({
        key: taskKey,
        data: [{
            name: 'created',
            value: new Date().toJSON()
        }, {
            name: 'description',
            value: description,
            excludeFromIndexes: true
        }, {
            name: 'done',
            value: false
        }]
    }, function (err) {
        if (err) {
            return callback(err);
        }

        var taskId = taskKey.path.pop();
        console.log('Task %d created successfully.', taskId);
        return callback(null, taskKey);
    });
}

addTask('description', function (err) {
    if (err) {
        throw err;
    }
    console.log('success');
});