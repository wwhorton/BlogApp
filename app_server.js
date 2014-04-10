var express = require('express');
var app = express();
var partials = require('express-partials');
var db = require('./js/db.js');
var Schemas = require('./js/schemas.js');
var Post = require('./js/Post.js');

app.use(express.bodyParser());
app.use(partials());

app.set('view engine', 'ejs');
app.set('views', __dirname + '/templates');     

app.get('/', function(request, response){
        Schemas.Post.find(function(err, posts){
            if (err) return console.error.bind(console, "List All error:");
            if (posts != []) {
                response.render('post', {posts:posts}); 
                
            } else {
                console.log("Query results empty.");
            }
        });
    });

  
app.post('/submit', function(request, response){
    var newPost = new Schemas.Post({title: request.body.title, user: request.body.user, body: request.body.body});
    newPost.save(function(err, newPost, updated){
        if (err) return console.error.bind(console, "Problem saving.");
        });
        
    response.redirect('/');
});

/*  
    
app.get('/user/:name', function(request, response){
    blog.find({'name': request.params.name}).toArray(function(err, docs){
        response.json(docs);
    });
});
*/
app.listen(process.env.PORT);

    