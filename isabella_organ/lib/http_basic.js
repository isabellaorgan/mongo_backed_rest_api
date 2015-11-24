module.exports = exports = function(req, res, next) {
		var authString = (req.headers.authorization || ' :').split(' ')[1];
		var basicBuffer = new Buffer(authString, 'base64');
		var authArray = basicBuffer.toString('utf8');
		var basicString = authArray.split(':');
		req.auth = {
			username: basicString[0],
			password: basicString[1]
		};

		if(!(req.auth.username.length && req.auth.password.length)) {
			console.log('Could not authenticat ' + req.auth.username);
			return res.status(401).send({msg: 'authentiCat seyzzz no!!1'});
		}
		next();
	
};
