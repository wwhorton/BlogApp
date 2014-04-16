var mongoose = require('mongoose');

//Schemas for posts and users
var postSchema = mongoose.Schema({
    title: String,
    username: String,
    body: String,
    date: { type: Date, default: Date.now }
});

var userSchema = mongoose.Schema({
    username: { type: String,
                unique: true
              },
    password: String
});

//Create models for posts and users
var Post = mongoose.model('Post', postSchema);
var User = mongoose.model('User', userSchema);


//Export the models
exports.Post = Post;
exports.User = User;