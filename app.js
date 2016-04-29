var express = require('express');
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var app = express();
 
// Connection URL 
var url = 'mongodb://localhost:27017/db';
// Use connect method to connect to the Server 
var MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var insertDocuments = function(db, body, callback) {
  var collection = db.collection('documents');
  collection.insert(body, function(err, result) {
    console.log("Inserted a document into the collection");
    callback(result);
  });
};

var findDocuments = function(db, callback) {
  var collection = db.collection('documents');
  collection.find({}).toArray(function(err, docs) {
    console.log("Found the following records");
    console.dir(docs);
    callback(docs);
  });
};

var deleteDocuments = function(db, callback) {
  var collection = db.collection('documents');
  collection.deleteMany ({ }, function(err, result) {
    console.log("Removed all documents");
    callback(result);
  });
};

app.post('/document/', function(req, res){
    MongoClient.connect(url, function(err, db) {
        if(err){ res.status(400).send(); }
        console.log("Connected correctly to server.");
        
        insertDocuments(db, req.body, function(result) {
            res.status(201).send();
            db.close();
        });
    });
});

app.get('/document/', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err){ res.status(400).send(); }
        console.log("Connected correctly to server");
        
        findDocuments(db, function(result) {
            res.status(200).json(result);
            db.close();
        });
    });
});

app.delete('/document/', function(req, res){
    MongoClient.connect(url, function(err, db) {
        if(err){ res.status(400).send(); }
        console.log("Connected correctly to server");
        
        deleteDocuments(db, function() {
            res.status(204).send();
            db.close();
        });
    });
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});