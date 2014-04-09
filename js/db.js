
//Required modules
var mongoose = require('mongoose');

//Variables needed by db object
var username = "admin";
var password = "June262010";
var dbURL = "mongodb://" + username + ":" + password + "@oceanic.mongohq.com:10061/app23902685";

mongoose.connect(dbURL);

var db = mongoose.connection;

//Event handlers for the connection
db.on('error', console.error.bind(console, 'Connection error:'));
db.on('connected', console.log.bind(console, 'Connected to:'));
db.on('disconnected', console.log.bind(console, 'Disconnected from:'));

//Close connection when app stops
process.on('exit', function(){
    db.close(function(){
        console.log('Connection closed following app exit.');
    });
});   

exports.DB = db;
