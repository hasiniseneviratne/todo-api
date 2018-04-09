const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var data = {
    id: 10
};

var token = jwt.sign(data, '123abc');
console.log(token);


var decoded = jwt.verify(token, '123abc');
console.log(decoded);

//var message = 'Hello example';
//var hash = SHA256(message);
//
//console.log(`Message: ${message}`);
//console.log(`Hash: ${hash}`);
//
//var data = {
//    id: 4
//};
//
//var token = {
//    data,
//    hash: SHA256(JSON.stringify(data) + 'some secret').toString()
//};
//
//var resultHash = SHA256(JSON.stringify(token.data) + 'some secret').toString();
//
//if (resultHash === token.hash) {
//    console.log('Data match');
//} else {
//    console.log('Data does not match');
//}

var password = 'abc123!';

//bcrypt.genSalt(10, (err, salt) => {
//    bcrypt.hash(password, salt, (err, hash) => {
//        console.log(hash);
//    });
//});

var hashedPassword = '$2a$10$juNe3JV1oSg.LEvEtyNj3eItGVnFcg9Qc2yAf.YOaDIlunTDRnD8a';

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
});