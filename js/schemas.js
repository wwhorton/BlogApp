var mongoose = require('mongoose');

//Schemas for posts and users
var postSchema = mongoose.Schema({
    title: String,
    user: String,
    body: String,
    date: { type: Date, default: Date.now }
});

var userSchema = mongoose.Schema({
    username: String,
    password: String
});

//Create models for posts and users
var Post = mongoose.model('Post', schemas.postSchema);
var User = mongoose.model('User', schemas.userSchema);


//Export the models
exports.Post = Post;
exports.User = User;