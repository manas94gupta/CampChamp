var express = require('express'),
    Campsite = require('../models/campsite');
var router = express.Router();

// campsites route which displays all the campsites
router.get('/campsites', function(req, res) {
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
router.get('/campsites/new', isLoggedIn, function(req, res) {
    res.render('campsites/addcamp');
});

// post request to add new campsites
router.post('/campsites', isLoggedIn, function(req, res) {
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
router.get('/campsites/:id', function(req, res) {
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

// check if user is logged in
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;