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
//in order to parse the data, we need to use the 'cheerio' package
var cheerio = require('cheerio');

function fetchWebpage(options){

	console.log('fetching', options.url, '...');

	request(options, function(error, response, body){
		console.log('requested URL responded with status code:', response.statusCode);
		console.log('----');

		//now that we have the HTML part (in the body variable), we load it into cheerio
		var $ = cheerio.load(body);

		//first we want to get the headers, so we get ready to store them into an empty array
		var headers = [];

		//now we go through all the <h2> elements included inside all the elements with the class="nyurichtexteditor"
		$('.nyurichtexteditor h2').each(function(index, element){
			//then we save their text inside the equivalent slot in our array
			headers[index] = $(this).text();
		});

		//and then we print it to our console to see the result
		console.log(headers);

		//then we do the same things with the names, roles and affiliations
		var names = []; //empty array
		var roles = []; //empty array
		var affiliations = []; //empty array

		//for each <p> element that is inside a <span class="nyucolumncontrol"> and inside a <span class="rte"> element
		$('.nyucolumncontrol .rte p').each(function(index, element){
			//we find the name, which is inside a <b>
			names[index] = $(this).find('b').text();

			//and we find the role, which is inside a <i>
			roles[index] = $(this).find('i').text();

			//and finally, we do a bit of cutting around to find the affiliation
			//i.e. we take the whole text,
			//then cut off everything until the end of the role (which we've found on line 56)
			var start_point = $(this).text().indexOf(roles[index]) + roles[index].length + 1;
			//all the way to the end...
			var end_point = $(this).text().length;

			//and that means that the last part of the text is the affiliation!
			affiliations[index] = $(this).text().slice(start_point, end_point);
		});

		//and finally we console log everything to see what we have!
		console.log(names);
		console.log(roles);
		console.log(affiliations);
	});
}

//this is an object that we create in order to pass it to our request() on line 26
var options = {
	url: 'https://www.nyu.edu/about/leadership-university-administration/board-of-trustees.html',
	headers: {
		//to learn more about headers, check out: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent
		'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
	}
};

fetchWebpage(options);
