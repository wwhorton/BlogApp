var express = require('express');
var app = express();
var db = require('./js/db.js');
var schemas = require('./js/schemas.js');


app.use(express.bodyParser());
     
app.get('/', function(request, response){
        /* Return every post
          
        1. Query database with wildcard
        2. For each post, create post object
        3. Create view for each post
        4. Display each view
                
        */
        schemas.Post.find(function(err, posts){
            if (err) return console.error.bind(console, "List All error:");
            
            if (posts != []) {
                console.log("Something in query object!");
                for (var key in posts){
                    console.log(key + ": " + posts); //Placeholder for actual processing
                }
            } else {
                console.log("Query results empty.");
            }
        });
        
        response.sendfile(__dirname + '/index.html');
        
    });

  
app.post('/', function(request, response){
    var newPost = new schema.Post({title: request.body.title, user: request.body.user, date: Date.now, body: request.body.body});
    newPost.save(function(err, newPost, updated){
        if (err) return console.error.bind(console, "Problem saving " + newPost.id + ": ");
        });
        
    response.sendfile(__dirname + '/index.html');
});

/*  
    
app.get('/user/:name', function(request, response){
    blog.find({'name': request.params.name}).toArray(function(err, docs){
        response.json(docs);
    });
});
*/
app.listen(process.env.PORT);

    