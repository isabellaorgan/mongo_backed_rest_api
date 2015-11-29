var eat = require ('eat');
var User = require(__dirname + '/../models/user');
var handleError = require(__dirname + '/handleServerError');

module.exports = exports = function(req, res, next) {
	var encryptedToken = req.headers.token || ((req.body) ? req.body.token : undefined);
	if (!encryptedToken) {
		console.log('no token');
		return res.status(401).json({msg: 'AuthentiCat seyezzz noeee and is watching you!!'});
	}

	eat.decode(encryptedToken, process.env.APP_SECRET, function(err, token) {
		if (err) handleError(err, res);


		User.findOne({_id: token.id}, function(err, user) {
			if (err) handleError(err, res);
			if(!user) return res.status(401).json({msg: 'AuthentiCat seyszzz noeee!!'});
			req.user = user;
			next();
			
		});
	});
};
