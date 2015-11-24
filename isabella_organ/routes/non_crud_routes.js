var express = require('express');
var nonCrudRouter = module.exports = exports = express.Router();

nonCrudRouter.get('/:albums', function(req, res) {
	res.send('Some ' + req.params.albums + ' are fucking awesome.');
});