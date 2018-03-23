const {ObjectId} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//Todo.remove({}).then((result) => {
//    console.log(result);
//});

Todo.findByIdAndRemove('5ab54fd9dab7a22a5e5e901b').then((todo) => {
    console.log(todo);
});

Todo.findOneAndRemove({_id: '5ab54fd9dab7a22a5e5e901b'}).then((todo) => {
    console.log(todo);
});