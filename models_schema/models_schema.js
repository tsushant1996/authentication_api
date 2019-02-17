var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;


//+++++ USERSCHEMA ++++//

var users = mongoose.Schema({
    name: {
        type: String,
        index: true
    },
    email: {
        type: String, 
    },
    password:{
        type:String,
    },
    createdAt: {
        type: String
    },
    updatedAt: {
        type: String
    },
 
},{collection:'authentic_users'});

exports.users = mongoose.model('users', users);