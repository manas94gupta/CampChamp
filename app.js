var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    localPassport = require('passport-local'),
    expressSession = require('express-session'),
    Campsite = require('./models/campsite'),
    Comment = require('./models/comment'),
    User = require('./models/user'),
    seedDB = require('./seeds');

// connect to the database
mongoose.connect('mongodb://localhost/camp_champ');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
seedDB();

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

// landing page route
app.get('/', function(req, res) {
    res.render('index');
});

// campsites route which displays all the campsites
app.get('/campsites', function(req, res) {
    // get all campsites from the database
    Campsite.find({}, function(err, allCampsites) {
        if(err) {
            console.log(err);
        } else {
            res.render('campsites/campsites', {campsites: allCampsites});
        }
    });
});

// Add new campsites route
app.get('/campsites/new', isLoggedIn, function(req, res) {
    res.render('campsites/addcamp');
});

// post request to add new campsites
app.post('/campsites', isLoggedIn, function(req, res) {
    // get form data
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampsite = {name: name, image: image, description: desc};
    // create new campsite and to database
    Campsite.create(newCampsite, function(err, campsite) {
        if(err) {
            console.log(err);
        } else {
            // redirect to /campsites route
            res.redirect('/campsites');
        }
    });
});

// Show info about the selected campsite
app.get('/campsites/:id', function(req, res) {
    // find the campsite with provided id
    Campsite.findById(req.params.id).populate('comments').exec(function(err, foundCampsite) {
        if(err) {
            console.log(err);
        } else {
            // render show template with that campsite
            res.render('campsites/show', {campsite: foundCampsite});
        }
    });
});

//  Add new comments to a campsite
app.get('/campsites/:id/comments/new', isLoggedIn, function(req, res) {
    // find camp site by id
    Campsite.findById(req.params.id, function(err, campsite) {
        if(err) {
            console.log(err);
        } else {
            res.render('comments/addcomment', {campsite: campsite});
        }
    });
});

// post request to add comment
app.post('/campsites/:id/comments', isLoggedIn, function(req, res) {
    // find camp site by id
    Campsite.findById(req.params.id, function(err, campsite) {
        if(err) {
            console.log(err);
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if(err) {
                    console.log(err);
                } else {
                    campsite.comments.push(comment);
                    campsite.save();
                    res.redirect('/campsites/' + campsite._id);
                }
            });
        }
    });
});

// Authentication routes

// show register form
app.get('/register', function(req, res) {
    res.render('register');
});

// post request to register user
app.post('/register', function(req, res) {
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
app.get('/login', function(req, res) {
    res.render('login');
});

// post request to login user
app.post('/login', passport.authenticate('local',
{
    successRedirect: '/campsites',
    failureRedirect: '/login'
}), function(req, res) {
});

// logout route
app.get('/logout', function(req, res) {
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

// Serves on port 3000
app.listen('3000', function() {
    console.log('Camp Champ serving on port 3000');
});
