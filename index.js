const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express();

app.use(express.json());
app.use(cors({
    origin : '*',
    credentials : true
}))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("server is running on PORT", PORT);
})

app.use('', require('./routes/blog'))

mongoose.connect("mongodb+srv://sarath14:Gd0b6Vc5Awqkw1ev@cluster0.arzcw.mongodb.net/BlogApp?retryWrites=true&w=majority").then(console.log('mongodb connected!'))
.catch("error");