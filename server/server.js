var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Todo} = require('./models/todo');

var app = express();
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc)=> {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.listen(3000, ()=> {
    console.log('On port 3000');
});

module.exports = {app};


// ------------------------------------------------------------------------------------------


//var mongoose =require('mongoose');
//
//mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/TodoApp');
//
//var Todo = mongoose.model('Todo', {
//    text: {
//        type: String,
//        required: true,
//        minlength: 1,
//        trim: true
//    },
//    completed: {
//        type: Boolean,
//        default: false
//    },
//    completedAt: {
//        type: Number,
//        default: null
//    }
//});
//
////var newToDo = new Todo({
////    text: 'Cook dinner'
////});
////
////newToDo.save().then((doc) => {
////    console.log('Saved doc', doc);
////}, (e) => {
////    console.log('Unable to save', e);
////});
//
////var newToDo = new Todo({
////    text: 'Have dinner',
////    completed: true,
////    completedAt: 123
////});
//
////var newToDo = new Todo({
////    text: '   Have dinner   '
////});
////
////newToDo.save().then((doc) => {
////    console.log('Saved doc', doc);
////}, (e) => {
////    console.log('Unable to save', e);
////});
//
//var User = mongoose.model('User', {
//    email: {
//        type: String,
//        minlength: 1,
//        required: true,
//        trim: true
//    }
//});
//
//var newUser = new User({
//    email: 'abc@abc.com'
//});
//
//newUser.save().then((doc) => {
//    console.log('Saved user', doc);
//}, (e) => {
//    console.log('Unable to save', e);
//});
//
