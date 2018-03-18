const {ObjectId} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5aad6dea443e6654328b6f82';

if (! ObjectId.isValid(id)) {
    console.log('Id is not valid');
}

Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos', todos);
});

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo', todo);
});

Todo.findById(id).then((todo) => {
    if (! todo) {
        return console.log('Id not found');
    }
    console.log('Todo', todo);
}).catch((e) => {console.log(e)});

var userId = '5aa7f7a72d71705833a32b23';

User.findById(userId).then((user) => {
    if (! user) {
        return console.log('User not found');
    }
    console.log('User', user);
}, (e) => {
    console.log(e);
});