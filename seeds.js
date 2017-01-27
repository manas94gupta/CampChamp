var mongoose = require('mongoose'),
    Campsite = require('./models/campsite'),
    Comment = require('./models/comment');

// seed data for testing
var seedData = [
    {
        name: 'Barren Lands',
        image: 'https://c1.staticflickr.com/6/5204/5315979822_3591b6509f_b.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
        name: 'Desert Mesa',
        image: 'https://c1.staticflickr.com/3/2512/5733464781_8787e851b0_b.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
        name: 'Forest Retreat',
        image: 'https://c1.staticflickr.com/7/6188/6054388099_b8e2f57146_b.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }
];

function seedDB() {
    // remove all camsites
    Campsite.remove({}, function(err) {
        if(err) {
            console.log(err);
        }
        console.log('All Camp Sites removed');
        // create and add campsites to db for each seed data
        seedData.forEach(function(seed) {
            Campsite.create(seed, function(err, campsite) {
                if(err) {
                    console.log(err);
                } else {
                    console.log('New Camp Site added');
                    // add a comment to each campsite
                    Comment.create({
                        text: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui.',
                        author: 'Lorem'
                    }, function(err, comment) {
                        if(err) {
                            console.log(err);
                        } else {
                            campsite.comments.push(comment);
                            campsite.save();
                            console.log('Comment added');
                        }
                    });
                }
            });
        });
    });
}

module.exports = seedDB;
