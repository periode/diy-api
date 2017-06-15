//reference to the express code, which we installed by doing `npm install express`
var express = require('express');

//this is our server
var app = express();

//this is the port on which we will connect
//which means that, once the script is running (`node server.js`), we can connect to our webserver by going to `localhost:2046` in our browser
var port = 2046;

//i.e. start the server
app.listen(port, function(){
	//if the server runs successfully, we display a message in our terminal
  console.log('server is running on port', port);
});

//this is a route/endpoint, which is what the server is listening for in order to send back content
// a single slash is the root of the website. http://google.com is equivalent to http://google.com/
app.get('/', function(request, response, error){
	//this message will be see on the server-side (in the terminal)
	console.log('received new request for endpoing \'/\'');

  // this message we will see on the client side
  response.send("welcome to our api, please visit /all_listings");
});

//here we register another route, which will deliver different content than the '/' endpoint above on line 19
app.get('/get-all-listings', function(request, response, error){
  var fetched_data;

  //we first need to read our file, which is located in the 'data' folder, and called 'listings.json'
  fs.readFile('data/listings.json', function(error, data){
    console.log('successfully read file');

    //once we've read (loaded) the file, we need to parse it as JSON
    fetched_data = JSON.parse(data);

    //the user requests can be found in the 'request.query' object
    //query = {field:value} --- which in the URL looks like http://mywebsite.com/endpoint?field=value
    //if the user wants the whole thing
    if(request.query.boro === null){
      //if there is no specific query, let's just send back the whole thing
      response.send(fetched_data);

    }else{//else, if we have some sort of query, we need to do some data processing

      var result = {
        'listings' : []
      };

      //here we go through all the listings
      for(var i = 0; i < fetched_data.all_listings.length; i++){

        var current_listing = fetched_data.all_listings[i];
        var current_boro = current_listing.hood;


        //if the current boro matches the boro requested by the user...
        if(current_boro == request.query.boro){
		//we add that listing to our list
          result.listings.push(current_listing);
        }
      }

      //once we're done, we respond with JSON result
      response.json(result);
    }

  });

  console.log('new query:',request.query);
});


//this is a route that we set up just in order to call the function fetchWebpage(), which is defined on line 99, and parses our website again
app.get('/get-new-data', function(req, res, err){
  fetchWebpage();

  res.send('we got the data');
});

//similarly, this route allows us to delete the data
app.get('/delete', function(req, res, err){
  fs.unlink('data/listings.json', function(error){
    console.log(error);
  });

  res.send('nothing is permanent');
});


//this is the part where we request the external webpage (craigslist)
var request = require('request');
//cheerio helps us scrape its HTML elements
var cheerio = require('cheerio');
//and fs allows us to write to a file
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

    //declare an object that will be written to disk
    var data_to_be_saved = {
      'all_listings': []
    };

    //start by going through all of the HTML elements with the class="result-title"
    $('.result-title').each(function(index, element){
        //we then get the text, the url and the borough from that single element
        titles[index] = $(element).text();
        url[index] = $(element).attr('href');
        areas[index] = url[index].slice('1', '4');


        //then we all save it to an individual JSON object
        var listing = {
          'name': titles[index],
          'link': url[index],
          'hood': areas[index]
        };

        //then finally we add it to our object declared on line 124
        data_to_be_saved.all_listings.push(listing);


    });

    //now we give that data to the function that is going to write it to disk
    writeToDisk(data_to_be_saved);

  });
}

//this is the function that actually writes our data to disk
function writeToDisk(data){
  //since our data is in JSON format we 'stringify' it, turning it into plaintext
  var writeable_data = JSON.stringify(data);

  //and here we write it by calling fs.writeFile() in which the first argument is the location of the file that needs to be saved
  //the second is the data to be written
  //the third is the callback function
  fs.writeFile('data/listings.json', writeable_data, function(){
    console.log('successfully written to disk!');
  });
}
