
var db = require('../js/db.js');
var mongoose = require('mongoose');
var express = require('express');

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

function checkLogin(request, reponse, next){
    if (request.user){
        next();
    } else {
    request.flash('error', 'You must be logged in first.');
    response.redirect('/');
    }
}