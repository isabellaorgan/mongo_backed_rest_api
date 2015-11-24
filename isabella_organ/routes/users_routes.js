var express = require('express');
var User = require (__dirname + '/../models/user');
var bodyParser = require('body-parser');
var handleError = require(__dirname + '/../lib/handleServerError');
var httpBasic = require(__dirname + '/../lib/http_basic');

var usersRouter = module.exports = exports = express.Router();

var EE = require('events').EventEmitter;
var postEmitter = new EE();
var getEmitter = new EE();

usersRouter.get('/users', function(req, res) {
	User.find({}, function(err, data) {
		if (err) handleError(err, res);
		res.send(data);
	});
});

usersRouter.post('/signup', bodyParser.json(), function(req, res) {
	User.findOne({'username': req.body.username}, function(err, data) {
		if (err) return handleError(err, res);
		if (data && data.basic.username === req.body.username) {
			return console.log('User already in db');
		}
		postEmitter.emit('newUser', req, res);
	});
});

postEmitter.on('newUser', function(req, res) {
	var newUser = new User();
	newUser.basic.username = req.body.username;
	newUser.username = req.body.username;
	postEmitter.emit('one', newUser, req, res);
});

postEmitter.on('one', function(newUser, req, res) {
	newUser.hashPassword(req.body.password, function(err, hash) {
		if (err) return handleError(err, res);
		postEmitter.emit('two', newUser, req, res);
	});
});

postEmitter.on('two', function(newUser, req, res) {
	newUser.save(function(err, data) {
		if (err) return handleError(err, res);
		postEmitter.emit('three', newUser, req, res);
	});
});

postEmitter.on('three', function(newUser, req, res) {
	newUser.generateToken(function(err, token) {
		if (err) return handleError(err, res);
		res.json({token: token});
	});
});

usersRouter.get('/signin', httpBasic, function(req, res) {
	getEmitter.emit('one', req, res);
});

getEmitter.on('one', function(req, res) {
	User.findOne({'basic.username': req.auth.username}, function(err, user) {
		if (err) return handleError(err, res);

		if (!user) {
			console.log('Could not authenticat ' + req.auth.username);
			return res.status(401).json({msg: 'Could not authenticat - Wrong user name?'});
		}
		getEmitter.emit('two', req, res, user);
	});
});

getEmitter.on('two', function(req, res, user) {
	user.checkPassword(req.auth.password, function(err, comparison) {
		if (err) return handleError(err, res);
		if (comparison === false) {
			console.log('Could not authenticat the following: ' + req.auth.username);
			return res.status(401).json({msg: 'Could not authenticat again!'});
		}
		getEmitter.emit('three', req, res, user);
	});
});

getEmitter.on('three', function(req, res, user) {
	user.generateToken(function(err, token) {
		if (err) return handleError(err, res);
		res.json({token: token});
	});
});
