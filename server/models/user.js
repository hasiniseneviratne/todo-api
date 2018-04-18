const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        minlength: 1,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function () {
    var User = this;
    var userObject = User.toObject();

    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
    var User = this;
    var access = 'auth';
    var token = jwt.sign({_id: User._id.toHexString(), access}, 'abc123').toString();

    User.tokens = User.tokens.concat([{access, token}]);

    return User.save().then(() => {
        return token;
    });
};

UserSchema.statics.findByToken = function(token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        //return new Promise((resolve, reject) => {
        //    reject();
        //});

        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token' : token,
        'tokens.access': 'auth'
    });
};

UserSchema.statics.findByCredentials = function(email, password) {
    var User = this;

    return User.findOne({email}).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                }
                reject();
            });
        });
    });
};

UserSchema.pre('save', function(next) {
    var user = this;

    if (user.isModified('password')){
        bcrypt.genSalt(10, (err, salt) => {
           bcrypt.hash(user.password, salt, (err, hash) => {
               user.password = hash;
                next();
           });
        });
    } else {
        next();
    }
});

var User = mongoose.model('User', UserSchema);

//var User = mongoose.model('User', {
//    email: {
//        type: String,
//        minlength: 1,
//        required: true,
//        trim: true,
//        unique: true,
//        validate: {
//            validator: validator.isEmail,
//            message: '{VALUE} is not a valid email'
//        }
//    },
//    password: {
//        type: String,
//        required: true,
//        minlength: 6
//    },
//    tokens: [{
//        access: {
//            type: String,
//            required: true
//        },
//        token: {
//            type: String,
//            required: true
//        }
//    }]
//});

module.exports = {User};