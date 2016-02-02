var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

var redis = require('redis');
var client = redis.createClient();

client.select((process.env.NODE_EN || 'development').length);

client.hset('cities', 'Lotopia', 'description');
client.hset('cities', 'Caspiana', 'description');
client.hset('cities', 'Indigo', 'description');
client.hset('cities', 'Springfield', 'description');


app.get('/cities', function(request, response){
	client.hkeys('cities', function(error, names){
		if(error) throw eror;
		response.json(names);
	});
});

app.post('/cities', urlencode, function(request, response){
	var newCity = request.body;
	if(!newCity.name || ! newCity.description){
		response.sendStatus(400);
		return false;
	}
	client.hset('cities', newCity.name, newCity.description, function(error){
		if(error) throw error;

		response.status(201).json(newCity.name);

	});
});


app.delete('/cities/:name', function(request, response){
	client.hdel('cities', request.params.name, function(error){
			if(error) throw error;
			response.sendStatus(204);
	});
 });

module.exports = app
