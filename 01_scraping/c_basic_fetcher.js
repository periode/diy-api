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

//in order to be able to request a webpage, we need to make sure we use the 'request' package
var request = require('request');

//let's define a function that fetches our webpage
function fetchWebpage(url){

	console.log('fetching', url, '...');

	//this is where we actually use the request package to load that webpage
	request(url, function(error, response, body){
		//which, once completed, gives us a possible error
		console.log('did we get an error?', error);
		console.log('----');
		//a possible response status (200 OK, 404 NOT FOUND, 300 REDIRECT, etc.)
		console.log('what are the details of our response?', response.statusCode);
		console.log('----');
		//and then the actual html of that webpage, which we will then go through in order to extract useful information
		console.log('since we request a whole html page, might as well display it:');
		console.log(body);
		console.log('...DONE!');
	});
}

//here we declare the URL we want to fetch
var myURL = 'http://yoo.ooo';
//var myURL = 'https://newyork.craigslist.org/search/mis';

//and then finally we actually call our function, with the URL above
fetchWebpage(myURL);
