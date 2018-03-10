const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to Mongo Db serve');
    }
    console.log('Connected to MongoDb server');

    //db.collection('Todos').insertOne({
    //    text: 'Something to do',
    //    completed: false
    //}, (err, result) => {
    //    if (err) {
    //        return console.log('Unable to insert Todo', err);
    //    }
    //
    //    console.log(JSON.stringify(result.ops, undefined, 2));
    //});

    //db.collection('Users').insertOne({
    //    name: 'Hasini',
    //    age: 23,
    //    location: 'Colombo'
    //}, (err, result) => {
    //    if (err) {
    //        return console.log('Unable to insert User', err);
    //    }
    //
    //    //console.log(JSON.stringify(result.ops, undefined, 2));
    //
    //    console.log(result.ops[0]._id.getTimestamp());
    //});

    db.close();
});