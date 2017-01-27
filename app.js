var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Campsite = require('./models/campsite');
    seedDB = require('./seeds');

seedDB();

mongoose.connect('mongodb://localhost/camp_champ');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

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
            res.render('campsites', {campsites: allCampsites});
        }
    });
});

// post request to add new campsites
app.post('/campsites', function(req, res) {
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

// Add new campsites route
app.get('/campsites/new', function(req, res) {
    res.render('addcamp');
});

// Show info about the selected campsite
app.get('/campsites/:id', function(req, res) {
    // find the campsite with provided id
    Campsite.findById(req.params.id, function(err, foundCampsite) {
        if(err) {
            console.log(err);
        } else {
            // render show template with that campsite
            res.render('show', {campsite: foundCampsite});
        }
    });
});

// Serves on port 3000
app.listen('3000', function() {
    console.log('Camp Champ serving on port 3000');
});
