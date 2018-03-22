var mongoose =require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp' || 'mongodb://Admin:admin@ds143744.mlab.com:43744/todo-api');

module.exports = {mongoose};