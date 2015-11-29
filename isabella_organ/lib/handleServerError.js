module.exports = exports = function(err, res) {
	console.log(err);
	res.status(500).send({msg: 'server error'});
};