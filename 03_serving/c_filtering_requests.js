var express = require('express');
var app = express();

var port = 2046;

app.listen(port, function(){
	console.log('server running on port', port);
});

app.get('/', function(request, response, error){
	console.log('requested main endpoint');
	response.send('here is the main endpoint. to get the data, please visit the /data endpoint. you can additionally search by country (US, CH, UK/NE), or by minrevenue (in millions of dollars)');
});

//here is all the data we have
var data = {
    companies: [
        {
            'name':'Wal-Mart',
            'country':'US',
            'revenue':'485870'
        },{
            'name':'State Grid',
            'country':'CH',
            'revenue':'329601'
        },{
            'name':'China National Petroleum',
            'country':'CH',
            'revenue':'299271'
        },{
            'name':'Sinopec Group',
            'country':'CH',
            'revenue':'294344'
        },{
            'name':'Royal Dutch Shell',
            'country':'UK/NE',
            'revenue':'272156'
        }]
};


//if the user asks for the data endpoint, we will serve all/some/none of that data
app.get('/data', function(request, response, error){
	console.log('requested the /life endpoint');
	console.log(request.query);

	//if the requests includes a query about the country
	if(request.query.country != null){

		//we get ready to send a JSON object by declaring a new one with an empty array of companies
		var results = { 'companies' : [] };

		//then we go through all the companies
		for(var i = 0; i < data.companies.length; i++){
			//then, if the company's country matches the one requested
			if(data.companies[i].country == request.query.country){
				//we add it to the companies in our results object, declared on line 51
				results.companies.push(data.companies[i]);
			}
		}

		//finally, we send back the results as JSON!
		response.json(results);

	}else if(request.query.minrevenue != null){ //here, we do the same for the minimum revenue
		var results = { 'companies' : [] };
		for(var i = 0; i < data.companies.length; i++){
			if(data.companies[i].revenue > request.query.minrevenue){
				results.companies.push(data.companies[i]);
			}
		}

		response.json(results);
	}else{
		response.json(data);
	}
});

