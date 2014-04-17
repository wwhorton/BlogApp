var express = require('express');
var app = express();
var partials = require('express-partials');
var db = require('./js/db.js');
var Schemas = require('./js/schemas.js');
var Post = require('./js/Post.js');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

app.configure(function(){
    app.use(express.bodyParser());
    app.use(partials());
    app.use(flash());
    app.use(express.static(__dirname));
    app.use(express.cookieParser());
    app.use(express.session({secret: 'rea1ly very Secret phRase'}));
    app.use(passport.initialize());
    app.use(passport.session());
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/templates');     

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    Schemas.User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        console.log("Bad username.");
        return done(null, false, { messages: 'Incorrect username.' });
      }
      if (user.password != password) {
        console.log("Bad password.");
        return done(null, false, { messages: 'Incorrect password.' });
      }
      console.log("Logged in.");

      return done(null, user);
    });
  }
));

// Main page; display all posts
app.get('/', function(request, response){
    if (request.session.passport.user){
        app.locals.user = request.session.passport.user;
    };
    Schemas.Post.find().sort(' -date ').exec(function(err, posts){
        if (err) return console.log(err);
        if (posts != []) {
            response.render('post', {posts:posts}); 
        } else {
            console.log("Query results empty.");
        }
    });
});

// Create new post
var flashOptions = { failureFlash: "You must be logged in to post." };
app.post('/', passport.authenticate('session', flashOptions), function(request, response){
    var newPost = {
        title: request.body.title, 
        username: request.session.passport.user.username, 
        body: request.body.body
    };
    Schemas.Post.create( newPost, function(err){
        if (err) return console.log("Problem saving.");
    });
    response.redirect('/');      
});

// Edit and update existing post
var flashOptions = { failureFlash: "You must be logged in to edit a post." };
app.put('/', passport.authenticate('session', flashOptions), function(request, response){
    
    var updateValues = {
        title: request.body.title,
        body: request.body.body,
        date: Date.now()
    };
    
    Schemas.Post.findByIdAndUpdate( request.body._id, updateValues, function(doc){
        response.end();
    });
});

// Delete post
var flashOptions = {    successFlash: "Authenticated successfully.",
                        failureFlash: "You must be logged in to delete a post."
                   };
app.delete('/', passport.authenticate('session', flashOptions), function(request, response){ 
    Schemas.Post.findOneAndRemove({_id: request.body._id}, function(doc){
        response.end();
    });
});

// Authentication routes

app.post('/login', passport.authenticate('local', { failureFlash: true
                                                  })
);

app.get('/logout', function(request, response){
    request.session.destroy();
    app.locals.user = null;
    response.redirect('/');
});

app.post('/newUser', function(request, response){
    var newUser = {
                    username: request.body.data.username,
                    password: request.body.data.password
    };
    Schemas.User.create( newUser, function(err){
            if (err) return console.log(err);
    });
    response.end();    
});

app.listen(process.env.PORT);

    