const mongoose = require('mongoose');

const savedSchema = new mongoose.Schema({
    user : {
        type : String,
    },
    id : {
        type : String,
    }
})

const saved = mongoose.model('saved', savedSchema);
module.exports = saved;