var express = require('express');
var mongoose = require('mongoose')
var app = express();

app.use('/static', express.static("public"));
app.use(express.urlencoded({extended: true}))
app.set("view engine", "ejs");

const mongoDB = 'mongodb+srv://farmermichael1:5BDmCHQay87DGhXv@cluster0.yzmzguu.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDB connection error: "))

app.get('/', function(req, res){
    res.render('todo.ejs');
})

app.post('/', (req, res) =>{
    console.log(req.body.content)
})

app.listen(3000, function(){
    console.log('App listening on port 3000')
})