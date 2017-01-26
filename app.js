var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index');
})

app.get('/campsites', function(req, res) {
    var campsites = [
        {name: 'Barrens', image: 'https://c1.staticflickr.com/6/5204/5315979822_3591b6509f_b.jpg'},
        {name: 'Desert', image: 'https://c1.staticflickr.com/3/2512/5733464781_8787e851b0_b.jpg'},
        {name: 'Forest', image: 'https://c1.staticflickr.com/7/6188/6054388099_b8e2f57146_b.jpg'},
        {name: 'Riverside', image: 'https://c1.staticflickr.com/3/2540/3839041026_01a3941ffa_b.jpg'}
    ]
    res.render('campsites', {campsites: campsites});
})

app.listen('3000', function() {
    console.log('Camp Champ serving on port 3000');
});
