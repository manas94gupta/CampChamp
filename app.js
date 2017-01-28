var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    localPassport = require('passport-local'),
    expressSession = require('express-session'),
    flash = require('connect-flash'),
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
app.use(flash());

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
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use(indexRoutes);
app.use(campsiteRoutes);
app.use(commentRoutes);

// if heroku then let it set port else port be 3000
var port = process.env.PORT || 3000;
// Serves on port 3000
app.listen(port, function() {
    console.log('Camp Champ serving on http://localhost:' + port);
});
