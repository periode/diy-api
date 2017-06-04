var express = require('express');
var app = express();
var port = 2046;

app.listen(port, function(){
	console.log('server started successfully on port', port, 'please visit localhost:'+port,'to get content served');
});

app.get('/', function(request, response){
	response.send('hey there!');
});

app.get('/content', function(request, response){
	response.sendFile(__dirname + '/index.html');
});


var request = require('request');

function fetchWebpage(url){
	console.log('fetching', url, '...');
	request(url, function(error, response, body){
		console.log('did we get an error?', error);
		console.log('----');
		console.log('what are the details of our response?', response.statusCode);
		console.log('----');
		console.log('since we request a whole html page, might as well display it:');
		console.log(body);
		console.log('...DONE!');
	});
}

var myURL = 'http://yoo.ooo';

fetchWebpage(myURL);
