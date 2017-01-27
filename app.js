var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/camp_champ');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// campsite schema setup
var campsiteSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campsite = mongoose.model('Campsite', campsiteSchema);

// Hard coded array with some campsites for testing
var campsites = [
    {name: 'Barrens', image: 'https://c1.staticflickr.com/6/5204/5315979822_3591b6509f_b.jpg'},
    {name: 'Desert', image: 'https://c1.staticflickr.com/3/2512/5733464781_8787e851b0_b.jpg'},
    {name: 'Forest', image: 'https://c1.staticflickr.com/7/6188/6054388099_b8e2f57146_b.jpg'},
    {name: 'Riverside', image: 'https://c1.staticflickr.com/3/2540/3839041026_01a3941ffa_b.jpg'}
];

// landing page route
app.get('/', function(req, res) {
    res.render('index');
});

// campsites route which displays all the campsites
app.get('/campsites', function(req, res) {
    res.render('campsites', {campsites: campsites});
});

// post request to add new campsites
app.post('/campsites', function(req, res) {
    // get form data
    var name = req.body.name;
    var image = req.body.image;
    var newCampsite = {name: name, image: image};
    campsites.push(newCampsite);
    // redirect to /campsites route
    res.redirect('/campsites');
});

// Add new campsites route
app.get('/campsites/new', function(req, res) {
    res.render('addcamp');
});

// Serves on port 3000
app.listen('3000', function() {
    console.log('Camp Champ serving on port 3000');
});
