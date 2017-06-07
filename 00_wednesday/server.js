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
var fs = require('fs');

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
    var url = [];
    var areas = [];

    var data_to_be_saved = {
      'all_listings': []
    };

    $('.result-title').each(function(index, element){
        titles[index] = $(element).text();
        url[index] = $(element).attr('href');
        areas[index] = url[index].slice('1', '4');

        var listing = {
          'name': titles[index],
          'link': url[index],
          'hood': areas[index]
        };

        data_to_be_saved.all_listings.push(listing);


    });

    //now we give that data to the function that is going to write it to disk
    writeToDisk(data_to_be_saved);

  });
}


function writeToDisk(data){
  var writeable_data = JSON.stringify(data);

  fs.writeFile('data/listings.json', writeable_data, function(){
    console.log('successfully written to disk!');
  });
}











fetchWebpage();







//---
