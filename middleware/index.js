var Campsite = require('../models/campsite'),
    Comment = require('../models/comment');

// all middleware methods

var middlewareObj = {
    // check if user has created the campsite
    checkCampsiteOwnership: function(req, res, next) {
        if(req.isAuthenticated()) {
            Campsite.findById(req.params.id, function(err, foundCampsite) {
                if(err) {
                    // console.log(err);
                    req.flash('error', 'Something went wrong. Try again later.');
                    res.redirect('back');
                } else {
                    // check if user owns the campsite
                    if(foundCampsite.author.id.equals(req.user._id)) {
                        next();
                    } else {
                        req.flash('error', "You don't have permission to do that!");
                        res.redirect('back');
                    }
                }
            });
        } else {
            req.flash('error', 'You need to be logged in to do that!');
            res.redirect('back');
        }
    },
    // check if user has created the comment
    checkCommentOwnership: function(req, res, next) {
        if(req.isAuthenticated()) {
            Comment.findById(req.params.comment_id, function(err, foundComment) {
                if(err) {
                    // console.log(err);
                    req.flash('error', 'Something went wrong. Try again later.');
                    res.redirect('back');
                } else {
                    // check if user owns the comment
                    if(foundComment.author.id.equals(req.user._id)) {
                        next();
                    } else {
                        req.flash('error', "You don't have permission to do that!");
                        res.redirect('back');
                    }
                }
            });
        } else {
            req.flash('error', 'You need to be logged in to do that!');
            res.redirect('back');
        }
    },
    // check if user is logged in
    isLoggedIn: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        req.flash('error', 'You need to be logged in to do that!');
        res.redirect('/login');
    }
}

module.exports = middlewareObj;
