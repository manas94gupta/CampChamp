var express = require('express'),
    Campsite = require('../models/campsite'),
    middleware = require('../middleware');
var router = express.Router();

// campsites route which displays all the campsites
router.get('/campsites', function(req, res) {
    // get all campsites from the database
    Campsite.find({}, function(err, allCampsites) {
        if(err) {
            // console.log(err);
            req.flash('error', 'Something went wrong. Try again later.');
        } else {
            res.render('campsites/campsites', {campsites: allCampsites});
        }
    });
});

// Add new campsites route
router.get('/campsites/new', middleware.isLoggedIn, function(req, res) {
    res.render('campsites/addcamp');
});

// post request to add new campsites
router.post('/campsites', middleware.isLoggedIn, function(req, res) {
    // get form data
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampsite = {name: name, image: image, description: desc, author: author};
    // create new campsite and to database
    Campsite.create(newCampsite, function(err, campsite) {
        if(err) {
            // console.log(err);
            req.flash('error', 'Something went wrong. Try again later.');
        } else {
            req.flash('success', 'Successfully Added Campsite!');
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
            // console.log(err);
            req.flash('error', 'Something went wrong. Try again later.');
        } else {
            // render show template with that campsite
            res.render('campsites/show', {campsite: foundCampsite});
        }
    });
});

// edit campsite route
router.get('/campsites/:id/edit', middleware.checkCampsiteOwnership, function(req, res) {
    Campsite.findById(req.params.id, function(err, foundCampsite) {
        if(err) {
            // console.log(err);
            req.flash('error', 'Something went wrong. Try again later.');
            res.redirect('/campsites');
        } else {
            res.render('campsites/edit', {campsite: foundCampsite});
        }
    });
});

// put request to update campsite
router.put('/campsites/:id', middleware.checkCampsiteOwnership, function(req, res) {
    // find by id and update
    Campsite.findByIdAndUpdate(req.params.id, req.body.campsite, function(err, updatedCampsite) {
        if(err) {
            // console.log(err);
            req.flash('error', 'Something went wrong. Try again later.');
            res.redirect('/campsites');
        } else {
            req.flash('success', 'Successfully Updated Campsite!');
            res.redirect('/campsites/' + req.params.id);
        }
    });
});

// delete request to destroy a campsite
router.delete('/campsites/:id', middleware.checkCampsiteOwnership, function(req, res) {
    Campsite.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            // console.log(err);
            req.flash('error', 'Something went wrong. Try again later.');
            res.redirect('/campsites');
        } else {
            req.flash('success', 'Campsite Deleted!');
            res.redirect('/campsites');
        }
    });
});

module.exports = router;
