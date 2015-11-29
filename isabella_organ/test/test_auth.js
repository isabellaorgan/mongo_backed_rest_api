var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var mongoose = require ('mongoose');
process.env.MONGO_URL = 'mongodb://localhost/albums_test';
require(__dirname + '/../server');
var User = require(__dirname + '/../models/user');
var eatauth = require(__dirname + '/../lib/eat_auth');
var httpBasic = require(__dirname + '/../lib/http_basic');

describe('httpbasic', function() {
	it('should be able to parse http basic auth', function() {
		var req = {
			headers: {
				authorization: 'Basic ' + (new Buffer('testname:testpassword').toString('base64'))
			}
		};

		httpBasic(req, {}, function() {
			expect(typeof req.auth).to.eql('object');
			expect(req.auth.username).to.eql('testname');
			expect(req.auth.password).to.eql('testpassword');
		});
	});
});

describe('auth', function() {
	after(function(done) {
		mongoose.connection.db.dropDatabase(function() {
			done();
		});
	});


	it('should be able to create a user', function(done) {
		chai.request('localhost:3000/api')
			.post('/signup')
			.send({username: 'testname', password: 'testpassword'})
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body.token).to.have.length.above(0);
				done();
			});
	});

	describe('user already in database', function() {
		before(function(done) {
			var user = new User();
			user.username = 'testname';
			user.basic.username = 'testname';
			user.hashPassword('testpassword', function(err, res) {
				if (err) throw err;
				user.save(function(err, data) {
					if (err) throw err;
					user.generateToken(function(err, token) {
						if (err) throw err;
						this.token = token;
						done();
					}.bind(this));
				}.bind(this));
			}.bind(this));
		});

		it('should be able to sign in', function(done) {
			chai.request('localhost:3000/api')
				.get('/signin')
				.auth('testname', 'testpassword')
				.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body.token).to.have.length.above(0);
				done();
			});
		});

		it('should be able to authenticate with eat auth', function(done) {
			var token = this.token;
			var req = {
				headers: {
					token: token
				}
			};

			eatauth(req, {}, function() {
				expect(req.user.username).to.eql('testname');
				done();
			});
		});
	});
});
