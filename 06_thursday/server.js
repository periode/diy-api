var Express = require('express');
var cheerio = require('cheerio');
//this is where we declare our server
var server = Express();

var port = 2046;

server.use(Express.static(__dirname + "/public"));

server.listen(port, function(){
  console.log('i am listening on port',port);
});














////
