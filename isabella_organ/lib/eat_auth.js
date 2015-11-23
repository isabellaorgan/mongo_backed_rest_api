var eat = require ('eat');
var User = require(__dirname + '/../models/user');
//var handleError = require(__dirname + '/handleServerError');

module.exports = exports = function(req, res, next) {
	var token = req.headers.token || (req.body)? req.body.token : '';
	if (!token) {
		console.log('no token');
		return res.status(401).json({msg: 'AuthentiCat seyezzz noeee and is wacthing you!!'});
	}

	eat.decode(token, process.env.APP_SECRET, function(err, token) {
		if (err) {
			console.log(err);
			return res.status(401).json({msg: 'AuthentiCat seyezzz noeee!!'});
		}
	});

	User.findOne({_id: decoded.id}, function(err, user) {
		if (err) {
			console.log(err);
			return res.status(401).json({msg: 'AuthentiCat seyszzz noeee!!'});
		}

		if (!user) {
			req.user = user;
			next();
		}
	});
};
