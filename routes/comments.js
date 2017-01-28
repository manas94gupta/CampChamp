var express = require('express'),
    Campsite = require('../models/campsite'),
    Comment = require('../models/comment'),
    middleware = require('../middleware');
var router = express.Router();

//  Add new comments to a campsite
router.get('/campsites/:id/comments/new', middleware.isLoggedIn, function(req, res) {
    // find camp site by id
    Campsite.findById(req.params.id, function(err, campsite) {
        if(err) {
            // console.log(err);
            req.flash('error', 'Something went wrong. Try again later.');
        } else {
            res.render('comments/addcomment', {campsite: campsite});
        }
    });
});

// post request to add comment
router.post('/campsites/:id/comments', middleware.isLoggedIn, function(req, res) {
    // find camp site by id
    Campsite.findById(req.params.id, function(err, campsite) {
        if(err) {
            // console.log(err);
            req.flash('error', 'Something went wrong. Try again later.');
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if(err) {
                    // console.log(err);
                    req.flash('error', 'Something went wrong. Try again later.');
                } else {
                    // add author name and id to the comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();

                    // add comment to the campsite
                    campsite.comments.push(comment);
                    campsite.save();

                    req.flash('success', 'Successfully Added Comment!');
                    res.redirect('/campsites/' + campsite._id);
                }
            });
        }
    });
});

// edit comment route
router.get('/campsites/:id/comments/:comment_id/edit', middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err) {
            // console.log(err);
            req.flash('error', 'Something went wrong. Try again later.');
            res.redirect('back');
        } else {
            res.render('comments/edit', {campsite_id: req.params.id, comment: foundComment});
        }
    });
});

// put request to edit comment
router.put('/campsites/:id/comments/:comment_id', middleware.checkCommentOwnership, function(req, res) {
    // find by id and update
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if(err) {
            // console.log(err);
            req.flash('error', 'Something went wrong. Try again later.');
            res.redirect('back');
        } else {
            req.flash('success', 'Successfully Edited Comment!');
            res.redirect('/campsites/' + req.params.id);
        }
    });
});

// delete request to destroy a comment
router.delete('/campsites/:id/comments/:comment_id', middleware.checkCommentOwnership, function(req, res) {
    // find by id and remove
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if(err) {
            // console.log(err);
            req.flash('error', 'Something went wrong. Try again later.');
            res.redirect('back');
        } else {
            req.flash('success', 'Comment Deleted!');
            res.redirect('back');
        }
    });
});

module.exports = router;
