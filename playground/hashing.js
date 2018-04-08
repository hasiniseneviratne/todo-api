const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

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