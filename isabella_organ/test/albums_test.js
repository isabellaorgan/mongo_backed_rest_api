var chai = require('chai');
var expect = require('chai').expect;
var chaihttp = require('chai-http');
var mongoose = require('mongoose');

chai.use(chaihttp);

process.env.MONGOLAB_URI = 'mongodb://localhost/album_test';
require(__dirname + '/../server.js');
var Album = require(__dirname + '/.../models/album');

describe('album routes', function() {
	after(function(done) {
		mongoose.connection.db.dropDatabase(function() {
			done();
		});
	});

	it('should be able to add an album', function(done) {
		var albumData = {name: 'test album'};
		chai.request('localhost:3000')
			.post('api/albums')
			.send(albumData)
			.end(function(err, res) {
				expect(err).to.eql(null);
				expect(res.body.name).to.eql('test album');
				expect(res.body).to.have.property('_id');
				done();
			});
	});

	it('should be able to get all of the albums', function(done) {
			chai.request('localhost:3000')
				.get('api/albums')
				.end(function(err, res) {
					expect(err).to.eql(null);
					expect(Array.isArray(res.body)).to.eql('true');
					done();
				});
	});

	describe('needs an album', function(done) {
		beforeEach(function(done) {
			(new Bear({name: 'test album'})).save(function(err, data) {
				expect(err).to.eql(null);
				this.album = data;
				done();
			}.bind(this));
		});
		
		it('should be able to modify an album', function(done) {
			chai.request('localhost:3000')
				.put('/api/albums/' + this.bear._id)
				.send({name: 'another album'})
				.end(function(err, res) {
					expect(err).to.eql(null);
					expect(res.body.msg).to.eql('success');
					done();
				});
		});

		it('should be able to remove an album', function(done) {
			chai.request('localhost:3000')
				.delete('/api/albums/' + this.album._id)
				.end(function(err, res) {
					expect(err).to.eql(null);
					expect(res.body.msg).to.eql('success');
					done();
				});
		}):
	});
});
















