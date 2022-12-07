const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const PORT = 2022;
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
require('dotenv').config();

// MongoDB Connection URL
let db;
    dbConnectionStr = "mongodb://mongo:********@containers-us-west-140.railway.app:7188"
    dbName = 'to-do-list';

// Connect to Database
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`);
        db = client.db(dbName);
    })

// Middleware
app.set('view engine', 'index.ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/pages', express.static(__dirname + '/pages'));
app.use(cors());

app.get('/', (req, res) => {
    db.collection('tasks').find().toArray()
    .then(data => {
        db.collection('tasks').countDocuments({ completed: false })
        .then(numTasks => {
        res.render('index.ejs', { items: data, tasksLeft: numTasks })
        })
    })
    .catch(error => console.log(error))
})

app.post('/addTask', (req, res) => {
    db.collection('tasks').insertOne({ 
        todo: req.body.task, 
        date: req.body.date, 
        completed: false
    })
    .then(result => {
        console.log('Task Added!')
        res.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/markComplete', (req, res) => {
    db.collection('tasks').updateOne({todo: req.body.todoFromList},{
    $set: {
        completed: true
        }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Marked Complete!');
        res.json('Marked Complete!')
    })
    .catch(error => {
        console.log(error)
    })
})

app.put('/markIncomplete', (req, res) => {
    db.collection('tasks').updateOne({todo: req.body.todoFromList},{
    $set: {
        completed: false
        }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Marked Incomplete!');
        res.json('Marked Incomplete!')
    })
    .catch(error => {
        console.log(error)
    })
})

app.delete('/deleteTask', (req, res) => {
    db.collection('tasks').deleteOne({ 
        todo: req.body.todoFromList 
    })
    .then(result => {
        console.log('Task Deleted!')
        res.json('Task Deleted!')
    })
    .catch(error => {
        console.error(error)
    })
})

app.listen(process.env.PORT || PORT, (req, res) => {
    console.log(`Server Running on Port ${PORT}`)
})