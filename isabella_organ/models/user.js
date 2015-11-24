var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var eat = require('eat');

var userSchema = new mongoose.Schema({
	username: String,
		basic: {
			username: String,
			password: String
		}
});

userSchema.methods.hashPassword = function(password, cb) {
		bcrypt.hash(password, 8, function(err, hash) {
			if (err) return cb(err);
			this.basic.password = hash;
			cb(null, hash);
		}.bind(this));
};

userSchema.methods.checkPassword = function(password, cb) {
	bcrypt.compare(password, this.basic.password, cb);
};

userSchema.methods.generateToken = function(callback) {
	eat.encode({id: this._id}, process.env.APP_SECRET, callback);
};

module.exports = mongoose.model('User', userSchema);
