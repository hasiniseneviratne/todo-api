var env = process.env.NODE_ENV || 'development';

process.env.MONGODB_URI = 'mongodb://admin:admin@ds143744.mlab.com:43744/todo-api'

if (env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp'
} else if (env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest'
}
