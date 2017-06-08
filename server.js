'use strict'

// DEPENDENCIES
var express = require('express'),
		exphbs  = require('express-handlebars'),
		bodyParser = require('body-parser'),
		request = require('request'),
		app = express(),
		port = process.env.PORT || 3000,
		articleRouter  = express.Router();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// MIDDLEWARE
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("bower_components"));
app.use(express.static("node_modules"));
app.use(express.static("public"));

// CONTROLLER
articleRouter.get("/", function(req, res){
	console.log('home controller hit!');

	request.get({
		uri: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
		qs: {
    'api-key': "15ba49ddb52be1a5977eeab9e17fadbd:4:1892542"
  	}
	}, function(err, response, body){
		if (err){
			console.log("uh, oh! Error!");
			response.send('There was an error')
		}
		
		var responseData = JSON.parse(body);
		var data = responseData['response']['docs'];

		res.render('index', {
			name: data[1].section_name
		});

	});
});

app.use('/', articleRouter);

// SERVER
app.listen(port, function(){
	console.log("Server started on", port);
});