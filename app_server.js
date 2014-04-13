var express = require('express');
var app = express();
var partials = require('express-partials');
var db = require('./js/db.js');
var Schemas = require('./js/schemas.js');
var Post = require('./js/Post.js');
var Passport = require('./js/loginConfig.js');
var Flash = require('connect-flash');

app.configure(function(){
    app.use(express.bodyParser());
    app.use(partials());
    app.use(Flash());
    app.use(express.static(__dirname));
    app.use(express.cookieParser());
    app.use(express.session({secret: 'rea1ly very Secret phRase'}));
    app.use(Passport.initialize());
    app.use(Passport.session());
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/templates');     

// Main page; display all posts
app.get('/', function(request, response){
        Schemas.Post.find(function(err, posts){
            if (err) return console.error.bind(console, "List All error:");
            if (posts != []) {
                response.render('post', {posts:posts, errors: request.flash()}); 
                
            } else {
                console.log("Query results empty.");
            }
        });
    });

// Create new post    
app.post('/', Passport.checkLogin, function(request, response, next){
    var newPost = new Schemas.Post({title: request.body.title, username: request.body.username, body: request.body.body});
    newPost.save(function(err, newPost, updated){
        if (err) return console.error.bind(console, "Problem saving.");
        });
        
    response.redirect('/');
});


// Edit and update existing post
app.put('/', Passport.checkLogin, function(request, response, next){
    var thisPost = Schemas.Post({title: request.body.title, username: request.body.username, body: request.body.body});
    //Check that post's username and session username are the same
    if(request.body.username == request.user.username){
        thisPost.update(thisPost, function(error){
            if (err) return console.error.bind(console, "Could not delete post.");
        });
    }
    response.redirect('/');
});



// Delete post
app.delete('/', Passport.checkLogin, function(request, response, next){
    var thisPost = Schemas.Post({title: request.body.title, username: request.body.username, body: request.body.body});
    //Check that post's username and session username are the same
    if(request.body.username == request.user.username){
        thisPost.remove(thisPost, function(error){
            if (err) return console.error.bind(console, "Could not delete post.");
        });
    }
    response.redirect('/');
});

// Authentication routes

app.post('/login', function(request, response){
    passport.authenticate('local', { successRedirect: '/',
                                    failureRedirect: '/',
                                    failureFlash: true });
});


app.get('/logout', function(request, response){
    request.logout();
    response.redirect('/');
});

app.post('/newUser', function(request, response){
    var newUser = new Schemas.User({username: request.body.username, password: request.body.password});
    
    //Check if username is taken; if so, include an error msg in the flash, if not, save. Redirect in either cases.
    
    if (newUser.findOne( {username: newUser.username} ) ){
        request.flash('error', 'Username already exists.');
    } else {
        newUser.save(function(err, newUser){
            if (err) return console.error.bind(console, "Problem saving.");
        });
    }
        
    response.redirect('/');
});


app.listen(process.env.PORT);

    