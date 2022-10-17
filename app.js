var express = require('express');
var mongoose = require('mongoose')
var app = express();

app.use('/static', express.static("public"));
app.use(express.urlencoded({extended: true}))
app.set("view engine", "ejs");

const Todo = require('./models/todo.model')
const mongoDB = 'mongodb+srv://farmermichael1:5BDmCHQay87DGhXv@cluster0.yzmzguu.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDB connection error: "))

app.get('/', function(req, res){
    res.render('todo.ejs');
})
// Created item in DB
app.post('/', (req, res) =>{
    let newTodo = new Todo({
        todo: req.body.content,
        done: false
    })
    newTodo.save(function(err, todo){
        if(err){
            res.json({"Error: ": err})
        } else {
            res.json({"Status:": "Successful", "ObjectId": todo.id})
        }
    })
})
//Modiefies item in DB
app.put('/', (req, res) => {
    let id = req.body.check;
    let err = {}
    if(typeof id === "string"){
        Todo.updateOne({_id: id}, {done: true}, function(error){
            if(error){
                err = error
            }
        })
    } else if (typeof id === "object"){
        id.forEach( ID => {
            Todo.updateOne({_id: id}, {done: true}, function(error){
                if(error){
                    err = error
                }
            })
        })
    }
    if(err){
        res.json({"Error: ": err})
    } else {
        res.json({"Status:": "Successful"})
    }
})

app.delete('/', (req, res) => {
    let id = req.body.check;
    let err = {}
    if(typeof id === "string"){
        Todo.deleteOne({_id: id}, function(error){
            if(error){
                err = error
            }
        })
    } else if (typeof id === "object"){
        id.forEach( ID => {
            Todo.deleteOne({_id: id}, function(error){
                if(error){
                    err = error
                }
            })
        })
    }
    if(err){
        res.json({"Error: ": err})
    } else {
        res.json({"Status:": "Successful"})
    }
})

app.listen(3000, function(){
    console.log('App listening on port 3000')
})