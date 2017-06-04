//here we tell node that we are going to need express for this script
var express = require('express');
//here we declare our server as an instance of express
var app = express();
//and here we decide which port we run on
var port = 2046;

//here we actually run our server, by giving it (1) a port number and (2) a callback function to be executed if the server runs correctly
app.listen(port, function(){
	console.log('server started successfully on port', port, 'please visit localhost:',port,'to get content served');
});

//this is where we listen for incoming requests from our users and we respond to those
//in this particular case, we listen for all requests ('/')
app.get('/', function(request, response){
	//and our callback function sends back some text, saying "hey there!"
	response.send('hey there!');
});

app.get('/content', function(request, response){
	//if the user goes to localhost:2046/content, then we display a regular html file
	response.sendFile(__dirname + '/index.html');
});
