var mongoose = require('mongoose');

var albumSchema = new mongoose.Schema({
	name: String,
	genre: {type: String, default: 'rock'},
	decade: {type: String, default: 'seventies'}
});

module.exports = mongoose.model('Album', 'albumSchema');