var express = require('express');
var app = express();
var port = 2046;

app.listen(port, function(){
	console.log('server started successfully on port', port, 'please visit localhost:'+port,'to get content served');
});

app.get('/', function(request, response){
	response.sendFile(__dirname + '/index.html');
});

app.get('/data', function(request, response){
	console.log(request.query);

	var data = fs.readFileSync('data/trustees.json');
	var board = JSON.parse(data);
	

	var results = { 'trustees': [] };
	if(request.query.type == 'names'){
		for(var i = 0; i < board.trustees.length; i++){
			results.trustees.push(board.trustees[i].name);
		}
		response.json(results);
	}else if(request.query.type == 'roles'){
		for(var i = 0; i < board.trustees.length; i++){
			results.trustees.push(board.trustees[i].role);
		}
		response.json(results);
	}else if(request.query.type == 'affiliation'){
		for(var i = 0; i < board.trustees.length; i++){
			results.trustees.push(board.trustees[i].affiliation);
		}
		response.json(results);
	}else if(request.query.type == 'all'){
		results = board;
		response.json(results);
	}else{
		response.send('sorry, invalid request');
	}

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
		var results = {
			trustees : []
		};
		
		for(var i = 0; i < names.length; i++){
			var person = {
				'name': names[i],
				'role': roles[i],
				'affiliation': affiliations[i]
			};
			
			results.trustees.push(person);
		}
		
		console.log(results);

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


//------ WRITING TO FILE
var fs = require('fs');

function writeToFile(data){

	var writeable_data = JSON.stringify(data);

	fs.writeFile('data/trustees.json', writeable_data, function(error){
		if(!error){
			console.log('successfully written file!');
		}else{ 
			console.log(error);
		}
	});
}
