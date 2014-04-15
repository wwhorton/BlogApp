var express = require('express');
var app = express();
var partials = require('express-partials');
var db = require('./js/db.js');
var Schemas = require('./js/schemas.js');
var Post = require('./js/Post.js');
var Flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

app.configure(function(){
    app.use(express.bodyParser());
    app.use(partials());
    app.use(Flash());
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
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password != password) {
        console.log("Bad password.");
        return done(null, false, { message: 'Incorrect password.' });
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
        Schemas.Post.find(function(err, posts){
            if (err) return console.error.bind(console, "List All error:");
            if (posts != []) {
                response.render('post', {posts:posts, message: request.flash('message') }); 
            } else {
                console.log("Query results empty.");
            }
        });

});

// Create new post    
app.post('/', passport.authenticate('session'), function(request, response){
    var newPost = new Schemas.Post({title: request.body.title, username: request.body.username, body: request.body.body});
    newPost.save(function(err, newPost, updated){
        if (err) return console.log("Problem saving.");

        });
    response.redirect('/');      
});


// Edit and update existing post
app.put('/', passport.authenticate('session'), function(request, response){  
    Schemas.Post.findOne({_id: request.body._id}, function(error, doc){
        doc.title = request.body.title;
        doc.body = request.body.body;
        doc.username = request.body.username;
        doc.date = Date.now;
        doc.save();
        if(error) console.log(error);
            
    });
    response.end();
});



// Delete post
app.delete('/', passport.authenticate('session'), function(request, response){ 
    var thisPost = Schemas.Post.findOne({title: request.body.title, username: request.body.username, body: request.body.body});
    //if(request.body.username == request.user.username){
        thisPost.remove(thisPost, function(error){
            if (error) console.log("Could not delete post.");
 
        });
    //}
    
});

// Authentication routes

app.post('/login', passport.authenticate('local', { 
                                                    successRedirect: '/',
                                                    failureRedirect: '/',
                                                    failureFlash: true
                                                  })
);



app.get('/logout', function(request, response){
    request.session.destroy();
    app.locals.user = null;
    response.redirect('/');
});

app.post('/newUser', function(request, response){
    var newUser = new Schemas.User({username: request.body.data.username, password: request.body.data.password});
    //Check if username is taken; if so, include an error msg in the flash, if not, save. Redirect in either cases.
    
    newUser.save(function(err, newUser){
            console.log("Saving new user.");
            if (err) return console.error.bind(console, "Problem saving.");
                response.redirect('/');
        });
});


app.listen(process.env.PORT);

    