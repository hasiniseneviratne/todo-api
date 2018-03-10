//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to Mongo Db serve');
    }
    console.log('Connected to MongoDb server');

    // delete many

    //db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    //    console.log(result);
    //});

    // delete one
    //db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //    console.log(result);
    //});

    // find one and delete
    //db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //    console.log(result);
    //});

    //db.collection('Users').deleteMany({name: 'Hasini'}).then((result) => {
    //    console.log(result);
    //});

    db.collection('Users').findOneAndDelete({
        _id: new ObjectId("5a9b07871ab9d425e0a173f0")
    }).then((result) => {
        console.log(result);
    });

    //db.close();
});