const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const bodyParse = require('body-parser');
const app = express();

const port = 8000;
app.listen(port, () => {
  console.log('We are live on ' + port);
});