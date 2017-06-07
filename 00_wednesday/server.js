//reference to the express code
var express = require('express');

//this is our server
var app = express();

var port = 2046;

//i.e. start the server
app.listen(port, function(){
  console.log('server is running');
});

app.get('/', function(request, response, error){
  //client side
  response.send("welcome to our api");
});



// get a HTML page
// parse the contents of that page

var request = require('request');
var cheerio = require('cheerio');

function fetchWebpage(){
  //this is the url we want to request
  var url = 'https://newyork.craigslist.org/search/mis';

  request(url, function(error, response, body){
    console.log('requesting: '+url);

    if(error){
      console.log(error);
    }
    //load the HTML body that we got back
    //from request into cheerio
    var $ = cheerio.load(body);



    //we start looking for titles and hoods
    var titles = [];
    var areas = [];
    var ages = [];

    $('.result-title').each(function(index, element){
        titles[index] = $(element).text();
    });

    $('.result-hood').each(function(index, element){
        areas[index] = $(element).text();
    });

    console.log(areas);

  });
}





fetchWebpage();







//---
