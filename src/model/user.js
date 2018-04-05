// _________________ Require ___________

var mongoose = require('mongoose');

//__________________ User Class ________

var UserSchema = mongoose.Schema({
    username: {
        unique: true,
        required: true,
        type: String,
        lenght: 30,
    },
    email:  {
        unique: true,
        required: true,
        type: String,
        length: 50,
    },
    dob: {
        type: Date,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        length: 20
    },
    surname: {
        type: String,
        length: 20
    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
})


var user = mongoose.model('User', UserSchema);


module.exports = user;