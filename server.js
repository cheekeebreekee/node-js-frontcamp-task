const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
const logger = require('morgan');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 8000;

let accessLogStream = fs.createWriteStream(path.join(__dirname, 'app/access.log'), {flags: 'a'});
app.use(logger('combined', {stream: accessLogStream}));

app.use(bodyParser.urlencoded({extened:true}));

MongoClient.connect(db.url,(err,database) =>{
    if (err) return console.log(err)
    require('./app/routes')(app, database);
    app.listen(port,() => {
        console.log(`We are live on :${port} port`); 
    });
})