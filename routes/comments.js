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
                    // add author name and id to the comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();

                    // add comment to the campsite
                    campsite.comments.push(comment);
                    campsite.save();

                    res.redirect('/campsites/' + campsite._id);
                }
            });
        }
    });
});

// edit comment route
router.get('/campsites/:id/comments/:comment_id/edit', function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err) {
            console.log(err);
            res.redirect('back');
        } else {
            res.render('comments/edit', {campsite_id: req.params.id, comment: foundComment});
        }
    });
});

// put request to edit comment
router.put('/campsites/:id/comments/:comment_id', function(req, res) {
    // find by id and update
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if(err) {
            console.log(err);
            res.redirect('back');
        } else {
            res.redirect('/campsites/' + req.params.id);
        }
    });
});

// delete request to destroy a comment
router.delete('/campsites/:id/comments/:comment_id', function(req, res) {
    // find by id and remove
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if(err) {
            console.log(err);
            res.redirect('back');
        } else {
            res.redirect('back');
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
