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
var cheerio = require('cheerio');

function fetchWebpage(url){
	console.log('fetching', url, '...');
	request(url, function(error, response, body){
		console.log('requested URL responded with status code:', response.statusCode);
		console.log('----');

		var $ = cheerio.load(body);

		var headers = [];
		$('.nyurichtexteditor h2').each(function(index, element){
			//then we save their text inside the equivalent slot in our array
			headers[index] = $(this).text();
		});

		var names = [];
		var roles = [];
		var affiliations = [];
		$('.nyucolumncontrol .rte p').each(function(index, element){
			names[index] = $(this).find('b').text();
			roles[index] = $(this).find('i').text();

			var start_point = $(this).text().indexOf(roles[index]) + roles[index].length + 1;
			var end_point = $(this).text().length;
			affiliations[index] = $(this).text().slice(start_point, end_point);
		});

		//----- SAVING AS JSON
		//first we declare our object as a variable and we add one field to it, an array called 'trustees'
		var results = {
			trustees : []
		};
		
		//then we go through all of our results
		for(var i = 0; i < names.length; i++){
			//and for each of them, we create another object, with a name, a role and an affiliation
			var person = {
				'name': names[i],
				'role': roles[i],
				'affiliation': affiliations[i]
			};
			
			//and at the end, we add (push) that object to the array of trustees that we have on line 50
			results.trustees.push(person);
		}
		
		//to check that we've done everything right, we print it to the console
		console.log(results);

		//and then we pass that object to another of our function, writeToFile(), that we wrote starting line 89
		writeToFile(results);
	});
}

var options = {
	url: 'https://www.nyu.edu/about/leadership-university-administration/board-of-trustees.html',
	headers: {
		//to learn more about headers, check out: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent
		'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
	}
};

fetchWebpage(options);


//------ WRITING TO FILE
//first, we require the 'fs' (filesystem) package from node
var fs = require('fs');

function writeToFile(data){

	//first of all, we can't directly write JSON data, we need to turn it into text first
	var writeable_data = JSON.stringify(data);

	//then we call fs.writeFile(path, data, callback) to write it to another file
	
	// !!!!!!! make sure you have created that file beforehand, even if it is empty. in our case, we need to create a folder called data
	// and inside that folder create a file called trustee.json
	fs.writeFile('data/trustees.json', writeable_data, function(error){
		//if we have no error
		if(!error){
			//write a success message to the console!
			console.log('successfully written file!');
		}else{ //otherwise, well, we have an error, so we write it to the console to know what went wrong
			console.log(error);
		}
	});
}
