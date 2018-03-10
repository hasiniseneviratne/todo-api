//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to Mongo Db serve');
    }
    console.log('Connected to MongoDb server');

   //db.collection('Todos').findOneAndUpdate({
   //    _id: new ObjectId('5aa3ad891bcfc7d4496b6154')
   //}, {
   //    $set: {
   //        completed: true
   //    }
   //}, {
   //    returnOriginal: false
   //}).then((result) => {
   //     console.log(result);
   //});

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectId('5aa3a4171bcfc7d4496b5ffd')
    }, {
        $set: {
            name: 'Hasini'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    //db.close();
});