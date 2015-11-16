var mongoose = require('mongoose');
var express = require('express');
var app = express();
var albumsRouter = require(__dirname + '/routes/albums_routes.js');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/album_stream_dev');
process.env.APP_SECRET = process.env.APP_SECRET || 'changemechangemechangeme';

var albumsRouter = require(__dirname + '/routes/albums_routes');
var usersRouter = require(__dirname + '/routes/users_routes');

app.use('/api', albumsRouter);
app.use('/api', usersRouter);

var port = process.env.PORT || 3000;
app.listen(function() {
	console.log('server up on port: ' + port);
});


