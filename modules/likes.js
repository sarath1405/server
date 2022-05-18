const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user : {
        type : String,
    },
    id : {
        type : String,
    },
})

const likes = mongoose.model('likes', likeSchema);
module.exports = likes