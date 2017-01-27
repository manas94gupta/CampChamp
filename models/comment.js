var mongoose = require('mongoose');

// comment schema setup
var commentSchema = mongoose.Schema({
    text: String,
    author: String
});

module.exports = mongoose.model('Comment', commentSchema);
