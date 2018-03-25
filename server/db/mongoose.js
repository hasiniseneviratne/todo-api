var mongoose =require('mongoose');

mongoose.Promise = global.Promise;
//mongoose.connect(process.env.PORT ? 'mongodb://admin:admin@ds143744.mlab.com:43744/todo-api' : 'mongodb://localhost:27017/TodoApp');
mongoose.connect(process.env.MONGODB_URI);
module.exports = {mongoose};