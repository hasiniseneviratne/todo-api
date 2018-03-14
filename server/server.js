var mongoose =require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

//var newToDo = new Todo({
//    text: 'Cook dinner'
//});
//
//newToDo.save().then((doc) => {
//    console.log('Saved doc', doc);
//}, (e) => {
//    console.log('Unable to save', e);
//});

//var newToDo = new Todo({
//    text: 'Have dinner',
//    completed: true,
//    completedAt: 123
//});

//var newToDo = new Todo({
//    text: '   Have dinner   '
//});
//
//newToDo.save().then((doc) => {
//    console.log('Saved doc', doc);
//}, (e) => {
//    console.log('Unable to save', e);
//});

var User = mongoose.model('User', {
    email: {
        type: String,
        minlength: 1,
        required: true,
        trim: true
    }
});

var newUser = new User({
    email: 'abc@abc.com'
});

newUser.save().then((doc) => {
    console.log('Saved user', doc);
}, (e) => {
    console.log('Unable to save', e);
});

