var mongoose = require('mongoose'),
    	passportLocalMongoose = require('passport-local-mongoose');

var userSchema = mongoose.Schema({
    username: String,
    password: String
});

// add passport-local-mongoose methods to user schema
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
