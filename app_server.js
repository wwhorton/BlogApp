var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
app.use(express.bodyParser());

var dbURL = "mongodb://admin:June262010@oceanic.mongohq.com:10061/app23902685";

MongoClient.connect(dbURL, function(err, db){
    if(err) {
        console.log("Problem connecting to database:" + err + "\n\nReload the page and try again.");
    } else {
        console.log("Connected to database.\n");
    }
    
    db.createCollection('blog', function(err, collection){   // Create table if it doesn't exist.
        if (err) {
            console.log("Error creating table."); 
        } else {
            console.log("Using table: " + collection.collectionName + "\n");
        }
    });
    var blog = db.collection('blog');

     
    app.get('/', function(request, response){
        response.sendfile(__dirname + '/index.html');
        /*blog.find({}).toArray(function(err, docs){
            response.json(docs);
        });*/
    });
    
    app.post('/', function(request, response){
        var newBlogPost = {'title': request.body.title, 'user': request.body.user, 'date': request.body.date, 'body': request.body.body};
        console.log(newBlogPost);
        blog.insert(newBlogPost, function(err, records){
            console.log("Post added.");
            });
        response.end();
    });
    
    app.get('/user/:name', function(request, response){
        blog.find({'name': request.params.name}).toArray(function(err, docs){
            response.json(docs);
        });
    });

    app.listen(process.env.PORT);
    
});

    