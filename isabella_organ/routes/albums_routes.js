var express = require('express');
var bodyParser = require('body-parser');
var Album = require(__dirname + '/../models/album');
var handleError = require(__dirname + '/../lib/handleServerError');
var eatAuth = require(__dirname + '/../lib/eat_auth');

var albumsRouter = module.exports = exports = express.Router();

albumsRouter.get('/albums', function(req, res) {
	Album.find({}, function(err, data) {
		if (err) return handleError(err, res);

			res.send(data);
	});
});

albumsRouter.put('/albums/:id', bodyParser.json, eatAuth, function(req, res) {
	var albumData = req.body;
	delete albumData._id;
	Album.update({_id: req.params.id}, albumData, function(err) {
		if (err) return handleError(err, res);

		res.send({msg: 'updated'});
	});
});

albumsRouter.delete('/albums/:id', function(req, res) {
	Album.remove({_id: req.params.id}, function(err) {
		if (err) return handleError(err, res);
		
		res.send({msg: 'album used as frisbee'});
	});
});
