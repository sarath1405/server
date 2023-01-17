const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
    },
    password : {
        type : String,
    },
    avatar : {
        type : Number,
    }
})

const user = mongoose.model('user', userSchema);

module.exports = user;