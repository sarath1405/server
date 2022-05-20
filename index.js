const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express();

// app.use(cors({
//     origin : '*',
//     credentials : true,
// }));
app.options('*', cors())
app.use(express.json());

mongoose.connect("mongodb+srv://sarath14:Gd0b6Vc5Awqkw1ev@cluster0.arzcw.mongodb.net/BlogApp?retryWrites=true&w=majority").then(console.log('mongodb connected!'))
.catch("error");


app.use('/', require('./routes/auth'))
app.use('/', require('./routes/blog'))

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('5000'));