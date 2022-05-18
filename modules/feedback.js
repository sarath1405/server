const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
    name : {
        type : String,
    },
    star : {
        type : Number,
    },
    feedback : {
        type : String,
    }
})

const feedback = mongoose.model('feedback', feedbackSchema);

module.exports = feedback;