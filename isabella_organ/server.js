var mongoose = require('mongoose');
var express = require('express');
var app = express;
var albumsRouter = require(__dirname + '/routes/albums_routes.js');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/album_dev');

app.use('/api', albumsRouter);

app.listen(process.env.PORT || 3000, function() {
	console.log('server.up');
});


