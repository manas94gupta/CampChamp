var mongoose = require('mongoose'),
    Campsite = require('./models/campsite');

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
        seedData.forEach(function(seed) {
            Campsite.create(seed, function(err, data) {
                if(err) {
                    console.log(err);
                } else {
                    console.log('New Camp Site added');
                }
            });
        });
    });
}

module.exports = seedDB;
