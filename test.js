var request = require('supertest');
var app = require('./app');

describe('Request to the root path', function(){
	it('Returns a 200 status code', function(done){
		request(app)
			.get('/')
			.expect(200)
			.end(function(error) {
				if(error) throw error;
				done();
			});
	});
});

describe('Listing cities on /cities', function(){
	it('returns 200 status code', function(done){
		request(app)
			.get('/cities')
			.expect(200, done);
	});

	it('Returns a HTML format', function(done) {
		request(app)
			.get('/')
			.expect('Content-Type', 'text/html; charset=UTF-8', done);
	});

	it('Returns an index file with Cities', function(done){
		request(app)
			.get('/')
			.expect(/cities/i, done)
	});

	it('Returns JSON format', function(done){
		request(app)
			.get('/cities')
			.expect('Content-type', /json/, done);
	});

	it('Returns initial cities', function(done){
		request(app)
			.get('/cities')
			.expect(JSON.stringify(['Lotopia', 'Caspiana', 'Indigo']), done)
	});
});

