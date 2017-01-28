var express = require('express'),
    Campsite = require('../models/campsite');
    Comment = require('../models/comment');
var router = express.Router();

//  Add new comments to a campsite
router.get('/campsites/:id/comments/new', isLoggedIn, function(req, res) {
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
router.post('/campsites/:id/comments', isLoggedIn, function(req, res) {
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

// check if user is logged in
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;
