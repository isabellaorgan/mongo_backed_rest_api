var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var mongoose = require('mongoose');
var Album = require(__dirname + '/../models/album');
var User = require(__dirname + '/../models/user');

process.env.MONGOLAB_URI = 'mongodb://localhost/album_test';
require(__dirname + '/../server.js');

describe('album routes', function() {
	after(function(done) {
		mongoose.connection.db.dropDatabase(function() {
			done();
		});
	});

	it('should be able to add an album', function(done) {
		var albumData = {name: 'test album', genre: 'unknown', decade: 'unknown'};
		chai.request('localhost:3000')
			.post('api/albums')
			.send({albumData: 'test album', token: this.token})
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body.name).to.eql('test album');
				expect(res.body.genre).to.eql('unknown');
				expect(res.body.decade).to.eql('unknown');
				expect(res.body).to.have.property('_id');
				done();
			});
	});

	it('should be able to collect all of the albums', function(done) {
			chai.request('localhost:3000')
				.get('api/albums')
				.end(function(err, res) {
					expect(err).to.eql(null);
					expect(Array.isArray(res.body)).to.eql('true');
					done();
				});
	});
});

	describe('listen to an album', function(done) {
		beforeEach(function(done) {
			(new Album({name: 'test album', genre: 'unknown', decade: 'unknown'})).save(function(err, data) {
				expect(err).to.eql(null);
				this.album = data;
				done();
			}.bind(this));
		});
		
	});

