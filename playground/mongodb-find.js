//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to Mongo Db serve');
    }
    console.log('Connected to MongoDb server');

    db.collection('Todos').find().toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to connect to db', err);
    });


    // pass an argument in query
    db.collection('Todos').find({completed: true}).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to connect to db', err);
    });

    // to find document by ID we cannot just pass ID string instead the Object ID needs to be used
    db.collection('Todos').find({
        _id: new ObjectId('5aa3942a1bcfc7d4496b5c0c')
    }).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to connect to db', err);
    });

    // count
    db.collection('Todos').find().count().then((count) => {
        console.log(`Todos count: ${count}`);
    }, (err) => {
        console.log('Unable to connect to db', err);
    });

    db.collection('Users').find({name: 'Hasini'}).toArray().then((docs) => {
        console.log('Users');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to connect to db', err);
    });


    //db.close();
});