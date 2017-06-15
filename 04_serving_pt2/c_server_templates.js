var Express = require('express');
var app = Express();
var pug = require('pug');

var port = 2046;

app.listen(port, function(){
	console.log('server started on port',port);
});

app.use(Express.static(__dirname + '/public_b/'));

// this is where we specify to Express that we want to have a specific way to display our webpages
app.set('view engine', 'pug');

// this is where we specifiy WHERE all of the templates are, usually in a folder we call 'views'
app.set('views', __dirname+'/public_c/views');

app.get('/', function(request, response, err){
	response.sendFile('index.html');
});

app.get('/template', function(request, response, err){

	// notice how, here, we are now just giving the name of the template file we want to render
	// and we use res.render() to render that file
	response.render('index');
});

app.get('/custom', function(request, response, err){

	// the powerful thing is that you can then PASS DATA to whatever template you're using
	// in that case, we're passing it a JSON object, which has two fields, 'name' and 'state', for the respective values "Pierre" and "happy"
	var data = {
		name: "Pierre",
		state: "sad"
	};

	response.render('custom', data);
});
