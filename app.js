var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index');
})

app.get('/campsites', function(req, res) {
    res.render('campsites');
})

app.listen('3000', function() {
    console.log('Camp Champ serving on port 3000');
});
