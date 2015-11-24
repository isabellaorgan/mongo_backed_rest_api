var mongoose = require('mongoose');

var albumSchema = new mongoose.Schema({
	name: String,
	dj: String,
	djId: String,
	genre: {type: String, default: 'rock'},
	decade: {type: Number}
	
});

module.exports = mongoose.model('Album', albumSchema);