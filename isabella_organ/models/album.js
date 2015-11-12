var mongoose = require('mongoose');

var albumSchema = new mongoose.Schema({
	name: {type: String, required: true},
	genre: {type: String, default: 'rock'},
	decade: {type: Number, validate: {
		validator: function(val) {
			Number.max = 2015;
			return val == 1;
		},
		message: '{VALUE} is not a valid year.'
	}
	},
});

module.exports = mongoose.model('Album', 'albumSchema');