var express = require('express');
var app = express();

var port = 2046;

app.listen(port, function(){
	console.log('server running on port', port);
});

app.get('/', function(request, response, error){
	console.log('requested main endpoint');
	response.send('here is the main endpoint');
});

app.get('/life', function(request, response, error){
	console.log('requested the /life endpoint');

	//if the user requests something by adding a query, we can access that inside the request variable
	//a query looks like '?query=value
	//so if you run the script and go to 'localhost:2046/life?duration=12'
	
	//the line below should print out only what the user wants
	console.log(request.query);

	//we can then vary our response based on the query!
	if(request.query == null){
		response.send('here is the /life endpoint, with no query');
	}else if(request.query.duration != null){
		response.send('does life really only last for '+ request.query.duration+ ' seconds?');
	}else{
		response.send('here is the /life endpoint, but your query is invalid');
	}
});

