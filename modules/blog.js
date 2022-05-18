const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title : {
        type : String
    },
    user : {
        type : String
    },
    avatar : {
        type : Number
    },
    content : {
        type : String
    },
    description : {
        type : String
    },
    date : {
        type : Date
    }
})

const blog = mongoose.model('blog', blogSchema);
module.exports = blog;