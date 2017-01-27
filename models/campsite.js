var mongoose = require('mongoose');

// campsite schema setup
var campsiteSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

module.exports = mongoose.model('Campsite', campsiteSchema);
