//reference to the express code
var express = require('express');

//this is our server
var app = express();

var port = 80;

//i.e. start the server
app.listen(port, function(){
  console.log('server is running');
});

app.get('/', function(request, response, error){
  //client side
  response.send("welcome to our api, please visit /all_listings");
});

app.get('/all_listings', function(request, response, error){
  // console.log('user requests all listings');
  var fetched_data;

  fs.readFile('data/listings.json', function(error, data){
    console.log('successfully read file');

    fetched_data = JSON.parse(data);


    //if the user wants the whole thing
    if(request.query.boro == null && request.query.gender == null){

      response.send(fetched_data);

    }else{
      var result = {
        'listings' : []
      }

      //here we go through all the listings
      for(var i = 0; i < fetched_data.all_listings.length; i++){

        var current_listing = fetched_data.all_listings[i];
        var current_boro = current_listing.hood;



        if(current_boro == request.query.boro){
          result.listings.push(fetched_data.all_listings[i]);
        }
      }

      //once we're done, we respond with JSON result
      response.json(result);
    }

  });

  console.log(request.query);
});

app.get('/get-new-data', function(req, res, err){
  fetchWebpage();

  res.send('we got the data');
});

app.get('/delete', function(req, res, err){
  fs.unlink('data/listings.json', function(error){
    console.log(error);
  });

  res.send('we deleted the data');
});

// get a HTML page
// parse the contents of that page

var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

function fetchWebpage(){
  //this is the url we want to request
  var url = 'https://newyork.craigslist.org/search/mis';

  //read the data you have

  //request the webpage
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

        //compare the new data you have with the old data
        //if the url you have is not already in the data
        //append it to the data

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







//---
