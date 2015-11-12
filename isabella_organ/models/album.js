var mongoose = require('mongoose');
var validator = require(__dirname + '/../lib/validate.js');
var schema = new mongoose.Schema({
	name: {type: String, validate: [validator.String, "The name cannot be undefined"]},
	genre: {type: String, validate: [validator.String, "The genre cannot be undefined"], default: 'rock'},
	decade: {type: String, validate: [validator.String, "The decade cannot be undefined"], default: 'seventies'}
});

module.exports = mongoose.model('Album', 'albumSchema');