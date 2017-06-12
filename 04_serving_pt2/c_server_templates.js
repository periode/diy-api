var Express = require('express');
var app = Express();
var pug = require('pug')

var port = 2046;

app.listen(port, function(){
	console.log('server started on port',port);
});

app.use(Express.static(__dirname + '/public_b/'));

// this is where we specify to Express that we want to have a specific way to display our webpages
app.set('view engine', 'pug');

// this is where we specifiy WHERE all of the templates are, usually in a folder we call 'views'
app.set('views', __dirname+'/public_c/views');

app.get('/', function(req, res, err){
	res.sendFile('index.html');
});

app.get('/template', function(req, res, err){

	// notice how, here, we are now just giving the name of the template file we want to render
	// and we use res.render() to render that file
	res.render('index');
});

app.get('/custom', function(req, res, err){

	// the powerful thing is that you can then PASS DATA to whatever template you're using
	// in that case, we're passing it a JSON object, which has one field, 'name', and one value "Pierre"
	res.render('custom', {name: "Pierre"});
});


