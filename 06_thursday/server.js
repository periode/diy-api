var Express = require('express');

//this is where we declare our server
var server = Express();


var port = 2046;

server.listen(port, function(){
  console.log('i am listening on port',port);
});

server.get('/', function(request, response, error){
    response.send('hey you are there');
});

server.get('/pretty', function(request, response, error){
  response.sendFile('index.html');
});














////
