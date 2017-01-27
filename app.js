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
