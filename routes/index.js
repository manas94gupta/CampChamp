var express = require('express'),
    passport = require('passport'),
    User = require('../models/user');
var router = express.Router();

// landing page route
router.get('/', function(req, res) {
    res.render('index');
});

// Authentication routes

// show register form
router.get('/register', function(req, res) {
    res.render('register');
});

// post request to register user
router.post('/register', function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function() {
            res.redirect('/campsites');
        });
    });
});

// show login form
router.get('/login', function(req, res) {
    res.render('login');
});

// post request to login user
router.post('/login', passport.authenticate('local',
{
    successRedirect: '/campsites',
    failureRedirect: '/login'
}), function(req, res) {
});

// logout route
router.get('/logout', function(req, res) {
    // passport method
    req.logout();
    res.redirect('/campsites');
});

// check if user is logged in
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;
