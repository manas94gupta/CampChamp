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
            // console.log(err);
            req.flash('error', err.message);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function() {
            req.flash('success', 'Welcome to CampChamp' + user.username);
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
    req.flash('success', 'Logged You Out!');
    res.redirect('/campsites');
});

module.exports = router;
