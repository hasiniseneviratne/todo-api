require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Todo} = require('./models/todo');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

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

app.get('/todos', (req, res) => {
   Todo.find().then((todos) => {
       res.send({todos});
   }, (e) => {
       res.status(400).send(e);
   });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (! ObjectId.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if (todo) {
            res.send({todo});
        } else {
            return res.status(404).send();
        }
    }).catch((e) => {
        res.status(400).send();
    });
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (! ObjectId.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (todo) {
            res.send({todo});
        } else {
            return res.status(404).send();
        }
    }).catch((e) => {
        res.status(400).send();
    });
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (! ObjectId.isValid(id)) {
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (! todo) {
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e) => {
        res.status().send(400);
    });
});

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });

    //user.save().then((user) => {
    //    res.send({user});
    //}).catch((e) => {
    //    res.status(400).send(e);
    //});
});

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.listen(port, ()=> {
    console.log(`On port ${port}`);
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
