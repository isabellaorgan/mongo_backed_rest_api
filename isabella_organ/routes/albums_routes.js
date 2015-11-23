var express = require('express');
var bodyParser = require('body-parser');
var Album = require(__dirname + '/../models/album.js');
var handleError = require(__dirname + '/../lib/handleServerError');
var eatAuth = require(__dirname + '/../lib/eat_auth');

var albumsRouter = module.exports = exports = express.Router();

albumsRouter.get('/albums', function(req, res) {
	Album.find({}, function(err, data) {
		if (err) return handleError(err, res);

			res.json(data);
	});
});

albumsRouter.post('/albums', bodyParser.json(), eatAuth, function(req, res) {
	var newAlbum = new Album(req.body);
	newAlbum.author = req.user.username;
	newAlbum.save(function(err, data) {
		if (err) return handleError(err, res);

		res.json(data);
	});
});

albumsRouter.delete('/albums/:id', bodyParser.json(), eatAuth, function(req, res) {
	Album.remove({_id: req.params.id}, function(err) {
		if (err) return handleError(err, res);
		
		res.json({msg: 'album used as frisbee'});
	});
});
