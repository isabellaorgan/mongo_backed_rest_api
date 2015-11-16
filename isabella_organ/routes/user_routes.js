var express = require('express');
var User = require (__dirname + '/..models/user');
varjsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');

var usersRouter = module.exports = exports = express.Router();

usersRouter.post('/signup', function(res, req){
	var newUser = new User();
	newUser.basic.username = req.body.username;
	newUser.username = req.body.username;
	newUser.generateHash(req.body.password, function(err, hash) {
		if (err) return handleError(err, res);
		newUser.save(function(err, data) {
			if (err) return handleError(err, res);
			newUser.generateToken(function(err, token) {
				if (err) return handleError(err, res);
				res.json({token: token});
			});
		});
	});
});