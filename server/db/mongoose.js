var mongoose =require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:admin@ds143744.mlab.com:43744/todo-api' || 'mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};