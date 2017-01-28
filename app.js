var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    localPassport = require('passport-local'),
    expressSession = require('express-session'),
    methodOverride = require('method-override'),
    Campsite = require('./models/campsite'),
    Comment = require('./models/comment'),
    User = require('./models/user'),
    seedDB = require('./seeds');

// require all routes
var indexRoutes = require('./routes/index'),
    campsiteRoutes = require('./routes/campsites'),
    commentRoutes = require('./routes/comments');

// connect to the database
mongoose.connect('mongodb://localhost/camp_champ');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));

// add seed data
// seedDB();

// Authentication and passport configuration
app.use(expressSession({
    secret: 'I am Batman',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localPassport(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware method to pass current user in all the routes
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use(indexRoutes);
app.use(campsiteRoutes);
app.use(commentRoutes);

// Serves on port 3000
app.listen('3000', function() {
    console.log('Camp Champ serving on port 3000');
});
