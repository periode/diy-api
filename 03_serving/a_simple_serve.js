var express = require('express');
var app = express();

var port = 2046;

app.listen(port, function(){
	console.log('server running on port', port);
});

//we can separate the different requests by proving what we call endpoints
//the default endpoint is always '/', which is the equivalent of not writing anything after the IP address or the domain name you want to access
app.get('/', function(request, response, error){
	console.log('requested main endpoint');
	response.send('here is the main endpoint');
});

//for more specific results, you can set up any endpoint you want
//here we set up the /life endpoint, so that anyone can see the content if they go to 'localhost:2046/life'
app.get('/life', function(request, response, error){
	console.log('requested the /life endpoint');
	response.send('here is the /life endpoint');
});

//we can even respond with pure JSON!
app.get('/data', function(request, response, error){
	console.log('requested the /data endpoint');
	
	var myJSON = {
		'hello': 'darkness',
		'my': 'old friend'
	};

	response.json(myJSON);
});
