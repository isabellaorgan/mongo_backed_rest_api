var mongoose = require('mongoose');
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/album_stream_dev';
var tempAppSecret = 'WhyDoesThisNeedToBeChanged';
var albumsRouter = require(__dirname + '/routes/albums_routes');
var usersRouter = require(__dirname + '/routes/users_routes');
var authRouter = require(__dirname + '/routes/non_crud_routes');

process.env.APP_SECRET = process.env.APP_SECRET || tempAppSecret ;

mongoose.connect(mongoURI);

app.use('/', authRouter);
app.use('/api', albumsRouter);
app.use('/api', usersRouter);

app.listen(port, function() {
	console.log('server up on port: ' + port);

	if (process.env.APP_SECRET === tempAppSecret) {
		console.log('You should have changed this', process.env.APP_SECRET);
	}
});
